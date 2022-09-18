import React, { useEffect, useRef, useState } from "react";
import { View, Text, Switch, Keyboard, Image } from "react-native";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import API from "@aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import { styles } from "./styles";
import { useIsFocused } from "@react-navigation/core";
import {
  fetchStoreData,
  showAlertToast,
  showLoading,
} from "../AppStore/actions";
import { AlertMessage } from "../../utils/constants";
import { Picker } from "@react-native-picker/picker";
import rupee from "../../../assets/images/rupee.png";
import crashlytics from "@react-native-firebase/crashlytics";

const MinOrder = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const minimumOrder = useRef<HTMLInputElement>(null);
  const store = useSelector<any>((state) => state?.store);

  const [minOrderValue, setMinOrderValue] = useState(store?.minimumAmount);
  const [isMinOrderEnable, setIsMinOrderEnable] = useState(true);

  const [deliveryChargesValue, setDeliveryChargesValue] = useState(
    store?.deliveryCharges
  );

  const toggleSwitch = (switchState) => {
    setIsMinOrderEnable(switchState);
  };

  useEffect(() => {
    if (isMinOrderEnable) {
      minimumOrder?.current?.focus();
    }
  }, [isMinOrderEnable]);

  useEffect(() => {
    setDeliveryChargesValue(store?.deliveryCharges);
    setMinOrderValue(store?.minimumAmount);
    if (store?.minimumAmount == 0) setIsMinOrderEnable(false);
    else setIsMinOrderEnable(true);
  }, [isFocused]);

  const updateMinOrderHandler = async () => {
    Keyboard.dismiss();
    dispatch(showLoading(true));
    const storeId = await getItemFromAsyncStorage("store_id");

    const updateStoreInput = {
      id: storeId,
      minimumAmount: isMinOrderEnable ? minOrderValue : 0,
      deliveryCharges: isMinOrderEnable ? deliveryChargesValue : 0,
    };

    const updateStoreRes = await API.graphql({
      query: mutations.updateStore,
      variables: {
        input: updateStoreInput,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        crashlytics().recordError(error);
        dispatch(
          showAlertToast({
            alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
            actionButtonTitle: "OK",
          })
        );
        return null;
      });

    if (updateStoreRes != null) {
      dispatch(fetchStoreData());
      dispatch(
        showAlertToast({
          alertMessage:
            "Minimum order amount updated to Rs." +
            (isMinOrderEnable ? minOrderValue : 0),
        })
      );
      props.navigation.goBack();
    }
    dispatch(showLoading(false));
  };

  return (
    <View style={styles.minOrderView}>
      <Header
        headerTitle="Min Order Amount"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.minOrderMainView}>
        <Text allowFontScaling={false} style={styles.label}>
          {" "}
          Set Minimum Order
        </Text>
        <View style={styles.inputAndSwitch}>
          <InputText
            useRef={minimumOrder}
            mode="outlined"
            onChangeText={(value) => setMinOrderValue(value)}
            value={isMinOrderEnable ? minOrderValue?.toString() : "0"}
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            editable={isMinOrderEnable}
            outlineColor={isMinOrderEnable ? "#F8993A" : null}
          />
          <Switch
            trackColor={{ false: "#D6D6D6", true: "#FBCC9C" }}
            thumbColor={isMinOrderEnable ? "#F99732" : "#9E9E9E"}
            style={styles.toggleButton}
            value={isMinOrderEnable}
            onValueChange={toggleSwitch}
          />
        </View>

        {isMinOrderEnable && (
          <View>
            <Text allowFontScaling={false} style={styles.minOrderValueText}>
              If the minimum order value is not met.
            </Text>
            <View style={styles.deliveryChargesView}>
              <Text allowFontScaling={false} styles={styles.applyChargesText}>
                Apply delivery charges:
              </Text>
              <View style={styles.pickerView}>
                <Image source={rupee} style={styles.dropDownImg} />
                <Picker
                  selectedValue={
                    isMinOrderEnable ? deliveryChargesValue?.toString() : "0"
                  }
                  dropdownIconColor="#808080"
                  style={styles.picker}
                  mode="dialog"
                  onValueChange={(itemValue) =>
                    setDeliveryChargesValue(itemValue)
                  }
                >
                  {/* <Picker.Item color="gray" enabled={false} /> */}
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="35" value="35" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="45" value="45" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="55" value="55" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="65" value="65" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="75" value="75" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="85" value="85" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="95" value="95" />
                  <Picker.Item label="100" value="100" />
                </Picker>
              </View>
            </View>
          </View>
        )}

        <View style={styles.buttonView}>
          <Button
            title="Submit"
            fontFamily="Lato-Medium"
            fontSize={scaledValue(30)}
            width={scaledValue(661)}
            height={scaledValue(110)}
            color="#FFFFFF"
            backgroundColor="#F8993A"
            borderColor="#F8993A"
            borderRadius={scaledValue(8)}
            onPress={updateMinOrderHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default MinOrder;
