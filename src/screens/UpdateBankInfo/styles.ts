import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowView: {
    flexDirection: "row",
    marginTop: scaledValue(15),
  },
  bankText: {
    fontFamily: "Lato-Bold",
    top: scaledValue(15),
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: scaledValue(30),
  },
  buttonContainerUpiId: {
    flexDirection: "row",
    marginLeft: scaledValue(136.18),
  },
  bankView: {
    top: scaledValue(30),
  },
  selectBankText: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(26),
    marginLeft: scaledValue(47),
  },
  line: {
    borderBottomWidth: 0.2,
    marginTop: scaledValue(50),
    width: "100%",
  },
  addAccountText: {
    fontSize: scaledValue(24),
    color: "grey",
    marginLeft: scaledValue(47),
  },
  updateProfileView: {
    flex: 1,
  },
  bottomTab: {
    marginTop: scaledValue(65.46),
    marginBottom: scaledValue(64.95),
    alignSelf: "center",
  },

  bankInfoMainView: {
    flex: 1,
    alignItems: "center",
  },
  accountInfoView: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontFamily: "Lato-Bold",
    marginBottom: scaledValue(25),
    marginTop: scaledValue(40),
  },
  topView: {
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "transparent",
    fontSize: scaledValue(26),
    height: scaledValue(106.58),
  },
  inputContainer: {
    elevation: 1.2,
    paddingHorizontal: scaledValue(15),
    width: scaledValue(658.07),
    shadowColor: "#0000004D",
    borderRadius: scaledValue(24),
    borderColor: "#F5672E",
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaledValue(47.97),
    marginBottom: scaledValue(50.95),
  },
  upiIdInput: {
    backgroundColor: "transparent",
    width: scaledValue(659.69),
    alignSelf: "center",
  },
});
