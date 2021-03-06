import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImageManipulator from "expo-image-manipulator";

const ForceInset = {
  top: "never",
  bottom: "never",
};

export default function CreatePostImageBrowser(props) {
  const onDone = async data => {
    // Alert.alert("Selected items are", JSON.stringify(data));
    const images = data;
    // const base64 = await ConvertBase64(data[0]?.uri);
    // console.log(data[0].uri);
    // console.log(manipResult.base64);
    for (let i = 0; i < data.length; i++) {
      const manipResult = await ImageManipulator.manipulateAsync(
        data[i].uri,
        [],
        {
          base64: true,
        }
      );
      images[i] = manipResult.base64;
    }
    // console.log(images);
    props.navigation.navigate("CreatePost", { images: images });
  };

  // const ConvertBase64 = file => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = err => {
  //       reject(err);
  //     };
  //   });
  // };

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        {/* <StatusBarPlaceHolder /> */}
        <View style={styles.container}>
          <AssetsSelector
            options={{
              assetsType: ["photo"],
              noAssets: {
                Component: () => <View></View>,
              },
              maxSelections: 4,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: "white",
              videoIcon: {
                Component: Ionicons,
                iconName: "ios-videocam",
                color: "green",
                size: 22,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: "ios-checkmark-circle-outline",
                color: "white",
                bg: "#4fffc880",
                size: 26,
              },
              defaultTopNavigator: {
                continueText: "DONE ",
                goBackText: "BACK ",
                textStyle: styles.textStyle,
                buttonStyle: styles.buttonStyle,
                backFunction: () => props.navigation.goBack(),
                doneFunction: data => onDone(data),
              },

              /* Test Custom Navigator*/

              /*CustomTopNavigator: {
                        Component: CustomNavigator,
                        props: {
                            backFunction: true,
                            text: 'Done',
                            doneFunction: (data) => onDone(data)
                        },
                    } 
              */
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  buttonStyle: {
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black",
    width: 100,
  },
});
