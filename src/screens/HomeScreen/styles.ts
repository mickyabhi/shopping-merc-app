import { StyleSheet } from "react-native";
import { scaledValue } from "../../utils/design.utils";

export const styles = StyleSheet.create({
  homePageView: {
    flex: 1,
  },
  homePageMainView: {
    flex: 1,
  },
  avatarItemsView: {
    paddingVertical: scaledValue(20),
    paddingHorizontal: scaledValue(63),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardsView: {
    alignItems: "center",
    flex: 1,
  },
});
