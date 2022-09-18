import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  respondToOrderView: {
    flex: 1,
  },
  respondToOrderMainView: {
    flex: 1,
    alignItems: "center",
    paddingVertical: scaledValue(33),
  },
  customerOrderView: {
    width: scaledValue(676),
    borderRadius: scaledValue(8),
    borderWidth: scaledValue(1),
    borderColor: "#C2C2C2",
    marginBottom: scaledValue(25),
  },
  summaryTableContainer: {
    height: scaledValue(181),
    width: scaledValue(665),
    borderWidth: scaledValue(1),
    borderRadius: scaledValue(8),
    borderColor: "#CDCDCD",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaledValue(24),
    marginBottom: scaledValue(32),
  },
});
