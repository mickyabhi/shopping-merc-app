import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  salesSummaryDetailView: {
    width: scaledValue(730),
    borderRadius: scaledValue(8),
    borderColor: "#808086",
    borderWidth: scaledValue(1),
    padding: scaledValue(38),
    marginTop: scaledValue(25),
  },
  textStyle: {
    flexDirection: "row",
  },
  text: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
    marginBottom: scaledValue(24),
  },
  onlinePaymentText: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
  },
  valueTextStyle: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
    marginLeft: scaledValue(172),
  },
  conversionValueTextStyle: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
    marginLeft: scaledValue(358),
  },
  onlineOrderQtyText: {
    fontSize: scaledValue(28),
    marginRight: scaledValue(32),
    fontFamily: "Lato-Bold",
    marginLeft: scaledValue(269),
  },
});
