import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  orderDetailCard: {
    width: scaledValue(661),
    borderRadius: scaledValue(8),
    elevation: scaledValue(2),
    paddingTop: scaledValue(19),
    paddingRight: scaledValue(13),
    paddingLeft: scaledValue(14),
    marginBottom: scaledValue(23),
    paddingBottom: scaledValue(25),
  },
  orderIdMainView: {
    flexDirection: "row",
  },
  customerNameView: {
    flexDirection: "row",
  },
  rowView2: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#456",
  },
  avatarOrderedColor: {
    backgroundColor: "#F78326",
  },
  avatar: {
    backgroundColor: "#1A9955",
  },
  avatarLabelText: {
    fontSize: scaledValue(23),
    fontFamily: "Roboto-Medium",
    color: "#FFFFFF",
  },
  orderIdView: {
    flexDirection: "column",
    left: scaledValue(15),
  },
  orderIdText: {
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(24),
    color: "#000000",
    marginLeft: scaledValue(19),
  },
  orderIdDate: {
    fontSize: scaledValue(20),
    color: "#000000",
    fontFamily: "Lato-Regular",
    marginLeft: scaledValue(19),
    marginTop: scaledValue(7),
  },
  statusText: {
    textAlign: "right",
    color: "#FF8000",
    left: scaledValue(228),
    fontSize: scaledValue(23),
    fontFamily: "Lato-Medium",
  },
  orderStatusDeliveryInProgressText: {
    textAlign: "right",
    color: "#ADC705",
    left: scaledValue(228),
    fontSize: scaledValue(23),
    fontFamily: "Lato-Medium",
  },
  orderStatusConfirmDeliveryText: {
    textAlign: "right",
    color: "#03A454",
    left: scaledValue(336),
    fontSize: scaledValue(23),
    fontFamily: "Lato-Medium",
  },
  orderStatusDeclinedText: {
    textAlign: "right",
    color: "red",
    left: scaledValue(336),
    fontSize: scaledValue(23),
    fontFamily: "Lato-Medium",
  },
  statusView: {
    flexDirection: "row",
    position: "absolute",
    left: scaledValue(280),
  },
  orderStatusView: {
    flexDirection: "row",
    position: "absolute",
    left: scaledValue(176),
  },
  delivery: {
    fontSize: scaledValue(20),
    fontFamily: "Lato-Medium",
    color: "#1A9955",
    marginLeft: scaledValue(11),
  },
  locationText: {
    color: "#1A9955",
    fontSize: scaledValue(20),
    fontFamily: "Lato-Regular",
    left: scaledValue(450),
    marginTop: scaledValue(19),
    position: "absolute",
    textDecorationLine: "underline",
  },
  name: {
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(24),
    color: "#000000",
    marginTop: scaledValue(19),
    marginLeft: scaledValue(11),
    marginBottom: scaledValue(10),
  },
  nameOfDeliveryCard: {
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(24),
    color: "#000000",
    marginTop: scaledValue(19),
    marginLeft: scaledValue(25),
    marginBottom: scaledValue(10),
  },
  number: {
    fontSize: scaledValue(24),
    fontFamily: "Lato-Medium",
    color: "#424242",
    marginLeft: scaledValue(11),
    marginTop: scaledValue(8.56),
    marginBottom: scaledValue(13.54),
  },
  phnIcon: {
    position: "absolute",
    right: scaledValue(83.67),
    bottom: scaledValue(0),
  },
  msgIcon: {
    position: "absolute",
    bottom: scaledValue(0),
    right: scaledValue(20.32),
  },
  orderLocation: {
    color: "#000000",
    width: scaledValue(456),
    fontSize: scaledValue(20),
    marginTop: scaledValue(13),
    fontFamily: "Lato-Regular",
    marginLeft: scaledValue(25),
  },
  paymentType: {
    fontSize: scaledValue(20),
    marginLeft: scaledValue(11),
  },
  paymentTypeDelivered: {
    marginLeft: scaledValue(25),
    fontSize: scaledValue(20),
  },
});
