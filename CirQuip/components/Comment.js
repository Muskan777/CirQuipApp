import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Touchable, View, Image, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import axios from "axios";
import Loader from "../screens/Loader";
import Toast from "react-native-simple-toast";

const Comment = ({
  id,
  comment,
  name,
  time,
  role,
  likes,
  userId,
  onRefresh,
  setModalOpen,
}) => {
  const [commentLiked, setCommentLiked] = useState(false);
  const [currlikes, setcurrlikes] = useState(likes.length);
  const [user, setUser] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState("");
  var date =
    time.substr(8, 2) + "-" + time.substr(5, 2) + "-" + time.substr(0, 4);
  var localhour = parseInt(time.substr(11, 2));
  var localmin = parseInt(time.substr(14, 2));
  localmin = localmin + 30;
  if (localmin >= 60) {
    localmin = localmin - 60;
    localhour = localhour + 6;
  } else {
    localhour = localhour + 5;
  }
  if (localmin >= 0 && localmin <= 9) {
    localmin = "0" + localmin;
  }
  if (localhour > 12) {
    var commentTime = localhour + ":" + localmin + " PM";
  } else {
    var commentTime = localhour + ":" + localmin + " AM";
  }
  useEffect(() => {
    handleCommentLiked();
    handleProfileImage();
  }, []);
  const handleProfileImage = async () => {
    axios
      .get(`${global.config.host}/user/getUserWithId/${userId}`)
      .then(res => {
        if (res.data.profileImage) setUserImage(res.data.profileImage);
      })
      .catch(err => {
        Alert.alert("Error", "Something Went Wrong");
        console.log(err);
      });
  };
  const handleCommentLiked = async () => {
    let userId = await AsyncStorage.getItem("user");
    setUser(userId);
    let temp = likes.findIndex(id => id === userId);
    if (temp === -1) {
      setCommentLiked(false);
    } else {
      setCommentLiked(true);
    }
  };
  const handleExit = () => {
    onRefresh(true);
    setModalOpen(false);
  };
  const handleCommentLikes = async () => {
    let nlikes;
    if (commentLiked) {
      nlikes = currlikes - 1;
      setcurrlikes(nlikes);
    } else {
      nlikes = currlikes + 1;
      setcurrlikes(nlikes);
    }
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .patch(
        `${global.config.host}/comment/likeComment`,
        {
          id: id,
          liked: commentLiked,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        setCommentLiked(res.data.liked);
      });
  };
  const handleDialog = () => {
    setVisible(!visible);
  };
  const handleDelete = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/comment/deleteComment`,
        {
          id: id,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        onRefresh(true);
        setDeleted(true);
        setLoading(false);
        Toast.show("Comment Deleted", Toast.SHORT, ["UIAlertController"]);
        handleExit();
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.CommentContainer}>
      <View style={styles.CommentImageContainer}>
        {userImage ? (
          <Image
            style={{ ...styles.ProfileImage }}
            source={{
              uri: userImage,
            }}
          />
        ) : (
          <Image
            style={{ ...styles.ProfileImage }}
            source={require("../assets/profile.png")}
          />
        )}
      </View>
      <View style={styles.CommentContentContainer}>
        <View style={styles.CommentUserInfo}>
          <Text style={styles.PrimaryText}>{name || "Anonymous"}</Text>
          <Text style={styles.SecondaryText}>{role}</Text>
        </View>
        <Text style={styles.Comment}>{comment}</Text>
        <View style={styles.CommentBottomContainer}>
          <View style={styles.BottomContainerButtons}>
            <TouchableOpacity>
              {commentLiked ? (
                <FontAwesome
                  name="heart"
                  size={20}
                  style={styles.Icons}
                  onPress={handleCommentLikes}
                />
              ) : (
                <FontAwesome
                  name="heart-o"
                  size={20}
                  style={styles.Icons}
                  onPress={handleCommentLikes}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.TextStyle}>{currlikes}</Text>
            {user == userId ? (
              <TouchableOpacity>
                <FontAwesome
                  name="trash"
                  size={20}
                  style={styles.deleteIcon}
                  onPress={handleDialog}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={styles.SecondaryText}>{commentTime}</Text>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View
          style={{
            height: 175,
            width: 350,
            alignContent: "center",
            position: "absolute",
            alignSelf: "center",
            backgroundColor: "#ffff",
            borderRadius: 10,
            shadowOpacity: 1,
            elevation: 6,
            top: 350,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 20,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#B11B1B",
                alignSelf: "center",
                marginBottom: 10,
              }}
            >
              Confirm Deletion
            </Text>

            {loading ? (
              <Loader />
            ) : (
              <View>
                {!deleted ? (
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "gray",
                        alignSelf: "center",
                        margin: 10,
                      }}
                    >
                      Are you sure you want to delete this comment?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button onPress={handleDialog} color="gray" fontSize="15">
                        Back
                      </Button>
                      <Button
                        onPress={handleDelete}
                        color="#B11B1B"
                        fontSize="15"
                      >
                        Delete
                      </Button>
                    </View>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  CommentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 20,
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 20,
  },
  PrimaryText: {
    fontSize: 22,
  },
  SecondaryText: {
    fontSize: 14,
    color: "#888",
    paddingHorizontal: 5,
  },
  CommentImageContainer: { flex: 0.2, marginLeft: 10 },
  CommentContentContainer: {
    flex: 0.8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    display: "flex",
    backgroundColor: "white",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#4FB5A5",
    elevation: 10,
  },
  commentImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  Comment: {
    padding: 10,
    fontSize: 16,
  },
  CommentBottomContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  BottomContainerButtons: {
    flexDirection: "row",
  },
  Icons: {
    fontSize: 20,
    color: "#2ba4db",
    paddingHorizontal: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: "#2ba4db",
    marginLeft: 20,
  },
  ProfileImage: {
    width: 54,
    height: 54,
    borderRadius: 40,
  },
});
