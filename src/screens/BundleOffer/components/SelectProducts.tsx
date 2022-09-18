import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import SelectCategory from "./SelectCategory";

const SelectProduct = () => {
  return (
    <View style={styles.container}>
      <SelectCategory />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: scaledValue(90),
  },
});

export default SelectProduct;
