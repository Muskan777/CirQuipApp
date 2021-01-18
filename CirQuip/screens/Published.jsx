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
const width = Dimensions.get("screen").width;

export default class Published extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params,
    };
  }
  async componentDidMount() {
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
            style={{ height: 300, width: 300, marginBottom: 10 }}
          />
          <Text style={styles.logo}>
            Congratulations{" "}
            {JSON.stringify(this.state.user && this.state.user.name)}
          </Text>
          <View style={{ alignSelf: "center", padding: 10 }}>
            <Text style={styles.desc}>• Your product is live now !</Text>
            <Text style={styles.desc}>
              • Reasonable and Less price attracts more buyers.
            </Text>
            <Text style={styles.desc}>
              • Delete your Ads when your product is sold for your convinience.
            </Text>
            <Text style={styles.desc}>
              • Non valuaeble for you is valuaeble for someone, so keep selling
              on CirQuip and help your Community.
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              width: width,
              padding: 10,
            }}
          >
            <Button
              mode="contained"
              icon="check"
              style={{
                margin: 5,
                backgroundColor: "#e73050",
                width: 100,
                alignSelf: "flex-end",
              }}
              onPress={() => this.props.navigation.navigate("Home")}
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
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#e73050",
    marginBottom: 40,
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
    color: "white",
  },
});
