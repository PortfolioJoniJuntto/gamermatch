import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cleanUserState } from "../../../features/user/user";
import { useDispatch } from "react-redux";

export default function NavigationButtonsRow({
  handleNavigate,
}: {
  handleNavigate: (destination: string) => void;
}) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("login_type");
    dispatch(cleanUserState());
    handleNavigate("Start");
  };
  return (
    <View className="flex-row justify-around items-center h-14 absolute -bottom-10 w-full mb-12">
      <TouchableOpacity
        className="rounded-full bg-white w-10 h-10 justify-center items-center"
        onPress={() => handleNavigate("Connections")}
      >
        <Ionicons name="chatbox-sharp" size={24} color="violet" />
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-full bg-white w-10 h-10 justify-center items-center"
        onPress={() => handleNavigate("Profile")}
      >
        <Ionicons name="person" size={24} color="violet" />
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-full bg-white w-10 h-10 justify-center items-center"
        onPress={() => handleNavigate("DiscoverySettings")}
      >
        <Ionicons name="settings" size={24} color="violet" />
      </TouchableOpacity>
    </View>
  );
}
