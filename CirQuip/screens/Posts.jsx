import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import axios from "axios";
import PostsCarousel from "../components/PostsCarousel";
import Comment from "../components/Comment";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
export default function Posts({ navigation }) {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [CCPIndex, setCCPIndex] = useState(null);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  const fetchData = async () => {
    await AsyncStorage.getItem("cirquip-auth-token")
      .then(async token => {
        await axios
          .get(`${global.config.host}/post/getPosts`, {
            headers: {
              "cirquip-auth-token": token,
            },
          })
          .then(res => {
            setData(res.data.post);
            setLoading(false);
          })
          .catch(e => console.log(e));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onCommentClick = (index, postId) => {
    axios
      .post(`${global.config.host}/post/getComments`, { id: postId })
      .then(res => {
        setComments(res.data.comments);
        setCommentLoading(false);
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
        Alert.alert("CirQuip", "New Comment Created");
        setCommentText(null);
        setComments([...comments, res.data.comment]);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
  };

  return (
    <SafeAreaView style={styles.post}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <PostsCarousel
              name={item.userName}
              role={item.userRole}
              createdAt={item.createdAt}
              caption={item.caption}
              comments={item.comments}
              taggedUsers={item.taggedUsers}
              likes={item.likes}
              saves={item.saves}
              shares={item.shares}
              content={item.content}
              onCommentClick={onCommentClick}
              navigation={navigation}
              postId={item._id}
              taggedUsers={item.taggedUsers}
              postIndex={index}
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
  post: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eee",
  },
  Icons: {
    fontSize: 30,
    color: "#4FB5A5",
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    minHeight: 70,
    justifyContent: "space-between",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#4FB5A5",
    elevation: 3,
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
});
