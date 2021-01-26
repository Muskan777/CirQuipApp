import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
export default function CreatePostCamera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [source, setSource] = useState("");
  const cam = useRef();
  const _takePicture = async () => {
    const option = {
      quality: 0.8,
      base64: true,
      skipProcessing: false,
    };
    if (cam.current) {
      const photo = await cam.current.takePictureAsync(option);
      console.log(photo);
      // console.log(cam.current.getSupportedRatiosAsync());
      // console.log(photo.uri, source);
      if (photo.base64) {
        setSource(photo);
      }
      // cam.current.resumePreview();
      // console.log("picture source", photo.uri);
    }
  };
  const handleSave = async source => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status === "granted") {
    //   const asset = await MediaLibrary.createAssetAsync(source.uri);
    //   MediaLibrary.createAlbumAsync("Cirquip", asset);
    // } else {
    //   Alert.alert("Access to Gallery Permission is required");
    // }
    props.navigation.navigate("CreatePost", { images: [source.base64] });
    setSource(null);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {source ? (
        <View style={styles.camera}>
          <Image
            flex={1}
            source={{
              uri: `data:image/jpg;base64,${source.base64}`,
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.FlipButton}
              onPress={() => {
                setSource(null);
              }}
            >
              <Feather name="x-square" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CaptureButton}
              onPress={() => {
                // Alert.alert("saved to gallery");
                handleSave(source);
              }}
            >
              <MaterialIcons name="done" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera ref={cam} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.FlipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialIcons name="flip-camera-ios" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CaptureButton}
              onPress={() => {
                _takePicture();
              }}
            >
              <Entypo name="circle" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    // flex: 1,
    minWidth: "100%",
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    justifyContent: "center",
    paddingVertical: 10,
  },
  FlipButton: {
    flex: 0.3,
    // paddingLeft: 100,
    // alignItems: "flex-start",
  },
  CaptureButton: {
    flex: 0.5,

    // alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
