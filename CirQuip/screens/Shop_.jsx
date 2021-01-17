import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Appbar,
  Title,
  Surface,
  Button,
  Paragraph,
  Searchbar,
  Card,
} from "react-native-paper";
const ScreenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");
// #25f183
export default function Shop({ navigation }) {
  const [margin, setMargin] = useState(0);
  let [data, setData] = useState([]);
  function fetchCats() {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1")
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
      })
      .catch(e => console.log(e));
  }
  const renderItemComponent = itemData => (
    <TouchableOpacity>
      <Image style={styles.image} source={{ uri: itemData.item.url }} />
    </TouchableOpacity>
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = query => setSearchQuery(query);
  useEffect(() => {
    setMargin(getStatusBarHeight());
  }, []);

  return (
    <View>
      <Title style={styles.title}>
        Shop all your college essesntials here !
      </Title>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <SafeAreaView>
        <FlatList data={data} renderItem={item => renderItemComponent(item)} />
      </SafeAreaView>
      )
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: width / 30,
    marginBottom: width / 30,
  },
  item: {
    width: (ScreenWidth - 40) / 2 - 10,
    backgroundColor: "#000",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  entry: {
    margin: 5,
  },
});

//
//      <View>
//        <Card>
//          <Card.Title title="Card Title" subtitle="Card Subtitle" />
//          <Card.Content>
//            <Title>Card title</Title>
//            <Paragraph>Card content</Paragraph>
//          </Card.Content>
//          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
//          <Card.Actions>
//            <Button>Cancel</Button>
//            <Button>Ok</Button>
//          </Card.Actions>
//        </Card>
//      </View>
