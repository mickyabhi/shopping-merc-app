import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import { Avatar, TouchableRipple } from "react-native-paper";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { useNavigation } from "@react-navigation/native";
import { formatDateString } from "../../utils/common.utils";
import {
  OrderStatus,
  OrderStatusMapping,
  PaymentType,
} from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";
import codIcon from "../../../assets/images/cod.png";
import { useDispatch } from "react-redux";
import { showAlertToast, showLoading } from "../../screens/AppStore/actions";

const OrderCard = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [user, setUser] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(null);
  const [cartOrderedValue, setCartOrderedValue] = useState(null);
  const [deliveryAddress] = useState(JSON.parse(props?.order?.deliveryAddress));

  const loadUserInfo = async (userId) => {
    if (userId != null) {
      const userInfo = await API.graphql({
        query: queries.userByPrimaryNumber,
        variables: { primaryNumber: userId },
      })
        .then((resp) => resp?.data?.userByPrimaryNumber?.items[0])
        .catch((err) => {
          crashlytics().recordError(err);
          dispatch(
            showAlertToast({
              alertMessage: "Unable to user info",
              actionButtonTitle: "OK",
            })
          ),
            dispatch(showLoading(false));
          return null;
        });

      setUser(userInfo);
    }
  };

  const loadCart = async (cartId) => {
    if (cartId != null) {
      const cart = await API.graphql({
        query: queries.getCart,
        variables: { id: cartId },
      })
        .then((resp) => resp.data.getCart)
        .catch((err) => {
          crashlytics().recordError(err);
          dispatch(
            showAlertToast({
              alertMessage: "Unable to load cart",
              actionButtonTitle: "OK",
            })
          ),
            dispatch(showLoading(false));
          return null;
        });
      setDeliveryCharges(cart?.deliveryCharges);
      setCartOrderedValue(cart?.originalCartValue);
    }
  };

  useEffect(() => {
    loadUserInfo(props?.order?.userId);
    loadCart(props?.order?.cartId);
  }, []);

  const openCardDetailHandler = () => {
    navigation.navigate("RespondToOrderScreen", {
      user: user,
      order: props.order,
      userAddress: deliveryAddress,
      storeName: props.storeName,
      storeImage: props.storeImage,
      deliveryCharges: deliveryCharges,
      cartOrderedValue: cartOrderedValue,
      paymentType: props?.order?.paymentType,
    });
  };

  const styles = StyleSheet.create({
    cardContainer: {
      width: scaledValue(659),
      borderColor: "#CDCDCD",
      borderRadius: scaledValue(8),
      paddingLeft: scaledValue(20),
      marginBottom: scaledValue(16),
      borderWidth: scaledValue(1),
    },
    cardContainerData: {
      flexDirection: "row",
    },
    avatar: {
      backgroundColor: "#00A74F",
      marginTop: scaledValue(25),
    },
    avatarLabelText: {
      fontSize: scaledValue(23),
      fontFamily: "Roboto-Medium",
      color: "#FFFFFF",
    },
    orderDetailContainer: {
      flexDirection: "column",
      top: scaledValue(25),
      marginBottom: scaledValue(26),
      paddingBottom: scaledValue(23),
    },
    orderId: {
      fontFamily: "Lato-Medium",
      fontSize: scaledValue(24),
      color: "#000000",
      marginBottom: scaledValue(9),
      marginRight: scaledValue(74),
      marginLeft: scaledValue(19),
    },
    orderDate: {
      color: "#000000",
      fontFamily: "Lato-Regular",
      fontSize: scaledValue(20),
      marginTop: scaledValue(9),
      marginLeft: scaledValue(21),
    },
    name: {
      fontFamily: "Lato-Medium",
      fontSize: scaledValue(24),
      color: "#000000",
      marginLeft: scaledValue(21),
      marginTop: scaledValue(23),
    },
    orderLocation: {
      color: "#000000",
      fontSize: scaledValue(20),
      marginTop: scaledValue(13),
      fontFamily: "Lato-Regular",
      marginLeft: scaledValue(21),
      marginBottom: scaledValue(8),
      width: scaledValue(300),
    },
    orderStatusText: {
      color:
        props?.order?.orderStatus === OrderStatus.CONFIRMED
          ? "#FF8000"
          : props?.order?.orderStatus === OrderStatus.DELIVERY_IN_PROGRESS
          ? "#ADC705"
          : props?.order?.orderStatus === OrderStatus.DELIVERED
          ? "#03A454"
          : "red",
      fontSize: scaledValue(22),
      fontFamily: "Lato-Medium",
      position: "absolute",
      top: scaledValue(27),
      right: scaledValue(14),
      paddingRight: scaledValue(14),
    },
    orderType: {
      color: "#000000",
      fontFamily: "Lato-Medium",
      fontSize: scaledValue(22),
      marginVertical: scaledValue(10),
      marginLeft: scaledValue(21),
    },
    codIconStyle: {
      width: scaledValue(110),
      height: scaledValue(110),
      position: "absolute",
      right: -1,
      bottom: -1,
    },
  });

  return (
    <TouchableRipple
      onPress={openCardDetailHandler}
      style={styles.cardContainer}
    >
      <View style={styles.cardContainerData}>
        <Avatar.Text
          style={styles.avatar}
          label={`${user?.firstName ? user?.firstName?.charAt(0) : ""}${
            user?.lastName ? user?.lastName?.charAt(0) : ""
          }`}
          size={scaledValue(86)}
          labelStyle={styles.avatarLabelText}
        />
        <View style={styles.orderDetailContainer}>
          <Text allowFontScaling={false} style={styles.orderId}>
            Order ID: {props?.order?.shortId}{" "}
          </Text>
          <Text allowFontScaling={false} style={styles.orderDate}>
            Date: {formatDateString(props?.order?.createdAt)}
          </Text>
          <Text allowFontScaling={false} style={styles.name}>
            Name: {user?.firstName} {user?.lastName}
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.orderLocation}
            numberOfLines={1}
          >
            Location:{" "}
            {deliveryAddress?.address ||
              deliveryAddress?.location +
                ", " +
                deliveryAddress?.city +
                ", " +
                deliveryAddress?.state +
                ", " +
                deliveryAddress?.pincode}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.orderStatusText}>
          • {OrderStatusMapping[props?.order?.orderStatus]}
        </Text>
        {props?.order?.paymentType == PaymentType.COD && (
          <Image source={codIcon} style={styles.codIconStyle} />
        )}
      </View>
    </TouchableRipple>
  );
};

export default OrderCard;
