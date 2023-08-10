import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { customFetch } from "../../../utils/helpers";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { updateUserGames } from "../../../features/user/user";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
const { width, height } = Dimensions.get("window");

type Game = {
  background_image: string;
  background_image2: string;
  cover_image: string;
  created_at: string;
  igdb_id: number;
  metacritic: number | null;
  name: string;
  rating: number | null;
  released: string;
  top: number;
  updated_at: string;
  uuid: string;
};

export default function FavoriteGames() {
  const dispatch = useDispatch();
  const gamesState = useSelector((state: RootState) => state.user.games);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedItems, setSelectedItems] = useState<Game[]>(gamesState);
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      if (gamesState?.length === 0) {
        try {
          const data = await customFetch("games/user", { method: "GET" });
          setSelectedItems(data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getGames();
  }, []);

  const searchGames = async () => {
    try {
      const data = await customFetch("games", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      setGames(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addGamesToUser = async () => {
    const listOfIds = selectedItems?.map((item) => item.uuid);
    try {
      const data = await customFetch("games/user", {
        method: "POST",
        body: JSON.stringify({ games: listOfIds }),
      });
      dispatch(updateUserGames(selectedItems));
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectGame = (game: Game) => {
    if (selectedItems?.includes(game)) {
      setQuery("");
      setGames([]);
      Toast.show({
        type: "error",
        text1: "Game already added",
        text2: "Please select another game",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

      return;
    }
    setSelectedItems([...selectedItems, game]);
    setQuery("");
  };

  return (
    <View className="w-80 m-3 h-56 bg-black/70 border-b-violet-600 border-b-2 items-center rounded-lg">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-black/80 w-80 h-12 justify-center rounded-xl"
      >
        <View className="flex-row justify-between px-4 w-80">
          <Text className="text-white text-md font-roboto">Games you play</Text>
          <EvilIcons name="search" size={24} color="violet" />
        </View>
      </TouchableOpacity>
      <ScrollView key={Math.random().toString()}>
        {selectedItems?.map((item) => (
          <View
            key={item?.uuid}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "bebas", color: "white" }}>
              {item?.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
              alignItems: "center",
            }}
          >
            <Text style={[styles.favoriteGamesTitle, { textAlign: "center" }]}>
              Select favorite platforms
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.favoriteGamesSearch}
                placeholder="Search to add a game"
                placeholderTextColor="white"
                onChangeText={(text) => setQuery(text)}
                value={query}
                onSubmitEditing={searchGames}
              />
              <TouchableOpacity onPress={searchGames} style={{ marginTop: 20 }}>
                <Entypo name="magnifying-glass" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              {games.map((game) => (
                <TouchableOpacity
                  key={game?.uuid}
                  onPress={() => handleSelectGame(game)}
                  style={{
                    alignItems: "center",
                    marginVertical: 20,
                    width: width * 0.8,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    source={{ uri: game?.cover_image }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      position: "absolute",
                      left: 0,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      textAlign: "center",
                      fontFamily: "bebas",
                      color: "white",
                    }}
                  >
                    {game?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row justify-around w-full items-center absolute bottom-5 ">
              <CustomButton
                onPress={() => setModalVisible(false)}
                text="Close"
                width="w-32"
              />
              <CustomButton
                onPress={addGamesToUser}
                text="Submit"
                width="w-32"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
