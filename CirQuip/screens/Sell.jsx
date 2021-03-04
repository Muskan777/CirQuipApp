import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import {
  Appbar,
  Title,
  IconButton,
  Button,
  Card,
  Paragraph,
} from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import StepIndicator from "expo-step-indicator";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clockRunning } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
import Toast from "react-native-simple-toast";

// #003f5c
export default class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      pPrice: "",
      currentPosition: 0,
      pName: "",
      pDetails: "",
    };
  }
  labels = ["Product Details", "Attachments", "Preview"];
  customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#287EC1",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#287EC1",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#287EC1",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#287EC1",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#287EC1",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fff",
    stepIndicatorLabelFinishedColor: "#fff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 15,
    currentStepLabelColor: "#287EC1",
  };
  onPageChange(position) {
    if (position === 1) {
      if (this.state.pPrice && this.state.pName && this.state.pDetails) {
        this.setState({ currentPosition: position });
      } else {
        Toast.show("Please fill in all the details", Toast.SHORT, [
          "UIAlertController",
        ]);
      }
    } else if (position == 2) {
      if (this.state.image) {
        this.setState({ currentPosition: position });
      } else {
        Toast.show("Image needs to be added!", Toast.SHORT, [
          "UIAlertController",
        ]);
      }
    } else {
      this.setState({ currentPosition: position });
    }
  }
  componentDidUpdate() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      let image = this.props.route?.params?.images[0];
      console.log("Image received");
      if (image) {
        this.setState({ image: image });
      }
    });
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
    (async () => {
      let user = await AsyncStorage.getItem("user");
      this.setState({ id: user });
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "CirQuip",
            "We need camera/gallery paermission to upload photos"
          );
        }
      }
    })();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log(result.type);

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  };

  pushToSale = async () => {
    console.log(this.state);
    await AsyncStorage.getItem("cirquip-auth-token")
      .then(async token => {
        axios
          .post(`${global.config.host}/shop/addProduct`, this.state, {
            headers: {
              "cirquip-auth-token": token,
            },
          })
          .then(res => {
            console.log("Here");
            this.setState({ published: true });
            //Alert.alert("Success", "Your Product Is Live");
            this.props.navigation.navigate("Published", {
              screen: "Published",
              params: { type: "Sell" },
            });
          })
          .catch(e => {
            Alert.alert("Error", "Something went wrong");
            console.log(e);
          });
      })
      .catch(err =>
        Alert.alert("Error", "Something went wrong in authentication !")
      );
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 28,
              alignItems: "center",
              width: width,
              justifyContent: "center",
              paddingTop: Platform.OS === "android" ? 25 : 0,
            }}
          >
            <IconButton
              icon="arrow-left"
              color="#2EA5DD"
              size={30}
              style={{ alignItems: "flex-start" }}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={{ ...styles.header }}>
              {this.labels[this.state.currentPosition]}
            </Text>
          </View>
          <StepIndicator
            stepCount={3}
            customStyles={this.customStyles}
            currentPosition={this.state.currentPosition}
            useNativeDriver={true}
            labels={this.labels}
          />
          <View
            style={{
              height: 2,
              marginTop: 3,
              marginBottom: 3,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />
          {this.state.currentPosition === 0 ? (
            <ScrollView style={{ marginTop: 10 }}>
              <Text style={styles.logo}>Product Name</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.pName}
                  style={styles.inputText}
                  placeholder="Product Name..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  onChangeText={text => this.setState({ pName: text })}
                />
              </View>
              <Text style={styles.logo}>Product Price</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.pPrice}
                  style={styles.inputText}
                  keyboardType={"number-pad"}
                  placeholder="Product Price..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  onChangeText={text => this.setState({ pPrice: text })}
                />
              </View>
              <Text style={styles.logo}>Product Details</Text>
              <View
                style={{
                  ...styles.inputView,
                  height: 80,
                  paddingTop: 0,
                  paddingBottom: 0,
                  justifyContent: "flex-start",
                }}
              >
                <TextInput
                  multiline
                  value={this.state.pDetails}
                  style={{ ...styles.inputText, height: 80 }}
                  placeholder="Product Details..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  onChangeText={text => this.setState({ pDetails: text })}
                />
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 100,
                  padding: 10,
                }}
              >
                <Button
                  mode="contained"
                  style={{
                    margin: 5,
                    backgroundColor: "#2EA5DD",
                    width: "90%",
                    alignSelf: "center",
                    fontSize: 14,
                    fontWeight: "400",
                    fontStyle: "normal",
                    fontFamily: "SF Pro Text",
                  }}
                  onPress={() => this.onPageChange(1)}
                >
                  Next
                </Button>
              </View>
            </ScrollView>
          ) : this.state.currentPosition === 1 ? (
            <>
              <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.logo}>Upload Product Image</Text>
                {this.state.image && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: `data:image/jpg;base64,${this.state.image}`,
                      }}
                      style={{ width: 200, height: 200 }}
                    />
                  </View>
                )}
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    width: width,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    mode="contained"
                    icon="folder"
                    style={{
                      backgroundColor: "rgba(104, 125, 219, 1)",
                      width: 150,
                      color: "rgba(245, 246, 250, 1)",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                    onPress={() => this.pickImage()}
                  >
                    Browse Files
                  </Button>
                  <Button
                    mode="contained"
                    icon="camera"
                    style={{
                      backgroundColor: "rgba(104, 125, 219, 1)",
                      width: 150,
                      color: "rgba(245, 246, 250, 1)",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("SellProductsCamera");
                    }}
                  >
                    Camera
                  </Button>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    width: width,
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    height: 200,
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    mode="contained"
                    style={{
                      margin: 5,
                      backgroundColor:
                        "rgba(189, 196, 204, 0.14901960784313725)",
                      width: 125,
                      height: 50,
                      justifyContent: "center",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                    onPress={() => this.onPageChange(0)}
                  >
                    <Text style={{ color: "#000" }}>Previous</Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={{
                      margin: 5,
                      backgroundColor: "#2EA5DD",
                      justifyContent: "center",
                      width: 125,
                      height: 50,
                      fontWeight: "400",
                      fontStyle: "normal",
                      fontFamily: "SF Pro Text",
                    }}
                    onPress={() => this.onPageChange(2)}
                  >
                    Next
                  </Button>
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <ScrollView
                justifyContent="center"
                style={{
                  marginTop: 10,
                  alignContent: "center",
                }}
              >
                <Text style={{ ...styles.logo, alignSelf: "center" }}>
                  Preview Product
                </Text>
                {this.state.image && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: `data:image/jpg;base64,${this.state.image}`,
                        //uri: `${this.state.image}`,
                      }}
                      style={{ width: (3 * width) / 4, height: 300 }}
                    />
                  </View>
                )}
                <View style={{ alignItems: "center", padding: 10 }}>
                  <Title
                    style={{
                      color: "#000",
                      fontSize: 20,
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {this.state.pName}
                  </Title>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 12,
                      fontWeight: "400",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Details
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      lineHeight: 32,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {this.state.pDetails}
                  </Text>
                  <Title
                    style={{
                      color: "rgba(146, 146, 146, 1)",
                      fontSize: 14,
                      fontFamily: "sans-serif",
                    }}
                  >
                    PRICE
                  </Title>
                  <Text
                    style={{
                      fontSize: 21,
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      color: "#000",
                    }}
                  >
                    ₹{this.state.pPrice}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 75,
                      fontFamily: "sans-serif",
                      color: "#000",
                      fontWeight: "400",
                    }}
                  >
                    CirQuip will help you find best buyer in minimum
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      color: "#000",
                      fontWeight: "400",
                    }}
                  >
                    time within your college.
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "space-between",
                    width: width,
                    display: "flex",
                    flexDirection: "row",
                    height: 120,
                    padding: 20,
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    mode="contained"
                    style={{
                      margin: 5,
                      backgroundColor:
                        "rgba(189, 196, 204, 0.14901960784313725)",
                      width: 125,
                      height: 50,
                      justifyContent: "center",
                      color: "rgba(0, 0, 0, 1)",
                    }}
                    onPress={() => this.onPageChange(1)}
                  >
                    <Text style={{ color: "#000" }}>Back</Text>
                  </Button>
                  <Button
                    mode="contained"
                    icon="check"
                    style={{
                      margin: 5,
                      backgroundColor: "#2EA5DD",
                      justifyContent: "center",
                      width: 125,
                      height: 50,
                      fontWeight: "400",
                      fontStyle: "normal",
                      fontFamily: "SF Pro Text",
                    }}
                    onPress={() => {
                      this.pushToSale();
                    }}
                  >
                    Sell
                  </Button>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "flex-start",
  },
  header: {
    color: "#2EA5DD",
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    textAlign: "center",
    //marginLeft: 80,
  },
  inputView: {
    width: "100%",
    backgroundColor: "#fff",
    height: 50,
    marginBottom: 12,
    borderBottomWidth: 1.8,
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontSize: 18,
    height: 50,
    color: "#000",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "sans-serif",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "sans-serif",
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
    fontStyle: "normal",
    fontWeight: "400",
    marginTop: 30,
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
});

//<Image
//style={{ height: 25.2, width: 30, marginLeft: 20 }}
//source={require("../assets/menu_sells.png")}
///>;
