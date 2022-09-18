import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import { Image } from "react-native";
import ValueCalculator from "../../../components/ValueCalculator";

const MenuShow = () => {
  let arr = [
    {
      product: "Aashirvaad_atta",
      weight: 10,
      MRP: 369,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Taj sona masuri rice",
      weight: 10,
      MRP: 550,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "  Toor dal",
      weight: 2,
      MRP: 369,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
    {
      product: "Gemini cooking oil",
      weight: 5,
      MRP: 845,
      quantity: 0,
      img: require("../../../../assets/images/atta.png"),
    },
  ];
  const [productData, setProductData] = useState(arr);
  const dataShow = ({ item }) => {
    return (
      <View style={styles.list}>
        <View style={styles.line} />
        <View
          style={[
            styles.rowView,
            { justifyContent: "space-between", marginTop: scaledValue(5) },
          ]}
        >
          <View>
            <Text allowFontScaling={false} style={styles.product}>
              {item.product}
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.weight}
            >{`${item.weight}kg`}</Text>
            <View style={styles.rowView}>
              <Text allowFontScaling={false} style={styles.weight}>
                MRP{" "}
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.amount}
              >{` ${item.MRP}.00`}</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.menuImg}
              source={require("../../../../assets/images/atta.png")}
            />
            <ValueCalculator quantity={item.quantity} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.itemContainer}
        data={arr}
        renderItem={dataShow}
      />
      <View style={styles.navigatorView}>
        <Text>hthh</Text>
      </View>
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
  rowView: {
    flexDirection: "row",
  },
  menuImg: {
    height: scaledValue(99),
    width: scaledValue(137),
    resizeMode: "contain",
    top: scaledValue(20),
  },
  product: {
    fontSize: scaledValue(24),
    fontFamily: "Lato-Medium",
    marginVertical: scaledValue(10),
  },
  container: {
    top: scaledValue(90),
  },
  weight: {
    fontSize: scaledValue(22),
    color: "grey",
    marginVertical: scaledValue(10),
  },
  amount: {
    top: scaledValue(7),
    color: "#F3901E",
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: scaledValue(230),
  },
  navigatorView: {
    backgroundColor: "green",
    height: scaledValue(200),
    width: "100%",
    marginBottom: scaledValue(1800),
  },
});

export default MenuShow;
