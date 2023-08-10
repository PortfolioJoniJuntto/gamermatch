import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RangeSlider } from "@react-native-assets/slider";

const AgePreference = () => {
  const [ageRange, setAgeRange] = useState([15, 60]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Age Range: {ageRange[0]} - {ageRange[1]}
      </Text>
      <RangeSlider
        range={ageRange}
        minimumValue={15}
        maximumValue={60}
        step={1}
        minimumRange={1}
        crossingAllowed={false}
        outboundColor="grey"
        inboundColor="grey"
        thumbTintColor="darkcyan"
        trackHeight={4}
        thumbSize={15}
        slideOnTap={true}
        onValueChange={(range) => {
          setAgeRange(range);
          console.log(range);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default AgePreference;
