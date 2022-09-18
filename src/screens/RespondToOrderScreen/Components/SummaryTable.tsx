import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { scaledValue } from "../../../utils/design.utils";

const SummaryTable = (props) => {
  const itemSellingPrice = useSelector<any>((state) => state?.itemQty);
  const [fulfillmentQty, setFulfillmentQty] = useState(null);
  const [fulfillmentValue, setFulfillmentValue] = useState(null);
  useEffect(() => {
    setFulfillmentQty(fulfillmentQty - 1);
    setFulfillmentValue(fulfillmentValue - itemSellingPrice);
  }, [itemSellingPrice]);

  useEffect(() => {
    setFulfillmentQty(props?.summaryData?.totalQty);
    setFulfillmentValue(props?.summaryData?.originalCartValue);
  }, [props]);

  return (
    <View style={styles.summaryTableView}>
      <View style={styles.summaryTableHeaderView}>
        <View style={styles.summaryTableColStartView}>
          <Text allowFontScaling={false} style={styles.tableTitleText}>
            Summary
          </Text>
        </View>
        <View style={styles.summaryTableCol1View}>
          <Text allowFontScaling={false} style={styles.tableTitleText}>
            Order
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.tableTitleText}>
            Fulfilment
          </Text>
        </View>
        <View style={styles.summaryTableColEndView}>
          <Text allowFontScaling={false} style={styles.tableTitleText}>
            Fulfilment %
          </Text>
        </View>
      </View>
      <View style={styles.summaryTableRowView}>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            Quantity
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {props?.summaryData?.totalOrderedQty}
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {fulfillmentQty}
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {props?.summaryData?.totalFulfilmentPercent?.toFixed()}%
          </Text>
        </View>
      </View>
      <View style={styles.summaryTableRowView}>
        <View style={styles.summaryTableBottomLeftCol}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            Value
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {props?.summaryData?.totalOrderedQtyValue?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryTableColView}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {fulfillmentValue?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryTableBottomRightCol}>
          <Text allowFontScaling={false} style={styles.summaryTableColText}>
            {props?.summaryData?.totalFulfilmentValuePercent?.toFixed()}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryTable;

const styles = StyleSheet.create({
  summaryTableRowView: {
    flexDirection: "row",
    flex: 1,
  },
  summaryTableHeaderView: {
    flexDirection: "row",
    backgroundColor: "#777777",
    borderTopLeftRadius: scaledValue(8),
    borderTopRightRadius: scaledValue(8),
    flex: 1,
  },
  summaryTableView: {
    width: scaledValue(624.18),
    height: scaledValue(130.23),
    backgroundColor: "#fff",
  },
  summaryTableColView: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#707070",
  },
  summaryTableCol1View: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#FFFFFF",
  },
  summaryTableColText: {
    color: "#000000",
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(22),
  },
  summaryTableColStartView: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: scaledValue(8),
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#777777",
  },
  summaryTableColEndView: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: scaledValue(8),
    borderLeftColor: "#FFFFFF",
    borderBottomColor: "#777777",
  },
  tableTitleText: {
    color: "#fff",
    fontSize: scaledValue(22),
  },
  summaryTableBottomLeftCol: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: scaledValue(8),
    borderColor: "#707070",
  },
  summaryTableBottomRightCol: {
    borderWidth: scaledValue(1),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: scaledValue(8),
    borderColor: "#707070",
  },
});
