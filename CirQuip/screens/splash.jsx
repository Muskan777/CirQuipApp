import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";

const height = Dimensions.get("screen").height;
import screen from "../assets/splash1.png";
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={screen}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
});
