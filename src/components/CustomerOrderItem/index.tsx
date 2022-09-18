import React, { useEffect, useState } from "react";
import { Text, View, Switch } from "react-native";
import { styles } from "./style";
import { Divider } from "react-native-paper";
import ItemsCountButton from "../ItemCountButton";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import {
  fetchCartItems,
  showAlertToast,
  showLoading,
  summaryTableItemQty,
} from "../../screens/AppStore/actions";
import { OrderStatus } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const CustomerOrderItem = (props) => {
  const dispatch = useDispatch();
  const [isItemAvailable, setIsItemAvailable] = useState(
    props?.cartItem?.availability
  );
  const [itemQuantity, setItemQuantity] = useState(props?.cartItem?.quantity);
  const [showQtyValue, setShowQtyValue] = useState(null);
  const [storeProduct, setStoreProduct] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  const loadStoreProduct = async (id) => {
    if (id != null) {
      const storeProductItem = await API.graphql({
        query: queries.getStoreProduct,
        variables: { id: id },
      })
        .then((resp) => resp?.data?.getStoreProduct)
        .catch((err) => {
          dispatch(showLoading(false));
          crashlytics().recordError(err);
          dispatch(
            showAlertToast({
              alertMessage: "Load Store Product Failed.",
              actionButtonTitle: "Retry",
            })
          );
          return null;
        });

      setStoreProduct(storeProductItem);
    }
  };
  useEffect(() => {
    setCartItem(props?.cartItem);
    setItemQuantity(props?.cartItem?.quantity);
  }, [props]);

  useEffect(() => {
    loadStoreProduct(cartItem?.storeProductId);
  }, [cartItem]);

  const availabilityToggleHandler = async (toggleState) => {
    setIsItemAvailable(toggleState);
    if (toggleState == false) {
      setItemQuantity(0);
      const updateCartItemInput = {
        id: cartItem?.id,
        availability: false,
        quantity: 0,
      };
      const updatedCartItem = await API.graphql({
        query: mutations.updateCartItem,
        variables: {
          input: updateCartItemInput,
        },
      }).then((resp) => resp.data.updateCartItem);

      if (updatedCartItem) {
        dispatch(fetchCartItems(updatedCartItem?.cartId));
        dispatch(
          showAlertToast({
            alertMessage: "Item is updated.",
            actionButtonTitle: "OK",
          })
        );
      } else {
        dispatch(
          showAlertToast({
            alertMessage: "Issue in item quantity update.",
            actionButtonTitle: "Retry",
          })
        );
      }
    } else {
      setItemQuantity(cartItem?.orderedQuantity);
      const updateCartItemInput = {
        id: cartItem?.id,
        availability: true,
        quantity: cartItem?.orderedQuantity,
      };
      const updatedCartItem = await API.graphql({
        query: mutations.updateCartItem,
        variables: {
          input: updateCartItemInput,
        },
      }).then((resp) => resp.data.updateCartItem);

      if (updatedCartItem) {
        dispatch(fetchCartItems(updatedCartItem?.cartId));
        dispatch(
          showAlertToast({
            alertMessage: "Item is updated.",
            actionButtonTitle: "OK",
          })
        );
      } else {
        dispatch(
          showAlertToast({
            alertMessage: "Issue in item quantity update.",
            actionButtonTitle: "Retry",
          })
        );
      }
    }
  };

  useEffect(() => {
    if (itemQuantity == 0 && isItemAvailable) {
      setIsItemAvailable(false);
    } else if (itemQuantity > 0 && !isItemAvailable) {
      setIsItemAvailable(true);
    }
  }, [itemQuantity]);

  const updateSummaryTable = (updatedCartItem) => {
    dispatch(summaryTableItemQty(updatedCartItem));
  };

  const updateItemQuantity = async (id, quantity) => {
    setItemQuantity(quantity);
    const updateCartItemInput = {
      id: id,
      quantity: quantity,
    };

    const updatedCartItem = await API.graphql({
      query: mutations.updateCartItem,
      variables: {
        input: updateCartItemInput,
      },
    }).then((resp) => {
      return resp.data.updateCartItem;
    });

    if (updatedCartItem) {
      updateSummaryTable(updatedCartItem?.storeProduct?.sellingPrice);
      dispatch(fetchCartItems(updatedCartItem?.cartId));
      setShowQtyValue(cartItem?.mrp * updatedCartItem?.quantity);
      setItemQuantity(updatedCartItem?.quantity);

      dispatch(
        showAlertToast({
          alertMessage: "Item quantity updated.",
          actionButtonTitle: "OK",
        })
      );
    } else {
      dispatch(
        showAlertToast({
          alertMessage: "Issue in item quantity update.",
          actionButtonTitle: "Retry",
        })
      );
    }
  };

  useEffect(() => {
    setShowQtyValue(cartItem?.mrp * itemQuantity);
  }, [storeProduct]);

  return (
    <>
      <View style={styles.customerOrderItem}>
        <View style={styles.itemView}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {storeProduct?.product?.description}
          </Text>
        </View>

        {props.status === OrderStatus.CONFIRMED && (
          <>
            <View style={styles.pricePerUnitText}>
              <Text allowFontScaling={false} style={styles.priceText}>
                {cartItem?.mrp}
              </Text>
            </View>

            <View style={styles.availabilityView}>
              <Switch
                trackColor={{
                  false: "#EAEAEA",
                  true: "#B1E4C9",
                }}
                thumbColor={isItemAvailable ? "#B1E4C9" : "#868686"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={availabilityToggleHandler}
                value={isItemAvailable}
              />
            </View>

            <View style={styles.countButtonView}>
              <ItemsCountButton
                disableAddition={itemQuantity >= cartItem?.orderedQuantity}
                quantity={itemQuantity}
                subtractionHandler={() => {
                  props?.setShowCartUpdateModal({
                    onAcceptHandler: () => {
                      updateItemQuantity(cartItem?.id, itemQuantity - 1);
                      props?.setShowCartUpdateModal(null);
                    },
                    onCancelHandler: () => {
                      props?.setShowCartUpdateModal(null);
                    },
                  });
                }}
                additionHandler={() => {
                  props?.setShowCartUpdateModal({
                    onAcceptHandler: () => {
                      updateItemQuantity(cartItem?.id, itemQuantity + 1);
                      props?.setShowCartUpdateModal(null);
                    },
                    onCancelHandler: () => {
                      props?.setShowCartUpdateModal(null);
                    },
                  });
                }}
                disable={isItemAvailable}
              />
            </View>

            <View style={styles.totalView}>
              <Text allowFontScaling={false} style={styles.totalText}>
                {isNaN(showQtyValue) ? "" : showQtyValue?.toFixed(2)}
              </Text>
            </View>
          </>
        )}

        {props.status == OrderStatus.DELIVERY_IN_PROGRESS && (
          <>
            <View style={styles.priceView}>
              <Text allowFontScaling={false} style={styles.priceText}>
                {cartItem?.mrp}
              </Text>
            </View>

            <View style={styles.quantityOrderedView}>
              <Text allowFontScaling={false} style={styles.quantityOrderedText}>
                {cartItem?.orderedQuantity}
              </Text>
            </View>

            <View style={styles.quantityDeliveredView}>
              <Text
                allowFontScaling={false}
                style={styles.deliveredQuantityText}
              >
                {itemQuantity}
              </Text>
            </View>

            <View style={styles.totalView}>
              <Text allowFontScaling={false} style={styles.totalText}>
                {isNaN(showQtyValue) ? "" : showQtyValue?.toFixed(2)}
              </Text>
            </View>
          </>
        )}

        {props.status == OrderStatus.DELIVERED && (
          <>
            <View style={styles.priceView}>
              <Text allowFontScaling={false} style={styles.priceText}>
                {cartItem?.mrp}
              </Text>
            </View>

            <View style={styles.orderedQuantityView}>
              <Text allowFontScaling={false} style={styles.quantityOrderedText}>
                {cartItem?.orderedQuantity}
              </Text>
            </View>

            <View style={styles.deliveredQuantityView}>
              <Text
                allowFontScaling={false}
                style={styles.deliveredQuantityText}
              >
                {itemQuantity}
              </Text>
            </View>

            <View style={styles.totalView}>
              <Text allowFontScaling={false} style={styles.totalText}>
                {isNaN(showQtyValue) ? "" : showQtyValue?.toFixed(2)}
              </Text>
            </View>
          </>
        )}
        {props.status == OrderStatus.DECLINED && (
          <>
            <View style={styles.priceView}>
              <Text allowFontScaling={false} style={styles.priceText}>
                {cartItem?.mrp}
              </Text>
            </View>

            <View style={styles.orderedQuantityView}>
              <Text allowFontScaling={false} style={styles.quantityOrderedText}>
                {cartItem?.orderedQuantity}
              </Text>
            </View>

            <View style={styles.deliveredQuantityView}>
              <Text
                allowFontScaling={false}
                style={styles.deliveredQuantityText}
              >
                {itemQuantity}
              </Text>
            </View>

            <View style={styles.totalView}>
              <Text allowFontScaling={false} style={styles.totalText}>
                {isNaN(showQtyValue) ? "" : showQtyValue?.toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </View>
      {!props.isLast && <Divider style={styles.divider} />}
    </>
  );
};

export default CustomerOrderItem;
