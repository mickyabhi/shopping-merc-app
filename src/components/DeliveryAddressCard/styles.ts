import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  deliveryAddressCard: {
    width: scaledValue(661),
    paddingTop: scaledValue(16.42),
    paddingBottom: scaledValue(23.22),
    paddingLeft: scaledValue(32.21),
    paddingRight: scaledValue(19),
  },
  addressLabelTextView: {
    flexDirection: "row",
    marginBottom: scaledValue(21.36),
    justifyContent: "space-between",
  },
  deliveryAddressText: {
    color: "#00A74F",
    fontSize: scaledValue(20),
    fontFamily: "Lato-Medium",
  },
  addressTextView: {
    flexDirection: "row",
  },
  addressTypeText: {
    fontFamily: "Lato-Medium",
    color: "#00A74F",
    fontSize: scaledValue(20),
    marginRight: scaledValue(13.91),
  },
  addressText: {
    fontSize: scaledValue(22),
    fontFamily: "Lato-Regular",
    width: scaledValue(568),
  },
  contactNameText: {
    fontSize: scaledValue(22),
    fontFamily: "Lato-Medium",
    marginBottom: scaledValue(19.36),
  },
  locationMarkImage: {
    height: scaledValue(27.87),
    width: scaledValue(21.69),
    marginRight: scaledValue(17.5),
  },
});
