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
        post: () => <Posts {...data} />,
        comment: () => <CommentWrapper {...data} />,
        "comment-like": () => <CommentWrapper {...data} />,
        product: props => <Product {...data} {...props} />,
      },
    };
  }

  prepare = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
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
          key={this.state.refresh}
          name={
            this.state.data.from === "notification"
              ? "Notification"
              : this.prepare(this.state.data.type)
          }
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
