import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  cardView: {
    width: scaledValue(659),
    borderColor: "#CDCDCD",
    borderRadius: scaledValue(8),
    alignSelf: "center",
    marginTop: scaledValue(37),
    elevation: scaledValue(2),
    paddingLeft: scaledValue(45),
    paddingTop: scaledValue(36),
  },
  billSlabOfferCardMainView: {
    flexDirection: "row",
  },
  image: {
    width: scaledValue(60),
    height: scaledValue(60),
  },
  cardBody: {
    marginLeft: scaledValue(41),
  },
  heading: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(24),
    color: "#000000",
    marginBottom: scaledValue(13),
  },
  subHeading: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(24),
    color: "gray",
    marginBottom: scaledValue(14),
    width: scaledValue(450),
  },
  startDateText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "gray",
    marginBottom: scaledValue(14),
  },
  startDateSubText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "#F3901E",
  },
  endDateText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "gray",
  },
  endDateSubText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "#F3901E",
  },
  bottomView: {
    flexDirection: "row",
    marginLeft: scaledValue(364),
  },
  deleteText: {
    fontSize: scaledValue(28),
    fontFamily: "Lato-Semibold",
    color: "gray",
    marginTop: scaledValue(20),
    marginRight: scaledValue(6),
  },
  deleteIcon: {
    right: scaledValue(29),
  },
});
