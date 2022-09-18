/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const AboutUs = (props) => {
  return (
    <View style={styles.aboutUsView}>
      <Header
        headerTitle="About Us"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.aboutUsMainView}>
        <Text allowFontScaling={false} style={styles.aboutUsText}>
          B.local is an innovative and path-breaking solution that aims to
          promote and support the Indian Government’s agenda of VOCAL FOR LOCAL.
          Born to facilitate digital presence for millions of Retail stores,
          bakeries, sweet shops, and medical stores that comprise the
          traditional offline retail sector in India.
        </Text>
        <Text allowFontScaling={false} style={styles.aboutUsText}>
          B.local wants to play a game-changers role and put the focus back on
          the small retail stores and the consumer by offering them the quick
          convenience of shopping online. The app encourages the local Retail
          stores in the neighbourhood to go digital by having their presence
          online and service their customers digitally.
        </Text>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  aboutUsView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutUsText: {
    fontSize: scaledValue(31),
    lineHeight: scaledValue(46),
    marginTop: scaledValue(48),
    width: scaledValue(657),
    color: "#000000",
    fontFamily: "Lato-Medium",
  },
  aboutUsMainView: {
    flex: 1,
    alignItems: "center",
  },
});
