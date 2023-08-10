import React from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
const { width, height } = Dimensions.get("window");
export default function FavoriteGames({ age }: { age: number }) {
  return <Text>{age}</Text>;
}

const styles = StyleSheet.create({
  favoriteContainer: {
    width: width * 0.8,
    height: 281,
    backgroundColor: "#12111A",
    borderBottomColor: "#A54F92",
    borderBottomWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  favoriteGamesTitle: {
    fontSize: 24,
    color: "white",
    fontFamily: "bebas",
    marginTop: 20,
  },
  favoriteGamesSearch: {
    width: width * 0.6,
    height: 33,
    backgroundColor: "#363636",
    borderRadius: 40,
    textAlign: "center",
    marginTop: 20,
  },
});
