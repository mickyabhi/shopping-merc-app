import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { scaledValue } from "../../utils/design.utils";
import SelectProduct from "./components/SelectProducts";
import MenuShow from "./components/MenuShow";
// import CalculateOffer from './components/CalculateOffer';
const BundleOffer = (props) => {
  return (
    <View>
      <Header
        headerTitle="Bundle Offer"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.searchView}>
        <SearchBar placeholder="Search for Products, items to add" />
      </View>
      <View style={styles.mainView}>
        <SelectProduct />
        <MenuShow />
        {/* <CalculateOffer /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchView: {
    top: scaledValue(50),
  },
  mainView: {
    marginHorizontal: scaledValue(50),
  },
});

export default BundleOffer;
