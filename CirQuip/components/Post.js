import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-material-cards";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
export default function Post({
  createdAt,
  caption,
  comments,
  likes,
  saves,
  name,
  role,
  navigation,
  postId,
  id,
}) {
  var date =
    createdAt.substr(8, 2) +
    "-" +
    createdAt.substr(5, 2) +
    "-" +
    createdAt.substr(0, 4);
  if (createdAt.substr(11, 2) > 12) {
    var time = createdAt.substr(11, 5) + " PM";
  } else {
    var time = createdAt.substr(11, 5) + " AM";
  }
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentSaves, setCurrentSaves] = useState(saves);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .get(`${global.config.host}/user/getLikedPosts`, {
        headers: {
          "cirquip-auth-token": token,
        },
      })
      .then(res => {
        let tempLiked = false;
        for (var i = 0; i < res.data.likedPosts.length; i++) {
          if (res.data.likedPosts[i] === postId) {
            tempLiked = true;
            break;
          }
        }
        let tempSaved = false;
        for (var i = 0; i < res.data.savedPosts.length; i++) {
          if (res.data.savedPosts[i] === postId) {
            tempSaved = true;
            break;
          }
        }
        setLiked(tempLiked);
        setSaved(tempSaved);
      })
      .catch(e => console.log(e));
  };

  const handleLikes = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");

    axios
      .patch(
        `${global.config.host}/post/likePost`,
        {
          id: postId,
          liked: liked,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        setCurrentLikes(res.data.likes);
        setLiked(res.data.liked);
      })
      .catch(e => console.log(e));
  };

  const handleSave = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");

    axios
      .patch(
        `${global.config.host}/post/savePost`,
        {
          id: postId,
          saved: saved,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        setCurrentSaves(res.data.saves);
        setSaved(res.data.saved);
      })
      .catch(e => console.log(e));
  };

  return (
    <Card style={styles.box}>
      <View style={styles.topContainer}>
        <Image
          style={styles.contactimg}
          source={require("../assets/ellipse1adfd341c.png")}
        />
        <View style={styles.about}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Profile", { _id: id });
            }}
          >
            <Text style={styles.name}>{name}</Text>
          </TouchableHighlight>
          <Text>{role}</Text>
        </View>
      </View>
      <View style={styles.postCaption}>
        <Text> {caption}</Text>
      </View>
      <View style={styles.postimage}>
        <Image
          style={styles.img}
          source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png")}
        ></Image>
      </View>
      <View style={styles.datetime}>
        <Text style={styles.TextStyle}>{time}</Text>
        <Entypo name="dot-single" size={20} color="grey" />
        <Text style={styles.TextStyle}>{date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#eee" }} />
      </View>
      <View style={styles.response}>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={handleLikes}>
            {liked ? (
              <FontAwesome name="heart" size={30} style={styles.Icons} />
            ) : (
              <FontAwesome name="heart-o" size={30} style={styles.Icons} />
            )}
          </TouchableOpacity>
          <Text style={styles.TextStyle}>{currentLikes}</Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => this.moveToAdd()}>
            <MaterialCommunityIcons
              name="comment-processing"
              size={30}
              style={styles.Icons}
            />
          </TouchableOpacity>
          <Text style={styles.TextStyle}>{comments.length}</Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={handleSave}>
            <FontAwesome name="bookmark" size={30} style={styles.Icons} />
          </TouchableOpacity>
          <Text style={styles.TextStyle}>{currentSaves}</Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => this.moveToAdd()}>
            <FontAwesome name="share-square-o" size={30} style={styles.Icons} />
          </TouchableOpacity>
          <Text style={styles.TextStyle}>2</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "98%",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    paddingTop: 15,
    backgroundColor: "white",
  },
  TextStyle: {
    color: "#888",
  },
  topContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 5,
  },

  name: {
    color: "black",
    fontSize: 20,
  },
  about: {
    backgroundColor: "transparent",
  },
  postCaption: {
    padding: 10,
  },
  Icons: {
    fontSize: 30,
    color: "#4FB5A5",
    paddingHorizontal: 10,
  },
  postimage: {
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  img: {
    alignSelf: "center",
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
    borderRadius: 20,
  },
  contactimg: {
    marginHorizontal: 10,
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  datetime: {
    flexDirection: "row",
    padding: 10,
  },
  response: {
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    justifyContent: "space-around",
  },
  IconContainer: {
    flex: 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
