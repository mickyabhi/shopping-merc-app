import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
import moment from "moment";
import API from "@aws-amplify/api";
import * as queries from "../../../graphql/queries";
import crashlytics from "@react-native-firebase/crashlytics";
import { useDispatch } from "react-redux";
import { showAlertToast, showLoading } from "../../AppStore/actions";

const PaymentHistoryCard = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [shortId, setShortId] = useState(null);
  const [order, setOrder] = useState(null);

  const getStoreName = async (userId) => {
    await API.graphql({
      query: queries.getUser,
      variables: { id: userId },
    }).then((resp) => setUserName(resp?.data?.getUser?.firstName));
  };

  const getShortId = async (orderId) => {
    if (orderId != null) {
      const order = await API.graphql({
        query: queries.getOrder,
        variables: { id: orderId },
      })
        .then((resp) => resp.data.getOrder)
        .catch((err) => {
          crashlytics().recordError(err);
          dispatch(
            showAlertToast({
              alertMessage: "Unable to load order",
              actionButtonTitle: "OK",
            })
          ),
            dispatch(showLoading(false));
          return null;
        });
      setOrder(order);
      setShortId(order?.shortId);
    }
  };

  useEffect(() => {
    getStoreName(props?.userId);
    getShortId(props?.orderId);
  }, [props]);
  return (
    <>
      {order?.orderStatus != "CANCELLED" && (
        <View style={styles.paymentHistoryCard}>
          <Text allowFontScaling={false} style={styles.cardTitleText}>
            {userName}
          </Text>
          <View>
            <View style={styles.orderIdView}>
              <Text
                allowFontScaling={false}
                style={styles.paymentHistoryTypeText}
              >
                Order ID
              </Text>
              <Text allowFontScaling={false} style={styles.orderIdText}>
                {shortId}
              </Text>
            </View>
            <View style={styles.paymentHistoryTextView}>
              <Text
                allowFontScaling={false}
                style={styles.paymentHistoryTypeText}
              >
                Transaction ID
              </Text>
              <Text allowFontScaling={false} style={styles.transactionIdText}>
                {props?.transactionId}
              </Text>
            </View>
            <View style={styles.paymentHistoryTextView}>
              <Text
                allowFontScaling={false}
                style={styles.paymentHistoryTypeText}
              >
                Date
              </Text>
              <Text allowFontScaling={false} style={styles.dateText}>
                {moment(props?.date).format("DD-MM-YYYY")}
              </Text>
            </View>
            <View style={styles.paymentHistoryTextView}>
              <Text
                allowFontScaling={false}
                style={styles.paymentHistoryTypeText}
              >
                Payment Status
              </Text>
              <Text allowFontScaling={false} style={styles.paymentStatusText}>
                Success
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PaymentHistoryCard;
const styles = StyleSheet.create({
  paymentHistoryCard: {
    width: scaledValue(668),
    paddingTop: scaledValue(17),
    paddingBottom: scaledValue(21),
    paddingRight: scaledValue(39),
    paddingLeft: scaledValue(15),
    borderRadius: scaledValue(8),
    borderWidth: scaledValue(1),
    elevation: scaledValue(1),
    borderColor: "#CDCDCD",
    shadowColor: "#00000029",
    marginBottom: scaledValue(28),
  },
  cardTitleText: {
    fontSize: scaledValue(24),
    lineHeight: scaledValue(23),
    fontFamily: "Lato-Medium",
    marginBottom: scaledValue(21),
  },
  paymentHistoryTypeText: {
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(24),
    lineHeight: scaledValue(23),
    color: "gray",
  },
  orderIdView: {
    flexDirection: "row",
    marginBottom: scaledValue(15),
  },
  paymentHistoryTextView: {
    flexDirection: "row",
    marginBottom: scaledValue(11),
  },
  orderIdText: {
    lineHeight: scaledValue(23),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(24),
    marginLeft: scaledValue(109),
  },
  transactionIdText: {
    lineHeight: scaledValue(23),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(24),
    marginLeft: scaledValue(50),
  },
  dateText: {
    lineHeight: scaledValue(23),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(24),
    marginLeft: scaledValue(151),
  },
  paymentStatusText: {
    lineHeight: scaledValue(23),
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(24),
    color: "#058375",
    marginLeft: scaledValue(38),
  },
  downloadIcon: {
    width: scaledValue(65),
    height: scaledValue(65),
  },
  downloadIconView: {
    position: "absolute",
    bottom: scaledValue(94),
    right: scaledValue(39),
  },
});
