import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  phnNumberText: {
    marginVertical: scaledValue(9),
    fontSize: scaledValue(20),
    color: "#fff",
  },
  userNameText: {
    fontSize: scaledValue(30),
    color: "#fff",
  },
  emailText: {
    fontSize: scaledValue(20),
    color: "#fff",
  },
  profileImg: {
    backgroundColor: "#F89A3A",
  },
  profileView: {
    marginLeft: scaledValue(44),
    marginTop: scaledValue(25),
    marginBottom: scaledValue(45),
  },
  labelText: {
    color: "#fff",
  },
  shareImg: {
    width: scaledValue(38),
    height: scaledValue(45),
  },
  logoutImg: {
    width: scaledValue(36.91),
    height: scaledValue(36.91),
  },
  rateUsImg: {
    width: scaledValue(37.09),
    height: scaledValue(35.53),
  },

  privacyPolicyIcon: {
    width: scaledValue(27.32),
    height: scaledValue(35.86),
  },
  versionTextView: {
    paddingVertical: scaledValue(25),
    fontSize: scaledValue(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#fff",
  },
});
