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
} from "react-native";
import {
  IconButton,
  Title,
  Searchbar,
  Card,
  Paragraph,
  Button,
  FAB,
  Avatar,
} from "react-native-paper";
import axios from "axios";
const width = Dimensions.get("screen").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as RootNavigation from "../RootNavigation.js";

import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      searchQuery: "",
      user: { likes: [] },
      email: "",
    };
  }
  callNumber = phone => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      //phoneNumber = `tel:${phone}`;
      phoneNumber = "tel:" + phone;
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
  whatsappMsg = name =>
    `Hi, I am interested to buy ${name} posted by you on CirQuip`;
  refresh = async () => {
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
    (async () => {
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
    })();
  };
  async componentDidMount() {
    await this.refresh().then(async () => {
      await this.fetchData();
    });
  }

  async fetchData() {
    this.setState({ refreshing: true });
    console.log(this.props.route.params.type);
    await AsyncStorage.getItem("user").then(async id => {
      await axios
        .post(
          `${global.config.host}/shop/products/${this.props.route.params.type}/*`,
          { id: id }
        )
        .then(res => {
          this.setState({ data: res.data });
          this.setState({ refreshing: false });
        })
        .catch(e => {
          this.setState({ refreshing: false });
          Alert.alert("Error", "Something went wrong");
          console.log(e);
        });
    });
    let email = await AsyncStorage.getItem("email");
    this.setState({ email: email });
  }
  handleLike = async id => {
    //console.log("inside like");
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
  phoneCall = async sellerId => {
    await axios
      .get(`${global.config.host}/user/getUserWithId/${sellerId}`)
      .then(res => {
        this.callNumber(res.data.phone);
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong");
        if (global.config.debug) console.log(err);
      });
  };
  whatsapp = async sellerId => {
    await axios
      .get(`${global.config.host}/user/getUserWithId/${sellerId}`)
      .then(res => {
        Linking.openURL(
          `whatsapp://send?phone=+91${res.data.phone}&text=${this.whatsappMsg(
            res.data.name
          )}`
        );
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong");
        if (global.config.debug) console.log(err);
      });
  };

  handleDislike = async id => {
    console.log("inside dislike");
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
  performSearch = async () => {
    if (this.state.searchQuery === "") {
      this.fetchData();
      return;
    }
    this.setState({ refreshing: true });
    await AsyncStorage.getItem("user").then(async id => {
      axios
        .post(
          `${global.config.host}/shop/products/${this.props.route.params.type}/${this.state.searchQuery}`,
          { id: id },
          { headers: { search: true } }
        )
        .then(res => {
          this.setState({ data: res.data });
          this.setState({ refreshing: false });
        })
        .catch(err => {
          this.setState({ refreshing: false });
          Alert.alert("Error", "Something went wrong !");
          console.log(err);
        });
    });
  };
  onChangeSearch = query => this.setState({ searchQuery: query });
  renderItemComponent = obj => {
    const { item: data, index } = obj;
    //console.log(this.state.user);
    return (
      <>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            key={this.state.user.likes}
            onPress={() => {
              RootNavigation.productState.current = { ...data };
              this.props.navigation.navigate("Product", {
                screen: "Product",
                params: {
                  ...data,
                  onGoBack: async () => await this.refresh(),
                  type: this.props.route.params.type,
                },
              });
            }}
            style={{
              ...styles.container,
              borderColor: "white",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                zIndex: 1000,
                elevation: 10,
                alignSelf: "flex-end",
              }}
              onPress={() =>
                this.state?.user?.likes.includes(data._id)
                  ? this.handleDislike(data._id)
                  : this.handleLike(data._id)
              }
            >
              <Avatar.Icon
                color={
                  this.state?.user?.likes.includes(data._id) ? "red" : "gray"
                }
                icon="heart"
                style={{
                  ...styles.like,
                  display:
                    this.props.route.params.type === "my" ||
                    this.props.route.params.type === "requests"
                      ? "none"
                      : "flex",
                }}
              />
            </TouchableOpacity>
            <Card
              style={{
                borderColor: "#fff",
                width: width / 2 - 50,
                height: 220,
                alignSelf: "center",
              }}
            >
              <Card.Cover
                source={{
                  uri: `${data.image}`,
                }}
                style={{
                  minHeight: 220,
                  width: width / 2 - 50,
                  alignSelf: "center",
                  //borderWidth: 0,
                  //borderColor: "black",
                }}
              />
              {/* <Card.Content style={{ height: 50, padding: 0}}>
              <Text style={styles.name}>{data.name}</Text>
              <Paragraph style={styles.price}>₹ {data.price}</Paragraph>
            </Card.Content> */}
            </Card>
          </TouchableOpacity>

          <Text style={styles.name}>{data.name}</Text>
          <View
            style={{
              marginLeft: 26,
              marginBottom: 40,
              flexDirection: "row",
              alignItems: "center",
              width: width / 2 - 50,
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={styles.price}>₹ {data.price}</Paragraph>
            {this.props.route.params.type === "my" ? (
              <></>
            ) : (
              <>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.phoneCall(
                        this.props.route.params.type === "requests"
                          ? data.reserved
                          : data.seller
                      )
                    }
                  >
                    <Avatar.Icon
                      size={32}
                      color="#25D366"
                      icon="phone"
                      backgroundColor="#fff"
                      elevation={10}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.whatsapp(
                        this.props.route.params.type === "requests"
                          ? data.reserved
                          : data.seller
                      )
                    }
                  >
                    <Avatar.Icon
                      size={33}
                      color="#fff"
                      icon="whatsapp"
                      backgroundColor="#4FCE5D"
                      elevation={10}
                      marginLeft={8}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </>
    );
  };

  ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchData();
    }); // call fetchData after setting the state
  };

  render() {
    return (
      <>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            marginBottom: 10,
            paddingTop: Platform.OS === "android" ? 25 : 0,
          }}
        >
          <Searchbar
            onSubmitEditing={() => this.performSearch()}
            returnKeyType="search"
            style={{ margin: 5 }}
            placeholder="Search"
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            icon={() => (
              <MaterialCommunityIcons name="menu" size={30} color="#2ba4db" />
            )}
            onIconPress={() => this.props.navigation.openDrawer()}
          />
          <Title
            style={{
              textAlign: "left",
              margin: 5,
              marginVertical: 10,
              color: "rgba(112, 112, 112, 1)",
              fontSize: 20,
              fontFamily: "sans-serif",
            }}
          >
            {this.props.route.params.type === "liked"
              ? "Your Wishlist"
              : this.props.route.params.type === "my"
              ? "My Listed Products"
              : this.props.route.params.type === "requests"
              ? "Buy Requests"
              : "New Recommendations"}
          </Title>
          {this.state.data && this.state.data.length !== 0 ? (
            <FlatList
              numColumns={2}
              data={this.state.data}
              renderItem={item => this.renderItemComponent(item)}
              keyExtractor={item => item._id}
              //ItemSeparatorComponent={this.ItemSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              style={{ marginBottom: "25%" }}
            />
          ) : this.state.refreshing ? (
            <></>
          ) : (
            <>
              <View style={{ justifyContent: "center" }}>
                <Title style={{ width: width, textAlign: "center" }}>
                  Could not find any products :({" "}
                </Title>
              </View>
            </>
          )}
          <View style={styles.bottom}>
            <View style={styles.container1}>
              <MaterialIcons
                name="home"
                style={{ ...styles.cart }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
            </View>
            <View style={styles.container2}>
              <AntDesign
                name="plus"
                style={{ ...styles.create }}
                onPress={() => {
                  this.props.navigation.navigate("SellProducts");
                }}
              />
            </View>
            <View style={styles.container3}>
              {this.state.email == global.config.admin ? (
                <Ionicons
                  name="md-chatbubble-ellipses"
                  style={{ ...styles.chat }}
                  onPress={() => {
                    this.props.navigation.navigate("ChatUser", {
                      screen: "Chat With User",
                      params: {
                        email: this.state.email,
                      },
                    });
                  }}
                />
              ) : (
                <Ionicons
                  name="md-chatbubble-ellipses"
                  style={{ ...styles.chat }}
                  onPress={() => {
                    this.props.navigation.navigate("ChatAdmin", {
                      screen: "Chat with Admin",
                      params: {
                        email: this.state.email,
                      },
                    });
                  }}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: width / 30,
    marginBottom: width / 30,
  },
  container: {
    height: 225,
    width: width / 2 - 4,
    margin: 2,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
  },
  image: {
    height: 250,
    borderRadius: 4,
  },
  like: {
    //borderColor: "black",
    //borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    elevation: 10,
    backgroundColor: "white",
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    color: "red",
  },
  name: {
    marginLeft: 26,
    fontWeight: "bold",
    color: "rgba(64, 64, 64, 1)",
    fontFamily: "sans-serif",
    fontSize: 16,
  },
  price: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "sans-serif",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 98,
  },
  cart: {
    alignSelf: "center",
    fontSize: 40,
    marginTop: 5,
    color: "#2ba4db",
  },
  chat: {
    alignSelf: "center",
    fontSize: 40,
    marginTop: 2,
    marginLeft: 2,
    color: "#2ba4db",
  },
  create: {
    alignSelf: "center",
    fontSize: 80,
    marginTop: 5,
    color: "#2ba4db",
  },

  container1: {
    width: 70,
    height: 70,
    padding: 10,
    margin: 10,
    // borderRadius:40,
    position: "absolute",
    left: 10,
    bottom: 5,
    borderRadius: 35,
    backgroundColor: "white",
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
  container2: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    left: 160,
    bottom: 55,
    paddingBottom: 40,
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
  container3: {
    width: 70,
    height: 70,
    padding: 10,
    margin: 10,
    // borderRadius:40,
    position: "absolute",
    right: 10,
    bottom: 5,
    borderRadius: 35,
    backgroundColor: "white",
    shadowColor: "#36b5a5",
    shadowOpacity: 1,
    elevation: 6,
  },
});
