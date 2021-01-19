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
import {
  IconButton,
  Title,
  Searchbar,
  Card,
  Paragraph,
  Button,
  FAB,
  Avatar,
} from "react-native-paper";
import axios from "axios";
const width = Dimensions.get("screen").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      searchQuery: "",
      user: { likes: [] },
    };
  }
  refresh = async () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() => this.props.navigation.goBack()}
        />
      ),
    });
    (async () => {
      let user = await AsyncStorage.getItem("user");
      this.setState({ id: user });
      let info;
      await AsyncStorage.getItem("info").then(async res => {
        if (res) {
          info = JSON.parse(res);
          if (info) {
            this.setState({ user: info });
          } else {
            this.setState({ user: { likes: [] } });
            await AsyncStorage.setItem("info", { likes: [] });
          }
        }
      });
    })();
  };
  async componentDidMount() {
    await this.refresh().then(async () => {
      await this.fetchData();
    });
  }

  async fetchData() {
    this.setState({ refreshing: true });
    await AsyncStorage.getItem("user").then(async id => {
      await axios
        .post(
          `${global.config.host}/shop/products/${this.props.route.params.type}`,
          { id: id }
        )
        .then(res => {
          this.setState({ data: res.data });
          this.setState({ refreshing: false });
        })
        .catch(e => {
          Alert.alert("Error", "Something went wrong");
          console.log(e);
        });
    });
  }
  handleLike = async id => {
    console.log("inside like");
    await axios
      .put(`${global.config.host}/shop/like`, {
        user: this.state.id,
        productId: id,
      })
      .then(async res => {
        let info;
        await AsyncStorage.getItem("info").then(async res => {
          if (res) info = JSON.parse(res);
          if (info) {
            if (info.likes) {
              info.likes.push(id);
            } else {
              info["likes"] = [id];
            }
          } else {
            info = { likes: [id] };
          }
          await AsyncStorage.setItem("info", JSON.stringify(info));
          this.setState({
            user: {
              likes: [...this.state.user.likes, id],
            },
          });
        });
      })
      .catch(e => {
        Alert.alert("Error", "Something went wrong");
        console.log(e);
      });
  };

  handleDislike = async id => {
    console.log("inside dislike");
    await axios
      .put(`${global.config.host}/shop/dislike`, {
        user: this.state.id,
        productId: id,
      })
      .then(async res => {
        let info;
        await AsyncStorage.getItem("info").then(async res => {
          if (res) info = JSON.parse(res);
          if (info) {
            if (info.likes) {
              info.likes.splice(info.likes.indexOf(id), 1);
            } else {
              info["likes"] = [];
            }
          } else {
            info = { likes: [] };
          }
          await AsyncStorage.setItem("info", JSON.stringify(info));
        });
        let temp_likes = this.state.user.likes;
        temp_likes.splice(temp_likes.indexOf(id), 1);
        this.setState({
          user: {
            likes: temp_likes,
          },
        });
      })
      .catch(e => {
        Alert.alert("Error", "Something went wrong");
        console.log(e);
      });
  };
  onChangeSearch = query => this.setState({ searchQuery: query });
  renderItemComponent = obj => {
    const { item: data, index } = obj;
    console.log(this.state.user);
    return (
      <>
        <TouchableOpacity
          key={this.state.user.likes}
          onPress={() =>
            this.props.navigation.navigate({
              name: "Product",
              params: { ...data, onGoBack: async () => await this.refresh() },
            })
          }
          style={{
            ...styles.container,
            borderColor: "black",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 1000,
              elevation: 10,
              alignSelf: "flex-end",
            }}
            onPress={() =>
              this.state?.user?.likes.includes(data._id)
                ? this.handleDislike(data._id)
                : this.handleLike(data._id)
            }
          >
            <Avatar.Icon
              color={
                this.state?.user?.likes.includes(data._id) ? "red" : "gray"
              }
              icon="heart"
              style={styles.like}
            />
          </TouchableOpacity>
          <Card>
            <Card.Cover
              source={{
                uri: `data:image/jpg;base64,${data.image}`,
              }}
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
      </>
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
        <SafeAreaView>
          <Searchbar
            style={{ margin: 5 }}
            placeholder="Search"
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
          />
          <Title style={{ textAlign: "center" }}>
            {this.props.route.params.type === "liked"
              ? "Your Wishlist"
              : "New Recommendations"}
          </Title>
          {this.state.data && this.state.data.length !== 0 ? (
            <FlatList
              numColumns={2}
              data={this.state.data}
              renderItem={item => this.renderItemComponent(item)}
              keyExtractor={item => item._id}
              //ItemSeparatorComponent={this.ItemSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              style={{ marginBottom: 5 }}
            />
          ) : (
            <></>
          )}
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
  like: {
    //borderColor: "black",
    //borderWidth: 2,
    backgroundColor: "white",
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    color: "red",
  },
});
