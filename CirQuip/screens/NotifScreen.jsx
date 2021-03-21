import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "./Posts";
import CommentWrapper from "./CommentWrapper";
import Product from "./Product";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const NotificationStack = createStackNavigator();

export default class NotifScreen extends React.Component {
  constructor(props) {
    super(props);
    let data = {
      from: "notification",
      ...this.props.route.params.data,
    };
    this.state = {
      refresh: false,
      data: data,
      component: {
        post: () => (
          <Posts
            {...{ from: "notification", ...this.props.route.params.data }}
            key={this.props.route.params.data.uid}
          />
        ),
        comment: () => (
          <CommentWrapper
            {...{ from: "notification", ...this.props.route.params.data }}
            key={this.props.route.params.data.uid}
          />
        ),
        "comment-like": () => (
          <CommentWrapper
            {...{ from: "notification", ...this.props.route.params.data }}
            key={this.props.route.params.data.uid}
          />
        ),
        product: props => (
          <Product
            {...{ from: "notification", ...this.props.route.params.data }}
            key={this.props.route.params.data.uid}
            {...props}
            key={this.props.route.params.data.uid}
          />
        ),
      },
    };
  }

  prepare = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render() {
    return (
      <NotificationStack.Navigator
        key={this.props.route.params?.data.uid}
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
          name={
            this.state.data.from === "notification"
              ? "Notification"
              : this.prepare(this.state.data.type)
          }
          key={this.props.route.params?.data.uid}
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
