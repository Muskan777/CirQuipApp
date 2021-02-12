import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  SectionList,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Button } from "react-native-paper";

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let user = this.props.user;
    if (user) {
      this.state = {
        user: user,
        data: [
          { title: "Skills", data: user.skills },
          { title: "Clubs", data: user.clubs },
          { title: "Contact Info", data: [user.phone, user.email] },
        ],
        modalSkills: false,
        modalClubs: false,
        modalContactInfo: false,
        newSkill: "",
        newClub: "",
        newPhonenum: "",
        newemail: "",
      };
    } else {
      Alert.alert("Error", "Error fetching user information");
    }
  }

  componentDidMount() {
    console.log("Data", this.state.data);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={this.state.data}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section }) => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{section.title}</Text>
                {this.props.myself && section.title != "Contact Info" ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (section.title === "Skills") {
                        this.setState({ modalSkills: true });
                      } else if (section.title === "Clubs") {
                        this.setState({ modalClubs: true });
                      }
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      style={styles.Icons}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
                <Modal visible={this.state.modalSkills} animationType="slide">
                  <View>
                    <View style={styles.modalTopContainer}>
                      <MaterialIcons
                        name="arrow-back"
                        style={{ ...styles.Icons, marginTop: 20 }}
                        size={28}
                        onPress={() => {
                          this.setState({ modalSkills: false });
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginVertical: 20,
                        color: "#2EA5DD",
                        textAlign: "center",
                      }}
                    >
                      Add Skill
                    </Text>
                    <TextInput
                      style={{
                        fontSize: 20,
                        borderWidth: 2,
                        borderColor: "#2EA5DD",
                        marginHorizontal: 30,
                        height: "30%",
                        marginBottom: 20,
                        padding: 10,
                      }}
                      textAlignVertical={"top"}
                      onChangeText={text => this.setState({ newSkill: text })}
                      value={this.state.newSkill}
                      placeholder="Skill..."
                      multiline
                    ></TextInput>

                    <Button
                      style={{
                        width: "40%",
                        margin: 20,
                        marginHorizontal: 30,
                        backgroundColor: "#287ec1",
                      }}
                      onPress={() => {
                        if (this.state.newSkill) {
                          let newSkill = this.state.user;
                          newSkill.skills.push(this.state.newSkill);
                          this.setState({
                            user: newSkill,
                            modalSkills: false,
                            newSkill: "",
                          });
                        } else {
                          this.setState({ modalSkills: false });
                        }
                      }}
                    >
                      Add Skill
                    </Button>
                  </View>
                </Modal>
                <Modal visible={this.state.modalClubs} animationType="slide">
                  <View>
                    <View style={styles.modalTopContainer}>
                      <MaterialIcons
                        name="arrow-back"
                        style={{ ...styles.Icons, marginTop: 20 }}
                        size={28}
                        onPress={() => {
                          this.setState({ modalClubs: false });
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginVertical: 20,
                        color: "#2EA5DD",
                        textAlign: "center",
                      }}
                    >
                      Add Club
                    </Text>
                    <TextInput
                      style={{
                        fontSize: 20,
                        borderWidth: 2,
                        borderColor: "#2EA5DD",
                        marginHorizontal: 30,
                        height: "30%",
                        marginBottom: 20,
                        padding: 10,
                      }}
                      textAlignVertical={"top"}
                      onChangeText={text => this.setState({ newClub: text })}
                      value={this.state.newClub}
                      placeholder="Club..."
                      multiline
                    ></TextInput>
                    <Button
                      style={{
                        width: "40%",
                        margin: 20,
                        marginHorizontal: 30,
                        backgroundColor: "#287ec1",
                      }}
                      onPress={() => {
                        if (this.state.newClub) {
                          let newClub = this.state.user;
                          newClub.clubs.push(this.state.newClub);
                          this.setState({
                            user: newClub,
                            modalClubs: false,
                            newClub: "",
                          });
                        } else {
                          this.setState({ modalSkills: false });
                        }
                      }}
                    >
                      Add Club
                    </Button>
                    <View
                      style={{
                        width: 150,
                        color: "rgba(245, 246, 250, 1)",
                        fontSize: 14,
                        fontWeight: "700",
                        margin: 30,
                      }}
                    ></View>
                  </View>
                </Modal>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    {this.props.myself ? (
                      <TextInput
                        style={styles.name}
                        onChangeText={text => {
                          if (this.state.user.skills.includes(item)) {
                            let skill = this.state.user;
                            skill.skills[skill.skills.indexOf(item)] = text;
                            this.setState({ user: skill });
                          } else if (this.state.user.clubs.includes(item)) {
                            let club = this.state.user;
                            club.clubs[club.clubs.indexOf(item)] = text;
                            this.setState({ user: club });
                          }
                        }}
                        value={item}
                      />
                    ) : (
                      <Text>{item}</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
        {this.props.myself ? (
          <Button
            style={{
              width: "40%",
              margin: 20,
              marginHorizontal: 30,
              backgroundColor: "#287ec1",
              alignSelf: "center",
            }}
            onPress={() => {
              axios.patch(`${global.config.host}/user/updateUserData`, {
                user: this.state.user,
              });
              console.log("Pressed", this.state.user);
            }}
          >
            OK
          </Button>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 0,
    padding: 0,
  },
  titleContainer: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 5,
    backgroundColor: "#EEE",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Icons: {
    color: "grey",
    fontSize: 28,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    color: "#000000",
  },
  container: {
    paddingVertical: 0,
    alignItems: "stretch",
    flexDirection: "column",
    alignItems: "stretch",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
