import { scaledValue } from "../../utils/design.utils";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  resendText: {
    color: "#FBCC9C",
    fontSize: scaledValue(26),
    fontFamily: "Lato-Semibold",
  },
  activeResendText: {
    color: "#F8993A",
    fontSize: scaledValue(26),
  },
  inActiveResendText: {
    color: "#FBCC9C",
    fontSize: scaledValue(26),
  },
  otpImage: {
    height: scaledValue(132.19),
    width: scaledValue(152.04),
    marginTop: scaledValue(132),
  },
  enterOtpText: {
    fontSize: scaledValue(26),
    color: "#000000",
    marginTop: scaledValue(104.81),
    width: scaledValue(460),
    textAlign: "center",
    fontFamily: "Lato-Regular",
    lineHeight: scaledValue(34),
  },
  input: {
    width: scaledValue(650),
    textAlign: "center",
    backgroundColor: "#fff",
  },
  editImage: {
    width: scaledValue(41),
    height: scaledValue(41),
    marginTop: scaledValue(45),
  },
  textNumber: {
    color: "#000000",
    fontSize: scaledValue(30),
    marginTop: scaledValue(45),
    paddingHorizontal: scaledValue(23),
    fontFamily: "Lato-Medium",
    lineHeight: scaledValue(36),
  },
  container: {
    flexDirection: "row",
    marginBottom: scaledValue(51),
  },
  receiveOtpText: {
    fontSize: scaledValue(26),
    color: "#00000057",
    paddingHorizontal: scaledValue(11),
    fontFamily: "Lato-Regular",
    lineHeight: scaledValue(32),
  },
  resendOtpText: {
    fontSize: scaledValue(26),
    color: "#F8993A",
    fontFamily: "Lato-SemiBold",
    lineHeight: scaledValue(32),
  },
  receiveOtpTextContainer: {
    flexDirection: "row",
    marginBottom: scaledValue(27),
    alignItems: "center",
  },
  safeAreaViewStyle: {
    flex: 1,
    alignItems: "center",
  },
  loaderView: {
    position: "absolute",
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#000",
    opacity: 0.6,
    zIndex: 1,
  },
});

export default styles;
