import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";

export default function SignUp1() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/asset2.png")}
        ></Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get('window').height,
    // flexDirection: "column",
    marginTop: "20%",
  },
  logo: {
    height: 150,
    width: 200,
    resizeMode: "cover",
  },
});
