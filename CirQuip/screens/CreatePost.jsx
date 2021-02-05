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
import {
  IconButton,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Searchbar,
} from "react-native-paper";
import { CheckBox } from "native-base";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
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

  const handleDialog = () => setVisible(!visible);

  useEffect(() => {
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
          content: photos[0],
          caption: postText,
          group: group,
        },
        {
          headers: {
            "cirquip-auth-token": token,
          },
        }
      )
      .then(() => {
        Alert.alert("CirQuip", "New Post Created");
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  });
  useEffect(() => {
    const { params } = props.route;
    if (params) {
      const { images } = params;
      if (images) setPhotos(images);
    }
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
      const docBase64 = await FileSystem.readAsStringAsync(doc.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc["base64"] = docBase64;
      setVideoSource(doc);
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
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.topContainer}>
        <MaterialIcons
          name="close"
          style={{ ...styles.Icons, marginTop: 20 }}
          size={24}
          onPress={() => {
            props.navigation.goBack();
            setPostText(null);
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
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Kartik Mandhan
              </Text>
              <Text
                onPress={() => setModalOpen(true)}
                style={{ fontWeight: "bold" }}
              >
                {taggedList.length != 0 && <Text>with </Text>}
                {taggedList.length != 0 && (
                  <Text style={{ color: "#4FB5A5" }}>
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
                  // shouldPlay
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
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={handleDialog}
              style={styles.dialog}
            >
              <Dialog.Title
                style={{
                  ...styles.checkBoxTxt,
                  color: "#4FB5A5",
                  fontWeight: "bold",
                }}
              >
                Send post to
              </Dialog.Title>
              <Dialog.Content>
                <View style={styles.item}>
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
                <View style={styles.item}>
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
                <View style={styles.item}>
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
                      fontSize: 15,
                    }}
                  >
                    Students
                  </Text>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleDialog} color="gray" fontSize="15">
                  Back
                </Button>
                <Button onPress={handleSubmit} color="#4FB5A5" fontSize="15">
                  Send
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
  },
  dialog: {
    backgroundColor: "#f5f5f5",
  },
  item: {
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
    backgroundColor: "#4FB5A5",
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
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  Icons: {
    fontSize: 30,
    color: "#4FB5A5",
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
    shadowColor: "#4FB5A5",
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
