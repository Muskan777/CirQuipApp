import React from "react";
import { StyleSheet, View } from "react-native";
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
        <IconButton icon="send-circle" size={42} color="#2EA5DD" />
      </View>
    </Send>
  );
}
function scrollToBottomComponent() {
  return (
    <View style={styles.bottomComponentContainer}>
      <IconButton icon="chevron-double-down" size={36} color="#2EA5DD" />
    </View>
  );
}
function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#287EC1",
          borderRadius: 4,
        },
        left: {
          backgroundColor: "#2EA5DD",
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
    console.log("chat with admin", this.props.route, this.props.route.params);
    this.state = {
      messages: [],
      socket: io(`${global.config.socketURL}`),
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ socket: io.connect(global.config.socketURL) });
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
            let image = msg => {
              if (msg.user._id === "Admin") {
                msg.user.name = "admin";
                msg.user.avatar = require("../assets/asset2.png");
              } else {
                msg.user.name = "users";
                msg.user.avatar = "https://placeimg.com/140/140/any";
              }
            };
            FilteredMessages = FilteredMessages.reverse();
            FilteredMessages.forEach(image);
            this.setState({
              messages: FilteredMessages,
            });
          }
        })
        .catch(e => console.log(e));

      this.props.route.params.admin
        ? this.state.socket.emit("new user", "Admin")
        : this.state.socket.emit("new user", this.props.route.params.email);
    });
    this._blurevent = this.props.navigation.addListener("blur", () => {
      console.log("blurevent");
      //check on this -- even when user goes to notifications shade, it become offline and get kicked out of the online array

      this.state.socket.disconnect();
    });
  }

  componentWillUnmount() {
    //this._unsubscribe();
    //this._blurevent();
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
          _id: this.props?.route?.params?.admin
            ? "Admin"
            : this.props?.route?.params?.email,
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
