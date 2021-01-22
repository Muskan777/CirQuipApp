import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
export default function CreatePostCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cam = useRef();
  const _takePicture = async () => {
    const option = {
      quality: 0.8,
      base64: true,
      skipProcessing: false,
    };
    if (cam.current) {
      let photo = await cam.current.takePictureAsync(option);
      console.log(cam.current.getSupportedRatiosAsync());
      const source = photo.uri;
      if (source) {
        // cam.current.resumePreview();
        console.log("picture source", source);
      }
    }
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
