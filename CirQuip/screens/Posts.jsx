import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import axios from "axios";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Loader from "./Loader";

export default function Posts({ navigation }) {
  const [data, setData] = useState([]);
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

  const fetchData = () => {
    axios
      .get(`${global.config.host}/post/getPosts`)
      .then(res => {
        setData(res.data.post);
        setLoading(false);
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
            <View>
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
              <Comment />
            </View>
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
  post: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eee",
  },
});
