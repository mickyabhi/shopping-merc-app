import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import OfferSelector from "../../components/OfferSelector";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const RecencyCustomerOffer = (props) => {
  const [recencyOffer, setRecencyOffer] = useState({
    days: "",
    cost: "",
  });
  return (
    <View>
      <Header
        headerTitle="Recency Customer Offer"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below" />
      <InputTextWithLabel
        subLabel="days not shopped"
        placeholder="eg.15"
        onChangeText={(itm) => setRecencyOffer({ ...recencyOffer, days: itm })}
      />
      <View style={styles.line} />
      <InputTextWithLabel
        label="Shop for Rs"
        placeholder="eg.500"
        onChangeText={(itm) => setRecencyOffer({ ...recencyOffer, cost: itm })}
      />
      <OfferSelector />
      {/* <View style={styles.line} />
      <DropDownWithLabel label="Get Rs." arr={offRs} subLabel="off" />
      <DropDownWithLabel label="Get" arr={offRs} subLabel="free" />
      <DropDownWithLabel label="Get" arr={offRs} subLabel="% discount" />
      <InputTextWithLabel label="Get Rs." subLabel="scratch card" />
      <View style={styles.line} /> */}
      <View style={styles.line} />
      <Button
        title="Save offer"
        top={{ top: scaledValue(40) }}
        // onPress={() => {
        //   props.navigation.navigate('RegisterStoreInfo');
        // }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
    borderColor: "#ECECEC",
  },
});

export default RecencyCustomerOffer;
