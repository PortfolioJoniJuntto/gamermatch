import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import NeonText from "./NeonText";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SlowlyAppearingText = ({
  text,
  text2,
}: {
  text: string;
  text2: string;
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 1; // change opacity value to 1
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 1000,
      }),
    };
  });

  return (
    <View style={styles.textContainer}>
      <Animated.Text style={[styles.text, animatedStyle]}>{text}</Animated.Text>
      <Animated.Text style={[styles.text1, animatedStyle]}>
        {text2}
      </Animated.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    width: screenWidth,
  },
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "bebas",
  },
  text1: {
    color: "white",
    fontSize: 42,
    textAlign: "center",
    fontFamily: "bebas",
  },
});

export default SlowlyAppearingText;
