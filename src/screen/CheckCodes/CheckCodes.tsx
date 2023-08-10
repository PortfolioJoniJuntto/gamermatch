import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Keyboard,
} from "react-native";
import SlowlyAppearingText from "../StartingScreen/components/SlowlyText";
import { colors } from "../../constants/colors";
import { customFetch, handleLogin } from "../../utils/helpers";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomSafeArea from "../components/CustomSafeArea";

const { width, height } = Dimensions.get("window");

export default function CheckCodes({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardVisible(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardVisible(false);
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

  const displayToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const validateCode = async () => {
    setLoading(true);
    console.log("Validating code " + value);
    const response = await customFetch("auth/code", {
      method: "POST",
      body: JSON.stringify({ code: value }),
    });
    console.log(response);
    if (
      response.statusCode?.toString().startsWith("4") ||
      response.statusCode?.toString().startsWith("5")
    ) {
      switch (response.statusCode) {
        case 400:
          displayToast("error", "Error", "Code already used");
          setLoading(false);
          return;
        case 404:
          displayToast("error", "Error", "Code not found");
          setLoading(false);
          return;
        case 500:
          displayToast("error", "Error", "Something went wrong");
          setLoading(false);
          return;
        default:
          console.log(response.statusCode);
          displayToast("error", "Error", "Something went wrong");
          break;
      }
      setLoading(false);
    }
    if (response.statusCode?.toString().startsWith("2")) {
      setLoading(false);
      console.log(response);
      navigation.navigate("Start", { code: value });
    }
    setLoading(false);
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/ai-stuff/00032.png")}
        style={styles.image}
      />
      <SafeAreaView className="absolute inset-0 flex-1 bg-black/60 w-full h-full">
        <CustomSafeArea>
          <View className="mt-2">
            <Text className="text-white font-bebas self-center text-2xl shadow-lg shadow-black mt-4 mb-2">
              Welcome to
            </Text>
            <Text className="text-white font-bebas self-center text-6xl shadow-lg shadow-black">
              GAMERMATCH
            </Text>
            <Image
              source={require("../../assets/logo.png")}
              className={`w-2/5 h-44 self-center ${
                keyboardVisible ? "mb-4" : "mb-24"
              } mt-8`}
            />
            <View className="items-center self-center">
              <Text className="text-white font-roboto self-center text-2xl shadow-lg shadow-black">
                Got a code?
              </Text>

              <CustomInput
                setValue={setValue}
                value={value}
                width="w-64"
                placeholder="Invite code"
                secureTextEntry={false}
                onSubmitEditing={() => {
                  if (value.length > 0) {
                    validateCode();
                  } else {
                    displayToast("error", "Error", "Please enter invite code");
                  }
                }}
              />
              {!loading ? (
                <TouchableOpacity
                  onPress={() => {
                    if (value.length > 0) {
                      validateCode();
                    } else {
                      displayToast(
                        "error",
                        "Error",
                        "Please enter invite code"
                      );
                    }
                  }}
                  className="w-32 font-roboto rounded-2xl bg-black/70 text-center h-12 self-center justify-center items-center mt-2"
                >
                  <Text className="text-white font-roboto self-center text-xl shadow-lg shadow-black">
                    Register
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  className={`${
                    keyboardVisible ? "mb-12" : ""
                  }w-32 font-roboto rounded-2xl bg-black/70 text-center h-12 self-center justify-center items-center mt-3`}
                >
                  <Text className="text-gray-600 font-roboto self-center text-xl shadow-lg shadow-black">
                    Register
                  </Text>
                </View>
              )}
            </View>
          </View>
        </CustomSafeArea>
      </SafeAreaView>
      {keyboardVisible === false && (
        <View>
          <Text className="text-white font-roboto self-center text-xl shadow-lg shadow-black">
            Already registered?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Start")}
            className="text-center self-center justify-center items-center"
          >
            <Text className="text-violet-400 mb-11 font-roboto self-center text-2xl shadow-lg shadow-black">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height * 1.3,
  },
});
