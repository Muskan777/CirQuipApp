import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import screen from "../assets/asset2.png";

export default function About() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        ...styles.mainContent,
        paddingTop: Platform.OS === "android" ? 25 : 0,
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
          At CirQuip, we connect, share and provide resources among the college
          community. The Students, Professors and Alumnus having different
          experiences and opportunities to share are provided an interactive
          platform here to share their knowledge. CirQuip links the integral
          part of any college i.e. their Technical and Non-Technical clubs
          sharing their achievements and know-how among the college crowd.
          CirQuip is instrumental in removing the communication barrier between
          seniors, juniors and professors to construct necessary interaction to
          share their experiences as whole. Our knowledge is unserviceable
          without a college network to help it reach out and this is where
          CirQuip focuses to support and encourage the college community to
          outspread its knowledge and resources.{"\n"} CirQuip stands out
          differently with its buy and sell feature, a platform created to sell
          or rent your goods within the college itself!{"\n"} CirQuip aims to
          answer your every query related to your college, projects, general
          questions, etc. through our support feature. CirQuip creates a whole
          new world for the students’ community, to experience what you haven’t
          explored yet! {"\n"} Next time, when you have any questions related to
          your College, Project, Placement or guidance... CirQuip it!{"\n"}
          {"\n"}Website : www.cirquip.com {"\n"}E-mail : cirquip@gmail.com{" "}
          {"\n"}
          {"\n"}Credits : {"\n"}
          {"\n"}Application development with Software development section, COEP
          ( SDS, COEP ) {"\n"}Website : sdscoep.codes {"\n"}
          {"\n"}Design : {"\n"}
          {"\n"}Priyanka Sahoo {"\n"}E-mail : priyankassahoo17@gmail.com {"\n"}
          {"\n"}Sanket Bansode {"\n"}E-mail : sanketbansode71@gmail.com{"\n"}
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
    color: "#888",
    fontSize: 17,
    marginHorizontal: 25,
  },
});
