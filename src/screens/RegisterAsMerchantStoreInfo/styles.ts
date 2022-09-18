import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  dropdown: {
    marginLeft: scaledValue(50),
    color: "#000000",
  },
  toggle: {
    width: 50,
    bottom: scaledValue(80),
    left: scaledValue(540),
  },
  input: {
    backgroundColor: "transparent",
    fontSize: scaledValue(26),
    height: scaledValue(106.58),
  },
  inputBoxContainer: {
    marginTop: scaledValue(60),
    flex: 1,
  },
  registerStoreInfoView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  camImg: {
    resizeMode: "center",
    height: scaledValue(160),
    width: scaledValue(300),
    paddingHorizontal: 40,
  },
  inputBOX: {
    borderWidth: 1,
    width: scaledValue(660),
    borderColor: "#F5672E",
    paddingLeft: scaledValue(95),
    borderRadius: 7,
  },
  label: {
    left: scaledValue(38),
    fontFamily: "Lato-Bold",
    marginTop: scaledValue(30),
    marginBottom: scaledValue(20),
  },
  imgPicker: {
    width: "100%",
    height: "100%",
    borderRadius: scaledValue(12),
  },
  inputContainer: {
    elevation: 1.2,
    paddingHorizontal: scaledValue(15),
    shadowColor: "#0000004D",
    borderRadius: scaledValue(24),
    width: "90%",
    alignSelf: "center",
    borderColor: "#F5672E",
  },
  dropDownImg: {
    resizeMode: "contain",
    height: scaledValue(40),
    width: scaledValue(40),
    top: scaledValue(36),
    left: scaledValue(20),
    position: "absolute",
  },
  setStoreImage: {
    borderWidth: 1,
    borderColor: "#F5672E",
    width: scaledValue(675),
    height: scaledValue(350),
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    left: scaledValue(38),
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaledValue(45.12),
    marginBottom: scaledValue(51.95),
  },
  picker: {
    marginLeft: scaledValue(49),
  },
  imageHelperText: {
    marginLeft: scaledValue(30),
  },
  applyChargesView: {
    paddingHorizontal: scaledValue(83),
  },
  minOrderValueText: {
    fontSize: scaledValue(26),
    paddingVertical: scaledValue(41.15),
    paddingLeft: scaledValue(68.57),
    fontFamily: "Lato-Medium",
  },
  deliveryChargesView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  pickerView: {
    width: scaledValue(264.85),
    shadowColor: "#0000004D",
    elevation: 1.2,
    borderRadius: scaledValue(8),
  },
  applyChargesText: {
    fontSize: scaledValue(26),
    fontFamily: "Lato-Medium",
  },
});
