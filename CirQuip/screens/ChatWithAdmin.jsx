import React, { useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import Loader from "./Loader";
import axios from "axios";
import "../config";
import * as Constants from "expo-constants";
export class ChatWithAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: io(`http://192.168.43.192:3000`),
    };
  }
  componentDidMount() {
    this.state.socket.on("new message", message => {
      this.onRecv(message);
    });
    axios
      .get(`${global.config.host}/message/getMessages`)
      .then(res => {
        let Messages = res.data.messages;
        if (this.props.route.params.admin) {
          let FilteredMessages = Messages.filter(msg => {
            return (
              this.props.route.params.thread._id === msg.to ||
              this.props.route.params.thread._id === msg.user._id
            );
          });
          FilteredMessages = FilteredMessages.reverse();
          this.setState({
            messages: FilteredMessages,
          });
        } else {
          let FilteredMessages = Messages.filter(msg => {
            return (
              this.props.route.params.email === msg.to ||
              this.props.route.params.email === msg.user._id
            );
          });
          FilteredMessages = FilteredMessages.reverse();
          this.setState({
            messages: FilteredMessages,
          });
        }
      })
      .catch(e => console.log(e));

    this.props.route.params.admin
      ? this.state.socket.emit("new user", "Admin")
      : this.state.socket.emit("new user", this.props.route.params.email);
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  onSend = (messages = []) => {
    let to = "";
    if (this.props.route.params.admin) {
      to = this.props.route.params.thread._id;
      messages[0].to = to;
    } else {
      to = "Admin";
      messages[0].to = to;
    }
    for (let i = 0; i < messages.length; i++)
      messages[i] = { ...messages[i], _id: new Date().getTime() };
    this.setState({
      messages: GiftedChat.append(this.state.messages, {
        ...messages[0],
        _id: Math.round(Math.random() * 1000000),
      }),
    });
    this.state.socket.emit("send message", messages[0]);
  };

  onRecv = (message = []) => {
    this.setState({
      messages: GiftedChat.append(this.state.messages, {
        ...message,
        _id: Math.round(Math.random() * 1000000),
      }),
    });
  };

  render() {
    return this.state.socket ? (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.route.params.admin
            ? "Admin"
            : this.props.route.params.email,
        }}
      />
    ) : (
      <Loader />
    );
  }
}
