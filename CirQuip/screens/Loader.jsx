import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={true} size={60} color="#2ea5dd" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
