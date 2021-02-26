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

  const resend = async () => {
    let token = await AsyncStorage.getItem("cirquip-auth-token");
    axios
      .post(
        `${global.config.host}/user/resendOtp`,
        {
          email: mailId,
          otp: validOTP,
        },
        {
          headers: { "cirquip-auth-token": token },
        }
      )
      .then(res => {
        if (res.status === 200) {
          Alert.alert("OTP Resent!");
        } else {
          Alert.alert("Something went wrong!");
        }
      })
      .catch(e => console.log(e));
  };
  const verifyOtp = () => {
    if (otp === validOTP) {
      axios
        .patch(`${global.config.host}/user/verify/${mailId}`)
        .then(res => {
          if (res.status === 200) {
            Alert.alert("CirQuip", "Successfully Verified");
            navigation.navigate("Home");
          } else {
            Alert.alert("Error", "Verification failed");
            navigation.closeDrawer();
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
        placeholderTextColor="grey"
        onChangeText={text => setOTP(text)}
        maxLength={4}
        keyboardType="phone-pad"
      ></TextInput>
      <TouchableOpacity style={styles.reset} onPress={resend}>
        <Text style={{ color: "#2ea5dd" }}>Didn't receive OTP? Resend</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          verifyOtp();
        }}
      >
        <Text style={styles.loginText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "grey", marginTop: 50 }}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
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
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    color: "rgba(159,159,159,1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    borderWidth: 2,
    width: "40%",
    borderBottomColor: "rgba(43, 164, 219, 0.6313725490196078)",
    borderColor: "transparent",
    // sfontFamily: "Segoe UI",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 5,
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
  reset: {
    alignItems: "center",
    fontSize: 14,
    marginTop: 20,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "rgba(43, 164, 219, 0.6313725490196078)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 0,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    // marginBottom: 100,
  },
});
