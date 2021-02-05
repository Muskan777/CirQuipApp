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
      email: "vasusharma656@gmail.com",
      password: "123",
      name: "Vasu Sharma",
      phone: "9906330301",
      college: "COEP",
      password2: "123",
      role: "Student",
      toggleSignUp: true,
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
    if (this.state.password !== this.state.password2) {
      Alert.alert("Error", "Passwords Don't Match");
      return;
    }
    axios
      .post(`${global.config.host}/user/register`, this.state)
      .then(res => {
        this.props.handleStatus(true);
        Alert.alert("CirQuip", "Registeration Successful");
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
                  placeholder="Mobile no."
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
                  placeholder="Password..."
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
                  placeholder="Confirm Password..."
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
              <Text style = {styles.already}>Already have an account?</Text>
              <TouchableOpacity onPress={()=>this.toggleSignUp()}><Text style= {styles.already}> Sign In</Text></TouchableOpacity>
              </View>
            </>
          ) : (
            <><View style = {styles.loginfield}></View>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.email}
                  style={styles.inputText}
                  placeholder="Email..."
                  placeholderTextColor="grey"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.line}></View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  value={this.state.password}
                  style={styles.inputText}
                  placeholder="Password..."
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
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleSignUp()}>
                <Text style={styles.loginText}>Signup</Text>
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
      marginTop: 9,
      marginBottom: 1,
    
  },
  inputText: {
      color: "black",
      fontSize: 20,
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
    marginTop: 40,
    marginBottom: 0,
    shadowColor: "black",
    elevation: 3,
    shadowOpacity: 0.32941176470588235,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    
  },
  loginText: {
    color: "white",
    fontSize:20,
    fontWeight: '700'
    // marginBottom: 100,
  },
  line: {
    width: "65%",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 1,
    marginBottom: 11,
    shadowColor: "rgb(0,0,0)",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowRadius: 6,
    elevation: 4,
  },
  already: {
    color: "rgba(39, 40, 51, 0.7)",
    fontSize: 14,
    fontWeight: "100",
    fontStyle: "normal",
    // fontFamily: "Avenir",
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
  },
  loginfield: {
    marginTop: 120,
  },
  already1: {
    flexDirection:'row',
    alignItems:'center'
  }
});
