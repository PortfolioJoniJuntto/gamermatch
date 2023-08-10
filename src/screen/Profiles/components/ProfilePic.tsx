import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getImagePostUrl } from "../../../utils/helpers";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePic({
  image,
  setImage,
}: {
  image: string;
  setImage: (arg0: string) => void;
}) {
  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.canceled) {
      try {
        const uploadUrl = await getImagePostUrl();
        const joksumuuks = await fetch(result.assets[0].uri);
        setImage(result.assets[0].uri);
        const blob = await joksumuuks.blob();
        const response = await fetch(uploadUrl, {
          method: "PUT",
          body: blob,
          headers: {
            "Content-Type": "image/jpeg",
          },
        });
        console.log("response", response);
      } catch (error) {
        console.error("handleImage", error);
      }
    }
  };
  console.log("image", image);
  return (
    <TouchableOpacity
      onPress={handleImage}
      style={{
        marginTop: 50,
      }}
    >
      <Image
        style={styles.image}
        source={
          image
            ? { uri: image }
            : require("../../../assets/ai-stuff/profileplaceholder.png")
        }
      />
      <MaterialIcons
        style={{
          position: "absolute",
          bottom: 12,
          right: 8,
          borderRadius: 100,
          backgroundColor: "black",
          padding: 8,
          alignSelf: "center",
        }}
        name="add-photo-alternate"
        size={24}
        color="#FF007A"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
