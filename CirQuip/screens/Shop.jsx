import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Title, Searchbar, Card, Paragraph, Button } from "react-native-paper";
import axios from "axios";
const width = Dimensions.get("screen").width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log(`${global.config.host}/shop/products/all`);
    this.setState({ refreshing: true });
    axios
      .get(`${global.config.host}/shop/products/all`)
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ refreshing: false });
      })
      .catch(e => {
        Alert.alert("Error", "Something went wrong");
        console.log(e);
      });
  }

  onChangeSearch = query => this.setState({ searchQuery: query });
  renderItemComponent = ({ item: data, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate({
            name: "Product",
            params: data,
          })
        }
        style={{
          ...styles.container,
          //borderRightWidth: index % 2 ? 0 : 1,
          //borderLeftWidth: index % 2 ? 1 : 0,
          borderColor: "black",
          justifyContent: "flex-start",
        }}
      >
        <Card>
          <Card.Cover
            source={{ uri: data.image }}
            style={{
              minHeight: 250,
              width: width / 2 - 10,
              //borderWidth: 1,
              //borderColor: "black",
            }}
          />
          <Card.Content style={{ height: 50 }}>
            <Text style={{ fontWeight: "bold" }}>{data.name}</Text>
            <Paragraph>₹ {data.price}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchData();
    }); // call fetchData after setting the state
  };

  render() {
    return (
      <>
        <Searchbar
          style={{ margin: 5 }}
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={this.state.searchQuery}
        />
        <SafeAreaView>
          <FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item._id}
            //ItemSeparatorComponent={this.ItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: width / 30,
    marginBottom: width / 30,
  },
  container: {
    height: 300,
    width: width / 2 - 4,
    margin: 2,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
  },
  image: {
    height: 250,
    borderRadius: 4,
  },
});
