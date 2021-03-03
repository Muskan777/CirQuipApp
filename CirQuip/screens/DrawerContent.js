import React from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Linking } from "react-native";
import screen from "../assets/cirquip.png";

export function DrawerContent(props) {
  const findEmail = async () => {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      axios
        .get(`${global.config.host}/user/getUserWithId/${user}`)
        .then(res => {
          setemail(res.data.email);
        })
        .catch(err => {
          Alert.alert("Error", "Something Went Wrong In Fetching Admin 2");
          console.log(err);
        });
    }
  };

  let [email, setemail] = React.useState(() => {
    return findEmail();
  });

  return (
    <View style={{ flex: 1 }}>
      {props.state.routeNames[props.state.index] === "MyProducts" ||
      props.state.routeNames[props.state.index] === "Shop" ||
      props.state.routeNames[props.state.index] === "ShopLiked" ||
      props.state.routeNames[props.state.index] === "BuyRequests" ? (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
                style={{ flexDirection: "row" }}
              >
                <Avatar.Image
                  source={{
                    uri: "https://reactnavigation.org/img/spiro.svg",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{props.user.name}</Title>
                  <Caption style={styles.caption}>{props.user.role}</Caption>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="podcast"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="My Products"
                onPress={() => {
                  props.navigation.navigate("MyProducts", {
                    params: { type: "my" },
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons
                    name="request-page"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Buy Requests"
                onPress={() => {
                  props.navigation.navigate("BuyRequests", {
                    params: { type: "requests" },
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <FontAwesome name="heart" size={30} style={styles.Icons} />
                )}
                label="Wishlist"
                onPress={() => {
                  props.navigation.navigate("ShopLiked", {
                    params: { type: "liked" },
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <FontAwesome
                    name="info"
                    size={30}
                    style={{ ...styles.Icons, marginLeft: 7 }}
                  />
                )}
                label="  About"
                onPress={() => {
                  props.navigation.navigate("About");
                }}
              />
              {props.user.verified === false ? (
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="pin" color={color} size={size} />
                  )}
                  label="Verify Email"
                  onPress={() => {
                    props.navigation.navigate("OTP");
                  }}
                />
              ) : (
                <></>
              )}
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      ) : (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
                style={{ flexDirection: "row" }}
              >
                <Avatar.Image
                  source={{
                    uri: "https://reactnavigation.org/img/spiro.svg",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{props.user.name}</Title>
                  <Caption style={styles.caption}>{props.user.role}</Caption>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="home-outline"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="file"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="My Posts"
                onPress={() => {
                  props.navigation.navigate("MyPosts");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="bookmark-outline"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Bookmarks"
                onPress={() => {
                  props.navigation.navigate("SavedScreen");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <FontAwesome
                    name="info"
                    size={30}
                    style={{ ...styles.Icons, marginLeft: 7 }}
                  />
                )}
                label="  About"
                onPress={() => {
                  props.navigation.navigate("About");
                }}
              />
              {props.user.verified === false ? (
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="pin" color={color} size={size} />
                  )}
                  label="Verify Email"
                  onPress={() => {
                    props.navigation.navigate("OTP");
                  }}
                />
              ) : (
                <></>
              )}
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      )}

      <View
        style={{
          marginLeft: 15,
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 15,
          marginTop: 15,
          borderTopColor: "#f4f4f4",
          borderTopWidth: 1,
        }}
      >
        <Avatar.Image source={screen} size={50} />
        <View
          style={{
            marginLeft: 15,
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.handleLogout();
            }}
          >
            <Text style={{ color: "grey", fontSize: 15, marginTop: 5 }}>
              SignOut
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("mailto:cirquip@gmail.com?subject=FeedBack");
            }}
          >
            <Text style={{ color: "grey", fontSize: 15, marginTop: 5 }}>
              Help & FeedBack
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  Icons: {
    fontSize: 25,
    color: "#2EA5DD",
    paddingHorizontal: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
