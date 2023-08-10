import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  TextInput,
  Image,
  SafeAreaView,
  Keyboard,
  Pressable,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import SlowlyAppearingText from "./components/SlowlyText";
import SocialsBox from "./components/SocialsBox";
// @ts-ignore
import { DISCORD_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../constants/colors";
import AuthButtons from "./components/AuthButtons";
import { WebView } from "react-native-webview";
import { handleLogin, handleRegister } from "../../utils/helpers";
import HomeLoading from "../Loaders/HomeLoading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";

const StartingScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [discordLoginOpen, setDiscordLoginOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>(route.params?.code);
  const [loginTypeLogin, setLoginTypeLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardOpen(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardOpen(false);
  });

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      if (accessToken) {
        navigation.navigate("Home");
      }
    };
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (!code) {
      setLoginTypeLogin(true);
    }
  }, [code]);

  const handleNavigate = (destination: string) => {
    navigation.navigate(destination);
  };

  if (loading) {
    return <HomeLoading />;
  }
  if (discordLoginOpen) {
    return (
      <WebView
        onMessage={async (msg) => {
          try {
            const tokens = JSON.parse(msg.nativeEvent.data);
            await AsyncStorage.setItem("access_token", tokens.accessToken);
            await AsyncStorage.setItem("refresh_token", tokens.refreshToken);
            await AsyncStorage.setItem("login_type", "discord");
            navigation.navigate("Home");
          } catch (e) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Something went wrong",
              autoHide: true,
              visibilityTime: 2000,
            });
            console.error(e);
          }
          setDiscordLoginOpen(false);
        }}
        javaScriptEnabled={true}
        source={{ uri: DISCORD_URL }}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <View className="flex-1 w-full h-full">
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/ai-stuff/00032.png")}
        style={styles.image}
      />
      <SafeAreaView className="bg-black/40 mt-5">
        <View className="w-full h-full bg-black/30 items-center">
          <Text className="text-white font-bebas self-center text-2xl shadow-lg shadow-black mt-4 mb-2">
            Welcome to
          </Text>
          <Text className="text-white font-bebas self-center text-6xl shadow-lg shadow-black">
            GAMERMATCH
          </Text>
          <Image
            source={require("../../assets/logo.png")}
            className={`w-2/5 h-44 self-center ${
              keyboardOpen ? "mb-2" : "mb-20"
            } mt-4`}
          />
          <View className="flex-1 w-80 items-center mb-10">
            <View className="items-center justify-center ">
              <CustomInput
                setValue={setEmail}
                value={email}
                width="w-80"
                placeholder="Email"
                secureTextEntry={false}
                keyboardType="email-address"
              />
              <View className="mt-4"></View>
              <CustomInput
                setValue={setPassword}
                value={password}
                width="w-80"
                placeholder="Password"
                secureTextEntry={true}
                onSubmitEditing={() => {
                  if (loginTypeLogin) {
                    handleLogin({
                      setLoading,
                      handleNavigate,
                      email,
                      password,
                      setDisabled,
                      dispatch: dispatch,
                      setErrorMessage,
                    });
                  }
                }}
              />
              <View className="mt-4"></View>
              {!loginTypeLogin && (
                <CustomInput
                  setValue={setConfirmPassword}
                  value={confirmPassword}
                  width="w-80"
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  onSubmitEditing={() => {
                    handleRegister({
                      handleNavigate,
                      email,
                      password,
                      setDisabled,
                      code,
                      dispatch,
                    });
                  }}
                />
              )}
            </View>
            <CustomButton
              width="w-48"
              onPress={() => {
                if (!loginTypeLogin) {
                  handleRegister({
                    handleNavigate,
                    email,
                    password,
                    setDisabled,
                    code,
                    dispatch,
                  });
                } else {
                  handleLogin({
                    setLoading,
                    handleNavigate,
                    email,
                    password,
                    setDisabled,
                    dispatch,
                    setErrorMessage,
                  });
                }
              }}
              text={!loginTypeLogin ? "Sign up" : "Login"}
            />
          </View>
          {!keyboardOpen && (
            <View>
              <Text className="text-white font-roboto self-center text-xl shadow-lg shadow-black">
                {!loginTypeLogin ? "Already registered?" : "Not yet a user?"}
              </Text>
              <Pressable
                onPress={() => {
                  console.log("pressed");
                  setLoginTypeLogin(!loginTypeLogin);
                }}
                className="text-center self-center justify-center items-center"
              >
                <Text className="text-violet-400 mb-11 font-roboto self-center text-2xl shadow-lg shadow-black">
                  {!loginTypeLogin ? "Login" : "Sign up"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight,
  },
  title: {
    marginTop: Math.min(
      screenHeight - 450 - 65 - 50,
      screenHeight / 2 - 65 - 50
    ),
  },

  textContainer: {},
  text: {
    color: "white",
    fontSize: 42,
    textAlign: "center",
    fontFamily: "roboto",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: screenWidth,
    height: screenHeight * 1.3,
  },
  animatedView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  modalView: {
    margin: 20,
    backgroundColor: "transparent",
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },

  input: {
    height: 40,
    width: screenWidth * 0.8,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    paddingHorizontal: 25,
    color: colors.white,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    marginVertical: 10,
    borderColor: colors.silver,
    fontFamily: "roboto",
  },
});
export default StartingScreen;
