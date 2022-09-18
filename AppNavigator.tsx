import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SignInWithPhoneNumber from "./src/screens/SignInWithPhoneNumber";
import RegisterStoreInfo from "./src/screens/RegisterAsMerchantStoreInfo";
import BankInfo from "./src/screens/RegisterBankInfo/";
import Drawer from "./src/screens/Drawer";
import RespondToOrderScreen from "./src/screens/RespondToOrderScreen";
import BottomTabs from "./src/screens/BottomTabs";
import ManageInventory from "./src/screens/ManageInventory";
import ChatScreen from "./src/screens/ChatScreen";
import SplashScreen from "./src/screens/SplashScreen/";
import VerifyOTPScreen from "./src/screens/VerifyOTPScreen";
import BillSlabOffer from "./src/screens/BillSlabOffer";
import OfferManagement from "./src/screens/OfferManagement";
import ProductOffer from "./src/screens/ProductOffer";
import RecencyCustomerOffer from "./src/screens/RecencyCustomerOffer";
import FrequencyCustomers from "./src/screens/FrequencyCustomers";
import OnlinePayments from "./src/screens/OnlinePayments";
import MonetaryCustomers from "./src/screens/MonetaryCustomers";
import CrossCategoryPromo from "./src/screens/CrossCategoryPromo";
import ConfirmDelivery from "./src/screens/ConfirmDelivery";
import BundleOffer from "./src/screens/BundleOffer";
import MapScreen from "./src/screens/MapScreen";
import analytics from "@react-native-firebase/analytics";
import BillSlabCard from "./src/screens/BillSlabCard";
import ExistingOffers from "./src/screens/ExistingOffers";
import LoadingComponent from "./src/components/LoadingComponent";
import SnackBar from "./src/components/SnackBar";
import messaging from "@react-native-firebase/messaging";
import { useSelector } from "react-redux";
import { getItemFromAsyncStorage } from "./src/utils/storage.utils";
import crashlytics from "@react-native-firebase/crashlytics";
import { AppState } from "react-native";
import { loadAmplifyAuth } from "./src/utils/common.utils";
import linking from "./src/utils/deepLinking.utils";

const AppNavigator = () => {
  const Stack = createStackNavigator();
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const loadingState = useSelector<any>((state) => state?.loadingState);
  const alertData = useSelector<any>((state) => state?.alertData);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState != "background") {
        // messaging().onMessage(sendLocalNotification);
        loadAmplifyAuth();
      } else if (nextAppState == "background") {
        // messaging().onMessage(null);
      }
    });
    loadAmplifyAuth();

    return () => {
      subscription.remove();
    };
  }, []);

  const requestUserPermission = async () => {
    const token = await messaging().getToken();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    const currentUserId = await getItemFromAsyncStorage("current_user_id");
    if (currentUserId) {
      crashlytics().setUserId(currentUserId);
      let topic = "MAU" + currentUserId;

      messaging()
        .subscribeToTopic(topic)
        .then(() => console.log("subscribeToTopic.success", topic))
        .catch((err) => {
          crashlytics().recordError(err);
        });
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef?.current;
          const currentRouteName = navigationRef?.current?.getCurrentRoute()
            .name;
          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: "#fff",
            },
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="SignInWithPhoneNumber"
            component={SignInWithPhoneNumber}
          />
          <Stack.Screen
            name="RegisterStoreInfo"
            component={RegisterStoreInfo}
          />
          <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
          <Stack.Screen name="BankInfo" component={BankInfo} />
          <Stack.Screen name="Home" component={Drawer} />

          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen
            name="RespondToOrderScreen"
            component={RespondToOrderScreen}
          />
          <Stack.Screen name="Inventory" component={ManageInventory} />
          <Stack.Screen name="BillSlabOffer" component={BillSlabOffer} />
          <Stack.Screen name="BillSlabCard" component={BillSlabCard} />
          <Stack.Screen name="ExistingOffers" component={ExistingOffers} />
          <Stack.Screen name="ProductOffer" component={ProductOffer} />
          <Stack.Screen
            name="RecencyCustomerOffer"
            component={RecencyCustomerOffer}
          />
          <Stack.Screen name="OfferManagement" component={OfferManagement} />
          <Stack.Screen
            name="FrequencyCustomers"
            component={FrequencyCustomers}
          />
          <Stack.Screen name="OnlinePayments" component={OnlinePayments} />
          <Stack.Screen
            name="MonetaryCustomers"
            component={MonetaryCustomers}
          />
          <Stack.Screen
            name="CrossCategoryPromo"
            component={CrossCategoryPromo}
          />
          <Stack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="BundleOffer" component={BundleOffer} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {loadingState && <LoadingComponent />}
      {alertData != null && alertData?.alertMessage && (
        <SnackBar
          alertMessage={alertData?.alertMessage}
          actionButtonTitle={alertData?.actionButtonTitle}
        />
      )}
    </>
  );
};

export default AppNavigator;
