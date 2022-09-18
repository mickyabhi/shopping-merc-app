import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HelperText, RadioButton } from "react-native-paper";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import {
  fetchBankData,
  showAlertToast,
  showLoading,
} from "../AppStore/actions";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import API from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import { Picker } from "@react-native-picker/picker";
import InputText from "../../components/InputText";
import { isIFSC, isUpiIdValid } from "../../utils/common.utils";
import { trackAnalytics } from "../../utils/analytics.utils";
import { styles } from "./styles";
import { AlertMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const BankingInfo = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState("BankInfo");
  const storeBankInfo = useSelector<any>((state) => state?.bankInfo[0]);
  const [bankDetails, setBankDetails] = useState<any>(null);

  useEffect(() => {
    setBankDetails({
      ifscCode: storeBankInfo?.ifsc || "",
      bankName: storeBankInfo?.bankName || "",
      city: storeBankInfo?.city || "",
      branchName: storeBankInfo?.branchName || "",
      name: storeBankInfo?.accountHolderName || "",
      accountNumber: storeBankInfo?.accountNumber || "",
      confirmAccountNumber: storeBankInfo?.accountNumber || "",
      accountType: storeBankInfo?.accountType || "",
      upiId: storeBankInfo?.upiId || "",
    });
  }, [storeBankInfo]);

  useEffect(() => {
    dispatch(fetchBankData());
  }, []);

  const updateBankInfo = async () => {
    try {
      dispatch(showLoading(true));
      const bankId = await getItemFromAsyncStorage("bank_id");
      const updateBankInfo = {
        id: bankId,
        ifsc: bankDetails.ifscCode,
        bankName: bankDetails.bankName,
        city: bankDetails.city,
        branchName: bankDetails.branchName,
        accountHolderName: bankDetails.name,
        accountNumber: bankDetails.accountNumber,
        accountType: bankDetails?.accountType,
        upiId: bankDetails?.upiId,
      };
      await API.graphql({
        query: mutations.updateBankInfo,
        variables: { input: updateBankInfo },
      }).then((resp) => resp.data.updateBankInfo);

      dispatch(showLoading(false));
      props.navigation.navigate("Home");
      trackAnalytics().trackEvents("BankingInfo", {
        CTA: "UpdateButton",
      });
    } catch (error) {
      console.log("updateBankInfo.error", error);
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  };

  const hasErrors = () => {
    return bankDetails?.confirmAccountNumber
      ? bankDetails?.accountNumber != bankDetails?.confirmAccountNumber
      : null;
  };

  const checkUpiId = () => {
    return bankDetails?.upiId ? !isUpiIdValid(bankDetails?.upiId) : null;
  };

  const handleIFSC = () => {
    return bankDetails?.ifscCode ? !isIFSC(bankDetails?.ifscCode) : null;
  };

  return (
    <View style={styles.updateProfileView}>
      <Header
        headerTitle="Banking Info"
        goBack={() => {
          trackAnalytics().trackEvents("BankingInfo", {
            CTA: "BankingInfoBackIcon",
          });
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.bankView}>
          <Text allowFontScaling={false} style={styles.selectBankText}>
            Select a type for accepting online payments
          </Text>
          <View style={styles.rowView}>
            <View style={styles.buttonContainer}>
              <RadioButton
                status={checked === "BankInfo" ? "checked" : "unchecked"}
                value="first"
                color="orange"
                onPress={() => {
                  trackAnalytics().trackEvents("BankingInfo", {
                    CTA: "BankAccountButton",
                  });
                  setChecked("BankInfo");
                }}
              />
              <Text allowFontScaling={false} style={styles.bankText}>
                Bank Account
              </Text>
            </View>
            <View style={styles.buttonContainerUpiId}>
              <RadioButton
                value="second"
                color="orange"
                status={checked === "UPIId" ? "checked" : "unchecked"}
                onPress={() => {
                  trackAnalytics().trackEvents("BankingInfo", {
                    CTA: "UPIIDButton",
                  });
                  setChecked("UPIId");
                }}
              />
              <Text allowFontScaling={false} style={styles.bankText}>
                UPI Id
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.bankView}>
          <Text allowFontScaling={false} style={styles.addAccountText}>
            Add / Update your bank account information below
          </Text>
          {checked == "BankInfo" && (
            <>
              <View style={styles.bankInfoMainView}>
                <Text allowFontScaling={false} style={styles.label}>
                  Bank Information
                </Text>
                <View
                  removeClippedSubviews={true}
                  style={styles.inputContainer}
                >
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
                      trackAnalytics().trackEvents("BankingInfo", {
                        CTA: "UpdatedBankName",
                        data: bankDetails.bankName,
                      });
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
                      trackAnalytics().trackEvents("BankingInfo", {
                        CTA: "UpdatedCity",
                        data: bankDetails.City,
                      });
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
                        setBankDetails({
                          ...bankDetails,
                          accountNumber: value,
                        });
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
                      onValueChange={(itemValue) => {
                        setBankDetails({
                          ...bankDetails,
                          accountType: itemValue,
                        });
                      }}
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
              </View>
            </>
          )}
          {checked == "UPIId" && (
            <View>
              <InputText
                mode="outlined"
                maxLength={45}
                style={styles.upiIdInput}
                name="upiID"
                onChangeText={(value) => {
                  setBankDetails({ ...bankDetails, upiId: value });
                }}
                value={bankDetails?.upiId}
              />
              {checkUpiId() && (
                <HelperText type="error" visible={checkUpiId()}>
                  Invalid Upi Id
                </HelperText>
              )}
            </View>
          )}
        </View>
        <View style={styles.bottomTab}>
          <Button
            title="Update"
            height={scaledValue(106.05)}
            width={scaledValue(659.69)}
            backgroundColor="#F8993A"
            borderColor="#F8993A"
            borderRadius={scaledValue(8)}
            fontSize={scaledValue(30)}
            fontFamily="Lato-Bold"
            onPress={updateBankInfo}
            color="#FFFFFF"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BankingInfo;
