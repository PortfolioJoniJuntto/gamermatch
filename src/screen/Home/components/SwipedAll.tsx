import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function SwipedAll() {
  return (
    <View style={styles.swipedAllContainer}>
      <Ionicons name="sad" size={124} color="white" />
      <Text style={styles.swipedAllText}>THAT'S IT</Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "center",
          width: width * 0.7,
        }}
      >
        Try again later
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  swipedAllContainer: {
    width: width,
    height: height,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  swipedAllText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: width * 0.7,
  },
});
