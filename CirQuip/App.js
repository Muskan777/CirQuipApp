import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import X1 from "./components/X1";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Hello</Text>
        <X1></X1>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
