import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Home from "./screens/Home.jsx";
import Shop from "./screens/Shop.jsx";
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
  };
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
