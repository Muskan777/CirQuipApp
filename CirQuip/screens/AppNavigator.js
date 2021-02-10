import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IconButton } from "react-native-paper";

import Posts from "./Posts";
import SavedPosts from "./SavedPosts";
import ChatWithUser from "./ChatWithUser";
import Shop from "./Shop";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatePostImageBrowser from "./CreatePostImageBrowser";
import CreatePostCamera from "./CreatePostCamera";
import Profile2 from "./Profile2";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const Tab = createMaterialBottomTabNavigator();

const handleLogout = async () => {
  await AsyncStorage.clear();
  //await AsyncStorage.removeItem("user");
  //await AsyncStorage.removeItem("cirquip-auth-token");
};

const HomeStack = createStackNavigator();
const CreatePostStack = createStackNavigator();
const ShopStack = createStackNavigator();

const AppNavigator = ({ route, verified }) => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: "rgba(54, 181, 165, 1)" }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      initialParams={{ handleStatus: route.params.handleStatus }}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    {verified === true ? (
      <Tab.Screen
        name="Create"
        component={CreatePostStackScreen}
        initialParams={{ handleStatus: route.params.handleStatus }}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-add-circle" color={color} size={27} />
          ),
        }}
      />
    ) : (
      <></>
    )}
    <Tab.Screen
      name="Shop"
      component={ShopStackScreen}
      initialParams={{ handleStatus: route.params.handleStatus }}
      options={{
        tabBarLabel: "Shop",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;

const HomeStackScreen = ({ navigation, route }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}
  >
    <HomeStack.Screen
      name="Posts"
      component={Posts}
      options={{
        title: "Posts",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
              route.params.handleStatus(false);
            }}
          />
        ),
        headerLeft: () => (
          <MaterialCommunityIcons
            name="menu"
            size={26}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="Profile"
      component={Profile2}
      options={{
        title: "Posts",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const CreatePostStackScreen = ({ navigation, route }) => (
  <CreatePostStack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}
  >
    <CreatePostStack.Screen
      name="CreatePost"
      component={CreatePost}
      options={{
        title: "Create Post",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
              route.params.handleStatus(false);
            }}
          />
        ),
        headerLeft: () => (
          <MaterialCommunityIcons
            name="menu"
            size={26}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
    <CreatePostStack.Screen
      name="CreatePostImageBrowser"
      component={CreatePostImageBrowser}
      options={{
        title: "Select Items",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
            }}
          />
        ),
      }}
    />
    <CreatePostStack.Screen
      name="Camera"
      component={CreatePostCamera}
      options={{
        title: "Create Post",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
            }}
          />
        ),
      }}
    />
  </CreatePostStack.Navigator>
);

const ShopStackScreen = ({ navigation, route }) => (
  <ShopStack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}
  >
    <ShopStack.Screen
      name="Shop"
      component={Shop}
      initialParams={{ type: "all" }}
      options={{
        title: "Shop",
        headerRight: () => (
          <IconButton
            icon="logout"
            color="#000"
            size={30}
            onPress={() => {
              handleLogout();
              route.params.handleStatus(false);
            }}
          />
        ),
        headerLeft: () => (
          <MaterialCommunityIcons
            name="menu"
            size={26}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </ShopStack.Navigator>
);
