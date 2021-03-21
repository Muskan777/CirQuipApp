import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import screen from "../assets/asset2.png";
import { Linking } from "react-native";

export default function About() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        ...styles.mainContent,
      }}
    >
      <ScrollView>
        <Avatar.Image
          source={screen}
          size={140}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.about}>
          At CirQuip, we connect you with your college remotely. It is an
          authenticated and college specific platform where you connect with
          your Alumni, Clubs, Professors and Students. We assist you with our
          e-commerce feature where you Buy and Sell college-necessary goods. We
          build a bridge between You and Your Alumni, thereby allowing you to
          access the knowledge and experience they never had in their college
          days.{"\n"}So, head over to explore, Click the Create icon and start
          sharing your projects/knowledge/thoughts/skills and so much more!{" "}
          {"\n"}You have an opportunity waiting for You!
          {"\n"}
          {"\n"}
          <Text style={{ fontWeight: "bold" }}>Website :</Text>{" "}
          <Text
            style={{ color: "#2ea5dd" }}
            onPress={() => {
              Linking.openURL("https://www.cirquip.com");
            }}
          >
            www.cirquip.com{" "}
          </Text>{" "}
          {"\n"}
          <Text style={{ fontWeight: "bold" }}>E-mail :</Text>{" "}
          <Text
            style={{ color: "#2ea5dd" }}
            onPress={() => {
              Linking.openURL("mailto:cirquip@gmail.com");
            }}
          >
            cirquip@gmail.com{" "}
          </Text>{" "}
          {"\n"}
          {"\n"}
          <Text style={{ fontWeight: "bold" }}>Credits :</Text>
          {"\n"}Application development with Software Development Section, COEP
          ( SDS, COEP ) {"\n"}
          <Text style={{ fontWeight: "bold" }}>Website :</Text>
          <Text
            style={{ color: "#2ea5dd" }}
            onPress={() => {
              Linking.openURL("https://www.sdscoep.codes");
            }}
          >
            sdscoep.codes{" "}
          </Text>{" "}
          {"\n"}
          {"\n"}
          <Text style={{ fontWeight: "bold" }}>Design :</Text>
          {"\n"}Priyanka Sahoo {"\n"}E-mail :{" "}
          <Text
            style={{ color: "#2ea5dd" }}
            onPress={() => {
              Linking.openURL("mailto:priyankassahoo17@gmail.com");
            }}
          >
            priyankassahoo17@gmail.com{" "}
          </Text>
          {"\n"}
          {"\n"}Sanket Bansode {"\n"}E-mail :{" "}
          <Text
            style={{ color: "#2ea5dd" }}
            onPress={() => {
              Linking.openURL("mailto:sanketbansode71@gmail.com");
            }}
          >
            sanketbansode71@gmail.com{" "}
          </Text>
          {"\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
  image: {
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  about: {
    color: "#666",
    fontSize: 17,
    marginHorizontal: 25,
  },
});
