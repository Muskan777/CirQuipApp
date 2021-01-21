import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ForceInset = {
  top: "never",
  bottom: "never",
};

export default function CreatePostImageBrowser() {
  const onDone = data => {
    Alert.alert("Selected items are", JSON.stringify(data));
  };

  const goBack = () => {
    console.log("Going back use Navigator goBack() hook");
  };

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
                backFunction: () => goBack(),
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
