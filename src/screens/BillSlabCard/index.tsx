import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BillSlabOfferCard from "../../components/BillSlabOfferCard";
import DeleteModal from "../../components/BillSlabOfferCard/Components/DeleteModal";
import Header from "../../components/Header";
const BillSlabCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOfferSuccess, setShowOfferSuccess] = useState("first");
  const offerDuration = props.route.params.offerDuration;
  return (
    <View style={styles.mainView}>
      <Header
        headerTitle="Bill Slab Offer"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <BillSlabOfferCard
        setShowModal={setShowModal}
        setShowOfferSuccess={setShowOfferSuccess}
        offerDuration={offerDuration}
      />
      <DeleteModal
        visible={showModal}
        hideModal={() => setShowModal(false)}
        showOfferModal={showOfferModal}
        showOfferSuccess={showOfferSuccess}
        setShowOfferSuccess={setShowOfferSuccess}
      />
    </View>
  );
};

export default BillSlabCard;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
