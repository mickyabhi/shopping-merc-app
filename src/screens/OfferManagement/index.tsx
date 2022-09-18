import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import OfferMenu from "../../components/OfferMenu";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
const OfferManagement = (props) => {
  const arr = [
    {
      headerTitle: "Bill slab offer",
      img: require("../../../assets/images/discount.png"),
      nav: "BillSlabOffer",
    },
    {
      headerTitle: "Product offer",
      img: require("../../../assets/images/store_fill.png"),
      nav: "ProductOffer",
    },
    {
      headerTitle: "Recency customer offer",
      img: require("../../../assets/images/orangetag.png"),
      nav: "RecencyCustomerOffer",
    },
    {
      headerTitle: "Frequency customers",
      img: require("../../../assets/images/bluetag.png"),
      nav: "FrequencyCustomers",
    },
    {
      headerTitle: "Monetary customers",
      img: require("../../../assets/images/greentag.png"),
      nav: "MonetaryCustomers",
    },
    {
      headerTitle: "Cross Category promo",
      img: require("../../../assets/images/bag.png"),
      nav: "CrossCategoryPromo",
    },
    {
      headerTitle: "Bundle offer",
      img: require("../../../assets/images/gifts.png"),
      nav: "BundleOffer",
    },
    {
      headerTitle: "Lucky draw",
      img: require("../../../assets/images/messages.png"),
      nav: "BundleOffer",
    },
  ];

  return (
    <View style={styles.offerManagement}>
      <Header
        headerTitle="Offer Management"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.offerView}>
        <Text>Offers</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ExistingOffers");
          }}
        >
          <Text allowFontScaling={false} style={styles.existingOfferTxt}>
            Existing Offers
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        renderItem={(data) => (
          <OfferMenu headerTitle={data.item.headerTitle} item={data.item} />
        )}
        data={arr}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  offerManagement: {
    flex: 1,
    backgroundColor: "#fff",
  },
  offerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
    paddingVertical: scaledValue(15),
    paddingHorizontal: scaledValue(35),
  },
  existingOfferTxt: {
    color: "#807e7e",
  },
});

export default OfferManagement;
