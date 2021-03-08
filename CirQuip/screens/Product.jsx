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
import Toast from "react-native-simple-toast";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
const width = Dimensions.get("screen").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../RootNavigation.js";
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      this.props.from === "notification"
        ? {
            ...this.props,
            user: { likes: [] },
            type: "my",
          }
        : {
            ...RootNavigation.productState.current,
            user: { likes: [] },
            type: this.props.route.params.type,
          };

    //this.state = {
    //...this.props?.route?.params,
    //user: { likes: [] },
    //type: this.props.route.params.type,
    //};
  }
  doAllTasks = async () => {
    this.props.navigation.setOptions({
      headerRight: () => <></>,
    });
    if (this.state.from !== "notification")
      this.props.navigation.setOptions({
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            color="#000"
            size={30}
            onPress={() => {
              this.props.route.params.onGoBack();
              this.props.navigation.goBack();
            }}
          />
        ),
      });
    await AsyncStorage.getItem("email")
      .then(email => {
        this.setState({ myEmail: email });
      })
      .catch(err => {
        console.log(err);
      });
    await AsyncStorage.getItem("user").then(userId => {
      if (!userId) return;
      if (this.state?.from === "notification") {
        this.setState({ seller: userId });
      }
      axios
        .get(
          `${global.config.host}/user/getUserWithId/${
            this.state?.type === "requests"
              ? this.state?.reserved
              : this.state?.seller
          }`
        )
        .then(res => {
          this.setState({ seller: { ...res.data } });
        })
        .catch(err => {
          Alert.alert("Error", "Something Went Wrong In Fetching Seller");
          console.log(err);
        });
    });

    this.props.navigation.setOptions({
      title: this.state?.type == "requests" ? "Buy Request" : this.state.name,
    });

    (async () => {
      try {
        let user = await AsyncStorage.getItem("user");
        this.setState({ id: user });
        let info;
        await AsyncStorage.getItem("info").then(async res => {
          if (res) {
            info = JSON.parse(res);
            if (info) {
              this.setState({ user: info });
            } else {
              this.setState({ user: { likes: [] } });
              await AsyncStorage.setItem("info", { likes: [] });
            }
          }
        });
      } catch (err) {
        console.log(err);
        Alert.alert("Cirquip", "Something went wrong");
      }
    })();
  };
  componentDidMount() {
    this.doAllTasks();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.from === "notification") {
      this.setState({
        ...this.props,
        user: { likes: [] },
        type: "my",
      });
      return;
    }
    //if (
    //prevState === this.state ||
    //JSON.stringify(prevState) === JSON.stringify(this.state)
    //)
    //return;
    this.setState({
      type: this.props.route.params.type,
    });

    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState(
        { ...this.state, ...RootNavigation.productState.current },
        () => this.doAllTasks()
      );
    }
  }
  buyProduct = () => {
    axios
      .post(`${global.config.host}/shop/buy`, {
        productId: this.state?._id,
        user: this.state.id,
      })
      .then(res => {
        this.props.navigation.navigate("Published", {
          screen: "Published",
          params: { type: "buy" },
        });
      })
      .catch(err => {
        if (global.config.debug) console.log(err);
        Alert.alert("Error", "Something went wrong");
      });
  };
  handleLike = async id => {
    await axios
      .put(`${global.config.host}/shop/like`, {
        user: this.state.id,
        productId: id,
      })
      .then(async res => {
        let info;
        await AsyncStorage.getItem("info").then(async res => {
          if (res) info = JSON.parse(res);
          if (info) {
            if (info.likes) {
              info.likes.push(id);
            } else {
              info["likes"] = [id];
            }
          } else {
            info = { likes: [id] };
          }
          await AsyncStorage.setItem("info", JSON.stringify(info));
          this.setState({
            user: {
              likes: [...this.state.user.likes, id],
            },
          });
        });
      })
      .catch(e => {
        Alert.alert("Error", "Something went wrong");
        console.log(e);
      });
  };

  handleDislike = async id => {
    await axios
      .put(`${global.config.host}/shop/dislike`, {
        user: this.state.id,
        productId: id,
      })
      .then(async res => {
        let info;
        await AsyncStorage.getItem("info").then(async res => {
          if (res) info = JSON.parse(res);
          if (info) {
            if (info.likes) {
              info.likes.splice(info.likes.indexOf(id), 1);
            } else {
              info["likes"] = [];
            }
          } else {
            info = { likes: [] };
          }
          await AsyncStorage.setItem("info", JSON.stringify(info));
        });
        let temp_likes = this.state.user.likes;
        temp_likes.splice(temp_likes.indexOf(id), 1);
        this.setState({
          user: {
            likes: temp_likes,
          },
        });
      })
      .catch(e => {
        Alert.alert("Error", "Something went wrong");
        console.log(e);
      });
  };
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
          Toast.show("Phone number is not available", Toast.SHORT, [
            "UIAlertController",
          ]);
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: `Checkout ${this.state?.name} on CirQuip | Price: ${this.state?.price} | Posted By : ${this.state?.seller.name} | Contact: ${this.state?.seller.phone}`,
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
  handleSell = async () => {
    await AsyncStorage.getItem("cirquip-auth-token")
      .then(async token => {
        await axios
          .post(
            `${global.config.host}/shop/sell/${this.state?._id}`,
            {},
            {
              headers: {
                "cirquip-auth-token": token,
              },
            }
          )
          .then(res => {
            if (this.state.type === "my") {
              Toast.show("Your product has been deleted !", Toast.SHORT, [
                "UIAlertController",
              ]);
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "MyProducts", params: { type: "my" } }],
                })
              );
            } else {
              if (this.state.myEmail === global.config.admin) {
                Toast.show("Product Deleted!", Toast.SHORT, [
                  "UIAlertController",
                ]);
              } else {
                Toast.show(
                  "Congratulations, Your product is sold !",
                  Toast.SHORT,
                  ["UIAlertController"]
                );
              }

              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: "BuyRequests", params: { type: "requests" } },
                  ],
                })
              );
            }
          })
          .catch(err => {
            if (global.config.debug) console.log(err);
            Alert.alert("Error", "Something went wrong");
          });
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong");
      });
  };
  handleRevoke = async () => {
    await axios
      .put(`${global.config.host}/shop/revoke/${this.state?._id}`)
      .then(res => {
        Toast.show(
          "The Product has been moved to selling arena again !",
          Toast.SHORT,
          ["UIAlertController"]
        );

        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BuyRequests", params: { type: "requests" } }],
          })
        );
      })
      .catch(err => {
        if (global.config.debug) console.log(err);
        Alert.alert("Error", "Something went wrong");
      });
  };
  render() {
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />; //replace with user image later
    const RightContent = props => (
      <TouchableOpacity onPress={() => this.onShare()}>
        <Avatar.Icon
          {...props}
          icon="share"
          style={{
            marginRight: 10,
            scaleX: 1.5,
            scaleY: 1.5,
            display: this.state?.type === "requests" ? "none" : "flex",
          }}
        />
      </TouchableOpacity>
    ); //add share to it later

    return (
      <>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            flex: 1,
            paddingTop: Platform.OS === "android" ? 25 : 0,
          }}
        >
          <ScrollView>
            <Card style={{ elevation: 4 }}>
              <Card.Title
                title={
                  this.state?.type === "my" ? "You" : this.state.seller?.name
                }
                subtitle={this.state.seller?.email}
                left={LeftContent}
                right={RightContent}
              />
            </Card>
            <Card>
              <Card.Cover
                source={{ uri: `${this.state.image}` }}
                style={{ height: 450, padding: 5 }}
              />
              {this.state?.type === "my" ? (
                <></>
              ) : (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    elevation: 10,
                    alignSelf: "flex-end",
                  }}
                  onPress={() =>
                    this.state?.user?.likes.includes(this.state?._id)
                      ? this.handleDislike(this.state?._id)
                      : this.handleLike(this.state?._id)
                  }
                >
                  <Avatar.Icon
                    color={
                      this.state?.user?.likes.includes(this.state?._id)
                        ? "red"
                        : "gray"
                    }
                    icon="heart"
                    style={{
                      ...styles.like,
                      display:
                        this.state?.type === "my" ||
                        this.state?.type === "requests"
                          ? "none"
                          : "flex",
                    }}
                  />
                </TouchableOpacity>
              )}
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
                <Text
                  style={{ fontWeight: "900", fontSize: 20, color: "#333" }}
                >
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
                {this.state?.type !== "my" &&
                this.state?.myEmail === global.config.admin ? (
                  <Button
                    mode="contained"
                    icon="delete"
                    style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
                    onPress={() => this.handleSell()}
                  >
                    <Text style={{ fontSize: 20 }}>Delete</Text>
                  </Button>
                ) : (
                  <></>
                )}
                {this.state?.type === "my" ? (
                  <Button
                    mode="contained"
                    icon="delete"
                    style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
                    onPress={() => this.handleSell()}
                  >
                    <Text style={{ fontSize: 20 }}>Delete</Text>
                  </Button>
                ) : this.state?.type === "requests" ? (
                  <>
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        mode="contained"
                        icon="cart"
                        style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
                        onPress={() => this.handleSell()}
                      >
                        <Text style={{ fontSize: 15 }}>Sell</Text>
                      </Button>
                      <Button
                        mode="contained"
                        icon="cancel"
                        style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
                        onPress={() => this.handleRevoke()}
                      >
                        <Text style={{ fontSize: 15 }}>Revoke Request</Text>
                      </Button>
                    </View>
                  </>
                ) : (
                  <Button
                    mode="contained"
                    icon="cart"
                    style={{ margin: 5, paddingRight: 5, paddingLeft: 5 }}
                    onPress={() => this.buyProduct()}
                  >
                    <Text style={{ fontSize: 20 }}>Buy</Text>
                  </Button>
                )}
              </Card.Actions>
            </Card>
          </ScrollView>
        </SafeAreaView>

        {this.state?.type === "my" ? (
          <></>
        ) : (
          <>
            <FAB
              icon="phone"
              onPress={() => this.callNumber(this.state.seller.phone)}
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
              onPress={() => {
                let whatsappMsg = this.state
                  ? this.state.type === "requests"
                    ? `Hey I received your request for buying ${this.state?.name}. Let's talk....`
                    : `Hi, I am interested to buy ${this.state?.name} posted by you on CirQuip`
                  : null;
                Linking.openURL(
                  `whatsapp://send?phone=+91${this.state.seller.phone}&text=${whatsappMsg}`
                );
              }}
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
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  like: {
    backgroundColor: "white",
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    color: "red",
  },
});

//<Button
//mode="contained"
//icon="phone"
//style={{ margin: 5, backgroundColor: "green" }}
//onPress={() => Linking.openURL(`tel:${this.state.user.phone}`)}
//>
//Contact
//</Button>
