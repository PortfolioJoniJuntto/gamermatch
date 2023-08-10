import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({
  width,
  onPress,
  text,
}: {
  width: string;
  onPress: any;
  text: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${width} font-roboto rounded-2xl bg-black/70 text-center h-12 self-center justify-center items-center mt-3`}
    >
      <Text className="text-white font-roboto self-center text-xl shadow-lg shadow-black">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
