import React, { useEffect, useState } from "react";
import { ScrollView, FlatList } from "react-native";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-material-cards";
import PostsCarousel from "../components/PostsCarousel";
import axios from "axios";
import Comment from "../components/Comment";

import Post from "../components/Post";
import Loader from "./Loader";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedPosts({ navigation }) {
  const [data, setData] = useState([]);
  let savedData = [];
  let postData = [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [CCPIndex, setCCPIndex] = useState(null);

  const [commentLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  const onCommentClick = (index, postId) => {
    axios
      .post(`${global.config.host}/post/getComments`, { id: postId })
      .then(res => {
        setComments(res.data.comments);
        setCommentLoading(false);
        console.log("res", res.data.comments);
      })
      .catch(e => console.log(e));
    setModalOpen(!modalOpen);
    setCCPIndex(index);
  };
  const handleComment = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/comment/createComment`,
        {
          postId: data[CCPIndex]?._id,
          comment: commentText,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        Toast.show("New Comment Created", Toast.SHORT, ["UIAlertController"]);
        setCommentText(null);
        setComments([...comments, res.data.comment]);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
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
            savedData = savedData.reverse();
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
            <PostsCarousel
              name={item.userName}
              role={item.userRole}
              createdAt={item.createdAt}
              caption={item.caption}
              comments={item.comments}
              onCommentClick={onCommentClick}
              taggedUsers={item.taggedUsers}
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
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.topContainer}>
          <MaterialIcons
            name="arrow-back"
            style={{ ...styles.Icons, marginTop: 20 }}
            size={28}
            onPress={() => {
              setModalOpen(false);
              setComments([]);
            }}
          />
        </View>
        <ScrollView>
          {isLoading ? (
            <Loader />
          ) : (
            <PostsCarousel
              name={data[CCPIndex]?.userName}
              role={data[CCPIndex]?.userRole}
              createdAt={data[CCPIndex]?.createdAt}
              caption={data[CCPIndex]?.caption}
              comments={data[CCPIndex]?.comments}
              taggedUsers={data[CCPIndex]?.taggedUsers}
              likes={data[CCPIndex]?.likes}
              saves={data[CCPIndex]?.saves}
              shares={data[CCPIndex]?.shares}
              content={data[CCPIndex]?.content}
              onCommentClick={onCommentClick}
              navigation={navigation}
              taggedUsers={data[CCPIndex]?.taggedUsers}
              // postIndex={index}
              postId={data[CCPIndex]?._id}
              id={data[CCPIndex]?.userId}
            />
          )}
          <View style={styles.CommentInputContainer}>
            <Image
              style={{
                ...styles.CommentInputImage,
                width: 30,
                height: 30,
                alignSelf: "center",
                borderRadius: 15,
                marginRight: 15,
              }}
              source={require("../assets/ellipse174b251b3.png")}
            />
            <TextInput
              editable
              multiline
              style={styles.CommentTextInput}
              onChangeText={text => setCommentText(text)}
              placeholder="Leave your thoughts here..."
              value={commentText}
            />
            <TouchableOpacity
              onPress={() => {
                handleComment();
              }}
            >
              <MaterialIcons
                name="check"
                style={{ ...styles.Icons, marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {commentLoading ? (
            <Loader />
          ) : (
            comments.map((item, i) => {
              return (
                <Comment
                  key={i}
                  id={item._id}
                  name={item.userName}
                  comment={item.comment}
                  role={item.userRole}
                  time={item.createdAt}
                  likes={item.likes}
                  userId={item.userId}
                  onRefresh={onRefresh}
                  setModalOpen={setModalOpen}
                />
              );
            })
          )}
        </ScrollView>
      </Modal>
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
  CommentInputContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
  },
  CommentTextInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 5,
    flex: 1,
  },
  contactimg: {
    margin: 5,
    height: 55,
    width: 56,
  },
  dot: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    height: 10,
    width: 10,
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
