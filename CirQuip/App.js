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
import axios from "axios";
import { AsyncStorage } from "react-native";
import { clockRunning } from "react-native-reanimated";
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
    },
    headerLeft: () => (
      <IconButton
        icon="hamburger"
        color="#000"
        size={30}
        onPress={() => alert("login")}
      />
    ),
  };
  const [status, setStatus] = React.useState(false);
  React.useEffect(() => {
    let jwt = AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(`${global.config.host}/user/verifyJWT/${status}`)
      .then(res => {
        setStatus(true);
      })
      .catch(err => {
        console.log(err);
      });
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ) : (
    <Login />
  );
}
