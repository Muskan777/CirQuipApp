import axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp1 from "../components/SignUp1";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Avatar } from "react-native-paper";
import OTP from "./OTP";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      college: "",
      password2: "",
      role: "",
      toggleSignUp: false,
      otp: "0000",
      currentPosition: false,
      notifToken: null,
    };
  }

  registerForPushNotificationsAsync = async () => {
    //if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ notifToken: token });
    //} else {
    //alert("Must use physical device for Push Notifications");
    //}

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }
  async handleLogin() {
    if (this.state.password === "") {
      Alert.alert("CirQuip", "Please Enter Password");
      return;
    }
    await axios
      .post(`${global.config.host}/user/login`, this.state)
      .then(async res => {
        try {
          console.log("response", res.data);
          this.props.setUser(res.data);
          this.props.setVerified(res.data.verified);
          await AsyncStorage.setItem("cirquip-auth-token", res.data.token);
          await AsyncStorage.setItem("user", res.data._id);
          await AsyncStorage.setItem("email", res.data.email);
          let info = { likes: res.data.likes ? res.data.likes : [] };
          await AsyncStorage.setItem("info", JSON.stringify(info));
          await AsyncStorage.setItem("notifToken", this.state.notifToken);
          this.props.handleStatus(true);
        } catch (err) {
          console.log(err);
          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch(err => {
        Alert.alert(
          "Error",
          err?.response?.data ? err?.response?.data : "Something went wrong"
        );
      });
  }
  toggleSignUp() {
    this.setState({ toggleSignUp: !this.state.toggleSignUp });
    this.setState({ currentPosition: 0 });
  }

  onPageChange(position) {
    this.setState({ currentPosition: position });
  }

  handleSignUp() {
    if (this.state.firstname.trim() === "") {
      Alert.alert("Name Error", "Name cannot be empty");
      return;
    }

    var phoneno = /^\d{10}$/;

    if (!this.state.phone.match(phoneno)) {
      Alert.alert("Phone error", "Enter a valid phone number");
      return;
    }

    if (this.state.password !== this.state.password2) {
      Alert.alert("Error", "Passwords Don't Match");
      return;
    }
    let collegeName = this.state.college;
    let regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    collegeName = collegeName.toLowerCase().replace(regex, "");
    let emailId = this.state.email;
    if (this.state.college == "COEP") {
      if (emailId.split("@")[1] !== "coep.ac.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "VJTI") {
      if (emailId.split("@")[1] !== "vjti.ac.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "VIT") {
      if (emailId.split("@")[1] !== "vit.edu") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "PICT") {
      if (emailId.split("@")[1] !== "pict.edu") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "PCCOE") {
      if (emailId.split("@")[1] !== "pccoepune.org") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "MIT") {
      if (emailId.split("@")[1] !== "mitwpu.edu.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "VIIT") {
      if (emailId.split("@")[1] !== "viit.ac.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "Sandeep University") {
      if (emailId.split("@")[1] !== "sandipuniversity.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "VU") {
      if (emailId.split("@")[1] !== "vupune.ac.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    } else if (this.state.college == "IIIT Pune") {
      if (emailId.split("@")[1] !== "iiitp.ac.in") {
        Alert.alert("CirQuip", "Please use valid college email address");
        return;
      }
    }

    axios
      .post(`${global.config.host}/user/register`, this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
        this.props.handleStatus(false);
      });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.toggleSignUp ? (
            <>
              {this.state.currentPosition === 0 ? (
                <>
                  {console.log(this.state)}
                  <SignUp1 />
                  <Text style={styles.createAcc}>Create account</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      value={this.state.firstname}
                      style={styles.inputText}
                      placeholder="First Name"
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ firstname: text })}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      value={this.state.lastname}
                      style={styles.inputText}
                      placeholder="Last Name"
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ lastname: text })}
                    />
                  </View>
                  {/* <View style={styles.line}></View> */}
                  {/* <View style={styles.inputView}>
                    <TextInput
                      value={this.state.email}
                      style={styles.inputText}
                      textContentType={"emailAddress"}
                      placeholder="Email..."
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ email: text })}
                    />
                  </View> */}
                  {/* <View style={styles.line}></View> */}

                  {/* <View style={styles.line}></View> */}
                  <View style={styles.inputView}>
                    <TextInput
                      value={this.state.password}
                      secureTextEntry
                      style={styles.inputText}
                      placeholder="Password"
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ password: text })}
                    />
                  </View>
                  {/* <View style={styles.line}></View> */}
                  <View style={styles.inputView}>
                    <TextInput
                      value={this.state.password2}
                      secureTextEntry
                      style={styles.inputText}
                      placeholder="Confirm Password"
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ password2: text })}
                    />
                  </View>
                  {/* <View style={styles.line}></View> */}
                  <View style={styles.inputView}>
                    <TextInput
                      maxLength={10}
                      value={this.state.phone}
                      textContentType={"telephoneNumber"}
                      keyboardType={"phone-pad"}
                      style={styles.inputText}
                      placeholder="Mobile no."
                      placeholderTextColor="grey"
                      onChangeText={text => this.setState({ phone: text })}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.signupBtn, { marginBottom: 20 }]}
                    onPress={() => this.onPageChange(1)}
                  >
                    <Text style={styles.loginText}>SIGN UP</Text>
                  </TouchableOpacity>
                  <View style={styles.already1}>
                    <Text style={styles.already}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => this.toggleSignUp()}>
                      <Text style={styles.already2}> SIGN IN</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : this.state.currentPosition === 1 ? (
                <>
                  <View style={styles.drops}>
                    <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>Please Select</Text>
                      <Text style={styles.textStyle}>Your Account Type</Text>
                    </View>
                    <DropDownPicker
                      items={[
                        { label: "Student", value: "Student" },
                        { label: "Faculty", value: "Faculty" },
                        { label: "Alumni", value: "Alumni" },
                        { label: "Club", value: "Club" },
                      ]}
                      defaultNull
                      placeholder="Account Type"
                      dropDownMaxHeight={130}
                      selectedLabelStyle={{
                        color: "grey",
                      }}
                      containerStyle={styles.dropContainer}
                      placeholderStyle={styles.placeholder}
                      dropDownStyle={styles.dropDown}
                      activeLabelStyle={styles.activeLabel}
                      activeItemStyle={styles.activeItem}
                      style={styles.picker}
                      labelStyle={styles.label}
                      arrowColor="grey"
                      arrowSize={30}
                      onChangeItem={item => {
                        this.setState({ role: item.value });
                      }}
                    />
                    <DropDownPicker
                      items={[
                        { label: "COEP", value: "COEP" },
                        { label: "VJTI", value: "VJTI" },
                        { label: "VIT", value: "VIT" },
                        { label: "DY", value: "DY" },
                        { label: "PICT", value: "PICT" },
                        { label: "PCCOE", value: "PCCOE" },
                        { label: "MIT", value: "MIT" },
                        { label: "VIIT", value: "VIIT" },
                        {
                          label: "Sandeep University",
                          value: "Sandeep University",
                        },
                        { label: "VU", value: "VU" },
                        { label: "IIIT Pune", value: "IIIT Pune" },
                      ]}
                      defaultNull
                      placeholder="College Name"
                      dropDownMaxHeight={130}
                      selectedLabelStyle={{
                        color: "grey",
                      }}
                      containerStyle={styles.dropContainer}
                      placeholderStyle={styles.placeholder}
                      dropDownStyle={styles.dropDown}
                      activeLabelStyle={styles.activeLabel}
                      activeItemStyle={styles.activeItem}
                      style={styles.picker}
                      labelStyle={styles.label}
                      arrowColor="grey"
                      arrowSize={30}
                      onChangeItem={item => {
                        this.setState({ college: item.value });
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.onPageChange(0)}>
                    <Text style={{ fontSize: 16, color: "grey" }}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => this.onPageChange(2)}
                  >
                    <Text style={styles.loginText}>NEXT</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => this.toggleSignUp()}>
                    <Text style={styles.loginText}>Sign In</Text>
                  </TouchableOpacity> */}
                </>
              ) : this.state.currentPosition === 2 ? (
                <>
                  <ScrollView style={{ width: "100%" }}>
                    <View
                      style={
                        (styles.container,
                        { marginTop: 100, alignItems: "center" })
                      }
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>Enter</Text>
                        <Text style={styles.textStyle}>
                          Your College Email Id
                        </Text>
                      </View>
                      <View style={styles.inputView}>
                        <TextInput
                          value={this.state.email}
                          style={styles.inputText}
                          placeholder="Email Id"
                          placeholderTextColor="grey"
                          onChangeText={text => this.setState({ email: text })}
                        />
                      </View>
                      <TouchableOpacity onPress={() => this.onPageChange(1)}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "grey",
                            marginTop: 200,
                          }}
                        >
                          Go Back
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => {
                          this.onPageChange(3);
                          this.handleSignUp();
                        }}
                      >
                        <Text style={styles.loginText}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </>
              ) : this.state.currentPosition === 3 ? (
                <>
                  <ScrollView style={{ width: "100%", height: "100%" }}>
                    <View style={{ marginTop: 80 }}>
                      <View style={styles.container}>
                        <Text
                          style={{
                            color: "rgba(39, 40, 51, 1)",
                            fontSize: 24,
                            fontWeight: "600",
                          }}
                        >
                          Enter the 4 digit code sent to:
                        </Text>
                        <Text
                          style={{
                            color: "rgba(46, 165, 221, 1)",
                            fontSize: 25,
                            fontWeight: "600",
                            marginVertical: 10,
                          }}
                        >
                          {this.state.email}
                        </Text>
                        <Text
                          style={{
                            color: "rgba(103, 104, 112, 1)",
                            fontSize: 14,
                            fontWeight: "100",
                          }}
                        >
                          We've sent a 4 digit code to your email address.
                        </Text>
                        <Text
                          style={{
                            color: "rgba(103, 104, 112, 1)",
                            fontSize: 14,
                            fontWeight: "100",
                          }}
                        >
                          Please enter the verification code.
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            marginTop: 70,
                            alignItems: "center",
                          }}
                        >
                          <View style={{ width: "100%" }}>
                            <OTP />
                          </View>
                        </View>

                        <TouchableOpacity onPress={() => this.onPageChange(5)}>
                          <Text
                            style={{
                              color: "grey",
                              marginTop: 20,
                              marginBottom: 230,
                            }}
                          >
                            Skip
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </>
              ) : this.state.currentPosition === 4 ? (
                <>
                  <ScrollView style={{ width: "100%", height: "100%" }}>
                    <View style={{ marginTop: 150 }}>
                      <View style={styles.container}>
                        <View
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            backgroundColor:
                              "rgba(168, 126, 111, 0.10196078431372549)",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Avatar.Icon
                            size={120}
                            color="white"
                            icon="check"
                            style={{ backgroundColor: "rgba(46, 165, 221, 1)" }}
                          />
                        </View>
                        <View
                          style={{
                            width: "100%",
                            marginTop: 50,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 27, marginBottom: 10 }}>
                            Email Verified
                          </Text>
                          <Text
                            style={{
                              color: "rgba(141, 141, 141, 1)",
                              marginBottom: 170,
                            }}
                          >
                            Your email id has been verified.
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.nextBtn}
                          onPress={() => this.onPageChange()}
                        >
                          <Text style={styles.loginText}>CONTINUE</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </>
              ) : (
                <>
                  <ScrollView style={{ width: "100%" }}>
                    <View
                      style={
                        (styles.container,
                        { marginTop: 100, alignItems: "center" })
                      }
                    >
                      <View style={styles.textContainer}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "rgba(141, 141, 141, 1)",
                          }}
                        >
                          Congratulations, You Are Just A Step Away To
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "rgba(141, 141, 141, 1)",
                          }}
                        >
                          Connect To Your College Remotely!
                        </Text>
                      </View>
                      <View style={styles.inputView}>
                        <TextInput
                          value={this.state.branch}
                          style={styles.inputText}
                          placeholder="Branch Name"
                          placeholderTextColor="grey"
                          onChangeText={text => this.setState({ branch: text })}
                        />
                      </View>
                      <View style={styles.inputView}>
                        <TextInput
                          value={this.state.year}
                          style={styles.inputText}
                          keyboardType={"phone-pad"}
                          placeholder="Admission Year"
                          maxLength={4}
                          placeholderTextColor="grey"
                          onChangeText={text => this.setState({ year: text })}
                        />
                      </View>
                      <View
                        style={{
                          width: "100%",
                          marginTop: 90,
                          marginBottom: 70,
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={styles.nextBtn}
                          onPress={() => this.toggleSignUp()}
                        >
                          <Text style={styles.loginText}>FINISH</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </>
              )}
            </>
          ) : (
            <>
              <SignUp1 />
              <View>
                <Text style={styles.loginHeader}>Login to your account</Text>
              </View>
              <View style={styles.loginfield}></View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  placeholder="Email Id."
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ email: text })}
                  selectionColor="cyan"
                />
              </View>
              {/* <View style={styles.line}></View> */}
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  value={this.state.password}
                  style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              {/* <View style={styles.line}></View> */}

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Under Developement",
                    "The Developers are lazy :)"
                  )
                }
              >
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.handleLogin()}
              >
                <Text style={styles.loginText}>GET STARTED</Text>
              </TouchableOpacity>
              <View style={styles.already1}>
                <Text style={styles.already}>Don't have an account yet?</Text>
                <TouchableOpacity onPress={() => this.toggleSignUp()}>
                  <Text style={styles.already2}> SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    //height: Dimensions.get("window").height,
  },
  createAcc: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 23,
    color: "rgba(112, 112, 112, 1)",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  drops: {
    marginTop: 100,
    marginBottom: 120,
    alignContent: "center",
    alignItems: "center",
  },
  dropContainer: {
    marginHorizontal: 65,
    height: 47,
    width: "65%",
    marginBottom: 10,
    alignItems: "center",
  },
  placeholder: {
    color: "grey",
    fontSize: 16,
    lineHeight: 28,
  },
  dropDown: {
    width: 265,
    backgroundColor: "#fff",
    color: "grey",
  },
  activeItem: {
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "grey",
  },
  activeLabel: {
    color: "grey",
  },
  label: {
    color: "grey",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
  },
  picker: {
    backgroundColor: "transparent",
    color: "rgba(43, 164, 219, 0.6313725490196078)",
    borderWidth: 2,
    borderColor: "rgba(46, 165, 221, 0.5724890232086182)",
  },
  inputView: {
    color: "rgba(159,159,159,1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    // sfontFamily: "Segoe UI",
    flex: 1,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "rgba(46, 165, 221, 0.5724890232086182)",
    textAlign: "center",
    paddingVertical: 0,
    paddingBottom: 0,
    paddingHorizontal: 10,
    width: "65%",
    marginTop: 0,
    marginBottom: 10,
  },
  inputText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    // fontFamily: "Segoe UI",
    textAlign: "left",
    paddingVertical: 0,
    marginTop: 6,
    marginBottom: 6,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "65%",
    backgroundColor: "rgba(46, 165, 221, 1)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 15,
  },
  signupBtn: {
    width: "65%",
    backgroundColor: "rgbargba(46, 165, 221, 1)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 15,
  },
  nextBtn: {
    width: "65%",
    backgroundColor: "rgbargba(46, 165, 221, 1)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 72,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    zIndex: 0,
    // marginBottom: 100,
  },
  signUpText: {
    color: "rgba(43, 164, 219, 0.6313725490196078)",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  line: {
    width: "65%",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 1,
    marginBottom: 10,
  },
  already: {
    color: "rgba(112, 112, 112, 1)",
    fontSize: 13,
    fontWeight: "300",
    fontStyle: "normal",
    // fontFamily: "Avenir",
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
  },
  already2: {
    color: "rgba(46, 165, 221, 1)",
    fontSize: 13,
    fontWeight: "300",
    fontStyle: "normal",
    // fontFamily: "Avenir",
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
  },
  loginfield: {
    marginTop: 30,
  },
  already1: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginBottom: 30,
  },
  textStyle: {
    color: "rgba(141, 141, 141, 1)",
    fontSize: 22,
  },
  loginHeader: {
    fontSize: 25,
    color: "rgba(46, 165, 221, 1)",
    fontWeight: "700",
    marginTop: 92,
  },
});
