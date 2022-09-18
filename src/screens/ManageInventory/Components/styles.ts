import { StyleSheet } from "react-native";
import { scaledValue } from "../../../utils/design.utils";

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: scaledValue(650),
    borderRadius: scaledValue(8),
    paddingTop: scaledValue(37.21),
  },
  editItemView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: scaledValue(22),
    alignItems: "center",
  },
  editItemText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(31),
    color: "#000000",
  },
  inventoryView: {
    flexDirection: "row",
    alignItems: "center",
  },
  inventoryText: {
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(20),
    marginLeft: scaledValue(60),
    marginRight: scaledValue(20),
  },
  inputText: {
    width: scaledValue(561),
    height: scaledValue(81),
    color: "#FFFFFF",
  },
  textInputView: {
    alignSelf: "center",
    marginBottom: scaledValue(25),
  },
  discountInputView: {
    marginBottom: scaledValue(25),
    marginLeft: scaledValue(45),
    marginRight: scaledValue(44),
    borderRadius: scaledValue(8),
    fontSize: scaledValue(24),
    justifyContent: "center",
  },
  discountText: {
    fontSize: scaledValue(24),
    color: "#7D7D7D",
    fontFamily: "Lato-Regular",
  },
  discountLabel: {
    fontSize: scaledValue(24),
    color: "#000000",
    fontFamily: "Lato-Semibold",
  },
  pickerView: {
    alignSelf: "center",
    marginBottom: scaledValue(25),
    borderColor: "#00000029",
    borderWidth: scaledValue(1),
    elevation: scaledValue(1),
    borderRadius: scaledValue(8),
    width: scaledValue(561),
  },
  textInput: {
    width: scaledValue(561),
    borderRadius: scaledValue(8),
    fontSize: scaledValue(22),
    backgroundColor: "#FFFFFF",
  },
  bottomView: {
    marginBottom: scaledValue(61),
    alignSelf: "center",
  },
  infoIcon: {
    width: scaledValue(35),
    height: scaledValue(35),
    marginLeft: scaledValue(10),
  },
  dropdownIcon: {
    width: scaledValue(20),
    height: scaledValue(14),
  },
  qtyText: {
    color: "#7D7D7D",
    fontSize: scaledValue(20),
    paddingBottom: scaledValue(10),
  },
  tooltipText: {
    color: "#000",
    fontSize: scaledValue(24),
    fontFamily: "Lato-Regular",
    position: "absolute",
  },
  bottomText: {
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(20),
    color: "#000000",
  },
  inputBoxMainView: {
    alignItems: "center",
    marginTop: scaledValue(38),
    marginBottom: scaledValue(35),
  },
  inputBox: {
    width: scaledValue(144),
    height: scaledValue(65),
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  inputBoxView: {
    flexDirection: "row",
    alignItems: "center",
  },
  incText: {
    color: "#F8993A",
    marginRight: scaledValue(40),
    fontSize: scaledValue(44),
  },
  decText: {
    color: "#F8993A",
    marginLeft: scaledValue(40),
    fontSize: scaledValue(49),
  },
  allocatedQuantityView: {
    justifyContent: "center",
    alignContent: "center",
    width: scaledValue(144),
    height: scaledValue(65),
    borderWidth: scaledValue(2),
    borderRadius: scaledValue(8),
    borderColor: "#F8993A",
  },
  allocatedQuantityText: {
    textAlign: "center",
  },
  pickerItemFontSize: {
    fontSize: scaledValue(24),
  },
});
