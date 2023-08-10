import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { customFetch } from "../../utils/helpers";
import Loading from "../Loaders/ProfileLoading";
import ProfilePic from "./components/ProfilePic";
import ProfileDetails from "./components/ProfileDetails";
import FavoriteGames from "./components/FavoriteGames";
import FavoritePlatforms from "./components/FavoritePlatforms";
import FavoriteTags from "./components/FavoriteTags";
import FavoritePlayStyle from "../DiscoverySettings/components/FavoritePlaystyle";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { cleanUserState, updateUserState } from "../../features/user/user";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import CustomSafeArea from "../components/CustomSafeArea";
import CustomInput from "../components/CustomInput";

type Code = {
  uuid: string;
  code: string;
  used: boolean;
  created_at: string;
  usersUuid: string;
};

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bio, setBio] = useState("");
  const [gamertag, setGamertag] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [playStyle, setPlayStyle] = useState<boolean>();
  const [country, setCountry] = useState<string>("");
  const [only_same_country, setOnly_same_country] = useState<boolean>(false);
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [inviteCodes, setInviteCodes] = useState<Code[]>([]);
  const stateUser = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("login_type");
    dispatch(cleanUserState());
    navigation.navigate("Start");
  };

  const copyToClipboard = async (code: string) => {
    await Clipboard.setStringAsync(code);
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
      text2: code,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  useEffect(() => {
    setInviteCodes(stateUser.invites);
    const getProfile = async () => {
      if (!stateUser || stateUser.uuid === "") {
        setLoading(true);
        try {
          const response = await customFetch("users/me", {
            method: "GET",
          });
          const data = response.data;
          console.log("data", data);
          if (data.gamertag) {
            setGamertag(data.gamertag);
          }
          if (data.description) {
            setBio(data.description);
          }
          if (data.image) {
            setImage(data.image);
          }
          if (data.competitive) {
            setPlayStyle(data.competitive);
          }
          if (data.country) {
            setCountry(data.country);
          }
          if (data.only_same_country) {
            setOnly_same_country(data.only_same_country);
          }
          if (data.age) {
            setAge(data.age);
          }
          if (data.invites) {
            setInviteCodes(data.invites);
          }
          dispatch(updateUserState(data));
          setLoading(false);
        } catch (error) {
          console.error("getProfile", error);
          setLoading(false);
        }
      } else {
        setGamertag(stateUser.gamertag);
        setBio(stateUser.description);
        setImage(stateUser.image);
        setCountry(stateUser.country);
        setOnly_same_country(stateUser.only_same_country);
        setAge(stateUser.age);
        setLoading(false);
        return;
      }
    };
    getProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/ai-stuff/00032.png")}
        style={styles.image}
      />
      <SafeAreaView className="absolute inset-0 flex-1 bg-black/60 w-full h-full">
        <CustomSafeArea>
          <ScrollView>
            <View className="mt-2 items-center justify-center">
              <ProfilePic image={image} setImage={setImage} />
              <Text className="text-white text-4xl font-bebas mt-4">
                {gamertag}
              </Text>
              <View className="flex-row justify-around w-full my-5">
                <View className="items-center">
                  <Text className="text-white text-md font-bebas">Country</Text>
                  <Text className="text-white text-xl font-bebas">
                    {country}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-md font-bebas">Age</Text>
                  <Text className="text-white text-xl font-roboto">{age}</Text>
                </View>
              </View>
              <View className="mt-1 w-80">
                <Text className="text-white text-md text-center font-roboto p-2">
                  {bio}
                </Text>
              </View>
              <View>
                {inviteCodes?.length === 0 ? (
                  <Text className="text-white text-xl font-bebas mt-12">
                    No invite codes left
                  </Text>
                ) : (
                  <Text className="text-white text-xl font-bebas mt-12">
                    Invite codes
                  </Text>
                )}
              </View>
              <View className="my-4 flex-row justify-around">
                {inviteCodes?.map((code) => (
                  <View key={code?.uuid} className="mx-2 w-28">
                    {code?.used ? (
                      <View></View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => copyToClipboard(code?.code)}
                        className="rounded-md bg-violet-900/80 text-center items-center p-1"
                      >
                        <Text className="text-white text-lg font-bebas">
                          {code?.code}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>

              <FavoriteGames />
              <FavoriteTags />
              <FavoritePlatforms />
            </View>
          </ScrollView>
        </CustomSafeArea>
      </SafeAreaView>
      <Pressable onPress={handleLogout} className="absolute bottom-0">
        <View className="bg-violet-900/80 w-full h-12 items-center justify-center">
          <Text className="text-white text-xl font-bebas">Logout</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height * 1.3,
  },
});
