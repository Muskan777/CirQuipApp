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
    fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1")
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson });
        this.setState({ refreshing: false });
      })
      .catch(e => console.log(e));
  }

  onChangeSearch = query => this.setState({ searchQuery: query });
  renderItemComponent = data => (
    <TouchableOpacity style={styles.container}>
      <Card style={styles.image}>
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 100 }}
        />
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
        <SafeAreaView style={{ padding: 10 }}>
          <FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
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
    height: 200,
    width: width / 2 - 10,
    margin: 5,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  image: {
    height: "100%",
    borderRadius: 4,
  },
});
