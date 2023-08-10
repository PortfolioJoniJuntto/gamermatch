//Takes android or ios safe area into account

import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";

const CustomSafeArea = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default CustomSafeArea;
