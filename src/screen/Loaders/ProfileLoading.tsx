import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.container}>
      <SkeletonLoader
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <SkeletonLoader.Item
          style={{
            width: width * 0.7,
            height: height * 0.3,
            borderRadius: 100,
            marginTop: 100,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: width * 0.4,
            height: height * 0.07,
            marginTop: 30,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: width * 0.9,
            height: height * 0.2,
            marginTop: 30,
          }}
        />
      </SkeletonLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
});
