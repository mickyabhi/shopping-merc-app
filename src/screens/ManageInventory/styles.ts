import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  manageInventoryView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  manageInventoryMainView: {
    flex: 1,
    alignItems: "center",
    paddingTop: scaledValue(47),
  },
  searchBarView: {
    paddingBottom: scaledValue(40),
  },
});
