import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Shadow } from "react-native-shadow-2";
import { useDispatch } from "react-redux";

const screenWidth = Dimensions.get("window").width;

const LoginComponent = ({
  handleLogin,
  disabled,
}: {
  handleLogin: (dispatch: any) => void;
  disabled: boolean;
}) => {
  const dispatch = useDispatch();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 1;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 2000,
      }),
    };
  });
  return (
    <Animated.View style={[styles.animatedView, animatedStyle]}>
      <TouchableOpacity
        onPress={() => handleLogin(dispatch)}
        className={
          disabled
            ? "bg-gray-600"
            : "bg-violet-800 text-center w-3/5 p-1 self-center rounded-xl m-4 bg-black/80"
        }
      >
        <Text className="text-white font-bebas self-center text-xl shadow-lg shadow-black">
          LOGIN
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: "rgb(0, 86, 134)",
    paddingVertical: 6,
    width: 100,
    textAlign: "center",
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: "rgba(128,128,128,0.4)",
  },
});

export default LoginComponent;
