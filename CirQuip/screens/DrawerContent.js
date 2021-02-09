import React from "react";
import { View, StyleSheet } from "react-native";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Avatar.Image
                source={{
                  uri: "https://reactnavigation.org/img/spiro.svg",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>UserName</Title>
                <Caption style={styles.caption}>Student</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Saved Posts"
              onPress={() => {
                props.navigation.navigate("SavedScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-cash-outline" color={color} size={size} />
              )}
              label="Sell Products"
              onPress={() => {
                props.navigation.navigate("SellProducts");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="podcast" color={color} size={size} />
              )}
              label="My Products"
              onPress={() => {
                props.navigation.navigate({
                  name: "Shop",
                  params: { type: "my" },
                });
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="request-page" color={color} size={size} />
              )}
              label="Buy Requests"
              onPress={() => {}}
            />
            {email != global.config.admin ? (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="chat" color={color} size={size} />
                )}
                label="Chat with Admin"
                onPress={() => {
                  props.navigation.navigate("ChatAdmin", {
                    screen: "Chat with Admin",
                    params: {
                      email: email,
                    },
                  });
                }}
              />
            ) : (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="chat" color={color} size={size} />
                )}
                label="Chat with User"
                onPress={() => {
                  props.navigation.navigate("ChatUser", {
                    screen: "Chat With User",
                    params: {
                      email: email,
                    },
                  });
                }}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
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
