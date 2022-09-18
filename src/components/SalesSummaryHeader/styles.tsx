import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  ratingView: {
    height: scaledValue(104),
    flexDirection: "row",
    paddingHorizontal: scaledValue(8),
    alignItems: "center",
  },
  storeNameText: {
    fontSize: scaledValue(30),
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
    marginLeft: scaledValue(14),
  },
  ratingText: {
    fontSize: scaledValue(22),
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
    marginLeft: scaledValue(44),
    position: "absolute",
    right: scaledValue(44),
  },
  ratingValue: {
    fontSize: scaledValue(30),
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
  },
  latestDataView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaledValue(43),
    marginTop: scaledValue(40),
  },
  latestDataText: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
  },
  pendingOrdersText: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Semibold",
    color: "#FFFFFF",
  },
  radioBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaledValue(64.89),
    color: "#ffffff",
  },
  radioText: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
  },
  radioBtnTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: scaledValue(36.58),
    height: scaledValue(36.58),
  },
});
