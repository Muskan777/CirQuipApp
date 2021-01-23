import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
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
export default function Home({ navigation }) {
  const [margin, setMargin] = useState(0);

  let [data, setData] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setMargin(getStatusBarHeight());
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>
          One Stop Solution for all college needs
        </Title>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({ name: "Shop", params: { type: "all" } });
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              icon="cart"
              mode="contained"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Shop Products
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Posts");
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              mode="contained"
              icon="eye"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                View Posts
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePost");
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              mode="contained"
              icon="pen"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Create a Post
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChatWithAdmin");
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              mode="contained"
              icon="pen"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Chat With Admin
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sell");
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              icon="cart"
              mode="contained"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Sell Products
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({ name: "Shop", params: { type: "liked" } });
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              icon="heart"
              mode="contained"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Liked Products
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({ name: "Shop", params: { type: "my" } });
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              icon="account"
              mode="contained"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                My Products
              </Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({
                name: "Shop",
                params: { title: "Buy Requests", type: "requests" },
              });
            }}
          >
            <Button
              style={{ ...styles.shopButton }}
              icon="account"
              mode="contained"
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Buy Requests
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
