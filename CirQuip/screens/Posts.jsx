import React, { useEffect, useState, useRef } from "react";
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
import Toast from "react-native-simple-toast";

import axios from "axios";
import PostsCarousel from "../components/PostsCarousel";
import Comment from "../components/Comment";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
export default function Posts(props) {
  const { navigation, route } = props;
  const routeState = useRoute();
  const [data, setData] = useState([]);
  let savedData = [];
  let postData = [];
  const [verified, setVerified] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [CCPIndex, setCCPIndex] = useState(null);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [originaldata, setoriginaldata] = useState([]);
  const [userImage, setUserImage] = useState("");

  // React.useEffect(() => {
  //   navigation?.setOptions({
  //     headerRight: () => (
  //       <View style={{ flexDirection: "row" }}>
  //         <IconButton
  //           icon="magnify"
  //           color="#000"
  //           size={30}
  //           onPress={() => {
  //             setSearchModalOpen(true);
  //           }}
  //         />
  //         <IconButton
  //           icon="logout"
  //           color="#000"
  //           size={30}
  //           onPress={() => {
  //             handleLogout();
  //             route.params.handleStatus(false);
  //           }}
  //         />
  //       </View>
  //     ),
  //   });
  // }, [navigation]);

  useEffect(() => {
    setVerified(route.params.verified);
    console.log("in url", props);
    fetchData();
  }, []);

  const onRefresh = refresh => {
    if (refresh) {
      setIsRefreshing(true);
      fetchData();
    }
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

  const fetchData = async () => {
    console.log("fetchdata", props.from);
    handleProfileImage();
    if (props?.route?.name === "SavedPosts") {
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
              setoriginaldata(savedData);
              setLoading(false);
              setIsRefreshing(false);
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    } else {
      console.log("id", props?.uid);
      let url =
        props?.from === "notification" || props?.from === "links"
          ? `${global.config.host}/post/getPostWithId/${props?.uid}`
          : `${global.config.host}/post/getPosts`;

      let email = await AsyncStorage.getItem("email");
      setEmail(email);
      await AsyncStorage.getItem("cirquip-auth-token")
        .then(async token => {
          await axios
            .get(url, {
              headers: {
                "cirquip-auth-token": token,
              },
            })
            .then(async res => {
              res.data.post = res.data.post.reverse();
              if (props?.from === "notification" || props?.from === "links") {
                console.log("data received", res.data.post);
                setData(res.data.post);
                setoriginaldata(res.data.post);
                setLoading(false);
                setIsRefreshing(false);
              } else {
                let user = await AsyncStorage.getItem("user");

                if (user) {
                  axios
                    .get(`${global.config.host}/user/getUserWithId/${user}`)
                    .then(response => {
                      let College = response.data.college;
                      let data = res.data.post.filter(post => {
                        return post?.userCollege === College;
                      });
                      if (props.route.params && props.route.params.type) {
                        data = data.filter(post => {
                          return response.data._id === post.userId;
                        });
                      }
                      setData(data);
                      setoriginaldata(data);
                      setLoading(false);
                      setIsRefreshing(false);
                    })
                    .catch(e => console.log(e));
                }
              }
            })
            .catch(err => {
              Alert.alert("Error", "Something Went Wrong");
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
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
        Toast.show("New Comment Created", Toast.SHORT, ["UIAlertController"]);
        setCommentText(null);
        setComments([...comments, res.data.comment]);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
  };
  const searchFunction = () => {
    let posts = originaldata;
    if (searchQuery == "") {
      setData(posts);
    }
    setData(
      posts?.filter(userpost => {
        return (
          userpost.userName.includes(searchQuery) ||
          userpost.userRole.includes(searchQuery) ||
          (userpost.userAdmissionYear &&
            userpost.userAdmissionYear.includes(searchQuery)) ||
          (userpost.userBranch && userpost.userBranch.includes(searchQuery))
        );
      })
    );
  };
  useEffect(searchFunction, [searchQuery]);

  return (
    <SafeAreaView style={styles.post}>
      {props?.from === "notification" || props?.from === "links" ? (
        <></>
      ) : (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <IconButton
              icon="menu"
              onPress={() => {
                navigation.openDrawer();
              }}
              color="#2ba4db"
              size={30}
            />
            <TextInput
              style={{
                flex: 1,
                margin: 5,
                fontSize: 20,
                maxHeight: "100%",
              }}
              placeholder="Search"
              onChangeText={query => {
                setSearchQuery(query);
              }}
              value={searchQuery}
            />
          </View>
        </View>
      )}

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
              skill={item.userSkill}
              club={item.userClub}
              interest={item.userInterest}
              onRefresh={onRefresh}
              userEmail={email}
            />
          )}
          keyExtractor={item => item._id}
          onRefresh={() => onRefresh(true)}
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
              setCommentText(null);
              setComments([]);
              onRefresh(true);
              setModalOpen(false);
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
      <View style={styles.bottom}>
        <View style={styles.container1}>
          <MaterialIcons
            name="shopping-cart"
            style={{ ...styles.cart }}
            onPress={() => {
              navigation.navigate("Shop");
            }}
          />
        </View>
        <View style={styles.container2}>
          <AntDesign
            name="plus"
            style={{ ...styles.create }}
            onPress={() => {
              if (verified) {
                navigation.navigate("CreatePost");
              } else {
                Toast.show(
                  "Please verify your email ID to CirQuip!",
                  Toast.SHORT,
                  ["UIAlertController"]
                );
              }
            }}
          />
        </View>
        <View style={styles.container3}>
          {global.config.admin.includes(email) ? (
            <Ionicons
              name="md-chatbubble-ellipses"
              style={{ ...styles.chat }}
              onPress={() => {
                navigation.navigate("ChatUser", {
                  screen: "Chat With User",
                  params: {
                    email: email,
                  },
                });
              }}
            />
          ) : (
            <Ionicons
              name="md-chatbubble-ellipses"
              style={{ ...styles.chat }}
              onPress={() => {
                navigation.navigate("ChatAdmin", {
                  screen: "Chat with Admin",
                  params: {
                    email: email,
                  },
                });
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? 25 : 0,
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
    color: "#2ba4db",
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
  bottom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cart: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 5,
    color: "#2ba4db",
  },
  chat: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 2,
    marginLeft: 2,
    color: "#2ba4db",
  },
  create: {
    alignSelf: "center",
    fontSize: 60,
    marginTop: 5,
    color: "#2ba4db",
  },

  container1: {
    width: 60,
    height: 60,
    padding: 10,
    margin: 10,
    // borderRadius:40,
    position: "absolute",
    left: 20,
    bottom: 5,
    borderRadius: 35,
    backgroundColor: "white",
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
  container2: {
    height: 70,
    width: 70,
    borderRadius: 45,
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    bottom: 55,
    paddingBottom: 40,
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
  container3: {
    width: 60,
    height: 60,
    padding: 10,
    margin: 10,
    // borderRadius:40,
    position: "absolute",
    right: 20,
    bottom: 5,
    borderRadius: 35,
    backgroundColor: "white",
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
  searchBar: {
    height: 55,
    width: "95%",
    borderWidth: 0,
    marginTop: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#2EA5DD",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 80,
    },
    shadowRadius: 6,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "transparent",
  },
  searchContainer: {
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
  },
});
