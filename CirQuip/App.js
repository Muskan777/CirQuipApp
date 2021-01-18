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
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000",
    accent: "#000",
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
    headerRight: () => (
      <IconButton
        icon="account"
        color="#000"
        size={30}
        onPress={() => alert("login")}
      />
    ),
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Shop"
            component={Shop}
            options={{
              ...stackOptions,
              title: "Shop",
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              ...stackOptions,
              title: "CirQuip",
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
  );
}
