import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Title,
  Searchbar,
  Card,
  Paragraph,
  Button,
  Surface,
  Avatar,
} from "react-native-paper";
import axios from "axios";
const width = Dimensions.get("screen").width;

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params,
    };
  }
  componentDidMount() {
    axios
      .get(`${global.config.host}/user/getUserWithId/${this.state.seller}`)
      .then(res => {
        this.setState({ user: { ...res.data } });
      })
      .catch(err => {
        Alert.alert("Error", "Something Went Wrong In Fetching Seller");
        console.log(err);
      });
    this.props.navigation.setOptions({ title: this.state.name });
  }
  render() {
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />; //replace with user image later
    const RightContent = props => (
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Under Development",
            "Have Mercy on Developers, there was a lot to develop"
          )
        }
      >
        <Avatar.Icon
          {...props}
          icon="share"
          style={{ marginRight: 5 }}
          onPress={() => Alert.alert("Share", "Share this product")}
        />
      </TouchableOpacity>
    ); //add share to it later

    return (
      <>
        <Card style={{ elevation: 4 }}>
          <Card.Title
            title={this.state.user?.name}
            subtitle={this.state.user?.email}
            left={LeftContent}
            right={RightContent}
          />
        </Card>
        <Card>
          <Card.Cover
            source={{ uri: `data:image/jpg;base64,${this.state.image}` }}
            style={{ height: 450, padding: 5 }}
          />
          <Card.Content>
            <Title style={{ fontWeight: "bold" }}>{this.state.name}</Title>
            <Text style={{ fontSize: 18 }}>
              <Text style={{ fontWeight: "bold" }}>Details: </Text>
              {this.state.info}
            </Text>
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                height: 2,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <Text style={{ fontWeight: "900", fontSize: 20, color: "#333" }}>
              PRICE
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {" "}
              ₹ {this.state.price}
            </Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Actions style={{ justifyContent: "space-around" }}>
            <Button mode="contained" icon="cart" style={{ margin: 5 }}>
              Buy
            </Button>
            <Button mode="contained" icon="phone" style={{ margin: 5 }}>
              Contact
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({});
