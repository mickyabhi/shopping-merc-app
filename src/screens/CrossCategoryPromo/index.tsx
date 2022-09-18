import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import DropDownWithLabel from "../../components/DropDownWithLabel";
import Heading from "../../components/Heading";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";

const CrossCategoryPromo = (props) => {
  const [categoryOffer, setCategoryOffer] = useState({
    cost: "",
    voucher: "",
    redeemable: "",
  });
  const offRs = [
    { label: "50", value: 50 },
    { label: "20", value: 20 },
    { label: "10", value: 10 },
  ];
  const menu = [
    {
      label: "Chicken masala 200gm",
      value: "Chicken masala 200gm",
    },
    {
      label: "Tumeric masala 200gm",
      value: "Tumeric masala 200gm",
    },
    {
      label: "RedChilli masala 200gm",
      value: "RedChilli masala 200gm",
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        headerTitle="Cross Category Promo"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below" />
      <InputTextWithLabel
        label="Shop for Rs"
        placeholder="eg.500"
        onChangeText={(itm) =>
          setCategoryOffer({ ...categoryOffer, cost: itm })
        }
      />
      <View style={styles.line} />
      <DropDownWithLabel
        selectedValue={categoryOffer?.voucher}
        label="Get Rs."
        width={scaledValue(200)}
        arr={offRs}
        subLabel="gift Voucher free"
        onValueChange={(itemValue, itemIndex) =>
          setCategoryOffer({ ...categoryOffer, voucher: itemValue })
        }
      />
      <DropDownWithLabel
        width={scaledValue(450)}
        selectedValue={categoryOffer?.redeemable}
        label="Redeemable in"
        arr={menu}
        onValueChange={(itemValue, itemIndex) =>
          setCategoryOffer({ ...categoryOffer, redeemable: itemValue })
        }
      />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  line: {
    borderColor: "#ECECEC",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
});

export default CrossCategoryPromo;
