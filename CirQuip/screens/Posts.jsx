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

export default function Posts({navigation}) {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  const fetchData = () => {
    axios
      .get(`${global.config.host}/post/getPosts`)
      .then(res => {
        setData(res.data.post);
      })
      .catch(e => console.log(e));
  };

  if (data.length === 0) {
    console.log("im here");
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.post}>
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
            content={item.content}
            navigation={navigation}
            id={item._id}
          />
        )}
        keyExtractor={item => item._id}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
      />
      
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
