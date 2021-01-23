import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Button,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { ImageBrowser } from "expo-image-picker-multiple";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CreatePost(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const handleSubmit = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/post/createPost`,
        {
          content: postText, //changing postText to photos results in error
          caption: postText,
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
    // console.log(images);
    if (params) {
      const { images } = params;
      if (images) setPhotos(images);
    }
  });
  function renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item }}
        key={i}
      />
    );
  }
  return (
    // <View>
    <View style={styles.mainContent}>
      {/* <Button
        onPress={() => {
          setModalOpen(true);
        }}
        title="New Post"
      /> */}
      <View style={styles.topContainer}>
        <MaterialIcons
          name="close"
          style={{ ...styles.Icons, marginTop: 20 }}
          size={24}
          onPress={() => {
            setModalOpen(false);
            setPostText(null);
          }}
        />
        <FontAwesome
          name="send"
          style={{ ...styles.Icons, marginTop: 20 }}
          size={24}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
      <View style={styles.PostArea}>
        <View style={styles.ProfilePicAndCaption}>
          <Image
            style={styles.PostAreaImage}
            source={require("../assets/ellipse174b251b3.png")}
          />
          <TextInput
            style={{
              // borderWidth: 1,
              // borderColor: "gray",
              ...styles.PrimaryTextInput,
            }}
            editable
            multiline
            onChangeText={text => setPostText(text)}
            placeholder=" What do you want to CirQuip ?"
            value={postText}
            numberOfLines={30}
          />
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", overflow: "scroll" }}
        >
          {photos?.map((item, i) => renderImage(item, i))}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Camera");
              setModalOpen(false);
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
              props.navigation.navigate("CreatePostImageBrowser");
              setModalOpen(false);
            }}
          >
            <Entypo
              name="image-inverted"
              style={{ ...styles.Icons, marginHorizontal: 5 }}
              size={24}
            />
          </TouchableOpacity>
          <Entypo
            name="attachment"
            style={{ ...styles.Icons, marginHorizontal: 5 }}
            size={24}
          />
        </View>
        <AntDesign
          name="pluscircle"
          style={{ ...styles.Icons, marginHorizontal: 5 }}
          size={24}
        />
      </View>
      <Modal visible={modalOpen} animationType="slide"></Modal>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  PostArea: {
    display: "flex",
    flex: 1,
  },
  PrimaryTextInput: {
    fontSize: 18,
    color: "#000",
    flex: 1,
    textAlignVertical: "top",
    padding: 5,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  ProfilePicAndCaption: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "50%",
    marginHorizontal: 15,
    marginVertical: 15,
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
    // borderWidth: 1,
    // borderColor: "gray",
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    maxHeight: 60,
    justifyContent: "space-between",
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
  },
});
