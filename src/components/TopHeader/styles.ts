import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  topHeaderView: {
    borderBottomLeftRadius: scaledValue(20),
    borderBottomRightRadius: scaledValue(20),
  },
  headerView: {
    height: scaledValue(104),
    flexDirection: "row",
    paddingHorizontal: scaledValue(8),
    alignItems: "center",
  },
  headerTitleText: {
    fontFamily: "Lato-Medium",
    color: "#fff",
    fontSize: scaledValue(30),
    marginLeft: scaledValue(14),
  },
  dividerElement: {
    width: scaledValue(1),
    height: scaledValue(28),
    backgroundColor: "#fff",
    marginLeft: scaledValue(36.13),
    marginRight: scaledValue(23.19),
  },
  ratingText: {
    color: "#fff",
    fontSize: scaledValue(26),
    fontFamily: "Lato-Medium",
  },
  headerContent: {
    flexDirection: "row",
    paddingHorizontal: scaledValue(52),
    alignItems: "center",
    justifyContent: "space-between",
  },
  respondText: {
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(25),
    color: "#fff",
  },
  ordersText: {
    fontFamily: "Lato-Bold",
    color: "#fff",
    marginTop: scaledValue(8),
  },
  numbersOfOrderText: {
    fontSize: scaledValue(34),
    marginBottom: scaledValue(10.04),
    textAlign: "center",
    color: "#fff",
    fontFamily: "Lato-Bold",
  },
  totalOrderText: {
    fontSize: scaledValue(18),
    color: "#fff",
    fontFamily: "Lato-Medium",
  },
  contentView: {
    paddingBottom: scaledValue(40),
    paddingTop: scaledValue(20),
  },
  headerContentText: {
    fontSize: scaledValue(24),
    fontFamily: "Lato-Regular",
    color: "#fff",
  },
  avatarIconsView: {
    flexDirection: "row",
    paddingVertical: scaledValue(40),
  },
  headerContentView: {
    flex: 1,
  },
});
