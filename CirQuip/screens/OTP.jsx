import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTP({ email, navigation }) {
  const [otp, setOTP] = useState("");
  const [id, setId] = useState("");
  const [mailId, setMailId] = useState(email);
  const [validOTP, setValidOTP] = useState(email);

  useEffect(() => {
    if (mailId === undefined) {
      AsyncStorage.getItem("user").then(id => {
        setId(id);
        getData(id);
      });
    }
  }, []);

  function getData(id) {
    let user;
    axios
      .get(`${global.config.host}/user/getUserWithId/${id}`)
      .then(res => {
        user = res.data;
        setMailId(user.email);
        setValidOTP(user.otp);
      })
      .catch(err => {
        Alert.alert("Error", "Something Went Wrong In Fetching User Data");
        console.log(err);
      });
  }

  const verifyOtp = () => {
    if (otp === validOTP) {
      axios
        .patch(`${global.config.host}/user/verify/${mailId}`)
        .then(res => {
          if (res.status === 200) {
            Alert.alert("CirQuip", "Successfully Verified");
            navigation.pop();
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
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputView}
        placeholder="Enter OTP"
        placeholderTextColor="#fff"
        onChangeText={text => setOTP(text)}
        maxLength={4}
        keyboardType="phone-pad"
      ></TextInput>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          verifyOtp();
        }}
      >
        <Text style={styles.loginText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
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
    textAlign: "center",
    marginBottom: 20,
    justifyContent: "center",
    padding: 10,
    color: "#fff",
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
