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
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTP({ email, navigation, onPageChange }) {
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
    } else {
      getDataMail(email);
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

  function getDataMail(email) {
    let user;
    axios
      .get(`${global.config.host}/user/getUserWithEmail/${email}`)
      .then(res => {
        user = res.data;
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
          Toast.show("OTP Resent!", Toast.SHORT, ["UIAlertController"]);
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
            Toast.show("Successfuly Verified", Toast.SHORT, [
              "UIAlertController",
            ]);
            if (navigation) {
              navigation.navigate("Home");
            } else {
              onPageChange(4);
            }
          } else {
            Toast.show("Verification Failed!", Toast.SHORT, [
              "UIAlertController",
            ]);
            navigation.closeDrawer();
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Toast.show("Verification Failed!", Toast.SHORT, ["UIAlertController"]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.top1}>An OTP has been sent to</Text>
      <Text style={styles.top2}>{email}</Text>
      <TextInput
        style={styles.inputView}
        placeholder="Enter OTP"
        placeholderTextColor="grey"
        onChangeText={text => setOTP(text)}
        maxLength={4}
        keyboardType="phone-pad"
      ></TextInput>
      <TouchableOpacity style={styles.reset} onPress={resend}>
        <Text style={{ color: "grey" }}>Didn't receive OTP?</Text>
        <Text style={{ color: "#2ea5dd" }}>Request new code.</Text>
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
          if (navigation) {
            navigation.navigate("Home");
          }
        }}
      >
        <Text style={{ color: "grey", marginTop: 50 }}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "60%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
  },
  top1: {
    fontSize: 30,
    marginBottom: 10,
  },
  top2: {
    fontSize: 25,
    color: "#2ea5dd",
    marginBottom: 30,
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
    width: 200,
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
