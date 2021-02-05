import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { List, Divider } from "react-native-paper";
import Loader from "./Loader";
import "../config";

export function ChatWithUser(props) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${global.config.host}/user/getUsers`)
      .then(res => {
        if (props.route.params.email == global.config.admin) {
          let Users = res.data.users.filter(user => {
            return user.email != global.config.admin;
          });
          const thread = Users.map(user => {
            return {
              _id: user.email,
              name: user.name,
            };
          });
          setThreads(thread);
        }
        if (loading) {
          setLoading(false);
        }
      })
      .catch(err => {
        Alert.alert("Error", "Something Went Wrong In Fetching Admin 2");
        console.log(err);
      });
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("ChatWithAdmin", {
                thread: item,
                admin: true,
              })
            }
          >
            <List.Item
              title={item.name}
              description={item._id}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
