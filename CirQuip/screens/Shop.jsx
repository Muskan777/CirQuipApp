import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Appbar,
  Title,
  Surface,
  Button,
  Card,
  Paragraph,
} from "react-native-paper";

const { width, height } = Dimensions.get("window");
// #25f183
export default function Shop({ navigation }) {
  let [data, setData] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setMargin(getStatusBarHeight());
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        One Stop Solution for all college needs
      </Title>
      <View style={{ display: "flex", flexDirection: "column" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Shop");
          }}
        >
          <Button style={{ ...styles.shopButton }} icon="cart" mode="contained">
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Shop Products
            </Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: width / 30,
  },
  container: {
    flex: 1,
  },
  shopButton: {
    backgroundColor: "#333",
    margin: 20,
    padding: 10,
    textAlign: "center",
  },
});

//<Appbar style={{ height: margin + 40 }}>
//<Appbar.Content
//style={{ marginTop: margin }}
//title="CirQuip"
//subtitle=""
///>
//</Appbar>
