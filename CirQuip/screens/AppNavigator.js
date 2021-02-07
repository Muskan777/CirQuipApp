import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton} from "react-native-paper";

import Posts from "./Posts";
import SavedPosts from "./SavedPosts";
import ChatWithUser from './ChatWithUser';
import Shop from './Shop';
import Profile from './Profile';
import CreatePost from './CreatePost';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const CreatePostStack = createStackNavigator();
const ShopStack = createStackNavigator();

const AppNavigator = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: "rgba(54, 181, 165, 1)" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostStackScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-add-circle" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStackScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default AppNavigator;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}>
      <HomeStack.Screen
        name="Posts"
        component={Posts}
        options={{
          title: "Posts",
          headerRight: () => (
            <IconButton icon="logout" color="#000" size={30} onPress={() => {handleLogout()}}/>
          ),
          headerLeft: () => (
            <MaterialCommunityIcons name='menu' size={26} onPress={() => {navigation.openDrawer()}}/>
          )
        }}
      />
    </HomeStack.Navigator>
  );

  const CreatePostStackScreen = ({navigation}) => (
    <CreatePostStack.Navigator screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}>
      <CreatePostStack.Screen
        name="Create Post"
        component={CreatePost}
        options={{
          title: "Create Post",
          headerRight: () => (
            <IconButton icon="logout" color="#000" size={30} onPress={() => {handleLogout()}}/>
          ),
          headerLeft: () => (
            <MaterialCommunityIcons name='menu' size={26} onPress={() => {navigation.openDrawer()}}/>
          )
        }}
      />
    </CreatePostStack.Navigator>
  );

  const ShopStackScreen = ({navigation}) => (
    <ShopStack.Navigator screenOptions={{
      headerTitleStyle: {
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "rgba(54, 181, 165, 1)",
      },
    }}>
      <ShopStack.Screen
        name="Shop"
        component={Shop}
        options={{
          title: "Shop",
          headerRight: () => (
            <IconButton icon="logout" color="#000" size={30} onPress={() => {handleLogout()}}/>
          ),
          headerLeft: () => (
            <MaterialCommunityIcons name='menu' size={26} onPress={() => {navigation.openDrawer()}}/>
          )
        }}
      />
    </ShopStack.Navigator>
  );