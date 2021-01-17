import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Container, Text } from "native-base";

import Home from "./screens/Home.jsx";
import Shop from "./screens/Shop.jsx";
import Post1 from './components/Post/Post'
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
// export default function App() {
//   const stackOptions = {
//     headerTitleStyle: {
//       fontSize: 20,
//     },
//     headerStyle: {
//       backgroundColor: "#e73050",
//     },
//   };
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{
//               ...stackOptions,
//               title: "CirQuip",
//             }}
//           />
//           <Stack.Screen
//             name="Shop"
//             component={Shop}
//             options={{
//               ...stackOptions,
//               title: "Shop",
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }

    return (
      <Container>
      {/* <X1 /> */}
      {/* <Search /> */}
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <Post1 />
        {/* <Bottom /> */}
      </Container>
      
    );
  }
}

