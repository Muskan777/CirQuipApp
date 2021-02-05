import React, { useState } from "react";
import { StyleSheet, Text, Touchable, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Comment = ({ comment, name, time, role }) => {
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
              <Text
                style={{
                  ...styles.SecondaryText,
                  // borderRightWidth: 1,
                  // borderRightColor: "#777",
                  paddingHorizontal: 10,
                }}
              >
                Like
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text style={{ ...styles.SecondaryText, paddingHorizontal: 10 }}>
                Reply
              </Text>
            </TouchableOpacity> */}
          </View>
          <Text style={styles.SecondaryText}>{time}</Text>
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
});
