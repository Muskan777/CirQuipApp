import "react-native-gesture-handler";
import * as React from "react";
import "./config";
import { Alert, AppState } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import { DrawerContent } from "./screens/DrawerContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NotifScreen from "./screens/NotifScreen.jsx";
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
import * as RootNavigation from "./RootNavigation";
import CreatePost from "./screens/CreatePost";
import CreatePostImageBrowser from "./screens/CreatePostImageBrowser";
import Posts from "./screens/Posts";
import About from "./screens/About";

const checkNotif = notification => {
  const type = notification.request.content.data.type;
  if (type == "chat-admin" || type == "chat-user") {
    const route = RootNavigation.navigationRef.current.getCurrentRoute();
    if (route.name === "Chat with Admin") return false;
  }
  return true;
};

Notifications.setNotificationHandler({
  handleNotification: async notification => {
    const status = checkNotif(notification);
    console.log("status", status);
    return {
      shouldShowAlert: status,
      shouldPlaySound: status,
      shouldSetBadge: status,
    };
  },
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
const HomeStack = createStackNavigator();
const CreatePostStack = createStackNavigator();
const ShopStack = createStackNavigator();
const AboutStack = createStackNavigator();

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
  const [notificationClicked, setNotificationClicked] = React.useState(false);
  const chatUserRef = React.useRef();
  const handleNotificationClicked = state => {
    setNotificationClicked(state);
  };
  const handleStateChange = nextAppState => {
    if (
      RootNavigation.appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    RootNavigation.appState.current = nextAppState;
  };

  React.useEffect(() => {
    RootNavigation.notificationClicked.current = false;
    RootNavigation.appState.current = "active";
    checkJWT();
    setTimeout(() => toggleSplash(!splash), 0);

    AppState.addEventListener("change", handleStateChange);
    RootNavigation.notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        console.log("received");
      }
    );

    RootNavigation.responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response, response.origin);
        let data = response.notification.request.content.data;
        console.log(data);
        let target = "notificationStack";
        let propsData = { data: data };
        if (data.type === "chat-admin" || data.type == "chat-user") {
          target = "ChatAdmin";
          propsData = { email: user.email };
          RootNavigation.navigationRef.current.navigate("ChatAdmin", {
            screen: "Chat with Admin",
            params: {
              admin: data.type === "chat-user",
              email: data.email,
              thread: data.thread,
            },
          });
          return;
        }
        //if (data.type === "chat-user") {
        //target = "ChatUser";
        //propsData = { email: user.email };

        //RootNavigation.navigationRef.current.navigate("ChatUser", {
        //screen: "Chat With User",
        //params: {
        //admin: true,
        //email: data.email,
        //from: "notification",
        //},
        //});
        //return;
        //}

        console.log("data-received", data);
        //RootNavigation.notificationClicked.current = true;
        //handleNotificationClicked(true);

        RootNavigation.navigationRef.current.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
        RootNavigation.navigate(target, propsData);
      }
    );
    //return () => {
    //AppState.removeEventListener("change", handleStateChange);
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
    await AsyncStorage.getItem("cirquip-auth-token").then(async jwt => {
      if (global.config.debug) console.log("jwt", jwt);
      if (jwt) {
        await axios
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
            setStatus(true);
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
        component={Posts}
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
          headerShown: false,
        }}
      />
    </SavedStack.Navigator>
  );

  const AboutStackScreen = ({ navigation }) => (
    <AboutStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          color: "#287EC1",
        },
      }}
    >
      <AboutStack.Screen
        name="About"
        component={About}
        options={{
          title: "About",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              color="#287EC1"
              size={30}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </AboutStack.Navigator>
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
        headerShown: false,
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
        headerShown: false,
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
          headerShown: false,
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
        headerShown: false,
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
        headerShown: false,
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

  const HomeStackScreen = ({ navigation, route }) => (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
        headerShown: false,
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
    </HomeStack.Navigator>
  );

  const MyPostStackScreen = ({ navigation, route }) => (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Posts"
        component={Posts}
        initialParams={{ type: "my" }}
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
    </HomeStack.Navigator>
  );

  const CreatePostStackScreen = ({ navigation, route }) => (
    <CreatePostStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
        headerShown: false,
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
    </CreatePostStack.Navigator>
  );

  const ShopStackScreen = ({ navigation, route }) => (
    <ShopStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
        headerShown: false,
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

  const ShopLikedStackScreen = ({ navigation, route }) => (
    <ShopStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "rgba(43, 164, 219, 1)",
        },
        headerShown: false,
      }}
    >
      <ShopStack.Screen
        name="Shop"
        component={Shop}
        initialParams={{ type: "liked" }}
        options={{
          title: "Shop",
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
    </ShopStack.Navigator>
  );

  const ChatScreen = ({ navigation }) => (
    <ChatStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          color: "#287EC1",
        },
      }}
    >
      <ChatStack.Screen
        name="Chat with Admin"
        component={ChatWithAdmin}
        options={{
          title: "CirQuip Assistant",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              color="#287EC1"
              size={30}
              onPress={() => {
                navigation.goBack();
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
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          color: "#287EC1",
        },
      }}
    >
      <ChatStack.Screen
        name="Chat With User"
        component={ChatWithUser}
        options={{
          title: "CirQuip Assistant",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={30}
              color="#287EC1"
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
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <Drawer.Navigator
            drawerContent={props => (
              <DrawerContent
                {...props}
                user={user}
                handleLogout={handleLogout}
              />
            )}
            initialRouteName={verified ? "Home" : "OTP"}
          >
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
            <Drawer.Screen name="About" component={AboutStackScreen} />
            <Drawer.Screen name="ChatUser" component={ChatUser} />
            <Drawer.Screen
              name="notificationStack"
              component={props => <NotifScreen {...props} />}
              name="CreatePost"
              component={CreatePostStackScreen}
            />
            <Drawer.Screen name="MyPosts" component={MyPostStackScreen} />
            <Drawer.Screen name="Shop" component={ShopStackScreen} />
            <Drawer.Screen name="ShopLiked" component={ShopLikedStackScreen} />
            <Drawer.Screen
              name="Home"
              component={HomeStackScreen}
              initialParams={{
                handleStatus: handleStatus,
                verified: verified,
              }}
            />
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
