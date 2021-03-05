import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Touchable,
} from "react-native";
import axios from "axios";
import Loader from "./Loader";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { handleLogout } from "./AppNavigator";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile(props) {
  const [user, setUser] = useState({});
  const [userId, setId] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [labels, setLabels] = useState({
    placeholder1: "Admission Year",
    placeholder2: "Branch Name",
    placeholder3: "eg: XYZ club secretarty, Intern at Cirquip",
    placeholder4: "eg: 1st prize at event, Winner in competiton",
    placeholder5: "eg: Autocad, ML, Web",
    placeholder6: "eg:  Coordinator at NGO",
    label1: "Title*",
    label2: "Projects & Achievements",
    label3: "Skills & Interests*",
    label4: "Club & Activities*",
  });
  const [image, setimage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const myself = props.route.params.myself;
  console.log(props.route.params);
  const fetchData = async () => {
    let userId = await AsyncStorage.getItem("user");
    setId(userId);
    axios
      .get(`${global.config.host}/user/getUserWithId/${props.route.params._id}`)
      .then(res => {
        let user = res.data;
        console.log(user);
        setUser(res.data);
        setUserProfile({
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          admissionYear: user.admissionYear.toString(),
          branch: user.branch,
          projects: user.projects.join(", "),
          title: user.title,
          skills: user.skills.join(", "),
          clubs: user.clubs.join(", "),
          showEmail: user.showEmail ? user.showEmail : false,
          showContact: user.showContact ? user.showContact : false,
          profileImage: user.profileImage ? user.profileImage : null,
        });
        if (user.profileImage) setimage({ image: user.profileImage.image });
        placeholderOnRoles(user.role);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    fetchData();
    async () => {
      let user = await AsyncStorage.getItem("user");
      this.setState({ id: user });
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "CirQuip",
            "We need camera/gallery permission to upload photos"
          );
        }
      }
    };
  }, []);

  const handleChangesinProfile = () => {
    // for deeply copying json
    const detailsToBeUpdated = JSON.parse(JSON.stringify(userProfile));
    console.log("user", user);
    detailsToBeUpdated.admissionYear = parseInt(
      detailsToBeUpdated.admissionYear
    );
    detailsToBeUpdated.profileImage = image;
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
    axios.patch(`${global.config.host}/user/updateUserData`, {
      user: detailsToBeUpdated,
    });
    console.log("Pressed", detailsToBeUpdated);
  };
  const placeholderOnRoles = role => {
    if (role === "Student") {
      setLabels({
        placeholder1: "Admission Year",
        placeholder2: "Branch Name",
        placeholder3: "eg: XYZ club secretarty, Intern at Cirquip",
        placeholder4: "eg: 1st prize at event, Winner in competiton",
        placeholder5: "eg: Autocad, ML, Web",
        placeholder6: "eg:  Coordinator at NGO",
        label1: "Title*",
        label2: "Projects & Achievements",
        label3: "Skills & Interests*",
        label4: "Club & Activities*",
      });
    } else if (role === "Faculty") {
      setLabels({
        placeholder1: "Dept. Name",
        placeholder2: "Teaching Experience",
        placeholder3: "eg: Head at maths department",
        placeholder4: "eg: Phd in Mathematics",
        placeholder5: "eg: Graph Theory",
        placeholder6: "eg:  Indian Mathematical Society",
        label1: "Title*",
        label2: "Quaification*",
        label3: "Research & Project*",
        label4: "MemberShip & Publications*",
      });
    } else if (role === "Club") {
      setLabels({
        placeholder1: "Type",
        placeholder2: "Established Year",
        placeholder3: "eg: Social working club",
        placeholder4: "eg:xyz",
        placeholder5: "eg: National Social award ",
        placeholder6: "eg:Communication",
        label1: "Description*",
        label2: "Faculty Advisor*",
        label3: "Achievements*",
        label4: "Skills & Interests*",
      });
    } else if (role === "Alumnus") {
      setLabels({
        placeholder1: "Admission Year",
        placeholder2: "Branch Name",
        placeholder3: "eg: CEO at xyz",
        placeholder4: "eg: Marketing at XYZ, Chairman",
        placeholder5: "eg: Autocad, ML, Web",
        placeholder6: "eg:  Masters at MIT",
        label1: "Title*",
        label2: "Industry Experience",
        label3: "Skills & Interests*",
        label4: "Qualification & Achievements*",
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log(result.type);

    if (!result.cancelled) {
      setimage({ image: result.base64 });
    }
  };

  if (isLoading) return <Loader />;
  else
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.topSection}>
            {userId == props.route.params._id ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage();
                }}
              >
                {image.image ? (
                  <Image
                    style={styles.ProfileImage}
                    source={{
                      uri: `data:image/jpg;base64,${image.image}`,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.ProfileImage}
                    source={require("../assets/profile.png")}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <>
                {image.image ? (
                  <Image
                    style={styles.ProfileImage}
                    source={{
                      uri: `data:image/jpg;base64,${image.image}`,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.ProfileImage}
                    source={require("../assets/profile.png")}
                  />
                )}
              </>
            )}

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
            ) : userProfile.showContact ? (
              <Text style={styles.primaryText}>{userProfile?.phone}</Text>
            ) : null}
            {myself ? (
              <TextInput
                style={styles.input1}
                placeholder="College Email"
                value={userProfile.email}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    email: text,
                  }));
                }}
              />
            ) : userProfile.showEmail ? (
              <Text style={styles.primaryText}>{userProfile?.email}</Text>
            ) : null}
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
                placeholder={labels.placeholder1}
                value={userProfile.admissionYear}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    admissionYear: text,
                  }));
                }}
              />
            ) : (
              <Text style={(styles.primaryText, styles.input2)}>
                {userProfile?.admissionYear}
              </Text>
            )}
            {myself ? (
              <TextInput
                style={styles.input2}
                placeholder={labels.placeholder2}
                value={userProfile.branch}
                onChangeText={text => {
                  setUserProfile(prev => ({
                    ...prev,
                    branch: text,
                  }));
                }}
              />
            ) : (
              <Text style={(styles.primaryText, styles.input2)}>
                {userProfile?.branch}
              </Text>
            )}
          </View>
          <View style={styles.MiddleSection}>
            <View style={styles.MiddleSectionItem}>
              <Text style={{ fontSize: 18 }}>{labels.label1}</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder={labels.placeholder3}
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
              <Text style={{ fontSize: 18 }}>{labels.label2}</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder={labels.placeholder4}
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
              <Text style={{ fontSize: 18 }}>{labels.label3}</Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder={labels.placeholder5}
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
              <Text style={{ fontSize: 18 }}>{labels.label4} </Text>
              {myself ? (
                <TextInput
                  style={{ ...styles.input1, width: "98%", textAlign: "left" }}
                  placeholder={labels.placeholder6}
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
                  status={userProfile.showContact ? "checked" : "unchecked"}
                  color="dodgerblue"
                  onPress={() => {
                    setUserProfile(prev => ({
                      ...prev,
                      showContact: !userProfile.showContact,
                    }));
                  }}
                />
                <Text style={styles.Text}>Show Contact Number</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton
                  status={userProfile.showEmail ? "checked" : "unchecked"}
                  color="dodgerblue"
                  onPress={() => {
                    setUserProfile(prev => ({
                      ...prev,
                      showEmail: !userProfile.showEmail,
                    }));
                  }}
                />
                <Text style={styles.Text}>Show Email Id</Text>
              </View>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  onPress={() => props.route.params.handleLogout()}
                  style={{ flexDirection: "row" }}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={34}
                    color="gray"
                  />
                  <Text style={styles.Text}>Log Out</Text>
                </TouchableOpacity>
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
    paddingBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
  Text: {
    fontSize: 16,
    marginTop: 5,
    paddingBottom: 8,
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
