import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { CheckBox } from "native-base";
import io from "socket.io-client";
import { List, Divider, Button } from "react-native-paper";
import Loader from "./Loader";
import "../config";

import { NetInfoCellularGeneration } from "@react-native-community/netinfo";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
export function ChatWithUser(props) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Unread, setUnread] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [requiredusers, setRequiredUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageText, setMessageText] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [Everyone, setEveryone] = React.useState(false);
  const [Student, setStudent] = React.useState(false);
  const [Alumni, setAlumni] = React.useState(false);
  const [Faculty, setFaculty] = React.useState(false);
  const [socket, setSocket] = React.useState(() => {
    return io(`http://192.168.43.192:3000`);
  });
  let message = {};

  const handleDialog = () => {
    setVisible(!visible);
  };

  const sendmessage = thread => {
    message.to = thread._id;
    socket.emit("send message", message);
  };

  const handleSend = () => {
    message.user = {};
    let i;
    message.text = messageText;
    message.createdAt = new Date();
    message.user._id = "Admin";
    if (Everyone) {
      threads.forEach(sendmessage);
      console.log(threads);
    } else {
      if (Student) {
        let Students = threads.filter(thread => {
          return thread.role === "Student";
        });
        console.log(Students);
        Students.forEach(sendmessage);
      }
      if (Faculty) {
        let Faculties = threads.filter(thread => {
          return thread.role === "Faculty";
        });
        console.log(Faculties);
        Faculties.forEach(sendmessage);
      }
      if (Alumni) {
        let Alumnis = threads.filter(thread => {
          return thread.role === "Alumni";
        });
        console.log(Alumnis);
        Alumnis.forEach(sendmessage);
      }
    }
  };

  const searchFunction = () => {
    // console.log(searchQuery);
    if (searchQuery == "") {
      setRequiredUsers(threads);
    }
    setRequiredUsers(
      threads?.filter(user => {
        return (
          user.name.includes(searchQuery) || user._id.includes(searchQuery)
        );
      })
    );
  };
  useEffect(searchFunction, [searchQuery]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      console.log("Working Fine!");
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
                role: user.role,
              };
            });
            setThreads(thread);
            setRequiredUsers(thread);
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
          setUnread(UnreadMsgs);
        })
        .catch(e => console.log(e));
    });

    return unsubscribe;
  }, [props.navigation]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome
          name="edit"
          style={{ color: "#888", marginTop: 5 }}
          size={28}
          onPress={() => {
            setModalOpen(true);
          }}
        />
        <TextInput
          style={{ flex: 1, marginLeft: 15, fontSize: 18, maxHeight: "100%" }}
          // onSubmitEditing={() => performSearch()}
          placeholder="Search"
          onChangeText={query => {
            // console.log(users);
            setSearchQuery(query);
          }}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={requiredusers}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item);
              props.navigation.navigate("ChatAdmin", {
                screen: "Chat with Admin",
                params: {
                  thread: item,
                  admin: true,
                },
              });
              axios.patch(`${global.config.host}/message/updateMessages`, {
                id: item._id,
              });
              let UnreadMessageId = item._id;
              Unread &&
                setUnread(() => {
                  return Unread[UnreadMessageId]?.filter(() => {
                    return false;
                  });
                });
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
              {Unread && Unread[item._id] && (
                <Text
                  style={
                    Unread[item._id]?.length > 0 && { ...styles.unreadCount }
                  }
                >
                  {Unread[item._id] ? Unread[item._id]?.length : ""}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalOpen} animationType="slide">
        <View
          style={
            visible ? { backgroundColor: "#bbb" } : { backgroundColor: "#fff" }
          }
        >
          <View style={styles.modalTopContainer}>
            <MaterialIcons
              name="arrow-back"
              style={{ ...styles.Icons, marginTop: 20 }}
              size={28}
              onPress={() => {
                setModalOpen(false);
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 30,
              marginVertical: 20,
              color: "#2EA5DD",
              textAlign: "center",
            }}
          >
            Group Text
          </Text>
          <TextInput
            style={{
              fontSize: 20,
              borderWidth: 2,
              borderColor: "#2EA5DD",
              marginHorizontal: 30,
              height: "30%",
              padding: 10,
            }}
            textAlignVertical={"top"}
            onChangeText={text => setMessageText(text)}
            value={messageText}
            placeholder="Type Your message here..."
            multiline
          ></TextInput>
          <Button
            icon="send"
            mode="contained"
            style={{
              width: "30%",
              margin: 20,
              marginHorizontal: 30,
              backgroundColor: "#287ec1",
            }}
            onPress={() => handleDialog()}
          >
            Send
          </Button>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={visible}>
        <View
          style={{
            height: "50%",
            marginTop: "auto",
            backgroundColor: "white",
            borderRadius: 80,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              // marginTop: 30,
              padding: 20,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                marginVertical: 20,
                color: "#888",
                textAlign: "center",
              }}
            >
              Select Your Group
            </Text>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={Everyone}
                color={Everyone ? "#2EA5DD" : "gray"}
                onPress={() => setEveryone(!Everyone)}
              />
              <Text
                style={{
                  ...styles.checkBoxTxt,
                  color: Everyone ? "#2EA5DD" : "gray",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Everyone
              </Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={Student}
                color={Student ? "#2EA5DD" : "gray"}
                onPress={() => setStudent(!Student)}
              />
              <Text
                style={{
                  ...styles.checkBoxTxt,
                  color: Student ? "#2EA5DD" : "gray",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Only Students
              </Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={Alumni}
                color={Alumni ? "#2EA5DD" : "gray"}
                onPress={() => setAlumni(!Alumni)}
              />
              <Text
                style={{
                  ...styles.checkBoxTxt,
                  color: Alumni ? "#2EA5DD" : "gray",
                  fontWeight: "bold",
                  flex: 1,
                  fontSize: 15,
                }}
              >
                Only Alumni
              </Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={Faculty}
                color={Faculty ? "#2EA5DD" : "gray"}
                onPress={() => setFaculty(!Faculty)}
              />
              <Text
                style={{
                  ...styles.checkBoxTxt,
                  color: Faculty ? "#2EA5DD" : "gray",
                  fontWeight: "bold",
                  flex: 1,
                  fontSize: 15,
                }}
              >
                Only Faculties
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button onPress={handleDialog} color="gray" fontSize="15">
                Back
              </Button>
              <Button
                onPress={() => {
                  handleSend();
                  Alert.alert("Send Successful");
                }}
                color="#2EA5DD"
                fontSize="15"
              >
                Send
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#2EA5DD",
    elevation: 3,
  },
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
    alignItems: "center",
  },
  modalTopContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    minHeight: 70,
    justifyContent: "space-between",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#287ec1",
    elevation: 3,
  },
  unreadCount: {
    color: "#fff",
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: "#287ec1",
  },
  checkBoxTxt: {
    marginLeft: 20,
    width: "100%",
  },
  checkBoxContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
});
