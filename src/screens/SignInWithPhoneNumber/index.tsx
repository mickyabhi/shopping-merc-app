import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  View,
  Keyboard,
} from "react-native";
import bLocalIcon from "../../../assets/images/logo_v.png";
import mobile from "../../../assets/images/mobile.png";
import { scaledValue } from "../../utils/design.utils";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/InputText";
import { TextInput, HelperText } from "react-native-paper";
import { isNumeric } from "../../utils/common.utils";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { showAlertToast, showLoading } from "../AppStore/actions";
import { styles } from "./styles";
import { AlertMessage, ErrorMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";
import Geolocation from "@react-native-community/geolocation";
import { setItemInAsyncStorage } from "../../utils/storage.utils";

const SignInWithPhoneNumber = (props) => {
  const [showEditNumber] = useState(props?.route?.params?.phoneNumber);
  const [editNumber] = useState(showEditNumber?.slice(3));
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("" || editNumber);
  const navigation = useNavigation<any>();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const hasErrors = () => {
    return phoneNumber != null && !isNumeric(phoneNumber);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((data) => {
      setLocation({
        latitude: data?.coords?.latitude?.toString(),
        longitude: data?.coords?.longitude?.toString(),
      });
    });
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setItemInAsyncStorage("latitude", location.latitude);
      setItemInAsyncStorage("longitude", location.longitude);
      if (phoneNumber?.length == 10) signInWithPhoneNumber();
    }
  }, [location]);

  const signInWithPhoneNumber = async () => {
    if (location?.latitude == null && location?.latitude == null) {
      Geolocation.getCurrentPosition((data) => {
        setLocation({
          latitude: data?.coords?.latitude?.toString(),
          longitude: data?.coords?.longitude?.toString(),
        });
      });
    }
    Keyboard.dismiss();
    try {
      dispatch(showLoading(true));
      if (phoneNumber != null) {
        const confirmation = await auth().signInWithPhoneNumber(
          "+91" + phoneNumber,
          true
        );
        if (confirmation != null) {
          navigation.replace("VerifyOTPScreen", {
            userPhoneNumber: "+91" + phoneNumber,
            confirmationObj: confirmation,
          });
        }
      }

      dispatch(showLoading(false));
    } catch (error) {
      dispatch(showLoading(false));
      if (error.code === ErrorMessage.NETWORK) {
        dispatch(
          showAlertToast({
            alertMessage: AlertMessage.NETWORK_CONNECTION_MESSAGE,

            actionButtonTitle: "OK",
          })
        );
      } else if (error.code === ErrorMessage.INVALID_PHONE_NUMBER) {
        dispatch(
          showAlertToast({
            alertMessage: AlertMessage.INVALID_PHONE_NUMBER_MESSAGE,

            actionButtonTitle: "OK",
          })
        );
      } else if (error.code === ErrorMessage.OTP_REQUEST) {
        dispatch(
          showAlertToast({
            alertMessage: AlertMessage.OTP_REQUEST_MESSAGE,

            actionButtonTitle: "OK",
          })
        );
      } else {
        dispatch(
          showAlertToast({
            alertMessage: error?.message,

            actionButtonTitle: "OK",
          })
        );
      }

      console.log("SignInWithPhoneNumber.err", error);
      crashlytics().recordError(error);
    }
  };

  console.log("location", location);

  return (
    <SafeAreaView style={styles.SignInWithPhoneNumberScreenView}>
      <StatusBar backgroundColor="#F5672E" />
      <Image source={bLocalIcon} style={styles.logoImage} />

      <Text allowFontScaling={false} style={styles.textHi}>
        Hi!
      </Text>

      <Text allowFontScaling={false} style={styles.textWelcome}>
        Welcome to b.local
      </Text>

      <View>
        <Input
          style={styles.input}
          label={"Enter your mobile number"}
          onChangeText={(value) => setPhoneNumber(value)}
          value={phoneNumber}
          keyboardType="numeric"
          borderRadius={scaledValue(24)}
          maxLength={10}
          mode="outlined"
          position={<TextInput.Icon name={mobile} color="#FF8800D9" />}
        />
        <HelperText type="error" visible={hasErrors()}>
          Phone Number is invalid!
        </HelperText>
      </View>

      <View style={styles.emptyView} />
      <Button
        width={scaledValue(656.37)}
        height={scaledValue(106.5)}
        title="Get OTP"
        borderRadius={scaledValue(8)}
        disableColor="#FBCC9C"
        disableBorderColor="#FBCC9C"
        backgroundColor="#F8993A"
        borderColor="#F8993A"
        color="#fff"
        disable={phoneNumber?.length !== 10 || !isNumeric(phoneNumber)}
        onPress={signInWithPhoneNumber}
      />
    </SafeAreaView>
  );
};

export default SignInWithPhoneNumber;
