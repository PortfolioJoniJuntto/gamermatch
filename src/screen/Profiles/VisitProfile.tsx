import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
export default function VisitProfile({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const card = route.params.card;
  console.log("card", card);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View className="h-3/4">
          <Image
            source={
              card?.image
                ? { uri: card?.image }
                : require("../../assets/ai-stuff/profileplaceholder.png")
            }
            className=" h-96 w-96 self-center"
          />
          <View className=" p-4 self-center w-96">
            <View className="flex-row justify-between my-2">
              <Text className="font-bebas text-white text-4xl">
                {card?.gamertag}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <EvilIcons name="arrow-down" size={34} color="violet" />
              </Pressable>
            </View>
            <View className="flex-row justify-between border-b-2 border-gray-500 pb-4">
              <View>
                <Text className="font-roboto text-white text-lg">
                  {card?.gamestyle ? "Competetive" : "Casual"} -{" "}
                  {card?.platforms[0]?.name}
                </Text>
                <Text className="font-roboto text-white text-lg">
                  {card?.onlyLocal ? "Local buddies only" : "Buddies worldwide"}
                </Text>
              </View>
              <Text className="font-roboto text-white text-lg">
                {card?.age}
              </Text>
            </View>

            <Text className="font-roboto text-white text-lg pt-4">
              {card?.description}
            </Text>

            <View className="flex-row">
              {card?.games
                ? card.games.map((game, index) => {
                    return (
                      <View
                        key={index}
                        className="p-2 m-1 mt-5 rounded-full bg-violet-900"
                      >
                        <Text className="font-roboto text-white text-md ">
                          {game?.name}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>
            <View className="flex-row">
              {card?.tags
                ? card.tags.map((tag, index) => {
                    return (
                      <View
                        key={index}
                        className="p-2 m-1 mt-5 rounded-full bg-violet-900"
                      >
                        <Text className="font-roboto text-white text-md ">
                          {tag?.name}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    width: 142,
    height: 67,
    borderRadius: 30,
    backgroundColor: "#080711",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "roboto",
    fontSize: 15,
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
});
