import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import { colors } from "../../constants/colors";
import Toast from "react-native-toast-message";
import { customFetch, getImagePostUrl } from "../../utils/helpers";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../features/user/user";
import CustomSafeArea from "../components/CustomSafeArea";
import { MaterialIcons } from "@expo/vector-icons";
import ProfilePic from "./components/ProfilePic";
import CustomInput from "../components/CustomInput";
import FavoriteGames from "./components/FavoriteGames";
import FavoriteTags from "./components/FavoriteTags";
import FavoritePlatforms from "./components/FavoritePlatforms";
import { tags } from "react-native-svg/lib/typescript/xml";
import CustomButton from "../components/CustomButton";
const { width, height } = Dimensions.get("window");

export default function SetupProfile({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [bio, setBio] = useState("");
  const [gamertag, setgamertag] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [image, setImage] = useState<string>("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardVisible(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardVisible(false);
  });

  const handleSetup = async () => {
    try {
      if (!gamertag || !bio || !age) {
        Toast.show({
          text1: "Error",
          text2: "Please fill all the required fields",
          type: "error",
        });
        return;
      }
      const data = await customFetch("users/me", {
        method: "PATCH",
        body: JSON.stringify({
          description: bio,
          gamertag: gamertag,
          country: location,
          only_same_country: false,
          age: age,
        }),
      });

      if (data.statusCode === 200) {
        Toast.show({
          text1: "Profile updated",
          text2: "Your profile has been updated successfully",
          type: "success",
        });
      } else {
        Toast.show({
          text1: "Error",
          text2: "Something went wrong",
          type: "error",
        });
        return;
      }
      dispatch(updateUserState(data.data));
      navigation.navigate("Home");
    } catch (error) {
      console.error("updateUser", error);
      Toast.show({
        text1: "Error",
        text2: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/ai-stuff/00032.png")}
        style={styles.image}
      />
      <SafeAreaView className="absolute inset-0 flex-1 bg-black/60 w-full h-full">
        <CustomSafeArea>
          <ScrollView>
            <View className="mt-10 items-center justify-center">
              <Text className="text-center text-white text-2xl font-bold">
                Create a profile to get started
              </Text>
              <ProfilePic image={image} setImage={setImage} />
              <CustomInput
                placeholder="Name"
                setValue={(text) => setgamertag(text)}
                value={gamertag}
                width="w-80"
                secureTextEntry={false}
                keyboardType="default"
              />
              <View className="mt-3">
                <CustomInput
                  placeholder="Location"
                  setValue={(text) => setLocation(text)}
                  value={location}
                  width="w-80"
                  secureTextEntry={false}
                  keyboardType="default"
                />
              </View>
              <View className="mt-3">
                <CustomInput
                  placeholder="Age"
                  setValue={(text) => setAge(parseInt(text))}
                  value={age?.toString()}
                  width="w-80"
                  secureTextEntry={false}
                  keyboardType="numeric"
                />
              </View>
              <View className="mt-3">
                <CustomInput
                  placeholder="Bio"
                  setValue={(text) => setBio(text)}
                  value={bio}
                  width="w-80"
                  secureTextEntry={false}
                  keyboardType="default"
                  multiline={true}
                />
              </View>
              <FavoriteGames />
              <FavoriteTags />
              <FavoritePlatforms />
            </View>
          </ScrollView>
          <View className="mb-4">
            <CustomButton
              text="Create Profile"
              onPress={handleSetup}
              width="w-30"
            />
          </View>
        </CustomSafeArea>
      </SafeAreaView>
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
