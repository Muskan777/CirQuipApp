import React, { Component } from "react";
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from "react-native-tab-view";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "./Loader";
import PersonalInfo from "../components/PersonalInfo";
import Posts from "./Posts";

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: "row",
  },
  tabBar: {
    backgroundColor: "#EEE",
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: "gray",
    fontSize: 12.5,
    textAlign: "center",
  },
  tabLabelText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: "gray",
    fontSize: 13.5,
    textAlign: "center",
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});

class Profile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        index: 0,
        routes: [
          { key: "1", title: "Personal Info", count: 31 },
          { key: "2", title: "Posts", count: 86 },
        ],
      },
      user: {},
      isLoading: true,
    };
  }
  // static propTypes = {
  //   avatar: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   bio: PropTypes.string.isRequired,
  //   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  //   tabContainerStyle: PropTypes.oneOfType([
  //     PropTypes.object,
  //     PropTypes.number,
  //   ]),
  //   posts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.number.isRequired,
  //       words: PropTypes.string.isRequired,
  //       sentence: PropTypes.string.isRequired,
  //       paragraph: PropTypes.string.isRequired,
  //       image: PropTypes.string,
  //       user: PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //         username: PropTypes.string.isRequired,
  //         avatar: PropTypes.string.isRequired,
  //         email: PropTypes.string.isRequired,
  //       }),
  //     })
  //   ).isRequired,
  // };

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  };

  fetchData() {
    axios
      .get(
        `${global.config.host}/user/getUserWithId/${this.props.route.params._id}`
      )
      .then(res => {
        this.setState({ user: res.data, isLoading: false });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData();
  }

  onPressPlace = () => {
    console.log("place");
  };

  handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    });
  };

  renderTabBar = props => {
    return (
      <TabBar
        renderLabel={this.renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
        {...props}
      />
    );
  };

  renderLabel = props => ({ route }) => {
    const routes = props.navigationState.routes;

    let labels = [];
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? "black" : "gray");
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    );
  };

  renderScene = ({ route: { key } }) => {
    const { posts } = this.props;
    console.log("Posts", this.props.posts);
    switch (key) {
      case "1":
        if (this.props.route.params.myself) {
          return <PersonalInfo user={this.state.user} myself={true} />;
        } else {
          return <PersonalInfo user={this.state.user} myself={false} />;
        }
      case "2":
        return <Posts containerStyle={styles.sceneContainer} posts={posts} />;
      default:
        return <View />;
    }
  };

  renderContactHeader = () => {
    const { name, college, title } = this.state.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={require("../assets/ellipse174b251b3.png")}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{college}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    } else {
      return (
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
              <TabView
                style={[styles.tabContainer, this.props.tabContainerStyle]}
                navigationState={this.state.tabs}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

export default Profile2;
