import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loaderView: {
    position: "absolute",
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffff",
    opacity: 0.6,
    zIndex: 1,
  },
});
