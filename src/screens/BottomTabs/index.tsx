import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageInventory from "../ManageInventory/index";
import { scaledValue } from "../../utils/design.utils";
// import BuyInventory from "../BuyInventory";
import Drawer from "../Drawer";
// import OfferManagement from "../OfferManagement";
import respondActiveIcon from "../../../assets/images/focus_respond_img.png";
import respondIcon from "../../../assets/images/respond_img.png";
import manageInventoryActiveIcon from "../../../assets/images/focus_manage_inventory.png";
import manageInventoryIcon from "../../../assets/images/manage_inventory.png";
import buyInventoryIcon from "../../../assets/images/buy_inventory.png";
import offerManagementIcon from "../../../assets/images/offer_management.png";
import offerManagementActiveIcon from "../../../assets/images/focus_offer_management.png";

const Tab = createBottomTabNavigator();
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarActiveTintColor: "#F99732",
      tabBarInactiveTintColor: "gray",
      keyboardHidesTabBar: true,
      tabBarLabelStyle: { bottom: scaledValue(10), fontSize: scaledValue(16) },
      tabBarPosition: "bottom",
      swipeEnabled: false,
      tabBarIcon: ({ focused }) => {
        let iconName;
        if (route.name === "Respond To Orders") {
          iconName = focused ? respondActiveIcon : respondIcon;
        } else if (route.name === "Manage Inventory") {
          iconName = focused ? manageInventoryActiveIcon : manageInventoryIcon;
        } else if (route.name === "Buy Inventory") {
          iconName = buyInventoryIcon;
        } else if (route.name === "Offer Management") {
          iconName = focused ? offerManagementActiveIcon : offerManagementIcon;
        }
        return <Image source={iconName} style={styles.bottomIcons} />;
      },
    })}
  >
    <Tab.Screen name="Respond To Orders" component={Drawer} />
    <Tab.Screen name="Manage Inventory" component={ManageInventory} />
    {/* <Tab.Screen name="Buy Inventory" component={BuyInventory} />
    <Tab.Screen name="Offer Management" component={OfferManagement} /> */}
  </Tab.Navigator>
);

export default BottomTabs;

const styles = StyleSheet.create({
  bottomIcons: {
    resizeMode: "center",
    width: scaledValue(40),
    height: scaledValue(40),
  },
});
