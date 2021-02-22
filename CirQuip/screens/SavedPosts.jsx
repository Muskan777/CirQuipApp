import React, { useEffect, useState } from "react";
import { ScrollView, FlatList } from "react-native";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-material-cards";
import axios from "axios";
import Post from "../components/Post";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedPosts({ navigation }) {
  const [data, setData] = useState([]);
  let savedData = [];
  let postData = [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  const fetchData = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    await axios
      .get(`${global.config.host}/post/getPosts`, {
        headers: {
          "cirquip-auth-token": token,
        },
      })
      .then(res => {
        res.data.post.map(post => {
          postData.push(post);
        });
        axios
          .get(`${global.config.host}/user/getLikedPosts`, {
            headers: {
              "cirquip-auth-token": token,
            },
          })
          .then(res => {
            for (var i = 0; i < res.data.savedPosts.length; i++) {
              postData.map(post => {
                if (res.data.savedPosts[i] === post._id) {
                  savedData.push(post);
                }
              });
            }
            setData(savedData);
            setLoading(false);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={styles.post}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Post
              name={item.userName}
              role={item.userRole}
              createdAt={item.createdAt}
              caption={item.caption}
              comments={item.comments}
              likes={item.likes}
              saves={item.saves}
              content={item.content}
              navigation={navigation}
              postId={item._id}
              id={item.userId}
            />
          )}
          keyExtractor={item => item._id}
          onRefresh={() => onRefresh()}
          refreshing={isRefreshing}
        />
      )}
    </SafeAreaView>
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
