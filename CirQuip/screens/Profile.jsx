import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Loader from "./Loader";
import { TextInput } from "react-native-gesture-handler";
import { RadioButton, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Profile(props) {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [showContact, setShowContact] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showEmail, setShowEmail] = React.useState(false);

  const myself = props.route.params.myself;
  const fetchData = () => {
    axios
      .get(`${global.config.host}/user/getUserWithId/${props.route.params._id}`)
      .then(res => {
        setUser(res.data);
        setUserProfile({
          name: user.name,
          phone: user.phone,
          email: user.email,
          admissionYear: user.admissionYear.toString(),
          branch: user.branch,
          projects: user.projects.join(", "),
          title: user.title,
          skills: user.skills.join(", "),
          clubs: user.clubs.join(", "),
        });
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChangesinProfile = () => {
    // for deeply copying json
    const detailsToBeUpdated = JSON.parse(JSON.stringify(userProfile));
    // console.log("user", userProfile);
    detailsToBeUpdated.admissionYear = parseInt(
      detailsToBeUpdated.admissionYear
    );
    if (userProfile.skills == "") {
      detailsToBeUpdated.skills = [];
    } else {
      detailsToBeUpdated.skills = userProfile.skills.split(",").map(item => {
        return item.trim();
      });
    }
    if (userProfile.clubs == "") {
      detailsToBeUpdated.clubs = [];
    } else {
      detailsToBeUpdated.clubs = userProfile.clubs.split(",").map(item => {
        return item.trim();
      });
    }
    if (userProfile.projects == "") {
      detailsToBeUpdated.projects = [];
    } else {
      detailsToBeUpdated.projects = userProfile.projects
        .split(",")
        .map(item => {
          return item.trim();
        });
    }
    console.log(detailsToBeUpdated);
  };
  if (isLoading) return <Loader />;
  else
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.topSection}>
            <Image
              style={styles.ProfileImage}
              source={require("../assets/avatar.png")}
            />
            <Text style={{ fontSize: 24, marginTop: 5 }}>
              {userProfile?.name}
            </Text>
            {myself ? (
              <TextInput
                style={styles.input1}
                placeholder="Contact Number"
                value={userProfile.phone}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    phone: text,
                  }));
                }}
              />
            ) : (
              <Text style={styles.primaryText}>{userProfile?.phone}</Text>
            )}
            {myself ? (
              <TextInput
                style={styles.input1}
                placeholder="Contact Email"
                value={userProfile.email}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    email: text,
                  }));
                }}
              />
            ) : (
              <Text style={styles.primaryText}>{userProfile?.email}</Text>
            )}
          </View>
          <View
            style={{
              ...styles.MiddleSection,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {myself ? (
              <TextInput
                style={styles.input2}
                placeholder="Admission Year"
                value={userProfile.admissionYear}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    admissionYear: text,
                  }));
                }}
              />
            ) : (
              <Text style={styles.primaryText}>
                {userProfile?.admissionYear}
              </Text>
            )}
            {myself ? (
              <TextInput
                style={styles.input2}
                placeholder="Branch Name"
                value={userProfile.branch}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    branch: text,
                  }));
                }}
              />
            ) : (
              <Text style={styles.primaryText}>{userProfile?.branch}</Text>
            )}
          </View>
          <View style={styles.MiddleSection}>
            <View style={styles.MiddleSectionItem}>
              <Text style={{ fontSize: 18 }}>Title :</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder="eg: XYZ club secretarty, Intern at Cirquip"
                  value={userProfile.title}
                  onChangeText={text => {
                    setUserProfile(prev => ({
                      ...prev,
                      title: text,
                    }));
                  }}
                />
              ) : (
                <Text style={styles.primaryText}>{userProfile?.title}</Text>
              )}
            </View>
            <View style={styles.MiddleSectionItem}>
              <Text style={{ fontSize: 18 }}>Projects & Achievements :</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder="eg: 1st prize at event, Winner in competiton"
                  value={userProfile.projects}
                  onChangeText={text => {
                    setUserProfile(prev => ({
                      ...prev,
                      projects: text,
                    }));
                  }}
                />
              ) : (
                <Text style={styles.primaryText}>{userProfile?.projects}</Text>
              )}
            </View>
            <View style={styles.MiddleSectionItem}>
              <Text style={{ fontSize: 18 }}>Skills & Interests :</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder="eg: Autocad, ML, Web"
                  value={userProfile.skills}
                  onChangeText={text => {
                    setUserProfile(prev => ({
                      ...prev,
                      skills: text,
                    }));
                  }}
                />
              ) : (
                <Text style={styles.primaryText}>{userProfile?.skills}</Text>
              )}
            </View>
            <View style={styles.MiddleSectionItem}>
              <Text style={{ fontSize: 18 }}>Club & Activities :</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder="eg:  Coordinator at NGO"
                  value={userProfile.clubs}
                  onChangeText={text => {
                    setUserProfile(prev => ({
                      ...prev,
                      clubs: text,
                    }));
                  }}
                />
              ) : (
                <Text style={styles.primaryText}>{userProfile?.clubs}</Text>
              )}
            </View>
          </View>
          {myself && (
            <View>
              <View style={styles.radioContainer}>
                <RadioButton
                  status={showContact ? "checked" : "unchecked"}
                  color="dodgerblue"
                  onPress={() => setShowContact(!showContact)}
                />
                <Text style={styles.primaryText}>Show Contact Number</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton
                  status={showEmail ? "checked" : "unchecked"}
                  color="dodgerblue"
                  onPress={() => setShowEmail(!showEmail)}
                />
                <Text style={styles.primaryText}>Show Email Id</Text>
              </View>
              <View style={styles.radioContainer}>
                <MaterialCommunityIcons name="logout" size={34} color="gray" />
                <Text style={styles.primaryText}>Log Out</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Button
                  style={{
                    width: "40%",
                    margin: 20,
                    marginHorizontal: 30,
                    backgroundColor: "#287ec1",
                  }}
                  onPress={handleChangesinProfile}
                >
                  Save Changes
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  ProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  radioContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    // borderWidth: 1,
  },
  MiddleSection: {
    padding: 10,
  },
  MiddleSectionItem: {
    marginVertical: 10,
  },
  primaryText: {
    fontSize: 16,
    marginTop: 5,
  },
  input1: {
    fontSize: 18,
    borderBottomWidth: 1,
    padding: 5,
    textAlign: "center",
    width: "50%",
    paddingBottom: 0,
    marginTop: 15,
  },
  input2: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    textAlign: "center",
    width: "45%",
    paddingBottom: 0,
    margin: 5,
  },
  topContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    maxHeight: 70,
    justifyContent: "space-between",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowColor: "#2EA5DD",
    elevation: 3,
  },
});
