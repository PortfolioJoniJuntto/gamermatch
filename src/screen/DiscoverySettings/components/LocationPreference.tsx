import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { customFetch } from "../../../utils/helpers";
const { width, height } = Dimensions.get("window");

export default function LocationPreference({
  onlyLocal,
  setOnlyLocal,
}: {
  onlyLocal: boolean;
  setOnlyLocal: (onlyLocal: boolean) => void;
}) {
  const [selectedStyle, setSelectedStyle] = useState(onlyLocal);

  const setStyle = (style: boolean) => {
    setSelectedStyle(style);
    setOnlyLocal(style);
  };

  const updateLocationPref = async (onlyLocal: boolean) => {
    const body = {
      only_local: onlyLocal,
    };
    try {
      const data = await customFetch("users/me", {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("update locationPref", error);
    }
  };

  return (
    <View className="w-80 m-3 h-56 bg-black/70 border-b-violet-600 border-b-2 items-center rounded-lg">
      <Text className="font-bebas text-2xl text-white mt-2">Location</Text>
      <Text style={styles.bodyText}>
        Let us know if you want only local players to your country
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={selectedStyle === true ? styles.selectedButton : styles.button}
          onPress={() => {
            setStyle(true);
            updateLocationPref(true);
          }}
          disabled={selectedStyle}
        >
          <Text style={styles.buttonText}>LOCAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!selectedStyle ? styles.selectedButton : styles.button}
          onPress={() => {
            setStyle(false);
            updateLocationPref(false);
          }}
          disabled={!selectedStyle}
        >
          <Text style={styles.buttonText}>ALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    width: width * 0.8,
    backgroundColor: "#12111A",
    borderBottomColor: "#A54F92",
    borderBottomWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    shadowColor: "#A54F92",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 3.58,
    shadowRadius: 16.0,
    elevation: 8,
    marginBottom: 30,
  },
  bodyText: {
    color: "white",
    fontSize: 16,
    fontFamily: "bebas",
    textAlign: "center",
    width: width * 0.6,
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#363636",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#A54F92",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
