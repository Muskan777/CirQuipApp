import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import Loader from "./Loader";
import axios from "axios";
import "../config";

export function ChatWithAdmin(props) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(() => {
    return io("http://192.168.43.192:3000");
  });
  useEffect(() => {
    axios
      .get(`${global.config.host}/message/getMessages`)
      .then(res => {
        let Messages = res.data.messages;
        if (props.route.params.admin) {
          let FilteredMessages = Messages.filter(msg => {
            return (
              props.route.params.thread._id === msg.to ||
              props.route.params.thread._id === msg.user._id
            );
          });
          setMessages(FilteredMessages);
        } else {
          let FilteredMessages = Messages.filter(msg => {
            return (
              props.route.params.email === msg.to ||
              props.route.params.email === msg.user._id
            );
          });
          setMessages(FilteredMessages);
        }
      })
      .catch(e => console.log(e));
    props.route.params.admin
      ? socket.emit("new user", "Admin")
      : socket.emit("new user", props.route.params.email);
  }, []);

  const onSend = useCallback((messages = []) => {
    let to = "";
    if (props.route.params.admin) {
      to = props.route.params.thread._id;
      messages[0].to = to;
    } else {
      to = "Admin";
      messages[0].to = to;
    }
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    let PostMsg = messages[0];
    delete PostMsg["_id"];
    axios
      .post(`${global.config.host}/message/saveMessages`, PostMsg)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.emit("send message", messages[0]);
  }, []);

  const onRecv = useCallback((message = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message)
    );
  });

  socket.on("new message", message => {
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
