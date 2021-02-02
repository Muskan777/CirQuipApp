import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import Loader from "./Loader";

export function ChatWithAdmin(props) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(() => {
    return io("http://192.168.43.192:3000");
  });
  useEffect(() => {
    setMessages([
      {
        _id: "Anonymous",
        text: "Hello!!",
        createdAt: new Date(),
        user: {
          _id: "abc",
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
    props.route.params.admin
      ? socket.emit("new user", "Admin")
      : socket.emit("new user", props.route.params.email);
  }, []);

  const onSend = useCallback((messages = []) => {
    let to = "";
    if (props.route.params.admin) {
      to = props.route.params.thread._id;
      messages[0].to = to;
      console.log("To User", messages);
    } else {
      to = "Admin";
      messages[0].to = to;
      console.log("To admin", messages);
    }
    console.log("Send", messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    socket.emit("send message", messages[0]);
  }, []);

  const onRecv = useCallback((message = []) => {
    console.log("message", message);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message)
    );
  });

  socket.on("new message", message => {
    console.log("Recvd");
    onRecv(message);
  });

  return socket ? (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: props.route.params.admin ? "Admin" : props.route.params.email,
      }}
    />
  ) : (
    <Loader />
  );
}
