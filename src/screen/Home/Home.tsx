import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { customFetch } from "../../utils/helpers";
import { User } from "../../utils/types";
import CardButtons from "./components/CardButtons";
import SwipedAll from "./components/SwipedAll";
import SwiperCard from "./components/SwiperCard";
import MatchScreen from "./components/MatchScreen";
import HomeLoading from "../Loaders/HomeLoading";
import NavigationButtonsRow from "./components/NavigationButtonsRow";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const swiperRef = useRef(null);
  const [swipedAll, setSwipedAll] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [swipeables, setSwipeables] = useState<User[]>([]);
  const [isMatch, setIsMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User>();

  const handleNavigate = (destination: string, params?: any) => {
    navigation.navigate(destination, params);
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      if (!accessToken) {
        navigation.navigate("Start");
      }
    };
    checkIfLoggedIn();
    const getSwipeables = async () => {
      setLoading(true);
      try {
        const data = await customFetch("users/swipeables", {
          method: "GET",
        });
        const filteredData = data.data.filter((user: User) => {
          return user.gamertag !== null;
        });
        console.log(filteredData);
        setSwipeables(filteredData);
        if (filteredData.length === 0) setSwipedAll(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getSwipeables();
  }, []);

  const postDislike = async (dislikeUuid: string) => {
    const data = await customFetch("connections/dislike", {
      method: "POST",
      body: JSON.stringify({
        dislikeUuid: dislikeUuid,
      }),
    });
  };

  const postLike = async (likeUuid: string) => {
    const data = await customFetch("connections/like", {
      method: "POST",
      body: JSON.stringify({
        likeUuid: likeUuid,
      }),
    });
    if (data.data.message === "New match.") {
      setIsMatch(true);
      const matchedUuid = data.data.matchedUser.uuid;
      const correctUser = swipeables.find((user) => {
        return user.uuid === matchedUuid;
      });
      console.log(correctUser);
      setMatchedUser(correctUser);
    }
  };

  const handleDislikeSwipe = (index: number) => {
    postDislike(swipeables[index].uuid);
  };
  const handleLikeSwipe = (index: number) => {
    postLike(swipeables[index].uuid);
  };
  const handleDislike = () => {
    // @ts-ignore
    swiperRef.current.swipeLeft();
  };
  const handleLike = () => {
    // @ts-ignore
    swiperRef.current.swipeRight();
  };

  if (loading) return <HomeLoading />;

  return (
    <>
      {swipedAll && !isMatch ? (
        <SwipedAll />
      ) : (
        <View style={styles.container}>
          {isMatch ? (
            <MatchScreen
              user={matchedUser || undefined}
              handleNavigation={handleNavigate}
              setIsMatch={setIsMatch}
            />
          ) : (
            <>
              <Swiper
                ref={swiperRef}
                cards={swipeables}
                verticalSwipe={false}
                renderCard={(card) => {
                  return (
                    <View style={{ height: height }}>
                      <SwiperCard card={card} handleNavigate={handleNavigate} />
                    </View>
                  );
                }}
                onSwipedAll={() => {
                  setSwipedAll(true);
                }}
                onSwipedLeft={(index) => handleDislikeSwipe(index)}
                onSwipedRight={(index) => handleLikeSwipe(index)}
                cardIndex={0}
                backgroundColor={"#000000"}
                stackSize={2}
              ></Swiper>

              <View style={styles.cardButtonsContainer}>
                <CardButtons
                  handleDislike={handleDislike}
                  handleLike={handleLike}
                />
              </View>
            </>
          )}
        </View>
      )}

      <NavigationButtonsRow handleNavigate={handleNavigate} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  cardButtonsContainer: {
    position: "absolute",
    bottom: "10%",
  },

  settingButton: {
    borderColor: "#fa2375",
    borderWidth: 1,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    position: "absolute",
    top: 30,
    right: 10,
  },
});

export default HomeScreen;
