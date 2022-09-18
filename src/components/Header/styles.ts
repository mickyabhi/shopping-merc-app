import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  appbar: {
    display: "flex",
    justifyContent: "space-between",
    elevation: 0,
    backgroundColor: "transparent",
  },
  textButton: {
    color: "#fff",
    fontSize: scaledValue(22),
    fontFamily: "Lato-Regular",
    marginRight: scaledValue(27),
  },
  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  backNavigationIcon: {
    width: scaledValue(20.08),
    height: scaledValue(34.27),
  },
  labelText: {
    color: "#fff",
    fontSize: scaledValue(24),
    marginLeft: scaledValue(38.1),
    marginRight: 4,
    fontFamily: "Lato-Medium",
    lineHeight: scaledValue(29),
  },
  headerTitle: {
    fontSize: scaledValue(30),
    color: "#fff",
    fontFamily: "Lato-Regular",
    lineHeight: scaledValue(36),
  },

  avatarImage: {
    marginLeft: scaledValue(9),
    marginRight: scaledValue(10),
    marginBottom: scaledValue(17),
  },
});
