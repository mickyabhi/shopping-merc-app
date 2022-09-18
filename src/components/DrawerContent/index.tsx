import React, { useEffect, useState } from "react";
import { View, Text, Image, Share, Linking } from "react-native";
import { Avatar } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import profileImg from "../../../assets/images/profile_icon.png";
import { scaledValue } from "../../utils/design.utils";
import logout from "../../../assets/images/logout.png";
import share from "../../../assets/images/share.png";
import privacyPolicyIcon from "../../../assets/images/privacy_policy_icon.png";
import rateUs from "../../../assets/images/rate_us.png";
import { useDispatch, useSelector } from "react-redux";
import {
  showAlertToast,
  showLoading,
  showLogOutModal,
  showRateUsModal,
} from "../../screens/AppStore/actions";
import Auth from "@react-native-firebase/auth";
import { trackAnalytics } from "../../utils/analytics.utils";
import termsOfUseIcon from "../../../assets/images/terms_of_use_icon.png";
import messaging from "@react-native-firebase/messaging";
import { styles } from "./styles";
import crashlytics from "@react-native-firebase/crashlytics";
import Config from "react-native-config";
import awsmobile from "../../aws-exports";

export function DrawerContent(props) {
  const [phnNumber] = useState(Auth()?.currentUser?.phoneNumber);
  const store = useSelector<any>((state) => state?.store);
  const user = useSelector<any>((state) => state?.user);
  const storeImage = useSelector<any>((state) => state?.storeImage);
  const dispatch = useDispatch();
  const logOutHandle = () => {
    trackAnalytics().trackEvents("Drawer", {
      CTA: "Logout",
    });
    props.navigation.closeDrawer();
    props.navigation.navigate("Home");
    dispatch(showLogOutModal(true));
  };

  const shareApp = async () => {
    trackAnalytics().trackEvents("Drawer", {
      CTA: "ShareApp",
    });
    props.navigation.closeDrawer();
    try {
      const result = await Share.share({
        message:
          "https://play.google.com/store/apps/details?id=com.blocal.merchant",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      crashlytics().recordError(error);
      alert(error.message);
    }
  };

  const sortStoreImages = () => {
    return storeImage?.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  };
  const rateApp = () => {
    props.navigation.closeDrawer();
    props.navigation.navigate("Home");
    trackAnalytics().trackEvents("Drawer", {
      CTA: "RateUs",
    });
    dispatch(showRateUsModal(true));
  };

  const termsOfUseHandler = () => {
    Linking.openURL("https://blocal.co.in/user-terms/");
  };
  const privacyPolicyHandler = () => {
    Linking.openURL("https://blocal.co.in/privacy-policy/");
  };

  useEffect(() => {
    sortStoreImages();
  }, [storeImage]);

  useEffect(() => {
    const storeId = store?.id;
    if (store && storeId) {
      crashlytics().setAttribute("storeId", storeId);
      let topic = "STR_" + storeId;
      messaging()
        .subscribeToTopic(topic)
        .then(() => console.log("subscribeToTopic.success", topic))
        .catch((err) => {
          dispatch(showLoading(false));
          dispatch(
            showAlertToast({
              alertMessage: "Unable to subscribe topic",
              actionButtonTitle: "OK",
            })
          );
          crashlytics().recordError(err);
          return null;
        });
    }
  }, [store]);

  return (
    <>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <Avatar.Image
            size={scaledValue(116.93)}
            style={{ backgroundColor: "#F89A3A" }}
            source={
              storeImage && storeImage[0]?.imagePath
                ? {
                    uri: storeImage[storeImage?.length - 1]?.imagePath,
                  }
                : profileImg
            }
          />
          <Text allowFontScaling={false} style={styles.userNameText}>
            {user?.firstName + " " + user?.lastName}
          </Text>
          <Text allowFontScaling={false} style={styles.phnNumberText}>
            {phnNumber}
          </Text>
          <Text allowFontScaling={false} style={styles.emailText}>
            {user?.email}
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Terms Of Use"
          labelStyle={styles.labelText}
          onPress={termsOfUseHandler}
          icon={() => (
            <Image source={termsOfUseIcon} style={styles.privacyPolicyIcon} />
          )}
        />
        <DrawerItem
          label="Privacy Policy"
          labelStyle={styles.labelText}
          onPress={privacyPolicyHandler}
          icon={() => (
            <Image
              source={privacyPolicyIcon}
              style={styles.privacyPolicyIcon}
            />
          )}
        />

        <DrawerItem
          label="Rate Us"
          labelStyle={styles.labelText}
          onPress={rateApp}
          icon={() => <Image source={rateUs} style={styles.rateUsImg} />}
        />
        <DrawerItem
          label="Share App"
          labelStyle={styles.labelText}
          onPress={shareApp}
          icon={() => <Image source={share} style={styles.shareImg} />}
        />
        <DrawerItem
          icon={() => <Image source={logout} style={styles.logoutImg} />}
          label="Logout"
          labelStyle={styles.labelText}
          onPress={logOutHandle}
        />
        <Text allowFontScaling={false} style={styles.versionTextView}>
          {"App Version: " +
            Config.VERSION_NAME +
            " (" +
            Config.VERSION_CODE +
            ")" +
            (!awsmobile.aws_appsync_graphqlEndpoint.includes(
              "ozilyn3aovfybkfzvgaxgfc4fi"
            )
              ? " - DEV "
              : "")}
        </Text>
      </DrawerContentScrollView>
    </>
  );
}
