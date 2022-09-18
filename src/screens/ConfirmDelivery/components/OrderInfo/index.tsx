import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { scaledValue } from "../../../../utils/design.utils";

const OrderInfo = (props) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.rowView}>
        <View style={styles.round}>
          <Text allowFontScaling={false} style={styles.roundText}>
            {props.order.Name}
          </Text>
        </View>
        <View style={styles.detailView}>
          <Text
            allowFontScaling={false}
            style={styles.orderId}
          >{`Order ID: ${props.order.order}`}</Text>
          <Text
            allowFontScaling={false}
            style={styles.date}
          >{`Date: ${props.order.date}`}</Text>
          <Text allowFontScaling={false} style={styles.name}>
            {props.order.fName}
          </Text>
          <Text allowFontScaling={false} style={styles.address}>
            {props.order.location}
          </Text>
        </View>
        <View style={styles.statusView}>
          <View style={styles.statusCircle}></View>
          <Text allowFontScaling={false} style={styles.status}>
            {props.order.status}
          </Text>
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
  },
  round: {
    backgroundColor: "green",
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    flex: 0.6,
  },
  detailView: {
    flex: 2,
    marginLeft: scaledValue(20),
  },
  statusView: {
    flex: 1.5,
    flexDirection: "row",
  },
  orderId: {
    fontSize: scaledValue(24),
  },
  date: {
    fontSize: scaledValue(20),
    color: "grey",
    marginTop: scaledValue(5),
  },
  name: {
    fontSize: scaledValue(28),
    fontFamily: "Lato-Medium",
    marginTop: scaledValue(10),
  },
  address: {
    fontSize: scaledValue(20),
    color: "grey",
    marginTop: scaledValue(10),
  },
  roundText: {
    color: "white",
    textAlign: "center",
    fontSize: scaledValue(28),
  },
  status: {
    fontSize: scaledValue(23),
    color: "#05A649",
    marginLeft: scaledValue(10),
  },
  statusCircle: {
    backgroundColor: "#05A649",
    height: 10,
    width: 10,
    borderRadius: 50,
    top: scaledValue(5),
  },
  card: {
    marginTop: scaledValue(50),
    borderRadius: scaledValue(10),
  },
});

export default OrderInfo;
