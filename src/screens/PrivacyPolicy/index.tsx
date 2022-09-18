import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const PrivacyPolicy = (props) => (
  <SafeAreaView style={styles.privacyPolicyView}>
    <Header
      headerTitle=" Privacy Policy"
      goBack={() => {
        props.navigation.goBack();
      }}
    />
    <View style={styles.privacyPolicyMainView}>
      <Text allowFontScaling={false} style={styles.privacyPolicyText}>
        We ensure that all registered users and merchant details are preserved
        in our secure server, protecting your privacy. However these details
        will be used by the company for internal use to determine the
        preferences of application users, monitor the fraud and improve the
        service quality. Kindly note that the policy is subject to change at any
        time without any prior notice.
      </Text>
    </View>
  </SafeAreaView>
);

export default PrivacyPolicy;

const styles = StyleSheet.create({
  privacyPolicyView: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  privacyPolicyText: {
    fontSize: scaledValue(31),
    lineHeight: scaledValue(46),
    marginTop: scaledValue(48),
    width: scaledValue(661),
  },
  privacyPolicyMainView: {
    flex: 1,
    alignItems: "center",
  },
});
