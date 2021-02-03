import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import Post from "../components/Post";
import Loader from "./Loader";

export default function Posts({ navigation }) {
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "transparent",
  },
});
