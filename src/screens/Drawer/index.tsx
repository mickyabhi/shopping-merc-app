import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../HomeScreen";
import { DrawerContent } from "../../components/DrawerContent";
import HomeIcon from "../../../assets/images/home_icon.png";
import MyOrderIcon from "../../../assets/images/my_order_icon.png";
import MyAddressIcon from "../../../assets/images/my_address_icon.png";
import PaymentHistoryIcon from "../../../assets/images/payment_history_icon.png";
import StoreIcon from "../../../assets/images/store_icon.png";
import CallIcon from "../../../assets/images/call_Icon.png";
import AboutUsIcon from "../../../assets/images/about_us_icon.png";
import saleSummary from "../../../assets/images/salesummary-icon.png";
import { Image } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import MinOrder from "../MinOrder";
import PreviousOrder from "../PreviousOrder";
import OnlinePayments from "../OnlinePayments";
import SalesSummary from "../SalesSummary";
import RefundPolicy from "../RefundPolicy";
import refundPolicy from "../../../assets/images/refund_policy_icon.png";
import ContactUs from "../ContactUs";
import AboutUs from "../AboutUs";
import Settings from "../ProfileSettings";
import BankingInfo from "../UpdateBankInfo";

const Drawer = createDrawerNavigator();
const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#F89A3A",
        },
        headerShown: false,
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#E88C2F",
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Image
              source={HomeIcon}
              style={{
                width: scaledValue(38.35),
                height: scaledValue(34.21),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sales Summary"
        component={SalesSummary}
        options={{
          drawerIcon: () => (
            <Image
              source={saleSummary}
              style={{
                width: scaledValue(36.22),
                height: scaledValue(36.62),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Previous Orders"
        component={PreviousOrder}
        options={{
          drawerIcon: () => (
            <Image
              source={MyOrderIcon}
              style={{
                width: scaledValue(37.84),
                height: scaledValue(41.12),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Min Order Amount"
        component={MinOrder}
        options={{
          drawerIcon: () => (
            <Image
              source={MyAddressIcon}
              style={{
                width: scaledValue(37.21),
                height: scaledValue(39.02),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Online Payments"
        component={OnlinePayments}
        options={{
          drawerIcon: () => (
            <Image
              source={PaymentHistoryIcon}
              style={{
                width: scaledValue(28.54),
                height: scaledValue(36.69),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Banking Info"
        component={BankingInfo}
        options={{
          drawerIcon: () => (
            <Image
              source={PaymentHistoryIcon}
              style={{
                width: scaledValue(28.54),
                height: scaledValue(36.69),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => (
            <Image
              source={StoreIcon}
              style={{
                width: scaledValue(29.58),
                height: scaledValue(36.36),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: () => (
            <Image
              source={CallIcon}
              style={{
                width: scaledValue(37.84),
                height: scaledValue(37.93),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About US"
        component={AboutUs}
        options={{
          drawerIcon: () => (
            <Image
              source={AboutUsIcon}
              style={{
                width: scaledValue(37.84),
                height: scaledValue(37.89),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Refund Policy"
        component={RefundPolicy}
        options={{
          drawerIcon: () => (
            <Image
              source={refundPolicy}
              style={{
                width: scaledValue(37.84),
                height: scaledValue(37.89),
                marginLeft: scaledValue(0),
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
