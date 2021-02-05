import React, { useState, useCallback, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Send,
} from "react-native-gifted-chat";
import io from "socket.io-client";
import Loader from "./Loader";
import axios from "axios";
import "../config";
import { IconButton } from "react-native-paper";
const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#E8E8E8",
        borderRadius: 30,
        marginHorizontal: 10,
        paddingVertical: 8,
      }}
      // accessoryStyle={{
      //   shadowOpacity: 0.3,
      //   shadowOffset: {
      //     width: 0,
      //     height: 3,
      //   },
      //   shadowRadius: 6,
      //   shadowColor: "#4FB5A5",
      //   elevation: 3,
      // }}
    ></InputToolbar>
  );
};
const customSystemMessage = props => {
  return (
    <View style={styles.ChatMessageSytemMessageContainer}>
      <Icon name="lock" color="#9d9d9d" size={16} />
      <Text style={styles.ChatMessageSystemMessageText}>
        Your chat is secured. Remember to be cautious about what you share with
        others.
      </Text>
    </View>
  );
};

function renderSend(props) {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <IconButton icon="send-circle" size={42} color="#4FB5A5" />
      </View>
    </Send>
  );
}
function scrollToBottomComponent() {
  return (
    <View style={styles.bottomComponentContainer}>
      <IconButton icon="chevron-double-down" size={36} color="#4FB5A5" />
    </View>
  );
}
function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#707070",
          borderRadius: 4,
        },
        left: {
          backgroundColor: "#DEDEDE",
          borderRadius: 4,
        },
      }}
      textStyle={{
        left: {
          color: "#fff",
        },
        right: {
          color: "#fff",
        },
      }}
    />
  );
}
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
        renderInputToolbar={props => customtInputToolbar(props)}
        renderSystemMessage={props => customSystemMessage(props)}
        renderBubble={renderBubble}
        multiline
        renderSend={renderSend}
        minInputToolbarHeight={90}
        textInputStyle={{
          height: 100,
          borderRadius: 10,
        }}
        placeholder="Type your message here..."
        alwaysShowSend
        scrollToBottomComponent={scrollToBottomComponent}
        scrollToBottom
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
const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
