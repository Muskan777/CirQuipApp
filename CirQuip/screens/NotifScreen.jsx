import React from "react";
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Posts from "./Posts";
import CommentWrapper from "./CommentWrapper";
import Product from "./Product";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton } from "react-native-paper";
import * as RootNavigation from "../RootNavigation.js";
const NotificationStack = createStackNavigator();

export default class NotifScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let data = { ...this.props.route.params.data, from: "notification" };
    this.state = {
      data: data,
      component: {
        post: () => <Posts {...data} />,
        comment: () => <CommentWrapper {...data} />,
        product: () => <Product {...data} />,
      },
    };
  }
  render() {
    return (
      <NotificationStack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: "rgba(43, 164, 219, 1)",
          },
        }}
      >
        <NotificationStack.Screen
          name="Notification"
          component={this.state.component[this.state.data.type]}
          initialParams={{ data: this.state.data }}
          options={{
            headerLeft: () => (
              <MaterialCommunityIcons
                name="arrow-left"
                size={26}
                onPress={() => this.props.navigation.goBack()}
              />
            ),
          }}
        />
      </NotificationStack.Navigator>
    );
  }
}
