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
    this.setState({ refreshing: true });
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=10&page=1")
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ refreshing: false });
      })
      .catch(e => console.log(e));
  }

  onChangeSearch = query => this.setState({ searchQuery: query });
  renderItemComponent = data => (
    <TouchableOpacity
      style={{
        ...styles.container,
        //borderWidth: 1,
        //borderColor: "black",
        justifyContent: "flex-start",
      }}
    >
      <Card>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ minHeight: 250 }}
        />
        <Card.Content style={{ height: 50 }}>
          <Text style={{ fontWeight: "bold" }}>Card title</Text>
          <Paragraph>Price</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

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
            keyExtractor={item => item.id.toString()}
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
    //borderColor: "black",
    //borderWidth: 1,
  },
  image: {
    height: 250,
    borderRadius: 4,
  },
});
