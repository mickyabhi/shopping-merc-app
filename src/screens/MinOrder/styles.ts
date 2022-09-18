import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  minOrderView: {
    flex: 1,
  },
  minOrderMainView: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Bold",
    padding: scaledValue(33),
    width: scaledValue(700.85),
  },
  buttonView: {
    marginTop: scaledValue(45),
    alignSelf: "center",
  },
  input: {
    width: scaledValue(657.85),
    height: scaledValue(115.77),
  },
  toggleButton: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  inputAndSwitch: {
    justifyContent: "center",
  },
  minOrderValueText: {
    fontSize: scaledValue(26),
    paddingVertical: scaledValue(41.15),
    paddingLeft: scaledValue(40.57),
  },
  deliveryChargesView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: scaledValue(657.85),
  },
  pickerView: {
    width: scaledValue(264.85),
    borderWidth: 1,
    borderColor: "#F8993A",
    borderRadius: scaledValue(8),
  },
  dropDownImg: {
    resizeMode: "contain",
    height: scaledValue(40),
    width: scaledValue(40),
    top: scaledValue(36),
    left: scaledValue(20),
    position: "absolute",
  },
  picker: {
    marginLeft: scaledValue(49),
  },
});
