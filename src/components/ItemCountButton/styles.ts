import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  CountButtonView: {
    width: scaledValue(110),
    height: scaledValue(40),
    borderWidth: 1,
    borderRadius: scaledValue(8),
    borderColor: "#FD7609",
    flexDirection: "row",
  },

  countButtonTitle: {
    color: "#fff",
    fontSize: scaledValue(20),
  },

  subtractionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  countView: {
    flex: 1,
    backgroundColor: "#FD7609",
    justifyContent: "center",
    alignItems: "center",
  },

  additionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: "#FD7609",
    fontSize: scaledValue(20),
  },

  disableAddButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
  },

  disableTextColor: {
    color: "#BBBB",
    fontSize: scaledValue(20),
  },
});
