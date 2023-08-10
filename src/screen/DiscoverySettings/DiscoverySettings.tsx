import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import FavoritePlayStyle from "./components/FavoritePlaystyle";
import CustomSafeArea from "../components/CustomSafeArea";
import LocationPreference from "./components/LocationPreference";

const { width, height } = Dimensions.get("window");

const DiscoverySettings = () => {
  const [playStyle, setPlayStyle] = useState<boolean>(false);
  const [onlyLocal, setOnlyLocal] = useState<boolean>(false);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/ai-stuff/00032.png")}
        style={styles.image}
      />
      <SafeAreaView className="absolute inset-0 flex-1 bg-black/60 w-full h-full">
        <CustomSafeArea>
          <View className="flex-1 items-center justify-center">
            <Text className="font-bebas text-4xl text-white mt-2">
              Discovery Settings
            </Text>
            <FavoritePlayStyle
              setPlayStyle={setPlayStyle}
              playStyle={playStyle}
            />
            <LocationPreference
              onlyLocal={onlyLocal}
              setOnlyLocal={setOnlyLocal}
            />
          </View>
        </CustomSafeArea>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height * 1.3,
  },
});

export default DiscoverySettings;
