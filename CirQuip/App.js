import "react-native-gesture-handler";
import * as React from "react";
import "./config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  Text,
  IconButton,
} from "react-native-paper";
import Home from "./screens/Home.jsx";
import Shop from "./screens/Shop.jsx";
import Product from "./screens/Product.jsx";
import Login from "./screens/Login.jsx";
import Sell from "./screens/Sell.jsx";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clockRunning } from "react-native-reanimated";
import CreatePost from "./screens/CreatePost";
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
  const stackOptions = {
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "#e73050",
      //backgroundColor: "#fb5b5a",
    },
    headerLeft: () => (
      <IconButton
        icon="hamburger"
        color="#000"
        size={30}
        onPress={() => alert("Open a damn menu here !")}
      />
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
            //console.log("data", res.data);
            try {
              await AsyncStorage.setItem("user", res.data);
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
  });
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
              title: "Shop",
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
            name="CreatePost"
            component={CreatePost}
            options={{
              ...stackOptions,
              title: "Create Post",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <Login handleStatus={handleStatus} />
  );
}
