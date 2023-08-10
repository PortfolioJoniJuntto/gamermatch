import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "jwt-decode";
//@ts-ignore
import { API_BASEURL, EXPO_ID } from "@env";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { updateUserInvites, updateUserState } from "../features/user/user";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const refreshAccessToken = async (navigation?: any) => {
  try {
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    const req = await fetch(`${API_BASEURL}/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });

    const { AccessToken, IdToken } = await req.json();
    if (!AccessToken || !IdToken) {
      navigation.navigate("StartScreen");
    }
    await AsyncStorage.setItem("access_token", AccessToken);
    await AsyncStorage.setItem("id_token", IdToken);
    return AccessToken;
  } catch (err) {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("id_token");
    await AsyncStorage.removeItem("refresh_token");
    if (navigation) navigation.navigate("StartScreen");
    console.error("failed to refresh token", err);
  }
};

const customFetch = async (path: string, params: any) => {
  let accessToken = (await AsyncStorage.getItem("access_token")) || "";
  const refreshToken = await AsyncStorage.getItem("refresh_token");

  if (refreshToken) {
    let token: any = jwt(accessToken);

    if (Date.now() / 1000 > token.exp) {
      accessToken = await refreshAccessToken();
    }
  }

  const req = await fetch(`${API_BASEURL}/${path}`, {
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: "Bearer " + accessToken }),
    },
  });

  try {
    if (req.status === 200) {
      const resp = await req.json();
      return {
        data: resp,
        statusCode: req.status,
      };
    }
    return {
      statusCode: req.status,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: req.status,
    };
  }
};

const getImagePostUrl = async () => {
  try {
    const data = await customFetch("users/profile/image", {
      method: "GET",
    });
    console.log("data", data);
    return data.data.url;
  } catch (error) {
    console.error("getImagePostUrl", error);
  }
};

const showToast = (type: string, text1: string, text2: string) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

type HandleRegisterProps = {
  setDisabled: (boolean: boolean) => void;
  handleNavigate: (destination: string) => void;
  email: string;
  password: string;
  code?: string;
  dispatch: any;
};

const handleRegister = async ({
  setDisabled,
  handleNavigate,
  email,
  password,
  code,
  dispatch,
}: HandleRegisterProps) => {
  const url = API_BASEURL + "/auth/register";
  setDisabled(true);

  if (!email || !password || !code) {
    const message = !code
      ? "You don't have a valid invite code. Please go back to the previous screen and try again."
      : "Please fill in all fields";
    showToast("error", "Error", message);
    setDisabled(false);
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, code }),
    });
    const data = await response.json();

    type ErrorResponse =
      | "Invalid email provided"
      | "No invite code provided"
      | "Email is already in use."
      | "Password must be at least 8 characters long.";

    const errorMessages: Record<ErrorResponse, string> = {
      "Invalid email provided": "Invalid email provided",
      "No invite code provided": "No invite code provided",
      "Email is already in use.": "Email is already in use.",
      "Password must be at least 8 characters long.":
        "Password must be at least 8 characters long.",
    };

    if (!response.ok) {
      const message =
        errorMessages[data.error as ErrorResponse] || "Unknown error happened";
      showToast("error", "Error", message);
      return;
    }

    await storeTokens(data.accessToken, data.refreshToken);
    await handlePushNotification();

    dispatch(updateUserInvites(data.inviteCodes));
    handleNavigate("SetupProfile");
  } catch (error) {
    console.error("error in register", error);
  } finally {
    setDisabled(false);
  }
};

const storeTokens = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem("access_token", accessToken);
  await AsyncStorage.setItem("refresh_token", refreshToken);
  await AsyncStorage.setItem("login_type", "cognito");
};

const handlePushNotification = async () => {
  const token = await registerForPushNotificationsAsync();
  if (token) {
    await customFetch("push-token", {
      method: "POST",
      body: JSON.stringify({ push_token: token }),
    });
  }
};

const handleLogin = async ({
  setLoading,
  setDisabled,
  email,
  password,
  setErrorMessage,
  handleNavigate,
  dispatch,
}: {
  setLoading: (boolean: boolean) => void;
  setDisabled: (boolean: boolean) => void;
  email: string;
  password: string;
  setErrorMessage: (string: string) => void;
  handleNavigate: (destination: string) => void;
  dispatch: any;
}) => {
  setLoading(true);
  setDisabled(true);
  if (!email || !password) {
    console.error("error");
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Please fill in all fields",
      visibilityTime: 3000,
      autoHide: true,
      onHide: () => {},
      onPress: () => {},
    });
    setLoading(false);
    setDisabled(false);
    return;
  }

  const url = API_BASEURL + "/auth/login";
  try {
    const token = await registerForPushNotificationsAsync();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        push_token: token,
      }),
    });
    const data = await response.json();
    if (data.statusCode === 400) {
      setErrorMessage("login.invalidLogin");
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid login",
        visibilityTime: 3000,
        autoHide: true,
        onHide: () => {},
        onPress: () => {},
      });
      throw new Error("Invalid login");
    }

    const { accessToken, refreshToken } = data;

    if (!accessToken) {
      throw new Error("No access token");
    }

    await AsyncStorage.setItem("access_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);

    dispatch(updateUserState(data.user));
    handleNavigate("Home");
  } catch (e) {
    console.error("error in login", e);
    setErrorMessage("Unknown error happened");
    setDisabled(false);
  } finally {
    setDisabled(false);
  }
  setLoading(false);
};

export { customFetch, getImagePostUrl, handleLogin, handleRegister };
