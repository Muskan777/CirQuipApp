import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Touchable, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Comment = ({ id, comment, name, time, role, likes }) => {
  const [commentLiked, setCommentLiked] = useState(false);
  var date =
    time.substr(8, 2) + "-" + time.substr(5, 2) + "-" + time.substr(0, 4);
  if (time.substr(11, 2) > 12) {
    var commentTime = date + " " + time.substr(11, 5) + " PM";
  } else {
    var commentTime = date + " " + time.substr(11, 5) + " AM";
  }
  useEffect(() => {
    handleCommentLiked();
  }, []);
  const handleCommentLiked = async () => {
    let userId = await AsyncStorage.getItem("user");
    let temp = likes.findIndex(id => id === userId);
    if (temp === -1) {
      setCommentLiked(false);
    } else {
      setCommentLiked(true);
    }
  };
  const handleCommentLikes = async () => {
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
  return (
    <View style={styles.CommentContainer}>
      <View style={styles.CommentImageContainer}>
        <Image
          style={{ ...styles.commentImage }}
          source={require("../assets/ellipse174b251b3.png")}
        />
      </View>
      <View style={styles.CommentContentContainer}>
        <View style={styles.CommentUserInfo}>
          <Text style={styles.PrimaryText}>{name || "Anonymus"}</Text>
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
            <Text style={styles.TextStyle}>{likes.length}</Text>
          </View>
          <Text style={styles.SecondaryText}>{commentTime}</Text>
        </View>
      </View>
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
    color: "#4FB5A5",
    paddingHorizontal: 10,
  },
});
