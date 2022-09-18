import { scaledValue } from "../../utils/design.utils";
import Button from "../Button";
import { Divider } from "react-native-paper";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { Text, View, Switch } from "react-native";
import FastImage from "react-native-fast-image";
import * as mutations from "../../graphql/mutations";
import API from "@aws-amplify/api";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import {
  fetchAllStoreProducts,
  showAlertToast,
  showLoading,
} from "../../screens/AppStore/actions";
import { useDispatch } from "react-redux";
import { trackAnalytics } from "../../utils/analytics.utils";
import crashlytics from "@react-native-firebase/crashlytics";

const ItemsCard = (props) => {
  const [productId] = useState(props?.product?.id);
  const [storeProduct, setStoreProducts] = useState(
    props?.product?.storeInventory
  );
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(
    props?.product?.storeInventory?.isInInventory == true &&
      props?.product?.storeInventory?.mrp != null
  );

  useEffect(() => {
    setIsEnabled(
      props?.product?.storeInventory?.isInInventory == true &&
        props?.product?.storeInventory?.mrp != null
    );
    setStoreProducts(props?.product?.storeInventory);
  }, [props]);

  const updateInventoryProduct = async () => {
    const storeId = await getItemFromAsyncStorage("store_id");
    try {
      const updateStoreProductInput = {
        id: productId + "" + storeId,
        isInInventory: !props?.product?.storeInventory?.isInInventory,
        discount: null,
        totalSold: null,
        totalQuantity: null,
      };
      const updatedStoreProduct = await API.graphql({
        query: mutations.updateStoreProduct,
        variables: { input: updateStoreProductInput },
      }).then((resp) => resp.data.updateStoreProduct);
      if (updatedStoreProduct) dispatch(fetchAllStoreProducts(null));
    } catch (error) {
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: "Item is not updated",
          actionButtonTitle: "OK",
        })
      );
    }
  };

  const addProductInInventory = async () => {
    const storeId = await getItemFromAsyncStorage("store_id");
    const createStoreProductInput = {
      id: productId + "" + storeId,
      storeId: storeId,
      productId: productId,
      isInInventory: true,
    };
    const createdStoreProduct = await API.graphql({
      query: mutations.createStoreProduct,
      variables: {
        input: createStoreProductInput,
      },
    })
      .then((resp) => resp.data.createStoreProduct)
      .catch(() => {
        dispatch(showLoading(false));
        return null;
      });

    if (createdStoreProduct == null) updateInventoryProduct();
    else dispatch(fetchAllStoreProducts(null));
  };

  const toggleItemButton = async () => {
    if (isEnabled) {
      await updateInventoryProduct();
    } else {
      props.setSelectedProductForEdit();
      await addProductInInventory();
      props.setModalVisibility(true);
    }
    setIsEnabled(!isEnabled);
    trackAnalytics().trackEvents("ManageInventory", {
      CTA: "isEnabledToggle",
      EnableInventory: props.itemName,
    });
  };

  return (
    <View style={isEnabled ? styles.activeItemsCardView : styles.itemsCardView}>
      <View
        style={
          isEnabled ? styles.activeItemImageAndText : styles.itemImageAndText
        }
      >
        <FastImage
          source={{
            uri: `https://blocalappstorage.s3.ap-south-1.amazonaws.com/product_images/${productId}%403x.png`,
          }}
          style={isEnabled ? styles.activeItemImage : styles.itemImage}
        />
        <Text
          allowFontScaling={false}
          numberOfLines={2}
          ellipsizeMode="tail"
          style={isEnabled ? styles.activeItemText : styles.itemText}
        >
          {props.itemName}
        </Text>
      </View>
      <View
        style={
          isEnabled
            ? styles.activeStockItemsTextView
            : styles.stockItemsTextView
        }
      >
        <Text
          allowFontScaling={false}
          style={isEnabled ? styles.activeStockText : styles.stockText}
        >
          {isEnabled ? "Available" : "Stock"}
        </Text>

        <Switch
          trackColor={{ false: "##D6D6D6", true: "#FBCA99" }}
          thumbColor={isEnabled ? "#F99732" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleItemButton()}
          value={isEnabled}
        />
      </View>

      {isEnabled && (
        <>
          <View style={styles.rsTextView}>
            <Text allowFontScaling={false} style={styles.discountedMrp}>
              ₹{storeProduct?.sellingPrice?.toFixed(2) || "0.00"}
            </Text>
            <Text allowFontScaling={false} style={styles.rsMrp}>
              ₹ {storeProduct?.mrp || "00.00"}
            </Text>
            <Text allowFontScaling={false} style={styles.rsText}>
              {storeProduct?.discount || "0"} %off
            </Text>
            <Button
              width={scaledValue(89)}
              height={scaledValue(41)}
              title="EDIT"
              color="#F99732"
              fontSize={scaledValue(17)}
              borderRadius={scaledValue(8)}
              borderColor="#F99732"
              onPress={props.editButtonEventHandler}
            />
          </View>
          <Divider style={styles.dividerStyle} />

          <View style={styles.quantityTextView}>
            <Text allowFontScaling={false} style={styles.quantityText}>
              Allocated Qty: {storeProduct?.totalQuantity || "0.0"}Unit
            </Text>
            <Text allowFontScaling={false} style={styles.quantityText}>
              Sales Qty:{storeProduct?.totalSold || "0.0 Unit"}
            </Text>
            <Text allowFontScaling={false} style={styles.quantityText}>
              Balance Qty:
              {storeProduct?.totalQuantity - storeProduct?.totalSold || "0"}
              Unit
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ItemsCard;
