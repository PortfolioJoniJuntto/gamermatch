import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import DescBox from "./DescBox";
import placeholder2 from "../../../assets/ai-stuff/placeholder2.png";

export default function SwiperCard({
  card,
  handleNavigate,
}: {
  card: any;
  handleNavigate: any;
}) {
  const [tags, setTags] = useState(card?.tags);
  const [games, setGames] = useState(card?.games);

  useEffect(() => {
    const renderOnly3Tags = () => {
      if (card?.tags?.length > 3) {
        setTags(tags.splice(3, tags.length - 3));
      } else {
        setTags(tags);
      }
    };
    const renderOnly2Games = () => {
      if (card?.games?.length > 2) {
        setGames(games.splice(2, tags.length - 2));
      } else {
        setGames(tags);
      }
    };
    renderOnly3Tags();
    renderOnly2Games();
  }, [card]);

  if (!card) {
    return <Text>Heu</Text>;
  }

  return (
    <>
      <View className="h-4/6 bg-black/90">
        <Image
          source={card?.image ? { uri: card?.image } : placeholder2}
          className="w-full h-2/5 self-center"
        />
        <DescBox
          name={card?.gamertag}
          age={card?.age}
          bio={card?.description}
          platforms={card?.platforms}
          tags={tags}
          handleNavigate={handleNavigate}
          onlyLocal={false}
          games={card?.games}
          card={card}
        />
      </View>
    </>
  );
}
