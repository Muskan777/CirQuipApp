import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import {
  Appbar,
  Title,
  Surface,
  Button,
  Card,
  Paragraph,
} from "react-native-paper";
import StepIndicator from "expo-step-indicator";

const { width, height } = Dimensions.get("window");
// #003f5c
export default class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 1,
      pName: "Random Item",
      pDetails: "This product can freak you out, really !",
    };
  }
  labels = ["Product Details", "Attachments", "Preview"];
  customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fb5b5a",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#222",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#222",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fb5b5a",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fb5b5a",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fb5b5a",
  };
  onPageChange(position) {
    this.setState({ currentPosition: position });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <StepIndicator
            stepCount={3}
            customStyles={this.customStyles}
            currentPosition={this.state.currentPosition}
            useNativeDriver={true}
            labels={this.labels}
          />
          <View
            style={{
              height: 2,
              marginTop: 3,
              marginBottom: 3,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />
          {this.state.currentPosition === 0 ? (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.logo}>Product Name</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.pName}
                  style={styles.inputText}
                  placeholder="Product Name..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ pName: text })}
                />
              </View>
              <Text style={styles.logo}>Product Details</Text>
              <View
                style={{
                  ...styles.inputView,
                  height: 100,
                  paddingTop: 0,
                  paddingBottom: 0,
                  justifyContent: "flex-start",
                }}
              >
                <TextInput
                  multiline
                  textContentType={"addressCityAndState"}
                  value={this.state.pDetails}
                  style={{ ...styles.inputText, height: 100 }}
                  placeholder="Product Details..."
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({ pDetails: text })}
                />
              </View>

              <View
                style={{
                  justifyContent: "flex-start",
                  width: width,
                  padding: 10,
                }}
              >
                <Button
                  mode="contained"
                  icon="check"
                  style={{
                    margin: 5,
                    backgroundColor: "#e73050",
                    width: 100,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => this.onPageChange(1)}
                >
                  Next
                </Button>
              </View>
            </View>
          ) : this.state.currentPosition === 1 ? (
            <>
              <View
                style={{
                  justifyContent: "space-between",
                  width: width,
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <Button
                  mode="contained"
                  icon="cancel"
                  style={{
                    alignSelf: "flex-start",
                    margin: 5,
                    backgroundColor: "#e73050",
                    width: 125,
                  }}
                  onPress={() => this.onPageChange(0)}
                >
                  Previous
                </Button>
                <Button
                  mode="contained"
                  icon="check"
                  style={{
                    margin: 5,
                    backgroundColor: "#e73050",
                    width: 100,
                  }}
                  onPress={() => this.onPageChange(1)}
                >
                  Next
                </Button>
              </View>
            </>
          ) : (
            <>
              <Text>2</Text>
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
    padding: 10,
    justifyContent: "flex-start",
  },
  inputView: {
    width: "90%",
    backgroundColor: "#465881",
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontSize: 18,
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fb5b5a",
    marginBottom: 10,
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
