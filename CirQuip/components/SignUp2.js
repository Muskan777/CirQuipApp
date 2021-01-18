import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import SignUp1 from "./SignUp1";
import { Formik } from "formik";

export default function SignUp2() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  console.log(name);
  console.log(mobile);
  console.log(email);

  return (
    <SafeAreaView style={styles.begin}>
      <ScrollView>
        <View style={styles.container}>
          <SignUp1 />
        </View>
        <View style={styles.contain}>
          <Formik
            initialValues={{ name: "", mobile: "", email: "" }}
            onSubmit={values => {
              setName(values.name);
              setMobile(values.mobile);
              setEmail(values.email);
            }}
          >
            {props => (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                <View style={styles.line}></View>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile no."
                  onChangeText={props.handleChange("mobile")}
                  value={props.values.mobile}
                  keyboardType="numeric"
                />
                <View style={styles.line}></View>
                <TextInput
                  style={styles.input}
                  placeholder="Email id"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <View style={styles.line}></View>
                <TouchableOpacity
                  onPress={props.handleSubmit}
                  style={styles.appButtonContainer}
                >
                  <Text style={styles.appButtonText}>Next</Text>
                </TouchableOpacity>
                <Text style={styles.already}>
                  Already have an account? Sign In
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  already: {
    color: "rgba(39, 40, 51, 0.7)",
    fontSize: 14,
    fontWeight: "100",
    fontStyle: "normal",
    fontFamily: "Avenir",
    lineHeight: 20,
    marginTop: 10,
  },
  appButtonContainer: {
    elevation: 3,
    backgroundColor: "rgba(54, 181, 165, 0.6313725490196078)",
    borderRadius: 16,
    shadowColor: "rgb(0,0,0)",
    shadowOpacity: 0.32941176470588235,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 119,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  appButtonText: {
    color: "rgba(251, 251, 251, 1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
  },
  begin: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contain: {
    justifyContent: "flex-end",
    alignContent: "center",
    flexDirection: "column",
    height: 1.67 * (Dimensions.get("screen").height / 3) - 20,
  },
  container: {
    marginTop: 20,
    height: Dimensions.get("screen").height / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
  },
  input: {
    color: "rgba(159,159,159,1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "center",
    paddingVertical: 0,
    marginTop: 9,
    marginBottom: 1,
  },
  line: {
    width: "50%",
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
});

