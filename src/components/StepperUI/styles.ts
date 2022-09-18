import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  stepperView: {
    width: scaledValue(750),
    height: scaledValue(174),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  activeBadgeStyle: {
    backgroundColor: "#F78326",
    color: "#fff",
    fontSize: scaledValue(26),
  },
  badgeStyle: {
    backgroundColor: "#FDDABD",
    color: "#fff",
    fontSize: scaledValue(26),
  },
  lineView: {
    borderBottomColor: "#FDDABD",
    borderBottomWidth: 1,
    width: scaledValue(450),
    marginHorizontal: scaledValue(10),
  },
  activeLineView: {
    borderBottomColor: "#F78326",
    borderBottomWidth: 1,
    width: scaledValue(450),
    marginHorizontal: scaledValue(10),
  },
  storeInfoText: {
    color: "#F8993A",
    position: "absolute",
    bottom: 0,
    left: scaledValue(46),
  },
  bankingInfoText: {
    position: "absolute",
    bottom: scaledValue(-35),
    right: scaledValue(52),
    width: scaledValue(106),
    textAlign: "center",
    color: "#FDDABD",
  },
  activeBankingInfoText: {
    position: "absolute",
    bottom: scaledValue(-35),
    right: scaledValue(52),
    width: scaledValue(106),
    textAlign: "center",
    color: "#F8993A",
  },
});
