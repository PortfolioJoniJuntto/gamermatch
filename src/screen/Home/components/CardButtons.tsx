import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CardButtons = ({
  handleDislike,
  handleLike,
}: {
  handleDislike: any;
  handleLike: any;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        width: width,
        height: height * 0.09,
      }}
    >
      <Shadow
        startColor="rgba(0, 173, 184, 0.4)"
        endColor="rgba(0,173 , 184, 0.04)"
        distance={6}
      >
        <TouchableOpacity
          style={{
            borderColor: "#00ADB8",
            borderWidth: 1,
            borderRadius: 50,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            handleDislike();
          }}
        >
          <FontAwesome name="close" size={55} color="#00ADB8" />
        </TouchableOpacity>
      </Shadow>
      <Shadow
        startColor="rgba(237, 5, 24, 0.4)"
        endColor="rgba(237, 5, 24, 0.04)"
        distance={6}
      >
        <TouchableOpacity
          style={{
            borderColor: "red",
            borderWidth: 1,
            borderRadius: 50,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            handleLike();
          }}
        >
          <AntDesign name="heart" size={40} color="red" />
        </TouchableOpacity>
      </Shadow>
    </View>
  );
};

export default CardButtons;
