import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  previousOrderView: {
    flex: 1,
    backgroundColor: "white",
  },
  previousOrderMainView: {
    flex: 1,
    alignItems: "center",
    paddingTop: scaledValue(47),
  },
});
