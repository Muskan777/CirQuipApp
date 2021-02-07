import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ChatWithAdmin({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io("http://192.168.0.106:3000"));

  useEffect(() => {
    setMessages([
      {
        _id: "Admin",
        text: "Hello!!",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
    console.log(socket.id);
    //   props.route.params.admin
    //     ? socket.emit("new user", "Admin")
    //     : socket.emit("new user", props.route.params.email);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log("chat message", messages);
    // socket.emit("send message", messages);
  }, []);

  // socket.on("new message", function (messages) {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // });

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: route.params.admin ? "Admin" : route.params.email,
      }}
    />
  );
}
