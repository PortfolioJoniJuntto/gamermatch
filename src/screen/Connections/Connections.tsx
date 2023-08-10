import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { customFetch } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import Placeholder from "../../assets/ai-stuff/placeholder1.png";
import HomeLoading from "../Loaders/HomeLoading";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");
export default function Connections({ navigation }: { navigation: any }) {
  const [connections, setConnections] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const stateUser = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const data = await customFetch("connections", {
          method: "GET",
        });

        let matches = data.data.matches;
        let users = data.data.users;

        let connections = matches.map((match) => {
          let user1 = users.find((user) => user.uuid === match.user_uuid1);
          let user2 = users.find((user) => user.uuid === match.user_uuid2);

          return {
            matchId: match.uuid,
            user1Gamertag: user1?.gamertag,
            user2Gamertag: user2?.gamertag,
            userUuid: user1?.uuid,
            user2Uuid: user2?.uuid,
            country: user2.country,
          };
        });

        setConnections(connections);
        setLoading(false);
      } catch (error) {
        console.error("getProfile", error);
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  return (
    <ScrollView>
      <View>
        {loading ? (
          <HomeLoading />
        ) : (
          <View style={styles.container}>
            {connections?.length === 0 && (
              <Text style={{ color: "white", fontSize: 20 }}>
                No Connections yet
              </Text>
            )}
            {connections?.map((connection, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.matchContainer}
                  onPress={() =>
                    navigation.navigate("Chat", {
                      matchUuid: connection.matchId,
                      userUuid: connection.userUuid,
                      user2Uuid: connection.user2Uuid,
                    })
                  }
                >
                  <Image style={styles.image} source={Placeholder} />
                  <View style={styles.textContainer}>
                    <Text style={styles.gamerTagStyle}>
                      {connection.userUuid === stateUser.uuid
                        ? connection.user2Gamertag
                        : connection.user1Gamertag}
                    </Text>
                    <Text style={styles.gamerTagStyle}>
                      {connection.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  gamerTagStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  matchContainer: {
    display: "flex",
    flexDirection: "row",
    width: width * 0.8,
    height: height * 0.1,
    justifyContent: "space-around",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textContainer: {
    justifyContent: "space-around",
    textAlign: "center",
    alignItems: "center",
  },
  buttonStyle: {},
});
