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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp1 from "../components/SignUp1";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "aniketj18.instru@coep.ac.in",
      name: "Aniket",
      phone: "7620063711",
      college: "COEP",
      password2: "123",
      role: "Student",
      toggleSignUp: false,
      otp: "0000",
    };
  }
  async handleLogin() {
    await axios
      .post(`${global.config.host}/user/login`, this.state)
      .then(async res => {
        try {
          console.log("response", res.data);
          await AsyncStorage.setItem("cirquip-auth-token", res.data.token);
          await AsyncStorage.setItem("user", res.data._id);
          let info = { likes: res.data.likes ? res.data.likes : [] };
          await AsyncStorage.setItem("info", JSON.stringify(info));
          this.props.handleStatus(true);
        } catch (err) {
          console.log(err);
          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch(err => {
        console.log(
          err?.response?.data ? error.response.data : "Something went wrong"
        );
        Alert.alert(
          "Error",
          err?.response?.data ? err.response.data : "Something went wrong"
        );
      });
  }
  toggleSignUp() {
    this.setState({ toggleSignUp: !this.state.toggleSignUp });
  }

  handleSignUp() {
    if (this.state.name.trim() === "") {
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
    if (collegeName !== "coep" && collegeName !== "collegeofengineeringpune") {
      Alert.alert(
        "CirQuip",
        "We are not in your college yet! Sit tight while we expand!"
      );
      return;
    }
    let emailId = this.state.email;
    if (emailId.split("@")[1] !== "coep.ac.in") {
      Alert.alert("CirQuip", "Please use valid college email address");
      return;
    }
    axios
      .post(`${global.config.host}/user/register`, this.state)
      .then(res => {
        this.props.handleStatus(true);
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
          <SignUp1 />
          {this.state.toggleSignUp ? (
            <>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.name}
                  style={styles.inputText}
                  placeholder="Name..."
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ name: text })}
                />
              </View>
              <View style={styles.line}></View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.college}
                  style={styles.inputText}
                  placeholder="College..."
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ college: text })}
                />
              </View>
              <View style={styles.line}></View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  textContentType={"emailAddress"}
                  placeholder="Email..."
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.line}></View>
              <View style={styles.inputView}>
                <TextInput
                  maxLength={10}
                  value={this.state.phone}
                  textContentType={"telephoneNumber"}
                  keyboardType={"phone-pad"}
                  style={styles.inputText}
                  placeholder="Mobile Number"
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ phone: text })}
                />
              </View>
              <View style={styles.line}></View>
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
              <View style={styles.line}></View>
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
              <View style={styles.line}></View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.handleSignUp()}
              >
                <Text style={styles.loginText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSignUp()}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.already1}>
                <Text style={styles.already}>Already have an account?</Text>
                <TouchableOpacity onPress={() => this.toggleSignUp()}>
                  <Text style={styles.already}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.loginfield}></View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  placeholder="Email Id"
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ email: text })}
                  selectionColor="cyan"
                />
              </View>
              <View style={styles.line}></View>
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
              <View style={styles.line}></View>

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
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSignUp()}>
                <Text style={styles.signUpText}>
                  Don't have an account yet? Signup now!
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    color: "rgba(159,159,159,1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    // sfontFamily: "Segoe UI",
    textAlign: "center",
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 1,
  },
  inputText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    // fontFamily: "Segoe UI",
    textAlign: "center",
    paddingVertical: 0,
    marginTop: 9,
    marginBottom: 1,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "rgba(54, 181, 165, 0.6313725490196078)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 0,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    // marginBottom: 100,
  },
  signUpText: {
    color: "rgba(54, 181, 165, 0.6313725490196078)",
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
    color: "rgba(54, 181, 165, 0.6313725490196078)",
    fontSize: 14,
    fontWeight: "100",
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
});
