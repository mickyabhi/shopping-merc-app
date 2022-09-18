import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import InputTextWithLabel from "../../../components/InputTextWithLabel";
import { FlatList } from "react-native";
import ValueCalculator from "../../../components/ValueCalculator";
import Button from "../../../components/Button";
const CalculateOffer = () => {
  const arr = [
    {
      product: "Aashivaad atta(10kg)",
      cost: "369",
      quantity: 1,
    },
    {
      product: "Gemini cooking oil(10kg)",
      cost: "845",
      quantity: 1,
    },
    {
      product: "madhur sugar(2kg)",
      cost: "80",
      quantity: 1,
    },
  ];
  const showData = ({ item }) => {
    return (
      <View style={styles.calculateView}>
        <View style={styles.product}>
          <Text>{item.product}</Text>
        </View>
        <View style={styles.calculate}>
          <ValueCalculator containerStyle="#fff" />
        </View>
        <View style={styles.cost}>
          <Text allowFontScaling={false} style={styles.price}>
            {item.cost}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={arr} renderItem={showData} />
      <View style={styles.line} />
      <View style={styles.totalView}>
        <Text>Total price (MRP)</Text>
        <Text allowFontScaling={false} style={styles.price}>
          1294
        </Text>
      </View>
      <View style={styles.line} />
      <InputTextWithLabel label="Buy @ Rs" />
      <Button title="Save offer" top={{ top: scaledValue(50) }} />
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
  totalView: {
    flexDirection: "row",
    marginVertical: scaledValue(20),
    top: scaledValue(30),
    justifyContent: "space-around",
  },
  container: {
    top: scaledValue(120),
  },
  calculateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: scaledValue(10),
  },
  product: {
    flex: 3,
  },
  calculate: {
    flex: 1,
  },
  cost: {
    flex: 1,
    marginLeft: scaledValue(60),
  },
  price: {
    color: "#F5672E",
  },
});

export default CalculateOffer;
