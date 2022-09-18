import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Stepper from "../../components/StepperUI";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import { isIFSC, isNumeric } from "../../utils/common.utils";
import { HelperText } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import API from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import {
  getItemFromAsyncStorage,
  setItemInAsyncStorage,
} from "../../utils/storage.utils";
import { useDispatch } from "react-redux";
import { showAlertToast, showLoading } from "../AppStore/actions";
import { AlertMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const BankInfo = (props) => {
  const dispatch = useDispatch();

  const [disableRegisterButton, setDisableRegisterButton] =
    useState<any>(false);

  const [bankDetails, setBankDetails] = useState({
    ifscCode: "",
    bankName: "",
    city: "",
    branchName: "",
    name: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: null,
  });

  useEffect(() => {
    setDisableRegisterButton(
      bankDetails?.bankName.length < 2 ||
        bankDetails?.accountNumber.length < 7 ||
        bankDetails?.confirmAccountNumber.length < 7 ||
        bankDetails?.accountNumber !== bankDetails?.confirmAccountNumber ||
        bankDetails?.accountType === "" ||
        !isIFSC(bankDetails?.ifscCode) ||
        !isNumeric(bankDetails?.accountNumber) ||
        !isNumeric(bankDetails?.confirmAccountNumber)
    );
  }, [bankDetails]);

  const hasErrors = () => {
    return bankDetails.confirmAccountNumber
      ? bankDetails.accountNumber != bankDetails.confirmAccountNumber
      : null;
  };

  const handleIFSC = () => {
    return bankDetails?.ifscCode ? !isIFSC(bankDetails?.ifscCode) : null;
  };

  const submitBankDetails = async () => {
    try {
      dispatch(showLoading(true));
      const storeId = await getItemFromAsyncStorage("store_id");
      const createBankInfoInput = {
        ifsc: bankDetails.ifscCode,
        city: bankDetails.city,
        bankName: bankDetails.bankName,
        branchName: bankDetails.branchName,
        accountNumber: bankDetails.accountNumber,
        accountHolderName: bankDetails.name,
        accountType: bankDetails.accountType,
        storeId: storeId,
      };

      const storeBankInfo = await API.graphql({
        query: mutations.createBankInfo,
        variables: { input: createBankInfoInput },
      }).then((resp) => resp.data.createBankInfo);

      await setItemInAsyncStorage("bank_id", storeBankInfo.id);
      props.navigation.navigate("BottomTabs");
      dispatch(showLoading(false));
    } catch (error) {
      dispatch(showLoading(false));
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,

          actionButtonTitle: "OK",
        })
      );
    }
  };
  return (
    <View style={styles.bankInfoView}>
      <Header
        headerTitle="Register As Merchant"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.bankInfoScrollView}>
        <Stepper registerInfoType="Bank Info" />
        <View style={styles.bankInfoMainView}>
          <Text allowFontScaling={false} style={styles.label}>
            Bank Information
          </Text>
          <View removeClippedSubviews={true} style={styles.inputContainer}>
            <InputText
              label="IFSC Code"
              mode="flat"
              maxLength={11}
              style={styles.input}
              name="Name"
              onChangeText={(value) => {
                setBankDetails({ ...bankDetails, ifscCode: value });
              }}
              value={bankDetails?.ifscCode}
            />
            {handleIFSC() && (
              <HelperText type="error" visible={handleIFSC()}>
                Invalid IFSC Code
              </HelperText>
            )}
            <InputText
              label="Bank Name"
              mode="flat"
              style={styles.input}
              maxLength={50}
              name="Name"
              onChangeText={(value) => {
                setBankDetails({ ...bankDetails, bankName: value });
              }}
              value={bankDetails?.bankName}
            />
            <InputText
              label="City"
              mode="flat"
              style={styles.input}
              maxLength={30}
              name="Name"
              onChangeText={(value) => {
                setBankDetails({ ...bankDetails, city: value });
              }}
              value={bankDetails?.city}
            />
            <InputText
              label="Branch Name"
              mode="flat"
              style={styles.input}
              name="Name"
              underlineColor="transparent"
              onChangeText={(value) => {
                setBankDetails({ ...bankDetails, branchName: value });
              }}
              value={bankDetails?.branchName}
            />
          </View>

          <View style={styles.accountInfoView}>
            <Text allowFontScaling={false} style={styles.label}>
              Account Information
            </Text>
            <View style={styles.inputContainer}>
              <InputText
                label="Name"
                mode="flat"
                style={styles.input}
                name="Name"
                onChangeText={(value) => {
                  setBankDetails({ ...bankDetails, name: value });
                }}
                value={bankDetails?.name}
              />
              <InputText
                label="Account Number"
                mode="flat"
                contextMenuHidden={true}
                style={styles.input}
                maxLength={32}
                keyboardType="numeric"
                name="Name"
                onChangeText={(value) => {
                  setBankDetails({ ...bankDetails, accountNumber: value });
                }}
                value={bankDetails?.accountNumber}
              />
              <InputText
                label="Confirm Account Number"
                mode="flat"
                style={styles.input}
                secureTextEntry={true}
                maxLength={32}
                contextMenuHidden={true}
                keyboardType="numeric"
                name="Name"
                onChangeText={(value) => {
                  setBankDetails({
                    ...bankDetails,
                    confirmAccountNumber: value,
                  });
                }}
                value={bankDetails?.confirmAccountNumber}
              />
              {hasErrors() && (
                <HelperText type="error" visible={hasErrors()}>
                  Account number and Confirm Account Number don't match
                </HelperText>
              )}
              <Picker
                selectedValue={bankDetails?.accountType}
                dropdownIconColor="#808080"
                onValueChange={(itemValue) =>
                  setBankDetails({
                    ...bankDetails,
                    accountType: itemValue,
                  })
                }
              >
                <Picker.Item
                  color="gray"
                  label="Account Type"
                  enabled={false}
                />
                <Picker.Item label="Saving" value="Saving" />
                <Picker.Item label="Current" value="Current" />
              </Picker>
            </View>
          </View>
          <View style={styles.bottomButton}>
            <Button
              title="Register"
              height={scaledValue(106.05)}
              width={scaledValue(659.69)}
              backgroundColor="#F8993A"
              borderColor="#F8993A"
              borderRadius={scaledValue(8)}
              fontSize={scaledValue(30)}
              fontFamily="Lato-Bold"
              disable={disableRegisterButton}
              onPress={submitBankDetails}
              color="#FFFFFF"
              disableColor="#FBCC9C"
              disableBorderColor="#FBCC9C"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  bankInfoView: {
    flex: 1,
  },
  bankInfoScrollView: {
    flex: 1,
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
});

export default BankInfo;
