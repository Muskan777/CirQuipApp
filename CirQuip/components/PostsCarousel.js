import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Share,
  Linking,
  Alert,
} from "react-native";
import { Card } from "react-native-material-cards";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dialog, Portal, Button, Menu } from "react-native-paper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import Loader from "../screens/Loader";
import Carousel, { Pagination } from "react-native-snap-carousel"; // Version can be specified in package.json
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const SLIDER_WIDTH = (Dimensions.get("window").width * 9.2) / 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
export default function PostCarousel({
  createdAt,
  caption,
  comments,
  content,
  likes,
  saves,
  shares,
  name,
  role,
  navigation,
  postId,
  postIndex,
  onCommentClick,
  taggedUsers,
  id,
  onRefresh,
  skill,
  club,
  interest,
}) {
  const date =
    createdAt.substr(8, 2) +
    "-" +
    createdAt.substr(5, 2) +
    "-" +
    createdAt.substr(0, 4);
  var localhour = parseInt(createdAt.substr(11, 2));
  var localmin = parseInt(createdAt.substr(14, 2));
  localmin = localmin + 30;
  if (localmin >= 60) {
    localmin = localmin - 60;
    localhour = localhour + 6;
  } else {
    localhour = localhour + 5;
  }
  if (localmin >= 0 && localmin <= 9) {
    localmin = "0" + localmin;
  }
  if (localhour > 12) {
    var time = localhour + ":" + localmin + " PM";
  } else {
    var time = localhour + ":" + localmin + " AM";
  }
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentSaves, setCurrentSaves] = useState(saves);
  const [currentShares, setCurrentShares] = useState(shares);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [shared, setShared] = useState(false);
  const [URL, setURL] = useState(null);
  const [allowDelete, setAllowDelete] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  let usersTagged = [];
  taggedUsers.map(user => {
    usersTagged.push(user.name);
  });

  const handleDialog = () => {
    setVisibleMenu(false);
    setVisible(!visible);
  };
  const handleReportDialog = () => {
    setVisibleMenu(false);
    setVisibleReport(!visibleReport);
  };
  const handleMenu = () => setVisibleMenu(!visibleMenu);
  useEffect(() => {
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    let userId = await AsyncStorage.getItem("user");
    let userEmail = await AsyncStorage.getItem("email");
    const initialUrl = await Linking.getInitialURL();
    setURL(initialUrl);
    if (userId === id || userEmail === "admin@coep.ac.in") {
      setAllowDelete(true);
    }
    axios
      .get(`${global.config.host}/user/getLikedPosts`, {
        headers: {
          "cirquip-auth-token": token,
        },
      })
      .then(res => {
        let tempLiked = false;
        if (res.data.likedPosts) {
          for (var i = 0; i < res.data.likedPosts.length; i++) {
            if (res.data.likedPosts[i] === postId) {
              tempLiked = true;
              break;
            }
          }
        }
        let tempSaved = false;
        if (res.data.savedPosts) {
          for (var i = 0; i < res.data.savedPosts.length; i++) {
            if (res.data.savedPosts[i] === postId) {
              tempSaved = true;
              break;
            }
          }
        }
        let tempShared = false;
        if (res.data.sharedPosts) {
          for (var i = 0; i < res.data.sharedPosts.length; i++) {
            if (res.data.sharedPosts[i] === postId) {
              tempShared = true;
              break;
            }
          }
        }
        setLiked(tempLiked);
        setSaved(tempSaved);
        setShared(tempShared);
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
  // const handleShare = async () => {
  //   let token = await AsyncStorage.getItem("cirquip-auth-token");
  //   axios
  //     .patch(
  //       `${global.config.host}/post/sharePost`,
  //       {
  //         id: postId,
  //         shared: shared,
  //       },
  //       {
  //         headers: {
  //           "cirquip-auth-token": token,
  //         },
  //       }
  //     )
  //     .then(res => {
  //       setCurrentShares(res.data.shares);
  //       setShared(res.data.shared);
  //     })
  //     .catch(e => console.log(e));
  // };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${name}'s post! \n${caption}\n${URL}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/post/deletePost`,
        {
          id: postId,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(res => {
        onRefresh(true);
        setDeleted(true);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  function renderImage({ item }) {
    return (
      <Image
        style={styles.postImage}
        source={{ uri: `data:image/jpg;base64,${item}` }}
      ></Image>
    );
  }
  function pagination() {
    return (
      <Pagination
        dotsLength={content.length}
        activeDotIndex={activeSlide}
        containerStyle={{ marginTop: -20, paddingBottom: -20 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#4fba45",
        }}
        inactiveDotStyle={{
          backgroundColor: "#888",
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const onTextLayout = React.useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <Card style={styles.PostContainer}>
      <View style={styles.topContainer}>
        <Image
          style={styles.contactimg}
          source={require("../assets/ellipse1adfd341c.png")}
        />
        <View>
          <TouchableWithoutFeedback
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("Profile", { _id: id });
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}
            >
              {name}
              <Entypo style={styles.TextStyle} name="dot-single" color="grey" />
              <Text style={styles.TextStyle}>{role}</Text>
            </Text>
          </TouchableWithoutFeedback>
          <Text style={styles.TextStyle}>
            {skill ? skill : ""}
            {skill && club ? <Text> | </Text> : ""}
            {club ? club : ""}
          </Text>
          {usersTagged.length > 0 && (
            <Text style={{ fontWeight: "bold", width: "100%" }}>
              {usersTagged?.length != 0 && <Text>with </Text>}
              {usersTagged?.length != 0 && (
                <Text style={{ color: "#4FB5A5" }}>
                  {`${usersTagged[0]}, and ${
                    usersTagged?.length - 1
                  } others    `}
                </Text>
              )}
            </Text>
          )}
        </View>
        <View style={styles.closeIcon}>
          <Menu
            visible={visibleMenu}
            onDismiss={handleMenu}
            anchor={
              <TouchableOpacity onPress={handleMenu}>
                <FontAwesome name="ellipsis-v" style={styles.threedots} />
              </TouchableOpacity>
            }
          >
            {allowDelete ? (
              <Menu.Item onPress={handleDialog} title="Delete Post" />
            ) : (
              <Menu.Item onPress={handleReportDialog} title="Report Post" />
            )}
          </Menu>
        </View>
      </View>

      <View style={styles.postCaption}>
        <View style={styles.mainContainer}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
            style={{ lineHeight: 21 }}
          >
            {caption}
          </Text>

          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 21, marginTop: 10 }}
            >
              {textShown ? "Read less..." : "Read more..."}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.postImageContainer}>
        {content[0]?.substring(content[0].length - 3) !== "mp4" ? (
          <Carousel
            data={content}
            renderItem={renderImage}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            onSnapToItem={index => setActiveSlide(index)}
            useScrollView={false}
          />
        ) : (
          <Video
            source={{
              uri: content[0],
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            // isLooping
            usePoster
            posterStyle={{
              width: 60,
              marginLeft: Dimensions.get("window").width / 2 - 60,
              justifyContent: "center",
            }}
            posterSource={{
              uri:
                "https://cutewallpaper.org/21/loading-gif-transparent-background/My-Principal-Lifestyle.gif",
            }}
            shouldPlay={false}
            useNativeControls
            style={{
              ...styles.video,
              width: (Dimensions.get("window").width * 9) / 10,
              height: (Dimensions.get("window").width * 9) / 10,
              display: "flex",
              alignSelf: "center",
            }}
          />
        )}
        {content.length > 0 && pagination()}
      </View>
      <View style={styles.datetime}>
        <Text style={styles.TextStyle}>{time}</Text>
        <Entypo name="dot-single" size={20} color="grey" />
        <Text style={styles.TextStyle}>{date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#eee" }} />
      </View>
      <View style={styles.respnseButtons}>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={handleLikes}>
            {liked ? (
              <FontAwesome name="heart" size={30} style={styles.Icons} />
            ) : (
              <FontAwesome name="heart-o" size={30} style={styles.Icons} />
            )}
          </TouchableOpacity>
          <Text style={styles.TextStyle}>{currentLikes}</Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => onCommentClick(postIndex, postId)}>
            <MaterialCommunityIcons
              name="comment-processing"
              size={30}
              style={styles.Icons}
            />
          </TouchableOpacity>
          <Text style={styles.TextStyle}>{comments.length}</Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={handleSave}>
            {saved ? (
              <FontAwesome name="bookmark" size={30} style={styles.Icons} />
            ) : (
              <FontAwesome name="bookmark-o" size={30} style={styles.Icons} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={handleShare}>
            {shared ? (
              <FontAwesome name="share-square" size={30} style={styles.Icons} />
            ) : (
              <FontAwesome
                name="share-square-o"
                size={30}
                style={styles.Icons}
              />
            )}
          </TouchableOpacity>
          {/* <Text style={styles.TextStyle}>{currentShares}</Text> */}
        </View>
      </View>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={handleReportDialog}>
            <Dialog.Title
              style={{
                ...styles.checkBoxTxt,
                color: "#B11B1B",
                fontWeight: "bold",
              }}
            >
              Confirm deletion
            </Dialog.Title>
            {loading ? (
              <Loader />
            ) : (
              <Dialog.Content>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "gray",
                    }}
                  >
                    {!deleted
                      ? "Are you sure you want to delete this post?"
                      : "Post deleted"}
                  </Text>
                </View>
              </Dialog.Content>
            )}
            <Dialog.Actions>
              {!deleted ? (
                <Button onPress={handleDialog} color="gray" fontSize="15">
                  Back
                </Button>
              ) : (
                <Button
                  onPress={() => onRefresh(true)}
                  color="gray"
                  fontSize="15"
                >
                  Ok
                </Button>
              )}

              {!deleted ? (
                <Button onPress={handleDelete} color="#B11B1B" fontSize="15">
                  Delete
                </Button>
              ) : null}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <View>
        <Portal>
          <Dialog visible={visibleReport} onDismiss={handleReportDialog}>
            <Dialog.Title
              style={{
                ...styles.checkBoxTxt,
                color: "#B11B1B",
                fontWeight: "bold",
              }}
            >
              Report Post
            </Dialog.Title>
            <Dialog.Content>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "gray",
                  }}
                >
                  Are you sure you want to report this post?
                </Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleReportDialog} color="gray" fontSize="15">
                Back
              </Button>
              <Button
                onPress={handleReportDialog}
                color="#B11B1B"
                fontSize="15"
              >
                Report
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  PostContainer: {
    width: "98%",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    paddingTop: 15,
    backgroundColor: "white",
  },
  TextStyle: {
    color: "#888",
    fontSize: 15,
  },
  topContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  headerContainer: {
    justifyContent: "space-between",
  },
  postCaption: {
    padding: 10,
  },
  Icons: {
    fontSize: 25,
    color: "#2EA5DD",
    paddingHorizontal: 10,
  },
  closeIcon: {
    fontSize: 25,
    color: "#4FB5A5",
    paddingHorizontal: 10,
    position: "absolute",
    right: 0,
  },
  postImageContainer: {
    width: "100%",
    borderRadius: 20,
  },
  threedots: {
    fontSize: 23,
    color: "#888",
    paddingHorizontal: 10,
  },
  postImage: {
    alignSelf: "center",
    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
    borderRadius: 20,
  },
  contactimg: {
    marginHorizontal: 10,
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  datetime: {
    flexDirection: "row",
    padding: 10,
  },
  respnseButtons: {
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    justifyContent: "space-around",
  },
  IconContainer: {
    flex: 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    margin: 10,
    alignItems: "center",
    // maxHeight: 40,
  },
});
