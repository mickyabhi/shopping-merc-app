import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  customerOrderItem: {
    width: scaledValue(676),
    height: scaledValue(220),
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: scaledValue(29),
  },
  itemView: {
    width: scaledValue(140),
  },
  itemText: {
    fontSize: scaledValue(21),
    fontFamily: "Lato-Regular",
  },
  pricePerUnitText: {
    width: scaledValue(72),
    marginLeft: scaledValue(20),
  },
  priceView: {
    width: scaledValue(72),
    marginLeft: scaledValue(45),
  },
  priceText: {
    fontSize: scaledValue(21),
    fontFamily: "Lato-Medium",
  },
  availabilityView: {
    width: scaledValue(130),
    alignItems: "flex-start",
    marginLeft: scaledValue(30),
  },
  countButtonView: {
    width: scaledValue(150),
  },
  divider: {
    marginHorizontal: scaledValue(20),
    backgroundColor: "#C2C2C2",
  },
  quantityOrderedView: {
    width: scaledValue(126),
    marginLeft: scaledValue(75),
  },
  orderedQuantityView: {
    width: scaledValue(126),
    marginLeft: scaledValue(75),
  },
  quantityOrderedText: {
    fontSize: scaledValue(21),
    fontFamily: "Lato-Medium",
  },
  quantityDeliveredView: {
    width: scaledValue(85),
  },
  deliveredQuantityView: {
    width: scaledValue(85),
    alignSelf: "center",
  },
  deliveredQuantityText: {
    fontSize: scaledValue(21),
    fontFamily: "Lato-Medium",
  },
  totalView: {
    width: scaledValue(89),
    marginLeft: scaledValue(10),
  },
  totalText: {
    fontSize: scaledValue(21),
    fontFamily: "Lato-Semibold",
  },
});
