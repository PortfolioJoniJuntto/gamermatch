import React, { useCallback } from "react";

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateFullProfileVisible } from "../../../features/functions/fullProfileVisible";

type Tag = {
  id: number;
  name: string;
  slug: string;
};
type Game = {
  background_image: string;
  background_image2: string;
  cover_image: string;
  created_at: string;
  igdb_id: number;
  metacritic: number;
  name: string;
  rating: number;
  released: string;
  top: number;
  updated_at: string;
  uuid: string;
};
type Platform = {
  id: number;
  image: string | null;
  name: string;
  slug: string;
};

export default function DescBox({
  name,
  age,
  bio,
  platforms,
  tags,
  gamestyle,
  handleNavigate,
  onlyLocal,
  games,
  card,
}: {
  name: string;
  age: number;
  bio: string;
  platforms: Platform[];
  tags: Tag[];
  gamestyle?: boolean;
  handleNavigate: any;
  onlyLocal?: boolean;
  games: Game[];
  card: any;
}) {
  return (
    <View className=" bg-gray-900 p-4 self-center w-full border-gray-800 border-2 min-h-[50%] ">
      <View className="flex-row justify-between my-2">
        <Text className="font-bebas text-white text-4xl">{name}</Text>
        <TouchableOpacity
          onPress={() => {
            handleNavigate("VisitProfile", { card: card });
          }}
        >
          <EvilIcons name="arrow-down" size={34} color="violet" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between border-b-2 border-gray-500 pb-4">
        <View>
          <Text className="font-roboto text-white text-lg ">
            {gamestyle ? "Competetive" : "Casual"} - {platforms[0]?.name}
          </Text>
          <Text className="font-roboto text-white text-lg font-bold">
            {onlyLocal ? "Local buddies only" : "Buddies worldwide"}
          </Text>
        </View>
        <Text className="font-roboto text-white text-3xl ">{age}</Text>
      </View>

      <Text className="font-roboto text-white text-lg pt-4">
        {bio?.length > 150 ? bio?.slice(0, 150) + "..." : bio}
      </Text>

      <View className="flex-row w-80 flex-wrap">
        {games?.map((game, index) => {
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
        })}
      </View>
      <View className="flex-row">
        {tags?.map((tag, index) => {
          return (
            <View
              key={index}
              className="p-2 m-1 mt-5 rounded-full bg-violet-900"
            >
              <Text className="font-roboto text-white text-md ">
                {tag.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
