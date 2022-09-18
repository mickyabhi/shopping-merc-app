import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CACACA",
    height: scaledValue(94),
    justifyContent: "center",
    paddingLeft: scaledValue(47),
    paddingRight: scaledValue(42),
  },
  text: {
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(24),
    lineHeight: scaledValue(34),
  },
});
