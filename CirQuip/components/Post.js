import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-material-cards";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <View style={styles.container}>
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
      <View style={styles.info}>
        <Text> {caption}</Text>
      </View>
      <View style={styles.postimage}>
        <Image
          style={styles.img}
          source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png")}
        ></Image>
      </View>
      <View style={styles.datetime}>
        <Text style={styles.time}>{time}</Text>
        <Image
          styel={styles.dot}
          source={require("../assets/path261.png")}
        ></Image>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#eee" }} />
      </View>
      <View style={styles.response}>
        <View style={styles.like}>
          <TouchableHighlight onPress={handleLikes}>
            <Image
              style={styles.likeimg}
              source={require("../assets/path243.png")}
            ></Image>
          </TouchableHighlight>
          <Text>{currentLikes}</Text>
        </View>
        <View style={styles.like}>
          <TouchableHighlight onPress={() => this.moveToAdd()}>
            <Image source={require("../assets/path227dcc55359.png")}></Image>
          </TouchableHighlight>
          <Text>{comments.length}</Text>
        </View>
        <View style={styles.like}>
          <TouchableHighlight onPress={handleSave}>
            <Image source={require("../assets/path216f57cb052.png")}></Image>
          </TouchableHighlight>
          <Text>{currentSaves}</Text>
        </View>
        <View style={styles.like}>
          <TouchableHighlight onPress={() => this.moveToAdd()}>
            <Image source={require("../assets/path2385c2774f6.png")}></Image>
          </TouchableHighlight>
          <Text>2</Text>
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
    elevation: 5,
    padding: 10,
    backgroundColor: "transparent",
  },

  container: {
    height: 90,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "transparent",
  },

  name: {
    color: "black",
    fontSize: 20,
  },
  about: {
    backgroundColor: "transparent",
  },
  info: {
    margin: 5,
  },
  postimage: {
    marginTop: 10,
    width: "100%",
    overflow: "hidden",
  },
  img: {
    height: 350,
    width: 330,
    borderRadius: 20,
  },
  contactimg: {
    margin: 5,
    height: 55,
    width: 56,
  },
  datetime: {
    flexDirection: "row",
    margin: 15,
  },
  time: {
    marginRight: 10,
  },
  dot: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    height: 10,
    width: 10,
  },
  date: {
    marginLeft: 10,
  },
  response: {
    margin: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  like: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  post: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "transparent",
  },
  message: {
    backgroundColor: "transparent",
  },
});
