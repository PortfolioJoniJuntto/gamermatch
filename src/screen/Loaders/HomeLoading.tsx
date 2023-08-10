import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.container}>
      <SkeletonLoader
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height,
        }}
      >
        <SkeletonLoader.Item
          style={{
            width: width * 0.7,
            height: height * 0.6,
            borderRadius: 30,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            position: "absolute",
            top: 30,
            right: 30,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            position: "absolute",
            bottom: 30,
            right: 80,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            position: "absolute",
            bottom: 30,
            left: 80,
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
