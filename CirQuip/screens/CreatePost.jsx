import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
} from "react-native";
// import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import { IconButton, Button, Dialog, Portal } from "react-native-paper";
import { CheckBox } from "native-base";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

export default function CreatePost(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [postHasImage, setPostHasImage] = useState(false);
  const [postText, setPostText] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [requiredusers, setRequiredUsers] = useState([]);
  const [videoSource, setVideoSource] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [taggedList, setTaggedList] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [checkedA, setCheckedA] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);
  const [checkedC, setCheckedC] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [College, setCollege] = React.useState("");
  const [Skill, setSkill] = React.useState("");
  const [Club, setClubs] = React.useState("");
  const [Interest, setInterest] = React.useState("");

  const handleDialog = () => setVisible(!visible);

  useEffect(() => {
    const user = async () => {
      let user = await AsyncStorage.getItem("user");
      if (user) {
        axios
          .get(`${global.config.host}/user/getUserWithId/${user}`)
          .then(res => {
            setUser(res.data.name);
            setCollege(res.data.college);
            res.data.skills && setSkill(res.data.skills[0]);
            res.data.Interest && setInterest(res.data.Interest[0]);
            res.data.clubs && setClubs(res.data.clubs[0]);
          })
          .catch(err => {
            Alert.alert("Error", "Something Went Wrong");
            console.log(err);
          });
      }
    };
    user();
    axios
      .get(`${global.config.host}/user/getUsers`)
      .then(res => {
        setUsers(res.data.users);
        setRequiredUsers(res.data.users);
      })
      .catch(e => console.log(e));
  }, []);

  const handleSubmit = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    // console.log(videoSource);
    let content;
    if (photos && photos.length !== 0) {
      content = photos;
    } else {
      content = videoSource?.base64;
    }
    let group = [];
    if (checkedA) {
      group.push("Alumni");
    }
    if (checkedB) {
      group.push("Faculty");
    }
    if (checkedC) {
      group.push("Student");
    }
    axios
      .post(
        `${global.config.host}/post/createPost`,
        {
          content: content,
          caption: postText,
          taggedUsers: taggedList,
          group: group,
          userCollege: College,
          userSkill: Skill,
          userInterest: Interest,
          userClub: Club,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(() => {
        Toast.show("New Post Created", Toast.SHORT, ["UIAlertController"]);
        setPhotos(null);
        setPostHasImage(false);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
    setVisible(false);

    props.navigation.goBack();
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() => {
            props.navigation.goBack();
            setPhotos(null);
            setPostHasImage(false);
            setVideoSource(null);
          }}
        />
      ),
    });
  });

  useEffect(() => {
    const { params } = props.route;
    // console.log(props.route);
    if (params) {
      const { images } = params;
      if (images) setPhotos(images);
    }
    return () => {
      // console.log(params);
      if (params) params.images = null;
    };
  });
  function renderImage(item, i) {
    let imageHeight = Math.round((dimensions.width * 6) / 16);
    let imageWidth = imageHeight;
    // console.log(item.length);
    return (
      <Image
        style={{
          height: imageHeight,
          width: imageWidth,
          borderWidth: 5,
          borderColor: "#000",
        }}
        source={{
          uri: `data:image/jpg;base64,${item}`,
        }}
        key={i}
      />
    );
  }
  async function pickDocument() {
    const doc = await DocumentPicker.getDocumentAsync({ type: "video/*" });
    if (doc.type === "success") {
      console.log(doc.size);
      if (doc.size < 10000000) {
        // 10mb limit
        const docBase64 = await FileSystem.readAsStringAsync(doc.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        doc["base64"] = docBase64;
        setVideoSource(doc);
      } else {
        Alert.alert("Video size too large");
      }
      // console.log("loged", videoSource["base64"]);
    } else {
      Alert.alert("Something went wrong in Picking Video");
    }
  }
  const searchFunction = () => {
    // console.log(searchQuery);
    if (searchQuery == "") {
      setRequiredUsers(users);
    }
    // console.log(users[0]);
    setRequiredUsers(
      users?.filter(user => {
        return (
          user.name.includes(searchQuery) || user.role.includes(searchQuery)
        );
      })
    );
  };
  useEffect(searchFunction, [searchQuery]);
  const removeTags = indexToRemove => {
    setTaggedList([
      ...taggedList.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const dimensions = Dimensions.get("window");

  return (
    // <View>
    <SafeAreaView
      style={
        visible
          ? {
              backgroundColor: "#bbb",
              ...styles.mainContent,
              paddingTop: Platform.OS === "android" ? 25 : 0,
            }
          : {
              backgroundColor: "#fff",
              ...styles.mainContent,
              paddingTop: Platform.OS === "android" ? 25 : 0,
            }
      }
    >
      <View style={styles.topContainer}>
        <MaterialIcons
          name="close"
          style={{ ...styles.Icons, marginTop: 20 }}
          size={24}
          onPress={() => {
            props.navigation.goBack();
            setPostText(null);
            setPostHasImage(false);
            setPhotos(null);
            setVideoSource(null);
          }}
        />
        <FontAwesome
          name="send"
          style={{ ...styles.Icons, marginTop: 20 }}
          size={24}
          onPress={() => {
            // handleSubmit();
            handleDialog();
          }}
        />
      </View>
      <KeyboardAvoidingView style={styles.PostArea}>
        <View style={styles.ProfilePicAndCaption}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ ...styles.PostAreaImage }}
              source={require("../assets/ellipse174b251b3.png")}
            />
            <ScrollView
              style={{
                marginHorizontal: 10,
                maxWidth: "84%",

                display: "flex",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{user}</Text>
              <Text
                onPress={() => setModalOpen(true)}
                style={{ fontWeight: "bold" }}
              >
                {taggedList.length != 0 && <Text>with </Text>}
                {taggedList.length != 0 && (
                  <Text style={{ color: "#2EA5DD" }}>
                    {taggedList[0]?.name}, and {taggedList?.length - 1} others
                  </Text>
                )}
              </Text>
            </ScrollView>
          </View>
          <View style={{ alignItems: "flex-start", flex: 1 }}>
            <TextInput
              style={{
                ...styles.PrimaryTextInput,
              }}
              editable
              multiline
              onChangeText={text => setPostText(text)}
              placeholder=" What do you want to CirQuip ?"
              value={postText}
            />
          </View>
        </View>
        <View style={styles.MediaArea}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {videoSource && (
              <View>
                <Video
                  source={{
                    uri: videoSource.uri,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay={false}
                  // isLooping
                  style={{
                    ...styles.video,
                    width: (dimensions.width * 8) / 10,
                    height: (dimensions.width * 8) / 10,
                    display: "flex",
                    alignSelf: "center",
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              // justifyContent: "flex-start",
              alignItems: "center",
              margin: 10,
            }}
          >
            {photos?.map((item, i) => renderImage(item, i))}
          </View>
        </View>
        <View>
          <Modal animationType="slide" transparent={true} visible={visible}>
            <View
              style={{
                height: "50%",
                marginTop: "auto",
                backgroundColor: "white",
                borderTopLeftRadius: 80,
                borderTopRightRadius: 80,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // marginTop: 30,
                  padding: 20,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    marginVertical: 20,
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  Send post to
                </Text>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    checked={checkedA}
                    color={checkedA ? "#4FB5A5" : "gray"}
                    onPress={() => setCheckedA(!checkedA)}
                  />
                  <Text
                    style={{
                      ...styles.checkBoxTxt,
                      color: checkedA ? "#4FB5A5" : "gray",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Alumni
                  </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    checked={checkedB}
                    color={checkedB ? "#4FB5A5" : "gray"}
                    onPress={() => setCheckedB(!checkedB)}
                  />
                  <Text
                    style={{
                      ...styles.checkBoxTxt,
                      color: checkedB ? "#4FB5A5" : "gray",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Faculty
                  </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    checked={checkedC}
                    color={checkedC ? "#4FB5A5" : "gray"}
                    onPress={() => setCheckedC(!checkedC)}
                  />
                  <Text
                    style={{
                      ...styles.checkBoxTxt,
                      color: checkedC ? "#4FB5A5" : "gray",
                      fontWeight: "bold",
                      flex: 1,
                      fontSize: 15,
                    }}
                  >
                    Students
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Button onPress={handleDialog} color="gray" fontSize="15">
                    Back
                  </Button>
                  <Button onPress={handleSubmit} color="#4FB5A5" fontSize="15">
                    Send
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setVideoSource(null);
              setPostHasImage(true);
              props.navigation.navigate({
                name: "Camera",
                params: { from: "CreatePost" },
              });
            }}
          >
            <Entypo
              name="camera" //function to upload images to be added here
              style={{ ...styles.Icons, marginHorizontal: 5 }}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVideoSource(null);
              setPostHasImage(true);

              props.navigation.navigate("CreatePostImageBrowser");
            }}
          >
            <Entypo
              name="image-inverted"
              style={{ ...styles.Icons, marginHorizontal: 5 }}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickDocument();
            }}
            disabled={postHasImage}
          >
            <FontAwesome
              name="video-camera"
              style={
                postHasImage
                  ? { ...styles.IconsDisabled, marginHorizontal: 5 }
                  : { ...styles.Icons, marginHorizontal: 5 }
              }
              size={24}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <AntDesign
            name="pluscircle"
            style={{ ...styles.Icons, marginHorizontal: 5 }}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.tagSearchContainer}>
          <MaterialIcons
            name="close"
            style={{ ...styles.Icons, marginTop: 20 }}
            size={28}
            onPress={() => {
              setModalOpen(false);
              setTaggedList([]);
            }}
          />
          <TextInput
            style={{ flex: 1, margin: 5, fontSize: 20, maxHeight: "100%" }}
            // onSubmitEditing={() => performSearch()}
            placeholder="Search"
            onChangeText={query => {
              // console.log(users);
              setSearchQuery(query);
            }}
            value={searchQuery}
          />

          <TouchableOpacity
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <MaterialIcons
              name="check"
              style={{ ...styles.Icons, marginTop: 20 }}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.tagContainer}>
          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              padding: 2,
              // borderWidth: 1,
            }}
          >
            {taggedList.map((user, index) => {
              return (
                <View key={index} style={styles.tag}>
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    {user.name}
                  </Text>
                  <MaterialIcons
                    name="close"
                    color="black"
                    size={20}
                    style={{ paddingLeft: 6 }}
                    onPress={() => removeTags(index)}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={{ flex: 0.8 }}>
          <FlatList
            data={requiredusers}
            keyExtractor={item => item._id}
            renderItem={user => (
              <TouchableOpacity
                onPress={() => {
                  // console.log(taggedList);
                  const found = taggedList.findIndex(
                    element =>
                      element._id === user.item._id &&
                      element.name === user.item.name
                  );
                  if (found !== -1) {
                    removeTags(found);
                  } else {
                    setTaggedList(previous => [
                      ...previous,
                      { _id: user.item._id, name: user.item.name },
                    ]);
                    // console.log(user.item._id);
                  }
                }}
              >
                <View style={{ ...styles.tagCard }}>
                  <Image
                    style={styles.tagImage}
                    source={require("../assets/ellipse174b251b3.png")}
                  />
                  <Text style={{ fontSize: 18 }}>{`${user.item.name}  |`}</Text>
                  <Text style={{ marginLeft: 8, fontSize: 12 }}>
                    {user.item.role}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    display: "flex",
    // flexDirection: "row",
    // alignItems: "flex-start",
    flexWrap: "wrap",
    width: "95%",
    maxHeight: "10%",
    minHeight: 0,
    alignSelf: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
  },
  checkBoxTxt: {
    marginLeft: 20,
    width: "100%",
  },
  dialog: {
    backgroundColor: "#f5f5f5",
  },
  checkBoxContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  tag: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    marginHorizontal: 5,
    marginVertical: 3,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: "#2EA5DD",
    color: "white",
  },
  tagImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  tagCard: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  tagSearchContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    maxHeight: 70,
    justifyContent: "space-between",
  },
  PostAreaImage: {
    width: 35,
    height: 35,
  },
  Icons: {
    fontSize: 30,
    color: "#2EA5DD",
    marginBottom: 10,
  },
  IconsDisabled: {
    fontSize: 30,
    color: "#aaa",
    marginBottom: 10,
  },
  PostArea: {
    display: "flex",
    flex: 1,
  },
  PrimaryTextInput: {
    fontSize: 18,
    width: "100%",
    color: "#000",
    flex: 1,
    textAlignVertical: "top",
    padding: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  ProfilePicAndCaption: {
    flex: 0.25,
    display: "flex",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  MediaArea: {
    flex: 0.75,
    marginHorizontal: 15,
    display: "flex",
  },
  video: {
    padding: 10,
    alignItems: "center",
    // maxHeight: 40,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#2EA5DD",
    elevation: 3,
    borderWidth: 5,
    borderColor: "#000",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    maxHeight: 70,
    justifyContent: "space-between",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#2EA5DD",
    elevation: 3,
  },
  bottomContainer: {
    display: "flex",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    maxHeight: 60,
    justifyContent: "space-between",
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
});
