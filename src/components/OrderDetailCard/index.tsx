import React, { useEffect, useState } from "react";
import { Text, View, Platform, Linking } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import userCallImg from "../../../assets/images/user_call.png";
import userMsgIcon from "../../../assets/images/user_msg.png";
import { Avatar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { formatDateString } from "../../utils/common.utils";
import { styles } from "./styles";
import {
  OrderStatus,
  OrderStatusMapping,
  PaymentType,
} from "../../utils/constants";
const OrderDetail = (props) => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState(props?.user);
  useEffect(() => {
    setUser(props?.user);
  }, [props]);
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${user?.primaryNumber?.slice(-10)}`;
    } else {
      phoneNumber = `telprompt:${user?.primaryNumber?.slice(-10)}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.orderDetailCard}>
      <View>
        <View style={styles.orderIdMainView}>
          <Avatar.Text
            style={
              props.orderStatus != OrderStatus.CONFIRMED
                ? styles.avatar
                : styles.avatarOrderedColor
            }
            label={`${user?.firstName ? user?.firstName?.charAt(0) : ""}${
              user?.lastName ? user?.lastName?.charAt(0) : ""
            }`}
            size={scaledValue(86)}
            labelStyle={styles.avatarLabelText}
          />
          <View style={styles.orderIdView}>
            <Text allowFontScaling={false} style={styles.orderIdText}>
              Order ID: {props?.order?.shortId}
            </Text>
            <Text allowFontScaling={false} style={styles.orderIdDate}>
              Date: {formatDateString(props?.order?.createdAt)}
            </Text>
          </View>
          {props.orderStatus == OrderStatus.CONFIRMED && (
            <View style={styles.statusView}>
              <Text allowFontScaling={false} style={styles.statusText}>
                • Ordered
              </Text>
            </View>
          )}
          {props.orderStatus != OrderStatus.CONFIRMED && (
            <View style={styles.orderStatusView}>
              <Text
                style={
                  props.orderStatus == OrderStatus.DELIVERY_IN_PROGRESS
                    ? styles.orderStatusDeliveryInProgressText
                    : props.orderStatus == OrderStatus.DELIVERED
                    ? styles.orderStatusConfirmDeliveryText
                    : styles.orderStatusDeclinedText
                }
              >
                •{" "}
                {props?.order?.orderStatus == OrderStatus.CONFIRMED
                  ? OrderStatusMapping.CONFIRMED
                  : props?.order?.orderStatus ==
                    OrderStatus.DELIVERY_IN_PROGRESS
                  ? OrderStatusMapping.DELIVERY_IN_PROGRESS
                  : props?.order?.orderStatus == OrderStatus.DELIVERED
                  ? OrderStatusMapping.DELIVERED
                  : OrderStatusMapping.DECLINED}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.customerNameView}>
          <View>
            <Text
              style={
                props.orderStatus != OrderStatus.CONFIRMED
                  ? styles.nameOfDeliveryCard
                  : styles.name
              }
            >
              Name: {user?.firstName} {user?.lastName}
            </Text>
            {props?.paymentType == PaymentType.COD && (
              <Text
                style={
                  props.orderStatus == OrderStatus.CONFIRMED
                    ? styles.paymentType
                    : styles.paymentTypeDelivered
                }
              >
                Payment Type: {props?.paymentType}
              </Text>
            )}
            {props.orderStatus != OrderStatus.CONFIRMED && (
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={styles.orderLocation}
              >
                Location:{" "}
                {props?.address?.address ||
                  props?.address?.location +
                    ", " +
                    props?.address?.city +
                    ", " +
                    props?.address?.state +
                    ", " +
                    props?.address?.pincode}
              </Text>
            )}
            {props.orderStatus == OrderStatus.CONFIRMED && (
              <Text allowFontScaling={false} style={styles.number}>
                Mobile: {user?.primaryNumber.replace("_", "+")}
              </Text>
            )}
          </View>
          {props.orderStatus == OrderStatus.CONFIRMED && (
            <Text allowFontScaling={false} style={styles.locationText}>
              Customer Location
            </Text>
          )}
        </View>
        {props.orderStatus == OrderStatus.CONFIRMED && (
          <Text allowFontScaling={false} style={styles.delivery}>
            Delivery type: {props?.address?.tag} delivery
          </Text>
        )}

        <>
          <IconButton
            onPress={() => {
              dialCall();
            }}
            icon={userCallImg}
            color="#F78326"
            size={scaledValue(28.16)}
            style={styles.phnIcon}
          />
          <IconButton
            onPress={() => {
              navigation.navigate("ChatScreen", {
                orderId: props?.order?.shortId,
                userName: user?.firstName + " " + user?.lastName,
                userId: user?.id,
                storeName: props?.storeName,
                storeImage: props?.storeImage,
              });
            }}
            icon={userMsgIcon}
            color="#F78326"
            size={scaledValue(28.16)}
            style={styles.msgIcon}
          />
        </>
      </View>
    </View>
  );
};

export default OrderDetail;
