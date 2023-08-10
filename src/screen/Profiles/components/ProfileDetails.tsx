import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function ProfileDetails({
  gamertag,
  bio,
  age,
  country,
  tags,
  handleNavigation,
}: {
  gamertag: string;
  bio: string;
  age: number;
  country: string;
  tags?: any;
  handleNavigation: (destination: string) => void;
}) {
  const renderOnly3Tags = tags?.slice(0, 3);
  return (
    <View className="justify-center items-center w-80">
      <Text className="text-white font-bebas text-4xl mb-1">{gamertag}</Text>
      <TouchableOpacity
        onPress={() => handleNavigation("EditProfile")}
        className="flex-row justify-center items-center "
      >
        <Text> EDIT</Text>
        <Feather name="edit" size={20} color="white" />
      </TouchableOpacity>
      <>
        <View style={styles.tagContainer}>
          {renderOnly3Tags?.map((tag, index) => {
            return (
              <Text key={index} style={styles.tagText}>
                {" "}
                {tag.name}{" "}
              </Text>
            );
          })}
        </View>
      </>
      <View className="justify-around w-80 flex-row">
        <View>
          <Text className="text-white font-bebas text-xl">Age</Text>
          <Text className="text-xl text-white font-bebas ">{age}</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-white font-bebas text-xl">Location</Text>
          <Text className="text-xl text-white font-bebas ">{country}</Text>
        </View>
      </View>
      <View className="w-4/5 h-36 justify-center items-center">
        <Text className="text-md text-white font-roboto text-center">
          {bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.7,
    marginVertical: 20,
  },
  tagText: {
    color: "#FF007A",
    fontFamily: "roboto",
    lineHeight: 15,
  },
});
