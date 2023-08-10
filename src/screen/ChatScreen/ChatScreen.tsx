import React, { useEffect, useState, useRef } from "react";
import { customFetch } from "../../utils/helpers";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  VirtualizedList,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Message = {
  message: string;
  sender_uuid: string;
  time_stamp: string;
};

export default function ChatScreen({ route }: { route: any }) {
  const { matchUuid, user2Uuid } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [matchedUser, setMatchedUser] = useState<any>({});
  const user = useSelector((state: RootState) => state.user);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await customFetch(`chat/${matchUuid}`, "GET");
        setMessages(data.data.returnChat);
        setMatchedUser(data.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChat();
    return () => {};
  }, []);

  const sendMessage = async () => {
    try {
      const data = await customFetch(`chat`, {
        method: "POST",
        body: JSON.stringify({
          user_uuid1: user.uuid,
          user_uuid2: user2Uuid,
          message: message,
          sender_uuid: user.uuid,
          connection_id: matchUuid,
          push_token: matchedUser.push_token,
        }),
      });
      setMessages([...messages, data.data]);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {}
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const EmptyChat = () => {
    return (
      <View className=" justify-center items-center w-full h-full">
        <Text className="text-white font-bebas text-3xl mt-12 absolute top-14">
          {matchedUser.gamertag}
        </Text>
        <Text className="text-white font-bebas text-3xl mt-12">
          No messages yet
        </Text>
        <View className=" flex-row w-full justify-around">
          <TextInput
            className="w-80 bg-white rounded-lg p-3"
            placeholder="Type a message..."
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <TouchableOpacity
            className="rounded-full bg-pink-800 w-12 h-12 justify-center items-center"
            onPress={sendMessage}
          >
            <Ionicons name="ios-send-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (messages?.length === 0) return <EmptyChat />;

  return (
    <View className="justify-center items-center w-full h-full pb-12">
      <Text className="text-white font-bebas text-3xl mt-12">
        {matchedUser.gamertag}
      </Text>
      <VirtualizedList
        data={messages}
        renderItem={({ item }: { item: Message }) => (
          <View
            key={item.time_stamp}
            className={`flex-row justify-center items-center w-full p-2 ${
              item.sender_uuid === user.uuid ? "justify-end" : "justify-start"
            }`}
          >
            <View
              className={`bg-white rounded-lg p-2 opacity-80 ${
                item.sender_uuid === user.uuid
                  ? "bg-lime-600 "
                  : "bg-violet-700"
              }`}
            >
              <Text className="text-white ">{item.message}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.time_stamp}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View className=" flex-row w-full justify-around">
        <TextInput
          className="w-80 bg-white rounded-lg p-3"
          placeholder="Type a message..."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <TouchableOpacity
          className="rounded-full bg-pink-800 w-12 h-12 justify-center items-center"
          onPress={sendMessage}
        >
          <Ionicons name="ios-send-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
