import axios from "axios";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "vasusharma656@gmail.com",
      password: "123",
      name: "Vasu Sharma",
      phone: "9906330301",
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
  verifyOTP() {
    let otp = this.state.otp;
    if (otp === "1234") {
      axios
        .patch(`${global.config.host}/user/verify`, this.state)
        .then(res => {
          if (res.status === 200) {
            Alert.alert("CirQuip", "Successfully Verified");
          } else {
            Alert.alert("Error", "Verification failed");
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Alert.alert("Error", "Verification failed");
    }
  }
  handleSignUp() {
    if (this.state.password !== this.state.password2) {
      Alert.alert("Error", "Passwords Don't Match");
      return;
    }
    let collegeName = this.state.college;
    let regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    collegeName = collegeName.toLowerCase().replace(regex, "");
    console.log(collegeName);
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
        Alert.alert("CirQuip", "OTP has been sent to your email ID!");
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter OTP"
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ otp: text })}
              maxLength={4}
            ></TextInput>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                this.verifyOTP;
              }}
            >
              <Text style={styles.loginText}>Verify</Text>
            </TouchableOpacity>
          </View>
        );
      })
      .catch(err => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
        this.props.handleStatus(false);
      });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.logo}>CirQuip</Text>
          {this.state.toggleSignUp ? (
            <>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.name}
                  style={styles.inputText}
                  placeholder="Name..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ name: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.college}
                  style={styles.inputText}
                  placeholder="College..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ college: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  textContentType={"emailAddress"}
                  placeholder="Email..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  maxLength={10}
                  value={this.state.phone}
                  textContentType={"telephoneNumber"}
                  keyboardType={"phone-pad"}
                  style={styles.inputText}
                  placeholder="Phone"
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ phone: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.password}
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Password..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.password2}
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Confirm Password..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ password2: text })}
                />
              </View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.handleSignUp()}
              >
                <Text style={styles.loginText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSignUp()}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  placeholder="Email..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  value={this.state.password}
                  style={styles.inputText}
                  placeholder="Password..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
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
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSignUp()}>
                <Text style={styles.loginText}>Signup</Text>
              </TouchableOpacity>
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
    backgroundColor: "#003f5c",
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
});
