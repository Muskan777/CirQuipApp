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
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";

import { CommonActions } from "@react-navigation/native";
const width = Dimensions.get("screen").width;

export default class Published extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params,
    };
  }
  async componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => <></>,
    });
    if (this.state.type === "buy")
      this.props.navigation.setOptions({
        title: "Success",
      });
    await AsyncStorage.getItem("user").then(id => {
      axios
        .get(`${global.config.host}/user/getUserWithId/${id}`)
        .then(res => {
          this.setState({ user: { ...res.data } });
        })
        .catch(err => {
          Alert.alert("Error", "Something Went Wrong In Fetching User Data");
          console.log(err);
        });
    });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/BlueFlat_tick_icon.svg/512px-BlueFlat_tick_icon.svg.png",
            }}
            style={{ height: 220, width: 220, marginBottom: 28 }}
          />
          <Text style={styles.logo}>
            {this.state.type === "buy"
              ? "Success"
              : "Congratulations " +
                JSON.stringify(this.state.user && this.state.user.name)}
          </Text>
          {this.state.type === "buy" ? (
            <>
              <View style={{ alignSelf: "center", padding: 10 }}>
                <Text style={styles.desc}>
                  • Buy request is sent to the seller !
                </Text>
                <Text style={styles.desc}>
                  • Seller will contact you soon !
                </Text>
              </View>
            </>
          ) : (
            <View style={{ alignSelf: "center", padding: 10 }}>
              <Text style={styles.desc}>• Your product is live now !</Text>
              <Text style={styles.desc}>
                • Reasonable and Less price attracts more buyers.
              </Text>
              <Text style={styles.desc}>
                • Delete your Ads when your product is sold for your
                convinience.
              </Text>
              <Text style={styles.desc}>
                • Non valuaeble for you is valuaeble for someone, so keep
                selling on CirQuip and help your Community.
              </Text>
            </View>
          )}
          <View
            style={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <Button
              mode="contained"
              icon="close"
              onPress={() => {
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Shop", params: { type: "all" } }],
                  })
                );
              }}
            >
              Close
            </Button>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#2EA5DD",
    marginBottom: 40,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "sans-serif",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  desc: {
    fontSize: 15,
    marginBottom: 5,
    marginHorizontal: 40,
    color: "rgba(112, 112, 112, 1)",
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "sans-serif",
  },
});
