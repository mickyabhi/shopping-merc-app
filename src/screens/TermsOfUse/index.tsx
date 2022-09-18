/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
const TermsOfUse = (props) => (
  <View style={styles.termsOfUseView}>
    <Header
      headerTitle="Terms Of Use"
      goBack={() => {
        props.navigation.goBack();
      }}
    />
    <View style={styles.termsOfUseMainView}>
      <Text allowFontScaling={false} style={styles.termsOfUseText}>
        1. We don't own any inventory. All the inventory is owned and managed by
        the respective store owners.
      </Text>
      <Text allowFontScaling={false} style={styles.termsOfUseText}>
        2. All the deliveries are taken care by respective store owners. We
        don't own any responsibility of delay or late deliveries. However we
        will ensure that your feedback reaches to respective store owners.
      </Text>
      <Text allowFontScaling={false} style={styles.termsOfUseText}>
        3. Kindly note that if you are paying online, there will be changes
        levied by payment gateway service provider.
      </Text>
      <Text allowFontScaling={false} style={styles.termsOfUseText}>
        4. Merchant is responsible for fulfilling the orders, quality & quantity
        of the shipped materials. In case of any discrepancies customer has the
        right to take up with the merchant and resolve.
      </Text>
      <Text allowFontScaling={false} style={styles.termsOfUseText}>
        5. In case of any further queries, please contact us on
        support@blocal.co.in
      </Text>
    </View>
  </View>
);

export default TermsOfUse;

const styles = StyleSheet.create({
  termsOfUseView: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  termsOfUseText: {
    fontSize: scaledValue(31),
    lineHeight: scaledValue(46),
    marginTop: scaledValue(48),
    width: scaledValue(657),
  },
  termsOfUseMainView: {
    flex: 1,
    alignItems: "center",
  },
});
