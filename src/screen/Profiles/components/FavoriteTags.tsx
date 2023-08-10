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
import { updateUserTags } from "../../../features/user/user";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
const { width, height } = Dimensions.get("window");

type Tag = {
  id: number;
  name: string;
  slug: string;
};

export default function FavoriteGames() {
  const dispatch = useDispatch();
  const userTags = useSelector((state: RootState) => state.user.tags);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedItems, setSelectedItems] = useState<Tag[]>(userTags);
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      try {
        if (userTags.length === 0) {
          const data = await customFetch("tags/user", { method: "GET" });
          setSelectedItems(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
  }, []);

  const searchTags = async () => {
    try {
      const data = await customFetch("tags", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      setTags(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addTagsToUser = async () => {
    const listOfIds = selectedItems?.map((item) => item.id);
    try {
      await customFetch("tags/user", {
        method: "POST",
        body: JSON.stringify({ tags: listOfIds }),
      });
      dispatch(updateUserTags(selectedItems));
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectTag = (tag: Tag) => {
    if (selectedItems?.includes(tag)) {
      setQuery("");
      setTags([]);
      Toast.show({
        type: "error",
        text1: "Tag already added",
        text2: "Please select another tag",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }
    if (selectedItems.length === 10) {
      Toast.show({
        type: "error",
        text1: "You have reached the maximum number of tags",
        text2: "Please remove a tag to add another",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setModalVisible(false);
      return;
    }
    setSelectedItems([...selectedItems, tag]);
    setQuery("");
  };

  return (
    <View className="w-80 m-3 h-56 bg-black/70 border-b-gray-600 border-b-2 items-center rounded-lg">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-black/80 w-80 h-12 justify-center rounded-xl"
      >
        <View className="flex-row justify-between px-4 w-80">
          <Text className="text-white text-md font-roboto">Intrests</Text>
          <EvilIcons name="search" size={24} color="violet" />
        </View>
      </TouchableOpacity>
      <View style={styles.selectedTagsContainer}>
        {selectedItems?.slice(0, 10).map((item) => (
          <View key={item?.id} style={styles.selectedTagItem}>
            <Text style={styles.selectedTagText}>{item?.name}</Text>
          </View>
        ))}
      </View>
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
            <Text className="text-white font-bebas text-2xl mr-3">
              Select favorite tags
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextInput
                style={styles.favoriteGamesSearch}
                placeholder="Search to add a tag"
                placeholderTextColor="white"
                onChangeText={(text) => setQuery(text)}
                value={query}
                onSubmitEditing={searchTags}
              />
              <TouchableOpacity onPress={searchTags} style={{ marginTop: 20 }}>
                <Entypo name="magnifying-glass" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.tagsScrollView}>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag?.id}
                  onPress={() => handleSelectTag(tag)}
                  style={styles.tagItem}
                >
                  <Text style={styles.tagText}>{tag?.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View className="flex-row justify-around w-full items-center ">
              <CustomButton
                onPress={() => setModalVisible(false)}
                text="Close"
                width="w-32"
              />
              <CustomButton
                onPress={addTagsToUser}
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
  favoriteContainer: {
    width: width * 0.8,
    height: 281,
    backgroundColor: "#12111A",
    borderBottomColor: "#A54F92",
    borderBottomWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#A54F92",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 3.58,
    shadowRadius: 16.0,
    elevation: 8,
    marginBottom: 20,
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
  selectedTagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  selectedTagItem: {
    backgroundColor: "#19183E",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    overflow: "scroll",
  },
  selectedTagText: {
    fontFamily: "bebas",
    color: "white",
    textAlign: "center",
  },
  tagsScrollView: {
    maxHeight: height * 0.4,
    marginTop: 10,
  },
  tagItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#A54F92",
    borderBottomWidth: 1,
  },
  tagText: {
    color: "white",
  },
});
