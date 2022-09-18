import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Button from "../../components/Button";
import DropDownWithLabel from "../../components/DropDownWithLabel";
import Heading from "../../components/Heading";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import OfferSelector from "../../components/OfferSelector";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const MonetaryCustomers = (props) => {
  const [monetaryCustomer, setMonetaryCustomer] = useState({
    shopped: "",
    shop: "",
  });
  return (
    <View>
      <Header
        headerTitle="Monetary Customers"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below" />
      <InputTextWithLabel
        label="Shopped for Rs."
        placeholder="eg.1000"
        onChangeText={(itm) =>
          setMonetaryCustomer({ ...monetaryCustomer, shopped: itm })
        }
      />
      <View style={styles.line} />
      <InputTextWithLabel
        label="Shop for Rs."
        placeholder="eg.500"
        onChangeText={(itm) =>
          setMonetaryCustomer({ ...monetaryCustomer, shop: itm })
        }
      />
      <View style={styles.line} />
      <OfferSelector />
      {/* <DropDownWithLabel label="Get Rs." arr={offRs} subLabel="off" />
      <DropDownWithLabel label="Get" arr={offRs} subLabel="free" />
      <DropDownWithLabel label="Get" arr={offRs} subLabel="% discount" />
      <InputTextWithLabel label="Get Rs." subLabel="scratch card" /> */}
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
    borderColor: "#ECECEC",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MonetaryCustomers;
