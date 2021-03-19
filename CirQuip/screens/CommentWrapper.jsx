import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import PostsCarousel from "../components/PostsCarousel";
import Comment from "../components/Comment";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CommentWrapper(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [userImage, setUserImage] = useState("");
  const scroll = React.useRef();
  const navigation = useNavigation();

  useEffect(() => {
    handleProfileImage();
    axios
      .get(`${global.config.host}/post/getPostWithComment/${props.uid}`)
      .then(res => {
        setData(res.data.post);
        setComments([res.data.comment]);
        setLoading(false);
        setCommentLoading(false);
      })
      .catch(e => console.log(e));
  }, []);
  const onCommentClick = (index, postId) => {
    scroll.current.scrollTo(0);
  };
  const handleProfileImage = async () => {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      axios
        .get(`${global.config.host}/user/getUserWithId/${user}`)
        .then(res => {
          if (res.data.profileImage) setUserImage(res.data.profileImage);
        })
        .catch(err => {
          Alert.alert("Error", "Something Went Wrong");
          console.log(err);
        });
    }
  };

  const handleComment = async () => {
    setCommentLoading(true);
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/comment/createComment`,
        {
          postId: data?._id,
          comment: commentText,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        setCommentText(null);
        Alert.alert("CirQuip", "New Comment Created");
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
        setCommentLoading(false);
      });
  };
  return (
    <>
      <ScrollView ref={scroll}>
        {isLoading ? (
          <Loader />
        ) : (
          <PostsCarousel
            name={data?.userName}
            role={data?.userRole}
            createdAt={data?.createdAt}
            caption={data?.caption}
            comments={data?.comments}
            taggedUsers={data?.taggedUsers}
            likes={data?.likes}
            saves={data?.saves}
            shares={data?.shares}
            content={data?.content}
            onCommentClick={onCommentClick}
            navigation={props.navigation}
            taggedUsers={data?.taggedUsers}
            // postIndex={index}
            postId={data?._id}
            id={data?.userId}
          />
        )}
        <View style={styles.CommentInputContainer}>
          {userImage ? (
            <Image
              style={{
                ...styles.CommentInputImage,
                width: 30,
                height: 30,
                alignSelf: "center",
                borderRadius: 15,
                marginRight: 15,
              }}
              source={{
                uri: userImage,
              }}
            />
          ) : (
            <Image
              style={{
                ...styles.CommentInputImage,
                width: 30,
                height: 30,
                alignSelf: "center",
                borderRadius: 15,
                marginRight: 15,
              }}
              source={require("../assets/profile.png")}
            />
          )}
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
          <View key={comments}>
            {comments.map((item, i) => {
              return (
                <Comment
                  key={i}
                  id={item._id}
                  name={item.userName}
                  comment={item.comment}
                  role={item.userRole}
                  time={item.createdAt}
                  likes={item.likes}
                  setCommentText={setCommentText}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  post: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eee",
  },
  searchCard: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  searchImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
  SearchContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    maxHeight: 70,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
});
