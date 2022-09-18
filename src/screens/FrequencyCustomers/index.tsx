import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Button from "../../components/Button";
import DropDownWithLabel from "../../components/DropDownWithLabel";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import OfferSelector from "../../components/OfferSelector";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import Heading from "../../components/Heading";
const FrequencyCustomers = (props) => {
  const [frequencyOffer, setFrequencyOffer] = useState({
    times: "",
    days: "",
    shop: "",
  });
  const offRs = [
    { label: "50", value: 50 },
    { label: "20", value: 20 },
    { label: 10, value: 10 },
  ];
  return (
    <View>
      <Header
        headerTitle="Frequency Customers"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below" />
      <View style={styles.rowView}>
        <InputTextWithLabel
          placeholder="eg.5"
          onChangeText={(itm) =>
            setFrequencyOffer({ ...frequencyOffer, times: itm })
          }
        />
        <InputTextWithLabel
          label="times shopped in"
          subLabel="days"
          placeholder="eg.20"
          onChangeText={(itm) =>
            setFrequencyOffer({ ...frequencyOffer, days: itm })
          }
        />
      </View>
      <View style={styles.line} />
      <InputTextWithLabel
        label="Shop for Rs"
        placeholder="eg.500"
        onChangeText={(itm) =>
          setFrequencyOffer({ ...frequencyOffer, shop: itm })
        }
      />
      <OfferSelector />
      {/* <View style={styles.line} />
      <DropDownWithLabel label="Get Rs" arr={offRs} subLabel="off" />
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
  rowView: {
    flexDirection: "row",
  },
  line: {
    borderColor: "#ECECEC",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
});

export default FrequencyCustomers;
