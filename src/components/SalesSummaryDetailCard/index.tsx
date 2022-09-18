import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const SalesSummaryDetail = (props) => {
  return (
    <View style={styles.salesSummaryDetailView}>
      <View style={styles.textStyle}>
        <Text allowFontScaling={false} style={styles.text}>
          Average bill Value[ABV]
        </Text>
        <Text></Text>
      </View>
      <View style={styles.textStyle}>
        <Text allowFontScaling={false} style={styles.text}>
          Items per cash memo[IPCM]
        </Text>
        <Text style={styles.valueTextStyle}>1</Text>
      </View>
      <View style={styles.textStyle}>
        <Text allowFontScaling={false} style={styles.text}>
          Conversion %
        </Text>
        <Text style={styles.conversionValueTextStyle}>100 %</Text>
      </View>
      <View style={styles.textStyle}>
        <Text allowFontScaling={false} style={styles.onlinePaymentText}>
          Total online payment
        </Text>
        <Text style={styles.onlineOrderQtyText}>{props?.onlineOrderQty}</Text>
      </View>
    </View>
  );
};

export default SalesSummaryDetail;
