import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { customFetch } from "../../../utils/helpers";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import user, { updateUserPlatforms } from "../../../features/user/user";
import { EvilIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
const { width, height } = Dimensions.get("window");

type Platform = {
  id: number;
  name: string;
  image: string | null;
  slug: string | null;
};

export default function FavoritePlatforms() {
  const dispatch = useDispatch();
  const userPlatforms = useSelector((state: RootState) => state.user.platforms);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedItems, setSelectedItems] = useState<Platform[]>(userPlatforms);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userPlatforms", userPlatforms);
    const fetchPlatforms = async () => {
      try {
        const data = await customFetch("platforms", { method: "GET" });
        setPlatforms(data.data);
        console.log("data", data);
        if (userPlatforms?.length === 0) {
          const fetchedPlatforms = await customFetch("platforms/user", {
            method: "GET",
          });
          if (fetchedPlatforms.data?.length > 0) {
            const slicedPlatforms = fetchedPlatforms.data?.slice(0, 4);
            setSelectedItems(slicedPlatforms);
          } else {
            console.log("no platforms");
            setSelectedItems([]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlatforms();
  }, []);

  const addPlatformsToUser = async () => {
    const listOfIds = selectedItems?.map((item) => item.id);
    try {
      await customFetch("platforms", {
        method: "POST",
        body: JSON.stringify({ platforms: listOfIds }),
      });
      dispatch(updateUserPlatforms(selectedItems));
    } catch (error) {
      console.error(error);
    }
  };

  const PlatformModal = () => {
    return (
      <Modal transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(45, 45, 45, 0.8)",
              height: height * 0.7,
              width: width * 0.9,
              borderRadius: 40,
            }}
          >
            <Text style={[styles.favoriteGamesTitle, { textAlign: "center" }]}>
              Select favorite platforms
            </Text>
            <View style={{ marginHorizontal: 10, marginVertical: 50 }}>
              <FlatList
                data={platforms}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      borderBottomColor: "#A54F92",
                      borderBottomWidth: 1,
                      padding: 10,
                      width: width * 0.8,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          !selectedItems?.includes(item) &&
                          selectedItems?.length < 5
                        ) {
                          setSelectedItems([...selectedItems, item]);
                        } else if (selectedItems?.includes(item)) {
                          setSelectedItems(
                            selectedItems?.filter((i) => i !== item)
                          );
                        } else if (selectedItems?.length > 5) {
                          Toast.show({
                            type: "error",
                            text1: "Error",
                            text2: "You can only select 4 platforms",
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                          });
                        }
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "roboto",
                          fontSize: 18,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <View className="flex-row justify-around w-full items-center ">
                <CustomButton
                  onPress={() => setModalVisible(false)}
                  text="Close"
                  width="w-32"
                />
                <CustomButton
                  onPress={addPlatformsToUser}
                  text="Submit"
                  width="w-32"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return modalVisible ? (
    <PlatformModal />
  ) : (
    <View className="w-80 m-3 h-56 bg-black/70 border-b-gray-600 border-b-2 items-center rounded-lg">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-black/80 w-80 h-12 justify-center rounded-xl"
      >
        <View className="flex-row justify-between px-4 w-80">
          <Text className="text-white text-md font-roboto">Platforms</Text>
          <EvilIcons name="search" size={24} color="violet" />
        </View>
      </TouchableOpacity>
      {loading ? (
        <Text style={{ color: "white" }}>Loading</Text>
      ) : (
        <View>
          {selectedItems?.map?.((item) => (
            <View
              key={item.id}
              style={{
                borderBottomColor: "#A54F92",
                borderBottomWidth: 1,
                padding: 10,
                width: width * 0.8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "roboto",
                  fontSize: 18,
                }}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
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
    marginVertical: 30,
    shadowColor: "#A54F92",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 3.58,
    shadowRadius: 16.0,
    elevation: 8,
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
