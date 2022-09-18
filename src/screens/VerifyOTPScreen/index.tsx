import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import styles from "./styles";
import otp_image from "../../../assets/images/otp_image.png";
import edit_image from "../../../assets/images/edit_image.png";
import { scaledValue } from "../../utils/design.utils";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../components/InputText";
import { HelperText } from "react-native-paper";
import { isNumeric, signOutUser } from "../../utils/common.utils";
import { useDispatch } from "react-redux";
import { setItemInAsyncStorage } from "../../utils/storage.utils";
import { signIn } from "../SignInWithPhoneNumber/store/actions";
import { Auth } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { API } from "aws-amplify";
import { showAlertToast, showLoading } from "../AppStore/actions";
import auth from "@react-native-firebase/auth";
import { AlertMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const VerifyOTPScreen = (props) => {
  const phoneNumber = props?.route?.params?.userPhoneNumber.slice(-10);
  const dispatch = useDispatch();
  const [userPhoneNumber] = useState(props.route.params.userPhoneNumber);
  const [confirmationObj] = useState(props.route.params.confirmationObj);
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState(null);
  const [time, setTime] = useState(30);
  useEffect(() => {
    setTimeout(() => setTime(time - 1), 1000);
  }, [time]);
  const resendOtp = async () => {
    Keyboard.dismiss();
    console.log("signInWithPhoneNumber", phoneNumber);
    try {
      dispatch(showLoading(true));
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
      dispatch(showLoading(false));
    } catch (error) {
      crashlytics().recordError(error);
      console.log(error);
    }
  };

  const hasErrors = () => {
    return otp != null && !isNumeric(otp);
  };
  const verifyOTP = async () => {
    try {
      Keyboard.dismiss();
      dispatch(showLoading(true));

      const confirmResp = await confirmationObj.confirm(otp).catch((err) => {
        crashlytics().recordError(err);
        dispatch(showLoading(false));
        return null;
      });
      const firebaseUserId = confirmResp?.user?.uid;

      console.log("userPhoneNumber", userPhoneNumber);
      console.log("firebaseUserId", firebaseUserId);

      if (firebaseUserId == null) {
        dispatch(showLoading(false));
        dispatch(
          showAlertToast({
            alertMessage: AlertMessage.SOMETHING_WENT_WRONG,

            actionButtonTitle: "Okay",
          })
        );
        return;
      }

      const cognitoUser = await Auth.signUp({
        username: userPhoneNumber,
        password: firebaseUserId,
        attributes: {
          phone_number: userPhoneNumber,
        },
      })
        .then(() => Auth.signIn(userPhoneNumber, firebaseUserId))
        .catch((err) => {
          console.log("performCognitoAuth.signUp.err:", err);
          return Auth.signIn(userPhoneNumber, firebaseUserId);
        });
      if (confirmResp !== null) {
        dispatch(signIn(userPhoneNumber));
      }

      const merchantId = userPhoneNumber.replace("+", "_");
      const cognitoUserData = JSON.stringify(cognitoUser);
      setItemInAsyncStorage("cognitoUserData", cognitoUserData);

      const existUserAddress = await API.graphql({
        query: queries.addressByUserId,
        variables: { userId: merchantId },
      }).then((resp) => resp.data.addressByUserId.items);

      if (existUserAddress.length != 0) {
        dispatch(showLoading(false));
        alert(
          "This number is already register as a Customer. please login with another number"
        );
        await signOutUser().then(navigation.navigate("SignInWithPhoneNumber"));
        return;
      }

      const user = await API.graphql({
        query: queries.getUser,
        variables: { id: merchantId },
      }).then((resp) => resp.data.getUser);
      console.log("verifyOTP.user", user);

      if (user == null) {
        navigation.replace("MapScreen");
        dispatch(showLoading(false));
        return;
      }

      const storeAdmin = await API.graphql({
        query: queries.storeAdminByUserId,
        variables: { userId: merchantId },
      }).then((resp) => resp.data.storeAdminByUserId.items[0]);
      console.log("verifyOTP.storeAdmin", storeAdmin);
      if (storeAdmin == null) {
        navigation.replace("MapScreen");
        dispatch(showLoading(false));
        return;
      }
      const bankInfo = await API.graphql({
        query: queries.bankInfoByStoreId,
        variables: { storeId: storeAdmin?.storeId },
      }).then((resp) => resp.data.bankInfoByStoreId.items);
      console.log("verifyOTP.bankInfo", bankInfo);

      if (bankInfo.length == 0) {
        navigation.replace("BankInfo");
        setItemInAsyncStorage("store_id", storeAdmin?.storeId);
        dispatch(showLoading(false));
        return;
      }

      navigation.replace("BottomTabs");
      setItemInAsyncStorage("store_id", storeAdmin?.storeId);
      setItemInAsyncStorage("bank_id", bankInfo[0]?.id);
      dispatch(showLoading(false));
      return;
    } catch (error) {
      crashlytics().recordError(error);
      dispatch(showLoading(false));
      dispatch(
        showAlertToast({
          alertMessage: error?.message || "Invalid OTP",

          actionButtonTitle: "Okay",
        })
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <StatusBar backgroundColor="#F5672E" />
      <Image source={otp_image} style={styles.otpImage} />

      <Text allowFontScaling={false} style={styles.enterOtpText}>
        Please enter OTP sent to your registered mobile number
      </Text>
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.textNumber}>
          {userPhoneNumber}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.replace("SignInWithPhoneNumber", {
              phoneNumber: userPhoneNumber,
            })
          }
        >
          <Image source={edit_image} style={styles.editImage} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          label={""}
          keyboardType="numeric"
          mode="outlined"
          enablesReturnKeyAutomatically={true}
          value={otp}
          onChangeText={(value) => setOtp(value)}
          maxLength={6}
          borderRadius={scaledValue(24)}
        />
        <HelperText type="error" visible={hasErrors()}>
          OTP is invalid!
        </HelperText>
      </View>
      <View style={styles.receiveOtpTextContainer}>
        <Text allowFontScaling={false} style={styles.receiveOtpText}>
          Didn&apos;t receive OTP?
        </Text>
        <TouchableOpacity onPress={resendOtp} disabled={time > 0}>
          <Text allowFontScaling={false} style={styles.resendText}>
            <Text
              style={
                time > 0 ? styles.inActiveResendText : styles.activeResendText
              }
            >
              RESEND OTP
            </Text>
            {time > 0 && <> in {time} sec</>}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        disable={otp == null || otp.length !== 6 || !isNumeric(otp)}
        width={scaledValue(592.64)}
        height={scaledValue(106.05)}
        disableColor="#FBCC9C"
        disableBorderColor="#FBCC9C"
        backgroundColor="#F8993A"
        borderColor="#F8993A"
        title="Verify"
        color="#fff"
        fontFamily="Lato-SemiBold"
        lineHeight={scaledValue(36)}
        size={scaledValue(30)}
        borderRadius={scaledValue(24)}
        onPress={() => verifyOTP()}
      />
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
