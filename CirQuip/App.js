import "react-native-gesture-handler";
import * as React from "react";
import "./config";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  Text,
  IconButton,
  TextInput,
} from "react-native-paper";
import Login from "./screens/Login.jsx";
import Sell from "./screens/Sell.jsx";
import Profile2 from "./screens/Profile2.jsx";
import Published from "./screens/Published";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./screens/AppNavigator";
import { DrawerContent } from "./screens/DrawerContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as SplashScreen from "expo-splash-screen";
import SavedPosts from "./screens/SavedPosts";
import OTP from "./screens/OTP";
import { ChatWithAdmin } from "./screens/ChatWithAdmin";
import { ChatWithUser } from "./screens/ChatWithUser";
//import CreatePostImageBrowser from "./screens/CreatePostImageBrowser";
import CreatePostCamera from "./screens/CreatePostCamera";
import Product from "./screens/Product";
import Shop from "./screens/Shop";
import Splash from "./screens/splash";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const SavedStack = createStackNavigator();
const SellProductsStack = createStackNavigator();
const ChatStack = createStackNavigator();
const MyProductsStack = createStackNavigator();
const ShopProductsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const BuyRequests = createStackNavigator();

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
  const [status, setStatus] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [verified, setVerified] = React.useState(false);
  const [splash, toggleSplash] = React.useState(true);
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  React.useEffect(() => {
    //AsyncStorage.clear();
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      }
    );

    checkJWT();
    setTimeout(() => toggleSplash(!splash), 2000);
    //return () => {
    //Notifications.removeNotificationSubscription(notificationListener);
    //Notifications.removeNotificationSubscription(responseListener);
    //};
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    //await AsyncStorage.removeItem("user");
    //await AsyncStorage.removeItem("cirquip-auth-token");
    setStatus(false);
  };
  const setVariables = async () => {
    const data = await AsyncStorage.getItem("user");
    setUser(data);
    setVerified(data.verified);
  };
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
            } catch {}
          })
          .catch(async err => {
            try {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("cirquip-auth-token");
            } catch {}
            if (global.config.debug) console.log(err);
          });
      } else {
        setStatus(false);
      }
    });
    await setVariables();
  };

  const SavedStackScreen = ({ navigation }) => (
    <SavedStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <SavedStack.Screen
        name="SavedPosts"
        component={SavedPosts}
        options={{
          title: "Saved Posts",
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
    </SavedStack.Navigator>
  );

  const ShopProductsStackScreen = ({ navigation }) => (
    <ShopProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <ShopProductsStack.Screen
        name="Product"
        component={Product}
        options={{
          title: "Product",
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
    </ShopProductsStack.Navigator>
  );

  const SellProductsStackScreen = ({ navigation }) => (
    <SellProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <SellProductsStack.Screen
        name="SellProducts"
        component={Sell}
        options={{
          title: "Sell Products",
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
    </SellProductsStack.Navigator>
  );

  const SellProductsCamera = ({ navigation }) => (
    <SellProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <SellProductsStack.Screen
        name="SellProductsCamera"
        component={CreatePostCamera}
        initialParams={{ from: "SellProducts" }}
        options={{
          title: "Sell Products Camera",
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
    </SellProductsStack.Navigator>
  );

  const PublishedProduct = ({ navigation }) => (
    <SellProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <SellProductsStack.Screen
        name="Published"
        component={Published}
        options={{
          title: "Sell Products",
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
    </SellProductsStack.Navigator>
  );

  const MyProductsStackScreen = ({ navigation }) => (
    <MyProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <MyProductsStack.Screen
        name="MyProducts"
        component={Shop}
        initialParams={{ type: "my" }}
        options={{
          title: "My Products",
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
    </MyProductsStack.Navigator>
  );

  const BuyRequestsScreen = ({ navigation }) => (
    <BuyRequests.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <BuyRequests.Screen
        name="BuyRequests"
        component={Shop}
        initialParams={{ title: "Buy Requests", type: "requests" }}
        options={{
          title: "Buy Requests",
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
    </BuyRequests.Navigator>
  );

  const ProfileScreen = ({ navigation }) => (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile2}
        initialParams={{ _id: user._id, myself: true }}
        options={{
          title: "Your Profile",
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
    </ProfileStack.Navigator>
  );

  const ChatScreen = ({ navigation }) => (
    <ChatStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <ChatStack.Screen
        name="Chat with Admin"
        component={ChatWithAdmin}
        options={{
          title: "Chat",
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
    </ChatStack.Navigator>
  );

  const ChatUser = ({ navigation }) => (
    <ChatStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
      }}
    >
      <ChatStack.Screen
        name="Chat With User"
        component={ChatWithUser}
        options={{
          title: "Chat",
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
    </ChatStack.Navigator>
  );

  const stackOptions = {
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "rgba(43, 164, 219, 1)",
      //backgroundColor: "#fb5b5a",
    },
    headerRight: () => (
      <IconButton icon="logout" color="#000" size={30} onPress={handleLogout} />
    ),
  };
  const handleStatus = param => setStatus(param);

  return splash === false ? (
    status ? (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} user={user} />}
            initialRouteName={verified ? "HomeDrawer" : "OTP"}
          >
            <Drawer.Screen
              name="HomeDrawer"
              component={AppNavigator}
              initialParams={{
                handleStatus: handleStatus,
                verified: verified,
              }}
            />
            <Drawer.Screen
              name="SellProducts"
              component={SellProductsStackScreen}
            />
            <Drawer.Screen
              name="SellProductsCamera"
              component={SellProductsCamera}
            />
            <Drawer.Screen name="Product" component={ShopProductsStackScreen} />
            <Drawer.Screen name="Published" component={PublishedProduct} />
            <Drawer.Screen
              name="MyProducts"
              component={MyProductsStackScreen}
            />
            <Drawer.Screen name="BuyRequests" component={BuyRequestsScreen} />
            <Drawer.Screen name="ChatAdmin" component={ChatScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="SavedScreen" component={SavedStackScreen} />
            <Drawer.Screen
              name="OTP"
              component={OTP}
              initialParams={{ email: user.email }}
            />
            <Drawer.Screen name="ChatUser" component={ChatUser} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    ) : (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {props => (
                <Login
                  {...props}
                  handleStatus={handleStatus}
                  setUser={setUser}
                  setVerified={setVerified}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  ) : (
    <Splash />
  );
}

{
  /* <Stack.Navigator>
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
            component={Profile2}
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
          <Stack.Screen name="OTP" component={OTP} />
        </Stack.Navigator> */
}
