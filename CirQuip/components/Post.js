import React from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { theme, withGalio, GalioProvider, Card } from "galio-framework";

const Post = () => {
  return (
    <SafeAreaView>
      <Card
        flex
        borderless
        title="Christopher Moon"
        caption="139 minutes ago"
        location="Los Angeles, CA"
        avatar="http://i.pravatar.cc/100?id=skater"
        imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
        image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
      />
    </SafeAreaView>
  );
};

export default Post;
