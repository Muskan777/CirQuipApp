import React, { useEffect } from "react";
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
import screen from "../assets/asset2.png";

export function DrawerContent({ handleLogout, navigation, ...props }) {
  const [user, setUser] = React.useState({});
  const [verified, setVerified] = React.useState(false);

  useEffect(() => {
    findEmail();
    setVerified(user.verified);
  }, []);

  const findEmail = async () => {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      axios
        .get(`${global.config.host}/user/getUserWithId/${user}`)
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          Alert.alert("Error", "Something Went Wrong In Fetching Admin 2");
          console.log(err);
        });
    }
  };

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
                  navigation.navigate("Profile", { _id: user._id });
                }}
                style={{ flexDirection: "row" }}
              >
                {user.profileImage ? (
                  <Avatar.Image
                    style={styles.ProfileImage}
                    source={{
                      uri: user.profileImage,
                    }}
                  />
                ) : (
                  <Avatar.Image
                    style={styles.ProfileImage}
                    source={require("../assets/profile.png")}
                  />
                )}
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  {console.log(user._id)}
                  <Title style={styles.title}>{user.name}</Title>
                  <Caption style={styles.caption}>{user.role}</Caption>
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
                  navigation.navigate("MyProducts", {
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
                  navigation.navigate("BuyRequests", {
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
                  navigation.navigate("ShopLiked", {
                    params: { type: "liked" },
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons
                    name="info"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="About"
                onPress={() => {
                  navigation.navigate("About");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons
                    name="feedback"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Help & Feedback"
                onPress={() => {
                  Linking.openURL("mailto:cirquip@gmail.com?subject=FeedBack");
                }}
              />
              {user.verified === false && (
                <DrawerItem
                  icon={({ color, size }) => (
                    <FontAwesome
                      name="shield"
                      size={30}
                      style={{ ...styles.Icons, marginLeft: 4 }}
                    />
                  )}
                  label="Verify Email"
                  onPress={() => {
                    navigation.navigate("OTP", { email: user.email });
                  }}
                />
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
                  navigation.navigate("Profile", { _id: user._id });
                }}
                style={{ flexDirection: "row" }}
              >
                {user.profileImage ? (
                  <Avatar.Image
                    style={styles.ProfileImage}
                    source={{
                      uri: user.profileImage,
                    }}
                  />
                ) : (
                  <Avatar.Image
                    style={styles.ProfileImage}
                    source={require("../assets/profile.png")}
                  />
                )}
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{user.name}</Title>
                  <Caption style={styles.caption}>{user.role}</Caption>
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
                  navigation.navigate("Home");
                }}
              />
              {/* <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="home-outline"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Signout"
                onPress={() => {
                  handleLogout(false);
                }}
              /> */}
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
                  navigation.navigate("MyPosts");
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
                  navigation.navigate("SavedScreen", { verified: verified });
                }}
              />
              {user.verified === false && (
                <DrawerItem
                  icon={({ color, size }) => (
                    <FontAwesome
                      name="shield"
                      size={30}
                      style={{ ...styles.Icons, marginLeft: 4 }}
                    />
                  )}
                  label="Verify Email"
                  onPress={() => {
                    navigation.navigate("OTP");
                  }}
                />
              )}
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons
                    name="info"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="About"
                onPress={() => {
                  navigation.navigate("About");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons
                    name="feedback"
                    color={color}
                    size={size}
                    style={styles.Icons}
                  />
                )}
                label="Help & Feedback"
                onPress={() => {
                  Linking.openURL("mailto:cirquip@gmail.com?subject=FeedBack");
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      )}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Avatar.Image
          style={styles.ProfileImage}
          source={require("../assets/asset2.png")}
        />
        <View style={{ marginLeft: 15, flexDirection: "column" }}>
          <Title style={styles.title1}>CirQuip</Title>
          <Caption style={styles.caption}>Developed By SDS COEP</Caption>
        </View>
      </Drawer.Section>
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
  title1: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(46, 165, 221, 1)",
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
  ProfileImage: {
    marginTop: 5,
    marginLeft: 5,
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
    flexDirection: "row",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
