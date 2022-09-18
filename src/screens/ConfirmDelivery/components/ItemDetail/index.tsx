import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { scaledValue } from "../../../../utils/design.utils";

const ItemDetail = () => {
  const dataTable = [
    {
      name: "Full chicken",
      category: "withSkin(1kg)",
      price: 189,
      availability: true,
      quantity: 1,
      total: 189,
    },
    {
      name: "mutton curry",
      category: "cut(1kg)",
      price: 550,
      availability: true,
      quantity: 1,
      total: 550,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View>
        <Card.Divider />
        <View style={styles.itemView}>
          <View style={{ flexDirection: "column" }}>
            <Text allowFontScaling={false} style={styles.productName}>
              {item.name}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.productName, { paddingBottom: 10 }]}
            >
              {item.category}
            </Text>
          </View>
          <Text
            allowFontScaling={false}
            style={styles.productCost}
          >{`${item.price}.00`}</Text>
          <Text allowFontScaling={false} style={styles.orderQuantity}>
            {item.quantity}
          </Text>
          <Text allowFontScaling={false} style={styles.deliverQuantity}>
            {item.quantity}
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.originalCartValue}
          >{`${item.total}.00`}</Text>
        </View>
      </View>
    );
  };
  return (
    <Card containerStyle={[styles.card, { padding: 0 }]}>
      <View>
        <View style={styles.headContainer}>
          <Text allowFontScaling={false} style={styles.item}>
            Item
          </Text>
          <Text allowFontScaling={false} style={styles.price}>
            Price{"\n"}per unit
          </Text>
          <Text allowFontScaling={false} style={styles.availability}>
            Ordered{"\n"}Quantity
          </Text>
          <Text allowFontScaling={false} style={styles.quantity}>
            Delivered{"\n"}Quantity
          </Text>
          <Text allowFontScaling={false} style={styles.total}>
            Total
          </Text>
        </View>
        <FlatList
          data={dataTable}
          renderItem={renderItem}
          keyExtractor={(item, index: { index: number }) => index}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  headContainer: {
    flexDirection: "row",
    backgroundColor: "#F3901E",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  item: {
    marginHorizontal: scaledValue(50),
    fontSize: scaledValue(21),
    top: scaledValue(10),
    color: "white",
    paddingVertical: scaledValue(20),
  },
  price: {
    left: scaledValue(30),
    fontSize: scaledValue(21),
    color: "white",
    paddingVertical: scaledValue(10),
  },
  availability: {
    left: scaledValue(80),
    fontSize: scaledValue(21),
    color: "white",
    paddingVertical: scaledValue(10),
  },
  quantity: {
    left: scaledValue(130),
    fontSize: scaledValue(21),
    color: "white",
    paddingVertical: scaledValue(10),
  },
  total: {
    left: scaledValue(180),
    fontSize: scaledValue(21),
    color: "white",
    paddingVertical: scaledValue(20),
  },
  itemView: {
    flexDirection: "row",
    top: scaledValue(10),
  },
  productName: {
    fontSize: scaledValue(21),
    left: scaledValue(20),
    bottom: scaledValue(10),
  },
  productCost: {
    left: scaledValue(40),
  },
  orderQuantity: {
    left: scaledValue(110),
  },
  deliverQuantity: {
    left: scaledValue(230),
  },
  originalCartValue: {
    left: scaledValue(310),
  },
});

export default ItemDetail;
