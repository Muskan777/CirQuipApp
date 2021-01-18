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
      toggleSignUp: true,
    };
  }
  handleLogin() {
    Alert.alert("Login", "Logged In");
  }
  toggleSignUp() {
    this.setState({ toggleSignUp: true });
  }
  handleSignUp() {
    if (this.state.password !== this.state.password2) {
      Alert.alert("Error", "Passwords Don't Match");
      return;
    }
    axios
      .post(`${global.config.host}/user/register`, this.state)
      .then(res => {
        Alert.alert("CirQuip", "Registeration Successful");
      })
      .catch(err => {
        console.log(err);
        Alert.alert("CirQuip", "Something went wrong in registeration");
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
                  style={styles.inputText}
                  placeholder="Name..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ name: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="College..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ college: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  textContentType={"emailAddress"}
                  placeholder="Email..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
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
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Password..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
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
            </>
          ) : (
            <>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
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
