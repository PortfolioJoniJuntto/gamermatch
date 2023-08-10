import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { colors } from "../../constants/colors";
import Toast from "react-native-toast-message";
import { customFetch } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateEditUser } from "../../features/user/user";
const { width, height } = Dimensions.get("window");

export default function EditProfile({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [gamerTag, setGamerTag] = useState<string>(user.gamertag);
  const [description, setDescription] = useState<string>(user.description);
  const [country, setCountry] = useState<string>(user.country);
  const [only_same_country, setOnly_same_country] = useState<boolean>(
    user.only_same_country
  );
  const [age, setAge] = useState<number>(user.age);
  const [image, setImage] = useState<string>(user.image);

  const toggleSwitch = () =>
    setOnly_same_country((only_same_country) => !only_same_country);

  const updateProfile = async () => {
    const updateData = {
      ...(gamerTag && { gamertag: gamerTag }),
      ...(description && { description }),
      ...(country && { country }),
      ...(only_same_country && { only_same_country }),
      ...(age && { age }),
    };
    try {
      dispatch(updateEditUser(updateData));
      const data = await customFetch("users/me", {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated",
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.error("updateProfile", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            alignSelf: "center",
          }}
          source={
            image
              ? { uri: image }
              : require("../../assets/ai-stuff/profileplaceholder.png")
          }
        />
        <Text style={styles.header}>EDIT PROFILE</Text>
        <TextInput
          style={styles.TextInputs}
          placeholder="NAME"
          placeholderTextColor="#5B5B5B"
          onChangeText={(text) => setGamerTag(text)}
          value={gamerTag}
        />
        <TextInput
          style={styles.TextInputs}
          placeholder="LOCATION"
          placeholderTextColor="#5B5B5B"
          onChangeText={(text) => setCountry(text)}
          value={country}
        />
        <TextInput
          style={styles.TextInputs}
          placeholder="AGE"
          placeholderTextColor="#5B5B5B"
          onChangeText={(text) => setAge(text ? parseInt(text) : 0)}
          value={age?.toString()}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Matches only from same country</Text>
          <Switch
            trackColor={{ false: "#f4f3f4", true: colors.gold }}
            thumbColor={only_same_country ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={only_same_country}
          />
        </View>
        <TextInput
          style={styles.bioInput}
          placeholder="BIO"
          placeholderTextColor="#5B5B5B"
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  buttonText: {
    fontSize: 15,
    color: colors.white,
    alignSelf: "center",
  },
  button: {
    width: 122,
    height: 37,
    backgroundColor: "#12111A",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  TextInputs: {
    width: 289,
    height: 40,
    backgroundColor: "#12111A",
    borderRadius: 30,
    marginVertical: 10,
    paddingLeft: 20,
    color: colors.white,
  },
  bioInput: {
    width: 289,
    height: 202,
    backgroundColor: "#12111A",
    borderRadius: 30,
    marginVertical: 10,
    paddingLeft: 20,
    paddingTop: 20,
    textAlign: "left",
    textAlignVertical: "top",
    color: colors.white,
  },
});
