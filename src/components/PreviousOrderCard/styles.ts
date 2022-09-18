import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  round: {
    backgroundColor: "orange",
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    flex: 0.7,
    alignSelf: "center",
  },
  detailView: {
    flex: 3,
    marginLeft: scaledValue(20),
  },
  statusView: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
  },
  orderId: {
    fontSize: scaledValue(24),
  },
  date: {
    fontSize: scaledValue(20),
    color: "grey",
  },
  name: {
    fontSize: scaledValue(28),
    fontFamily: "Lato-Medium",
    marginTop: scaledValue(10),
  },
  address: {
    marginTop: scaledValue(11),
    fontSize: scaledValue(28),
    color: "grey",
    width: scaledValue(361),
  },
  roundText: {
    color: "white",
    textAlign: "center",
    fontSize: scaledValue(28),
  },
  status: {
    alignSelf: "center",
    fontSize: scaledValue(23),
    color: "#05A649",
    marginLeft: scaledValue(10),
  },
  statusCircle: {
    backgroundColor: "#05A649",
    height: 10,
    width: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  previousOrderItemCardView: {
    borderRadius: scaledValue(8),
    borderColor: "#CDCDCD",
    borderWidth: scaledValue(1),
    width: scaledValue(668),
    paddingVertical: scaledValue(32),
    paddingLeft: scaledValue(21),
    paddingRight: scaledValue(32),
    marginBottom: scaledValue(18),
  },
  avatarLabel: {
    fontFamily: "Lato Medium",
    fontSize: scaledValue(23),
    color: "#fff",
  },
  avatarStyle: {
    backgroundColor: "#F3901E",
  },
});
