import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Picker,
  ScrollView,
  LinearLayout,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { Image as ReactImage } from "react-native";
import Svg, { Defs, Pattern } from "react-native-svg";
import { Path as SvgPath } from "react-native-svg";
import { Text as SvgText } from "react-native-svg";
import { Image as SvgImage } from "react-native-svg";
import axios from "axios";

export default function Profile({ route, navigation }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${global.config.host}/user/getUserWithId/${route.params._id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(e => console.log(e));
  };

  console.log(user);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View
          data-layer="0f5cbf24-4443-493f-b0f5-daeb05755777"
          style={styles.studentprofile_content}
        >
          <View
            data-layer="63c17112-ed9b-412b-9527-727e471f0a1c"
            style={styles.studentprofile_content_editProfile}
          >
            <View
              data-layer="479f1562-813a-4e2e-86ab-725c9010b77a"
              style={styles.studentprofile_content_editProfile_bg}
            ></View>
            <View
              data-layer="7c576470-c9c1-4853-a9cf-5a4f30d4908c"
              style={styles.studentprofile_content_editProfile_rectangle359}
            ></View>
            <View
              data-layer="47341e46-d150-4ae5-99a8-96f1ed692e29"
              style={styles.studentprofile_content_editProfile_rectangle360}
            ></View>
            <Text
              data-layer="348db0e2-581f-4bac-95e2-6420aebc3368"
              style={styles.studentprofile_content_editProfile_branchName}
            >
              {user.branch}
            </Text>
            <Text
              data-layer="ea8bb49a-6ea7-41f8-bc6a-07c3e7c8b9c0"
              style={styles.studentprofile_content_editProfile_admissionYear}
            >
              {user.admissionYear}
            </Text>
          </View>
          <Text
            data-layer="11a00755-384f-4e58-9574-bc9cdcbb0540"
            style={styles.studentprofile_content_studentName}
          >
            {user.name}
          </Text>
          <Text
            data-layer="eb454375-81fe-4214-b520-45c885b4495d"
            style={styles.studentprofile_content_collegeEmail}
          >
            {user.email}
          </Text>
          <Text
            data-layer="6f942b6c-a605-4efb-81fe-ccceea98e488"
            style={styles.studentprofile_content_contactNumber}
          >
            {user.phone}
          </Text>
          <ReactImage
            data-layer="c21a060b-7644-4390-be59-afaaf09e6f9f"
            source={require("../assets/avatar.png")}
            style={styles.studentprofile_content_avatar}
          />
        </View>
        <View
          data-layer="ad654de2-f2f8-43fd-80b5-fd4b2e74e8bf"
          style={styles.studentprofile_rectangle2}
        ></View>
        <Svg
          data-layer="d3d5650f-7810-447f-a3ce-2997b33d19e6"
          style={styles.studentprofile_menu}
          preserveAspectRatio="none"
          viewBox="-0.00043767690658569336 0.00019147992134094238 22.384765625 20.099609375"
          fill="transparent"
        >
          <Defs>
            <Pattern
              id="img-menu"
              patternContentUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              <SvgImage
                xlinkHref={require("../assets/menu.png")}
                x="0"
                y="0"
                width="22.38px"
                height="20.10px"
              />
            </Pattern>
          </Defs>
          <SvgPath
            d="M 12.54780006408691 19.90800094604492 L 0.412200003862381 11.09160041809082 C -0.01503374706953764 10.78127574920654 -0.1244915425777435 10.19673824310303 0.1496516615152359 9.755937576293945 C -0.1244915425777435 9.31435489654541 -0.01503374706953764 8.729865074157715 0.412200003862381 8.420400619506836 L 11.7386999130249 0.1908000111579895 C 12.18510055541992 -0.133200004696846 12.81060028076172 -0.03420000150799751 13.13549995422363 0.412200003862381 L 13.72320079803467 1.221300005912781 C 14.04720020294189 1.667700052261353 13.94820022583008 2.293200016021729 13.50180053710938 2.618100166320801 L 5.7418532371521 8.25570011138916 L 21.38400077819824 8.25570011138916 C 21.93659973144531 8.25570011138916 22.3838996887207 8.703900337219238 22.3838996887207 9.255599975585938 L 22.3838996887207 10.25549983978271 C 22.3838996887207 10.80810070037842 21.93659973144531 11.25540065765381 21.38400077819824 11.25540065765381 L 5.741898059844971 11.25540065765381 L 14.31090068817139 17.48069953918457 C 14.75730037689209 17.80560111999512 14.85630035400391 18.43110084533691 14.53229999542236 18.87750053405762 L 13.94460010528564 19.68659973144531 C 13.74879550933838 19.9561710357666 13.44376087188721 20.0992374420166 13.13460063934326 20.0992546081543 C 12.93076801300049 20.09926605224609 12.72517204284668 20.03709602355957 12.54780006408691 19.90800094604492 Z"
            fill="url(#img-menu)"
          />
        </Svg>
        <View
          data-layer="70d4eb7b-7a53-4095-9220-ef5706f7adb9"
          style={styles.studentprofile_verticalDots}
        >
          <View
            data-layer="a76dfaf2-95de-4fd0-b681-a48f5c271db1"
            style={styles.studentprofile_verticalDots_group49}
          >
            <Svg
              data-layer="2de9f2a8-d963-40f8-9b27-b38a14619723"
              style={styles.studentprofile_verticalDots_group49_path124}
              preserveAspectRatio="none"
              viewBox="16.71500015258789 0 6.373046875 6.3974609375"
              fill="rgba(54, 181, 165, 1)"
            >
              <SvgPath d="M 19.90316963195801 6.397315502166748 C 18.14018058776855 6.397315502166748 16.71500015258789 4.965839862823486 16.71500015258789 3.198133230209351 C 16.71500015258789 1.432000041007996 18.14018058776855 0 19.90316963195801 0 C 21.66195869445801 0 23.08871078491211 1.431475400924683 23.08871078491211 3.198133230209351 C 23.08871078491211 4.965315341949463 21.66143417358398 6.397315502166748 19.90316963195801 6.397315502166748 Z" />
            </Svg>
            <Svg
              data-layer="4c155f4d-b48a-49ec-b9cb-a9a25458a929"
              style={styles.studentprofile_verticalDots_group49_path125}
              preserveAspectRatio="none"
              viewBox="16.71500015258789 16.691001892089844 6.375 6.3984375"
              fill="rgba(54, 181, 165, 1)"
            >
              <SvgPath d="M 19.9036922454834 23.0893669128418 C 18.14070701599121 23.0893669128418 16.71500015258789 21.65789222717285 16.71500015258789 19.89018249511719 C 16.71500015258789 18.12457466125488 18.14018058776855 16.69100189208984 19.90316963195801 16.69100189208984 C 21.66195869445801 16.69100189208984 23.08871078491211 18.12405204772949 23.08976173400879 19.89018249511719 C 23.08871078491211 21.6589412689209 21.66090774536133 23.0893669128418 19.9036922454834 23.0893669128418 Z" />
            </Svg>
            <Svg
              data-layer="9260eb5c-c973-48f7-9177-ff4e320474fe"
              style={styles.studentprofile_verticalDots_group49_path126}
              preserveAspectRatio="none"
              viewBox="16.71500015258789 33.38600158691406 6.373046875 6.3984375"
              fill="rgba(54, 181, 165, 1)"
            >
              <SvgPath d="M 19.9036922454834 39.78384017944336 C 18.14070701599121 39.78384017944336 16.71500015258789 38.35236740112305 16.71500015258789 36.58466339111328 C 16.71500015258789 34.81695175170898 18.14018058776855 33.38600158691406 19.90316963195801 33.38600158691406 C 21.66195869445801 33.38495254516602 23.08871078491211 34.81747436523438 23.08871078491211 36.58466339111328 C 23.08871078491211 38.35184097290039 21.66090774536133 39.78384017944336 19.9036922454834 39.78384017944336 Z" />
            </Svg>
          </View>
        </View>
        <Text
          data-layer="34d9f0ec-f90f-46d7-921a-86cef9ab581b"
          style={styles.studentprofile_myProfile}
        >
          My Profile
        </Text>
        <Text
          data-layer="a8d57453-a716-4c4e-b516-3e57ee7a9ee0"
          style={styles.studentprofile_title}
        >
          {user.title}
        </Text>
        <Text
          data-layer="af52e04d-c056-4b24-afc3-f6c89d36aa6d"
          style={styles.studentprofile_projectsAchievements}
        >
          {user.projects}
        </Text>
        <Text
          data-layer="275d5956-e258-4293-a844-b7461d8ba57b"
          style={styles.studentprofile_skillsInterests}
        >
          {user.skills}
        </Text>
        <Text
          data-layer="7d0c49ac-bbc0-449d-85f6-8b777531e8e9"
          style={styles.studentprofile_clubsActivities}
        >
          {user.clubs}
        </Text>
        <Svg
          data-layer="f92a14b2-e9df-421d-9bcd-77b11bd8bfe0"
          style={styles.studentprofile_line2}
          preserveAspectRatio="none"
          viewBox="0 -0.5 342 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 342 0" />
        </Svg>
        <Svg
          data-layer="e9fc1a32-fd2d-4476-afb4-dc5b7ab8a13c"
          style={styles.studentprofile_line13}
          preserveAspectRatio="none"
          viewBox="0 -0.5 342 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 342 0" />
        </Svg>
        <Svg
          data-layer="153b2cbf-0ff8-496f-b773-1fb95a48d215"
          style={styles.studentprofile_line14}
          preserveAspectRatio="none"
          viewBox="0 -0.5 342 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 342 0" />
        </Svg>
        <Svg
          data-layer="e478694e-c55b-4907-92af-a2c3a09c5afe"
          style={styles.studentprofile_line15}
          preserveAspectRatio="none"
          viewBox="0 -0.5 342 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 342 0" />
        </Svg>
        <Text
          data-layer="39afb84a-eddd-4f80-9411-b911dc5cb53a"
          style={styles.studentprofile_exXyzClubSecretaryInternAtCirquip}
        >
          ex: XYZ Club Secretary | Intern at CirQuip
        </Text>
        <Text
          data-layer="aa78b317-7d2d-4154-93e4-0e9e92cbfbe0"
          style={styles.studentprofile_ex1stPrizeInEventAdvancementInCnn}
        >
          ex: 1st Prize in event | Advancement in CNN
        </Text>
        <Text
          data-layer="ffb714bc-7ad2-4831-9892-75f6b6f0af8b"
          style={styles.studentprofile_exAutocadMlAiCnc}
        >
          ex: Autocad | ML | AI | CNC
        </Text>
        <Text
          data-layer="9bf364c2-a3f9-4771-8a55-afbb13872918"
          style={styles.studentprofile_exCoOrdinatorAtNgo}
        >
          ex: Co-Ordinator at NGO
        </Text>
        <Svg
          data-layer="750b08f1-e1fd-4f7a-bd65-987a2bb3092b"
          style={styles.studentprofile_line17}
          preserveAspectRatio="none"
          viewBox="0 -0.5 198 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 198 0" />
        </Svg>
        <Svg
          data-layer="8f52eaf2-def9-43a9-ad07-76aa41fb05d9"
          style={styles.studentprofile_line18}
          preserveAspectRatio="none"
          viewBox="0 -0.5 198 1"
          fill="transparent"
        >
          <SvgPath d="M 0 0 L 198 0" />
        </Svg>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  studentprofile: {
    opacity: 1,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 375,
    height: 812,
    left: 0,
    top: 0,
  },
  studentprofile_content: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 343,
    height: 302,
    left: 16,
    top: 83,
  },
  studentprofile_content_editProfile: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 343,
    height: 50,
    left: 0,
    top: 252,
  },
  studentprofile_content_editProfile_bg: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 343,
    height: 50,
    left: 0,
    top: 0,
  },
  studentprofile_content_editProfile_rectangle359: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderRightWidth: 1,
    borderRightColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 139,
    height: 38,
    left: 10,
    top: 6,
  },
  studentprofile_content_editProfile_rectangle360: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderRightWidth: 1,
    borderRightColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(120, 120, 120, 0.7764705882352941)",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 176,
    height: 38,
    left: 159,
    top: 6,
  },
  studentprofile_content_editProfile_branchName: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 114,
    height: 24,
    left: 169,
    top: 13,
  },
  studentprofile_content_editProfile_admissionYear: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 128,
    height: 24,
    left: 16,
    top: 13,
  },
  studentprofile_content_studentName: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 26,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 165,
    height: 35,
    left: 89,
    top: 93,
  },
  studentprofile_content_collegeEmail: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(72, 72, 72, 1)",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 21,
    left: 121,
    top: 200,
  },
  studentprofile_content_contactNumber: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(72, 72, 72, 1)",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 121,
    height: 21,
    left: 111,
    top: 146,
  },
  studentprofile_content_avatar: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    width: 84,
    height: 84,
    left: 130,
    top: 0,
  },
  studentprofile_rectangle2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowColor: "rgb(54,  181,  165)",
    shadowOpacity: 0.8509803921568627,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 53,
    left: 0,
    top: 0,
  },
  studentprofile_menu: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 22.38,
    height: 20.1,
    left: 24.62,
    top: 16,
  },
  studentprofile_verticalDots: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 6.38,
    height: 23.91,
    left: 340.89,
    top: 15,
  },
  studentprofile_verticalDots_group49: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 6.38,
    height: 23.91,
    left: 0,
    top: 0,
  },
  studentprofile_verticalDots_group49_path124: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 6.37,
    height: 6.4,
    left: 0,
    top: 0,
  },
  studentprofile_verticalDots_group49_path125: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 6.38,
    height: 6.4,
    left: 0,
    top: 8.76,
  },
  studentprofile_verticalDots_group49_path126: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 6.37,
    height: 6.4,
    left: 0,
    top: 17.51,
  },
  studentprofile_myProfile: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(54, 181, 165, 1)",
    fontSize: 26,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 127,
    height: 35,
    left: 68.5,
    top: 9,
  },
  studentprofile_title: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 41,
    height: 24,
    left: 16,
    top: 401,
  },
  studentprofile_projectsAchievements: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 198,
    height: 24,
    left: 16,
    top: 481,
  },
  studentprofile_skillsInterests: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 139,
    height: 24,
    left: 16,
    top: 561,
  },
  studentprofile_clubsActivities: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 147,
    height: 24,
    left: 16,
    top: 641,
  },
  studentprofile_line2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 342,
    height: 1,
    left: 16.5,
    top: 464.28,
  },
  studentprofile_line13: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 342,
    height: 1,
    left: 16.5,
    top: 544.28,
  },
  studentprofile_line14: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 342,
    height: 1,
    left: 16.5,
    top: 624.28,
  },
  studentprofile_line15: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 342,
    height: 1,
    left: 16.5,
    top: 704.28,
  },
  studentprofile_exXyzClubSecretaryInternAtCirquip: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 323,
    height: 24,
    left: 16,
    top: 441,
  },
  studentprofile_ex1stPrizeInEventAdvancementInCnn: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 341,
    height: 24,
    left: 16,
    top: 521,
  },
  studentprofile_exAutocadMlAiCnc: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 212,
    height: 24,
    left: 16,
    top: 601,
  },
  studentprofile_exCoOrdinatorAtNgo: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(222, 222, 222, 1)",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",

    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 197,
    height: 24,
    left: 16,
    top: 681,
  },
  studentprofile_line17: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 198,
    height: 1,
    left: 88.5,
    top: 248.28,
  },
  studentprofile_line18: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 198,
    height: 1,
    left: 88.5,
    top: 302.28,
  },
});
