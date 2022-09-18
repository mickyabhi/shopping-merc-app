import React, { useEffect, useState } from "react";
import { Switch, Text, View, Image } from "react-native";
import { Modal, TextInput } from "react-native-paper";
import Button from "../../../components/Button";
import { scaledValue } from "../../../utils/design.utils";
import Tooltip from "rn-tooltip";
import API from "@aws-amplify/api";
import * as mutations from "../../../graphql/mutations";
import { getItemFromAsyncStorage } from "../../../utils/storage.utils";
import { isEmptyString } from "../../../utils/common.utils";
import { trackAnalytics } from "../../../utils/analytics.utils";
import { IconButton } from "react-native-paper";
import plusIcon from "../../../../assets/images/plusIcon.png";
import minus from "../../../../assets/images/minus.png";
import infoIcon from "../../../../assets/images/InfoIcon.png";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import crashlytics from "@react-native-firebase/crashlytics";
import { useDispatch } from "react-redux";
import { showAlertToast, showLoading } from "../../AppStore/actions";

const EditItemModal = (props) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  useEffect(() => {
    if (price?.allocatedQuantity !== null) {
      setIsSwitchOn(true);
    } else {
      setIsSwitchOn(false);
    }
  }, [price?.allocatedQuantity]);
  useEffect(() => {
    setDisableButton(
      isEmptyString(price?.mrp) ||
        (isSwitchOn && isEmptyString(price?.allocatedQuantity))
    );
  }, [price, isSwitchOn]);

  const saveItemHandler = async () => {
    dispatch(showLoading(true));
    const storeId = await getItemFromAsyncStorage("store_id");
    const discountedAmount = price?.mrp * (price?.discount / 100);
    const discountedPrice = price?.mrp - discountedAmount;
    const roundValueMrp = discountedPrice;
    const updateStoreProductInput = {
      id: props?.productData?.id + "" + storeId,
      mrp: price?.mrp,
      discount: price?.discount || null,
      totalQuantity:
        price?.allocatedQuantity == "" || price?.allocatedQuantity == 0
          ? null
          : price?.allocatedQuantity,
      sellingPrice: roundValueMrp,
    };
    console.log("updateStoreProductInput", updateStoreProductInput);
    await API.graphql({
      query: mutations.updateStoreProduct,
      variables: { input: updateStoreProductInput },
    })
      .then(dispatch(showLoading(false)))
      .catch((err) => {
        crashlytics().recordError(err);
        dispatch(showLoading(false));
        dispatch(
          showAlertToast({
            alertMessage: "Item is not saved.",
            actionButtonTitle: "Retry",
          })
        );
        return null;
      });

    if (props.onInventoryUpdated) props.onInventoryUpdated();

    trackAnalytics().trackEvents("ManageInventory", {
      CTA: "SaveEditedProduct",
      EnableInventory: props.productData.description,
    });
  };

  useEffect(() => {
    setPrice({
      allocatedQuantity:
        props?.productData?.storeInventory?.totalQuantity || null,
      mrp: props?.productData?.storeInventory?.mrp || props?.productData?.mrp,
      discount: props?.productData?.storeInventory?.discount || null,
      discountedMrp: null,
    });
  }, [props]);

  const increaseAllocatedQuantity = async () => {
    setPrice({ ...price, allocatedQuantity: price?.allocatedQuantity + 1 });
  };
  const decreaseAllocatedQuantity = async () => {
    setPrice({ ...price, allocatedQuantity: price?.allocatedQuantity - 1 });
  };
  return (
    <Modal
      visible={props.visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.containerStyle}
    >
      <View style={styles.editItemView}>
        <View>
          <Text allowFontScaling={false} style={styles.editItemText}>
            Edit item
          </Text>
        </View>

        <View style={styles.inventoryView}>
          <Text allowFontScaling={false} style={styles.inventoryText}>
            Inventory
          </Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            trackColor={{ false: "#D6D6D6", true: "#FBCA99" }}
            thumbColor={isSwitchOn ? "#F99732" : "#f4f3f4"}
          />
          <Tooltip
            popover={
              <Text allowFontScaling={false} style={styles.tooltipText}>
                Allocation Qty(Opening stock of the day)
              </Text>
            }
            backgroundColor="#E2F8DC"
            width={scaledValue(575)}
            height={scaledValue(69.8)}
            overlayColor="#00000085"
          >
            <Image source={infoIcon} style={styles.infoIcon} />
          </Tooltip>
        </View>
      </View>

      {isSwitchOn && (
        <View style={styles.textInputView}>
          <Text allowFontScaling={false} style={styles.qtyText}>
            Allocation Qty(Opening stock of the day)
          </Text>
          <TextInput
            label="Allocation Qty(Unit)"
            underlineColor="#DDDDDD"
            outlineColor="#DDDDDD"
            mode="outlined"
            style={styles.textInput}
            theme={{
              colors: { primary: "#F8993A" },
            }}
            keyboardType="numeric"
            value={price?.allocatedQuantity?.toString()}
            onChangeText={(text) => {
              setPrice({
                ...price,
                allocatedQuantity: isNaN(parseInt(text)) ? "" : parseInt(text),
              });
            }}
          />
        </View>
      )}
      <View style={styles.textInputView}>
        <TextInput
          label="MRP (₹per Unit)*"
          underlineColor="#DDDDDD"
          outlineColor="#DDDDDD"
          mode="outlined"
          style={styles.textInput}
          maxLength={4}
          theme={{
            colors: { primary: "#F8993A" },
          }}
          keyboardType="numeric"
          value={price?.mrp?.toString()}
          onChangeText={(text) => {
            setPrice({ ...price, mrp: text });
          }}
        />
      </View>
      <View style={styles.discountInputView}>
        <TextInput
          label="Discount (%)"
          underlineColor="#DDDDDD"
          outlineColor="#DDDDDD"
          mode="outlined"
          maxLength={2}
          style={styles.textInput}
          theme={{
            colors: { primary: "#F8993A" },
          }}
          keyboardType="numeric"
          value={price?.discount?.toString()}
          onChangeText={(text) => {
            setPrice({ ...price, discount: text });
          }}
        />
      </View>
      {props?.productData?.storeInventory?.totalQuantity && (
        <View style={styles.inputBoxMainView}>
          <Text allowFontScaling={false} style={styles.bottomText}>
            Increase / Decrease Qty
          </Text>
          <View style={styles.inputBoxView}>
            <IconButton
              icon={minus}
              color="#F8993A"
              onPress={decreaseAllocatedQuantity}
            />
            <View style={styles.allocatedQuantityView}>
              <Text
                allowFontScaling={false}
                style={styles.allocatedQuantityText}
              >
                {price?.allocatedQuantity}
              </Text>
            </View>
            <IconButton
              icon={plusIcon}
              onPress={increaseAllocatedQuantity}
              color="#F8993A"
            />
          </View>
        </View>
      )}
      <View style={styles.bottomView}>
        <Button
          title="Save item"
          fontFamily="Lato-Medium"
          fontSize={scaledValue(30)}
          width={scaledValue(561)}
          height={scaledValue(90)}
          color="#FFFFFF"
          disableColor="#FBCC9C"
          disableBorderColor="#FBCC9C"
          backgroundColor="#F8993A"
          borderColor="#F8993A"
          borderRadius={scaledValue(8)}
          disable={disableButton}
          onPress={saveItemHandler}
        />
      </View>
    </Modal>
  );
};

export default EditItemModal;
