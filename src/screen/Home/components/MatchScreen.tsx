import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MatchScreen({
  user,
  handleNavigation,
  setIsMatch,
}: {
  user: any;
  handleNavigation: any;
  setIsMatch: (boolean: boolean) => void;
}) {
  const heartScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startHeartAnimation();
  }, []);

  const startHeartAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.heartImage,
          {
            transform: [{ scale: heartScale }],
          },
        ]}
        source={require("../../../assets/controller.png")}
      />
      <Text className="text-green-600 text-7xl font-bebas mt-14">
        NEW MATCH
      </Text>
      <Text className="text-white text-3xl font-bebas">{user?.gamertag}</Text>
      <Image
        className="w-48 h-48 rounded-full self-center"
        source={
          user?.image
            ? { uri: user?.image }
            : require("../../../assets/ai-stuff/profileplaceholder.png")
        }
      />
      <TouchableOpacity
        onPress={() => handleNavigation("VisitProfile", { card: user })}
      >
        <Text className="text-white text-3xl font-roboto">See profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute top-10 left-2"
        onPress={() => setIsMatch(false)}
      >
        <Ionicons name="arrow-back" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  heartImage: {
    width: 100,
    height: 100,
  },
});
