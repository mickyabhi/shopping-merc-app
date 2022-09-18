import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import { LineChart } from "react-native-chart-kit";
import { GraphWeeks } from "../../utils/constants";
import { weekIndex } from "../../utils/common.utils";
const SalesSummaryGraphCard = (props) => {
  const [array, setArray] = useState(null);
  const day = new Date();
  useEffect(() => {
    setArray(props?.array);
  }, [props?.array]);

  return (
    <View style={styles.graphCardView}>
      <View style={styles.salesRevenueTextView}>
        <Text allowFontScaling={false} style={styles.salesRevenueText}>
          {props?.cardTitle}
        </Text>
        <Text allowFontScaling={false} style={styles.salesRevenueText}>
          {props?.totalValue}
        </Text>
      </View>
      {array != null && array?.length != 0 && (
        <LineChart
          data={{
            labels: [
              GraphWeeks[weekIndex(day.getDay() - 1)],
              GraphWeeks[weekIndex(day.getDay() - 2)],
              GraphWeeks[weekIndex(day.getDay() - 3)],
              GraphWeeks[weekIndex(day.getDay() - 4)],
              GraphWeeks[weekIndex(day.getDay() - 5)],
              GraphWeeks[weekIndex(day.getDay() - 6)],
              GraphWeeks[weekIndex(day.getDay() - 7)],
            ],
            datasets: [
              {
                data: array,
              },
            ],
          }}
          width={scaledValue(650)}
          height={220}
          chartConfig={{
            backgroundColor: "#F8993A",
            backgroundGradientFrom: "#F78326",
            backgroundGradientTo: "#F8993A",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.graphStyle}
        />
      )}
    </View>
  );
};

export default SalesSummaryGraphCard;

const styles = StyleSheet.create({
  graphCardView: {
    width: scaledValue(730),
    borderRadius: scaledValue(8),
    borderColor: "#808086",
    borderWidth: scaledValue(1),
    padding: scaledValue(38),
    marginTop: scaledValue(23),
  },
  salesRevenueText: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
  },
  salesRevenueTextView: {
    flexDirection: "row",
  },
  graphStyle: {
    marginTop: 18,
    borderRadius: 8,
  },
});
