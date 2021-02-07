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
} from "react-native";

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
      };
    } else {
      Alert.alert("Error", "Error fetching user information");
    }
  }

  componentDidMount() {
    console.log(this.state.data);
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
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>{item}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
  },
  title: {
    fontSize: 25,
    color: "#000000",
  },
  container: {
    paddingVertical: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
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
