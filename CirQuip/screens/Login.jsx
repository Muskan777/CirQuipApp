import axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp1 from "../components/SignUp1";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from "expo-notifications";
import { Avatar, Checkbox } from "react-native-paper";
import OTP from "./OTP";
const { width, height } = Dimensions.get("window");
import Toast from "react-native-simple-toast";

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
      currentPosition: false,
      notifToken: null,
      termsAgreed: false,
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
      Toast.show(
        "Failed to get push token for push notification!",
        Toast.SHORT,
        ["UIAlertController"]
      );

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
      Toast.show("CirQuip, Please Enter Password", Toast.SHORT, [
        "UIAlertController",
      ]);
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
          Toast.show("Error,Something went wrong", Toast.SHORT, [
            "UIAlertController",
          ]);
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

  onPageChange = position => {
    this.setState({ currentPosition: position });
  };

  async handleSignUp() {
    if (this.state.firstname.trim() === "") {
      Toast.show("Name Error, Name cannot be empty", Toast.SHORT, [
        "UIAlertController",
      ]);
      return 1;
    }

    var phoneno = /^\d{10}$/;

    if (!this.state.phone.match(phoneno)) {
      Toast.show("Phone error, Enter a valid phone number", Toast.SHORT, [
        "UIAlertController",
      ]);
      return 1;
    }

    if (this.state.password !== this.state.password2) {
      Toast.show("Error, Passwords Don't Match", Toast.SHORT, [
        "UIAlertController",
      ]);
      return 1;
    }
    let collegeName = this.state.college;
    let regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    collegeName = collegeName.toLowerCase().replace(regex, "");
    let emailId = this.state.email;
    if (this.state.role != "Alumnus" || this.state.role != "Alumni") {
      if (this.state.college == "COEP") {
        if (emailId.split("@")[1] !== "coep.ac.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "VJTI") {
        if (emailId.split("@")[1] !== "vjti.ac.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "VIT") {
        if (emailId.split("@")[1] !== "vit.edu") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "PICT") {
        if (emailId.split("@")[1] !== "pict.edu") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "PCCOE") {
        if (emailId.split("@")[1] !== "pccoepune.org") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "MIT") {
        if (emailId.split("@")[1] !== "mitwpu.edu.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "VIIT") {
        if (emailId.split("@")[1] !== "viit.ac.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "Sandeep University") {
        if (emailId.split("@")[1] !== "sandipuniversity.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "VU") {
        if (emailId.split("@")[1] !== "vupune.ac.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      } else if (this.state.college == "IIIT Pune") {
        if (emailId.split("@")[1] !== "iiitp.ac.in") {
          Toast.show(
            "CirQuip, Please use valid college email address",
            Toast.SHORT,
            ["UIAlertController"]
          );
          return 1;
        }
      }
    }

    await axios
      .post(`${global.config.host}/user/register`, this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
        // this.props.handleStatus(false);
      });
  }

  async axiosSignup() {
    console.log("state", this.state);
    await axios
      .patch(`${global.config.host}/user/updatedata`, this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
        // this.props.handleStatus(false);
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Checkbox
                      status={this.state.termsAgreed ? "checked" : "unchecked"}
                      color="#2ea5dd"
                      onPress={() => {
                        let curr = this.state.termsAgreed;
                        this.setState({ termsAgreed: !curr });
                      }}
                    />
                    <Text>
                      I agree to the{" "}
                      <Text
                        style={{ color: "#2ea5dd" }}
                        onPress={() => {
                          Linking.openURL(
                            "https://www.cirquip.com/termsandconditions"
                          );
                        }}
                      >
                        Terms and Conditions
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.signupBtn, { marginBottom: 20 }]}
                    onPress={() => {
                      if (this.state.termsAgreed) {
                        this.onPageChange(1);
                      } else {
                        Alert.alert(
                          "Terms and Conditions",
                          "Please agree to the terms and conditions to continue. The detailed terms and conditions are available at www.cirquip.com/termsandconditions"
                        );
                      }
                    }}
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
                  <View
                    style={{
                      alignItems: "center",
                      width: width,
                      height: height,
                    }}
                  >
                    <View style={styles.drops}>
                      <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>Please Select</Text>
                        <Text style={styles.textStyle}>Your Account Type</Text>
                      </View>
                      <DropDownPicker
                        items={[
                          { label: "Student", value: "Student" },
                          { label: "Faculty", value: "Faculty" },
                          { label: "Alumnus", value: "Alumnus" },
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
                      <Text style={{ fontSize: 16, color: "grey" }}>
                        Go Back
                      </Text>
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
                  </View>
                </>
              ) : this.state.currentPosition === 2 ? (
                <>
                  {console.log(this.state)}

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
                        onPress={async () => {
                          let valid = await this.handleSignUp();
                          if (valid !== 1) {
                            this.onPageChange(3);
                          }
                        }}
                      >
                        <Text style={styles.loginText}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </>
              ) : this.state.currentPosition === 3 ? (
                <OTP
                  email={this.state.email}
                  onPageChange={this.onPageChange}
                />
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
                            textAlign: "center",
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
                          onChangeText={text =>
                            this.setState({ admissionYear: text })
                          }
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
                          onPress={() => {
                            this.axiosSignup();
                            this.toggleSignUp();
                          }}
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
              <ScrollView>
                <View
                  style={{
                    marginTop: 40,
                    alignItems: "center",
                    width: width,
                    height: "100%",
                  }}
                >
                  <SignUp1 />
                  <Text style={styles.loginHeader}>Login to your account</Text>
                  <View style={styles.loginfield}></View>
                  <View style={styles.inputView}>
                    <TextInput
                      value={this.state.email}
                      style={styles.inputText}
                      placeholder="Email ID"
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

                  {/* <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Under Developement",
                      "The Developers are lazy :)"
                    )
                  }
                >
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => this.handleLogin()}
                  >
                    <Text style={styles.loginText}>GET STARTED</Text>
                  </TouchableOpacity>
                  <View style={styles.already11}>
                    <Text style={styles.already}>
                      Don't have an account yet?
                    </Text>
                    <TouchableOpacity onPress={() => this.toggleSignUp()}>
                      <Text style={styles.already2}> SIGN UP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
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
    width: 295,
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
    fontFamily: "",
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
    height: 40,
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
    marginTop: 15,
    marginBottom: 20,
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
    fontFamily: "",
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
    fontFamily: "",
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
  },
  already2: {
    color: "rgba(46, 165, 221, 1)",
    fontSize: 13,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
  },
  loginfield: {
    marginTop: 30,
  },
  already11: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  already1: {
    flexDirection: "row",
    textAlign: "center",
  },
  textContainer: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginBottom: 30,
    textAlign: "center",
  },
  textStyle: {
    color: "rgba(141, 141, 141, 1)",
    fontSize: 22,
  },
  loginHeader: {
    fontSize: 25,
    color: "rgba(46, 165, 221, 1)",
    fontWeight: "700",
    fontFamily: "",
    marginTop: 92,
  },
});
