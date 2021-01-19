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
  Linking,
  Platform,
  Share,
} from "react-native";
import {
  Title,
  Searchbar,
  Card,
  IconButton,
  Button,
  Surface,
  Avatar,
  FAB,
} from "react-native-paper";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
const width = Dimensions.get("screen").width;

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() => this.props.navigation.goBack()}
        />
      ),
    });
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
  callNumber = phone => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  whatsappMsg = `Hi, I am interested to buy ${this.state?.name} posted by you on CirQuip`;
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `Checkout ${this.state?.name} on CirQuip | Price: ${this.state?.price} | Posted By : ${this.state?.user.name} | Contact: ${this.state?.user.phone}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />; //replace with user image later
    const RightContent = props => (
      <TouchableOpacity onPress={() => this.onShare()}>
        <Avatar.Icon
          {...props}
          icon="share"
          style={{ marginRight: 10, scaleX: 1.5, scaleY: 1.5 }}
        />
      </TouchableOpacity>
    ); //add share to it later

    return (
      <>
        <ScrollView>
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
              <Button
                mode="contained"
                icon="cart"
                style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
              >
                <Text style={{ fontSize: 20 }}>Buy</Text>
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>

        <FAB
          icon="phone"
          onPress={() => this.callNumber(this.state.user.phone)}
          style={{
            backgroundColor: "green",
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            marginBottom: 80,
          }}
        />
        <FAB
          onPress={() =>
            Linking.openURL(
              `whatsapp://send?phone=${this.state.user.phone}&text=${this.whatsappMsg}`
            )
          }
          icon="whatsapp"
          style={{
            backgroundColor: "#4ec559",
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({});

//<Button
//mode="contained"
//icon="phone"
//style={{ margin: 5, backgroundColor: "green" }}
//onPress={() => Linking.openURL(`tel:${this.state.user.phone}`)}
//>
//Contact
//</Button>
