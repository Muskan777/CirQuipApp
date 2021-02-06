import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { List, Divider } from "react-native-paper";
import Loader from "./Loader";
import "../config";
import { NetInfoCellularGeneration } from "@react-native-community/netinfo";

export function ChatWithUser(props) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Unread, setUnread] = useState({});

  useEffect(() => {
    axios
      .get(`${global.config.host}/user/getUsers`)
      .then(res => {
        if (props.route.params.email == global.config.admin) {
          let Users = res.data.users.filter(user => {
            return user.email != global.config.admin;
          });
          const thread = Users.map(user => {
            return {
              _id: user.email,
              name: user.name,
            };
          });
          setThreads(thread);
        }
        if (loading) {
          setLoading(false);
        }
      })
      .catch(err => {
        Alert.alert("Error", "Something Went Wrong In Fetching Admin 2");
        console.log(err);
      });
    axios
      .get(`${global.config.host}/message/getMessages`)
      .then(res => {
        let AdminMsg = res.data.messages.filter(message => {
          return message.to === "Admin" && !message.recieverRead;
        });
        let UnreadMsgs = {};
        for (let i = 0; i < AdminMsg.length; i++) {
          if (UnreadMsgs[AdminMsg[i].user._id]) {
            UnreadMsgs[AdminMsg[i].user._id].push(AdminMsg[i]);
          } else {
            UnreadMsgs[AdminMsg[i].user._id] = [];
            UnreadMsgs[AdminMsg[i].user._id].push(AdminMsg[i]);
          }
        }
        console.log(UnreadMsgs);
        setUnread(UnreadMsgs);
      })
      .catch(e => console.log(e));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("ChatWithAdmin", {
                thread: item,
                admin: true,
              });
              axios.patch(`${global.config.host}/message/updateMessages`, {
                id: item._id,
              });
              let UnreadMessageId = item._id;
              let UnreadMessages = Unread;
              UnreadMessages[UnreadMessageId] = [];
              setUnread(UnreadMessages);
            }}
          >
            <View style={styles.listItemContainer}>
              <List.Item
                style={styles.listItem}
                title={item.name}
                description={item._id}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
              <Text
                style={
                  Unread[item._id]?.length > 0 && { ...styles.unreadCount }
                }
              >
                {Unread[item._id] ? Unread[item._id]?.length : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
  },
  listDescription: {
    fontSize: 12,
  },
  listItem: {
    // borderWidth: 1,
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    alignItems: "center",
  },

  unreadCount: {
    color: "#fff",
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: "#4FB5A5",
  },
});
