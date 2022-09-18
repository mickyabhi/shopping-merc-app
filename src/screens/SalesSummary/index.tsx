import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SalesSummaryGraphCard from "../../components/SalesSummaryGraphCard";
import SalesSummaryHeader from "../../components/SalesSummaryHeader";
import SalesSummaryDetail from "../../components/SalesSummaryDetailCard";
import { scaledValue } from "../../utils/design.utils";
import * as queries from "../../graphql/queries";
import { API } from "aws-amplify";
import { OrderStatus, PaymentType } from "../../utils/constants";
import {
  fetchOrderRatingByStoreId,
  fetchStoreOrders,
} from "../AppStore/actions";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import { calculateRating } from "../../utils/common.utils";

const SalesSummary = () => {
  const dispatch = useDispatch();
  const [oneDayAgoRevenue, setOneDayAgoRevenue] = useState(0);
  const [twoDayAgoRevenue, setTwoDayAgoRevenue] = useState(0);
  const [threeDayAgoRevenue, setThreeDayAgoRevenue] = useState(0);
  const [fourDayAgoRevenue, setFourDayAgoRevenue] = useState(0);
  const [fiveDayAgoOrders, setFiveDayAgoRevenue] = useState(0);
  const [sixDayAgoOrders, setSixDayAgoRevenue] = useState(0);
  const [sevenDayAgoOrders, setSevenDayAgoRevenue] = useState(0);
  const [radioButtonValue, setRadioButtonValue] = useState("week");
  const [onlineOrders, setOnlineOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const orders = useSelector<any>((state) => state?.graphOrder);
  const ordersList = useSelector<any>((state) => state?.orders);
  const orderRating = useSelector<any>((state) => state?.storeRating);
  const date = new Date();
  const [array, setArray] = useState([]);
  const [rating, setRating] = useState([]);

  const loadOrderRating = async () => {
    const storeId = await getItemFromAsyncStorage("store_id");
    dispatch(fetchOrderRatingByStoreId(storeId));
  };

  const calculateOrderRating = (orderRating) => {
    setRating([]);
    orderRating?.map((item) => {
      setRating((cur) => cur?.concat(item?.rating));
    });
  };

  useEffect(() => {
    fetchStoreOrders();
  }, []);

  useEffect(() => {
    if (radioButtonValue == "week") {
      setOnlineOrders(
        orders?.filter((order) => order?.paymentType == PaymentType.ONLINE)
          ?.length
      );
      setPendingOrders(
        ordersList?.filter(
          (order) =>
            order?.orderStatus == OrderStatus.DELIVERY_IN_PROGRESS ||
            order?.orderStatus == OrderStatus.CONFIRMED
        )?.length
      );

      const oneDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 1
      );
      oneDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setOneDayAgoRevenue((curr) => (curr += orderCart?.updatedCartValue));
        }
      });

      const twoDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 2
      );
      twoDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setTwoDayAgoRevenue((curr) => (curr += orderCart?.updatedCartValue));
        }
      });
      const threeDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 3
      );
      threeDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setThreeDayAgoRevenue(
            (curr) => (curr += orderCart?.updatedCartValue)
          );
        }
      });
      const fourDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 4
      );
      fourDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setFourDayAgoRevenue((curr) => (curr += orderCart?.updatedCartValue));
        }
      });
      const fiveDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 5
      );
      fiveDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setFiveDayAgoRevenue((curr) => (curr += orderCart?.updatedCartValue));
        }
      });
      const sixDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 6
      );
      sixDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setSixDayAgoRevenue((curr) => (curr += orderCart?.updatedCartValue));
        }
      });
      const sevenDayAgoOrders = orders.filter(
        (order) => new Date(order.createdAt).getDate() == date.getDate() - 7
      );
      sevenDayAgoOrders?.forEach(async (element) => {
        if (element.id != null) {
          const orderCart = await API.graphql({
            query: queries.getCart,
            variables: { id: element.cartId },
          }).then((resp) => resp.data.getCart);
          setSevenDayAgoRevenue(
            (curr) => (curr += orderCart?.updatedCartValue)
          );
        }
      });
    } else {
      setOneDayAgoRevenue(0);
      setTwoDayAgoRevenue(0);
      setThreeDayAgoRevenue(0);
      setFourDayAgoRevenue(0);
      setFiveDayAgoRevenue(0);
      setSixDayAgoRevenue(0);
      setSevenDayAgoRevenue(0);
    }

    loadOrderRating();
  }, [orders]);

  useEffect(() => {
    calculateOrderRating(orderRating);
  }, [orderRating]);

  useEffect(() => {
    setArray([
      oneDayAgoRevenue,
      twoDayAgoRevenue,
      threeDayAgoRevenue,
      fourDayAgoRevenue,
      fiveDayAgoOrders,
      sixDayAgoOrders,
      sevenDayAgoOrders,
    ]);
  }, [
    oneDayAgoRevenue,
    twoDayAgoRevenue,
    threeDayAgoRevenue,
    fourDayAgoRevenue,
    fiveDayAgoOrders,
    sixDayAgoOrders,
    sevenDayAgoOrders,
  ]);
  return (
    <ScrollView style={styles.salesSummaryView}>
      <SalesSummaryHeader
        setRadioButtonValue={setRadioButtonValue}
        pendingOrders={pendingOrders}
        rating={calculateRating(rating)}
      />
      <View style={styles.salesSummaryMainView}>
        {array && array?.length != 0 && (
          <SalesSummaryGraphCard
            array={array}
            cardTitle="Sales Revenue"
            totalValue="₹ 3"
          />
        )}
        {/* <SalesSummaryGraphCard cardTitle="Fulfillment %" totalValue="100%" /> */}
        <SalesSummaryDetail onlineOrderQty={onlineOrders} />
      </View>
    </ScrollView>
  );
};

export default SalesSummary;

const styles = StyleSheet.create({
  salesSummaryMainView: {
    flex: 1,
    alignItems: "center",
    paddingBottom: scaledValue(24),
  },
  salesSummaryView: {
    flex: 1,
  },
});
