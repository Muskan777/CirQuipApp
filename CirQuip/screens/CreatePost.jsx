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
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
export default function CreatePost({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = React.useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  });
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setModalOpen(true);
        }}
        title="New Post"
      />

      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
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
              onPress={() => setModalOpen(false)}
            />
          </View>
          <View style={styles.PostArea}>
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
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="camera"
                style={{ ...styles.Icons, marginHorizontal: 5 }}
                size={24}
              />
              <Entypo
                name="image-inverted"
                style={{ ...styles.Icons, marginHorizontal: 5 }}
                size={24}
              />
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
        </View>
      </Modal>
    </View>
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
  PostArea: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
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
  modalContent: {
    flex: 1,
    flexDirection: "column",
  },
});
