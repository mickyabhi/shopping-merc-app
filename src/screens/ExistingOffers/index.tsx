import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BillSlabOfferCard from "../../components/BillSlabOfferCard";
import ProductOfferCard from "../../components/ProductOfferCard";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import BottomTabs from "../BottomTabs";

const ExistingOffers = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferSuccess, setShowOfferSuccess] = useState("first");
  return (
    <View style={styles.mainView}>
      <Header
        headerTitle="Existing Offers"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.topOfferView}>
        <Text allowFontScaling={false} style={styles.topOfferTxt}>
          Existing Offers
        </Text>
      </View>
      <BillSlabOfferCard
        setShowModal={setShowModal}
        setShowOfferSuccess={setShowOfferSuccess}
      />
      <View style={{ marginTop: scaledValue(200) }}>
        <View style={styles.topOfferView}>
          <Text allowFontScaling={false} style={styles.topOfferTxt}>
            Upcoming Offers
          </Text>
        </View>
        <ProductOfferCard
          setShowModal={setShowModal}
          setShowOfferSuccess={setShowOfferSuccess}
        />
      </View>
    </View>
  );
};

export default ExistingOffers;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topOfferView: {
    backgroundColor: "#e6e6e6",
    paddingVertical: scaledValue(30),
    paddingLeft: scaledValue(55),
  },
  topOfferTxt: {
    color: "#807e7e",
  },
});
