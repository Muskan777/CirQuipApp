import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import axios from "axios";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Loader from "./Loader";
import { MaterialIcons } from "@expo/vector-icons";
export default function Posts({ navigation }) {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [CCPIndex, setCCPIndex] = useState(null);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);

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
  const onCommentClick = index => {
    setModalOpen(true);
    setCCPIndex(index);
  };
  const handleComment = (name, role) => {
    if (commentText) {
      setComments(prev => {
        return [
          {
            name: name,
            role: role,
            time: new Date().toDateString(),
            comment: commentText,
          },
          ...prev,
        ];
      });
      setCommentText(null);
      // console.log(comments);
      // comments array will contain the freshly added comments
      // prepend them in database array
      // write sending comment to database logic here
    }
  };

  if (data.length === 0) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.post}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Post
            name={item.userName}
            role={item.userRole}
            createdAt={item.createdAt}
            caption={item.caption}
            comments={item.comments}
            likes={item.likes}
            saves={item.saves}
            content={item.content}
            onCommentClick={onCommentClick}
            navigation={navigation}
            postId={item._id}
            postIndex={index}
            id={item.userId}
          />
        )}
        keyExtractor={item => item._id}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
      />
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
          <Post
            name={data[CCPIndex]?.userName}
            role={data[CCPIndex]?.userRole}
            createdAt={data[CCPIndex]?.createdAt}
            caption={data[CCPIndex]?.caption}
            comments={data[CCPIndex]?.comments}
            likes={data[CCPIndex]?.likes}
            saves={data[CCPIndex]?.saves}
            content={data[CCPIndex]?.content}
            onCommentClick={onCommentClick}
            navigation={navigation}
            // postIndex={index}
            postId={data[CCPIndex]?._id}
            id={data[CCPIndex]?.userId}
          />
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
                handleComment(
                  data[CCPIndex]?.userName,
                  data[CCPIndex]?.userRole
                );
                console.log("pressed");
              }}
            >
              <MaterialIcons
                name="check"
                style={{ ...styles.Icons, marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          {comments.map((item, i) => {
            return (
              <Comment
                key={i}
                name={item.name}
                comment={item.comment}
                role={item.role}
                time={item.time}
              />
            );
          })}
          <Comment
            name="Kartik Mandhan"
            comment="Insightfull"
            role="Frontend Developer"
            time="1d"
          />
          <Comment
            name="Vasu Sharma"
            comment="jI6IkpXVCJ9.eyJpZCI6IjYwMWFjYzhkMWMxN2MzMWU1N2U2NjllNyIsIm5hbWUiOiJLYXJ0aWsgTWFuZGhhbiIsInJvbGUiOiJTdHVkZW50IiwiZW1haWwiOiJrYXJ0aWttYW5kaGFuMTRAZ21haWwuY29tIiwicGhvbmUiOiI5MDc1MzE0MTI0IiwibGlrZWRQb3N0cyI6W10sInNhdmVkUG9zdHMiOltdLCJpYXQiOjE2MTIzNjkxMDUsImV4cCI6MTY0MzkwNTEwNX0.ZercRzeG7OwpELPOl7IBll9_n7h3jb5xlBegm6azGYU
          data 601acc8d1c17c31e57e669e7"
            role="Software Developer"
            time="1d"
          />
          <Comment
            name="Muskan Paryani"
            comment="]7c31e57e669e7"
            role="Software Developer"
            time="1d"
          />
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
