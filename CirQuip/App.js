import "react-native-gesture-handler";
import * as React from "react";
import "./config";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  Text,
  IconButton,
  TextInput,
} from "react-native-paper";
import Home from "./screens/Home.jsx";
import Shop from "./screens/Shop.jsx";
import Product from "./screens/Product.jsx";
import Login from "./screens/Login.jsx";
import Sell from "./screens/Sell.jsx";
import Profile from "./screens/Profile.jsx";
import Published from "./screens/Published";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatePost from "./screens/CreatePost";
import Posts from "./screens/Posts";
import SavedPosts from "./screens/SavedPosts";
import { ChatWithAdmin } from "./screens/ChatWithAdmin";
import { ChatWithUser } from "./screens/ChatWithUser";
import CreatePostImageBrowser from "./screens/CreatePostImageBrowser";
import CreatePostCamera from "./screens/CreatePostCamera";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#003f5c",
    accent: "#fb5b5a",
    backdrop: "#000",
    text: "#000",
  },
};
export default function App() {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    //await AsyncStorage.removeItem("user");
    //await AsyncStorage.removeItem("cirquip-auth-token");
    setStatus(false);
  };

  const stackOptions = {
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "#e73050",
      //backgroundColor: "#fb5b5a",
    },
    headerRight: () => (
      <IconButton icon="logout" color="#000" size={30} onPress={handleLogout} />
    ),
  };
  const handleStatus = param => setStatus(param);

  const [status, setStatus] = React.useState(false);

  const checkJWT = async () => {
    await AsyncStorage.getItem("cirquip-auth-token").then(jwt => {
      if (global.config.debug) console.log("jwt", jwt);
      if (jwt) {
        axios
          .post(
            `${global.config.host}/user/verifyJWT`,
            {},
            {
              headers: {
                "cirquip-auth-token": jwt,
              },
            }
          )
          .then(async res => {
            console.log("data", res.data);
            try {
              await AsyncStorage.setItem("user", res.data);
              axios
                .get(`${global.config.host}/user/getUserWithId/${res.data}`)
                .then(res => {
                  console.log(res.data.email);
                })
                .catch(err => {
                  Alert.alert(
                    "Error",
                    "Something Went Wrong In Fetching Admin 1"
                  );
                  console.log(err);
                });
            } catch {}
            setStatus(true);
          })
          .catch(async err => {
            try {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("cirquip-auth-token");
            } catch {}
            if (global.config.debug) console.log(err);
          });
      }
    });
  };

  React.useEffect(() => {
    checkJWT();
  }, []);

  return status ? (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              ...stackOptions,
              title: "CirQuip",
            }}
          />
          <Stack.Screen
            name="Published"
            component={Published}
            options={{
              ...stackOptions,
              title: "Product Published",
            }}
          />
          <Stack.Screen
            name="Sell"
            component={Sell}
            options={{
              ...stackOptions,
              title: "Selling Arena",
            }}
          />
          <Stack.Screen
            name="Shop"
            component={Shop}
            options={{
              ...stackOptions,
              title: "Store",
            }}
          />
          <Stack.Screen
            name="Posts"
            component={Posts}
            options={{
              ...stackOptions,
              title: "Posts",
            }}
          />
          <Stack.Screen
            name="SavedPosts"
            component={SavedPosts}
            options={{
              ...stackOptions,
              title: "Posts",
            }}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              ...stackOptions,
            }}
          />
          <Stack.Screen
            name="CreatePostImageBrowser"
            component={CreatePostImageBrowser}
            options={{
              title: "Select files",
            }}
          />
          <Stack.Screen
            name="Camera"
            component={CreatePostCamera}
            options={{
              title: "Capture Image",
            }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{
              ...stackOptions,
              title: "Create Post",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ ...stackOptions, title: "Profile" }}
          />
          <Stack.Screen
            name="ChatWithAdmin"
            component={ChatWithAdmin}
            options={{
              ...stackOptions,
              title: "ChatBox",
            }}
          />
          <Stack.Screen
            name="ChatWithUser"
            component={ChatWithUser}
            options={{
              ...stackOptions,
              title: "Chat With User",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <Login handleStatus={handleStatus} />
  );
}
