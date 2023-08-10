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

const AuthButtons = ({
  handleRegister,
  handleLogin,
  disabled,
}: {
  handleRegister: () => void;
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
      <View style={{ width: 100 }}>
        <Shadow
          stretch
          startColor={"rgba(0,0,0,0.2)"}
          distance={4}
          offset={[1, 2]}
        >
          <TouchableOpacity
            onPress={handleRegister}
            style={[disabled && styles.disabledButton, styles.registerButton]}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontFamily: "bebas",
                fontSize: 19,
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </Shadow>
      </View>
      <View style={{ width: 100 }}>
        <Shadow
          stretch
          startColor={"rgba(0,0,0,0.2)"}
          distance={4}
          offset={[1, 2]}
        >
          <TouchableOpacity
            onPress={() => handleLogin(dispatch)}
            style={[disabled && styles.disabledButton, styles.registerButton]}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontFamily: "bebas",
                fontSize: 19,
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </Shadow>
      </View>
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

export default AuthButtons;
