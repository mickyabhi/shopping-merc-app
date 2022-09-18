import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  SignInWithPhoneNumberScreenView: {
    flex: 1,
    alignItems: "center",
  },
  logoImage: {
    height: scaledValue(114.18),
    width: scaledValue(385.43),
    marginTop: scaledValue(124),
  },
  textHi: {
    fontSize: scaledValue(50),
    color: "#000000",
    marginTop: scaledValue(142.82),
    fontFamily: "Lato-Bold",
  },
  textWelcome: {
    fontSize: scaledValue(36),
    color: "#00000057",
    marginTop: scaledValue(19),
    marginBottom: scaledValue(64),
    fontFamily: "Lato-Regular",
  },
  input: {
    width: scaledValue(650),
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
    backgroundColor: "#fff",
  },
  emptyView: {
    height: scaledValue(31.12),
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
