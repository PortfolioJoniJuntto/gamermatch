import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

const SocialsBox = ({
  setDiscordLoginOpen,
}: {
  setDiscordLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Shadow
      startColor={"rgba(88, 101, 242, 0.3)"}
      distance={6}
      style={{
        borderRadius: 30,
      }}
    >
      <View className="flex-row justify-around pt-2 pb-2  items-center w-3/4  rounded-lg bg-black/70 h-22">
        <TouchableOpacity onPress={() => setDiscordLoginOpen(true)}>
          <Image
            source={require("../../../assets/discord.png")}
            className="w-14 h-14"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            className="w-14 h-14"
            source={require("../../../assets/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="w-14 h-14">
            <AntDesign name="apple1" size={46} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

export default SocialsBox;
