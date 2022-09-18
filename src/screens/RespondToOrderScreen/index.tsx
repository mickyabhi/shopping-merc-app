import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import Header from "../../components/Header";
import Button from "../../components/Button";
import DeliveryAddressCard from "../../components/DeliveryAddressCard";
import { useNavigation } from "@react-navigation/native";
import CustomerOrderHeader from "../../components/CustomerOrderHeader";
import CustomerOrderedItem from "../../components/CustomerOrderItem";
import SummaryTable from "./Components/SummaryTable";
import OrderDetail from "../../components/OrderDetailCard";
import {
  fetchStoreOrders,
  fetchRazorPayOrderByOrderId,
  fetchAllStoreProducts,
  showAlertToast,
  showLoading,
  fetchCartItems,
} from "../AppStore/actions";
import { useDispatch, useSelector } from "react-redux";
import { API } from "aws-amplify";
import * as mutations from ".././../graphql/mutations";
import * as queries from ".././../graphql/queries";
import { sendNotificationToTopic } from "../../utils/services";
import { styles } from "./styles";
import {
  AlertMessage,
  OrderStatus,
  PaymentType,
  Refund,
} from "../../utils/constants";
import NotifyCartUpdateModal from "./Components/NotifyCartUpdateModal";
import crashlytics from "@react-native-firebase/crashlytics";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";

const RespondToOrder = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [user, setUser] = useState(props?.route?.params?.user);
  const [order, setOrder] = useState(props?.route?.params?.order);
  const [address, setAddress] = useState(props?.route?.params?.userAddress);
  const [storeName] = useState(props?.route?.params?.storeName);
  const [storeImage] = useState(props?.route?.params?.storeImage);
  const [deliveryCharges, setDeliveryCharges] = useState(
    props?.route?.params?.deliveryCharges
  );
  const [cartOrderedValue, setCartOrderedValue] = useState(
    props?.route?.params?.cartOrderedValue
  );
  const [paymentType, setPaymentType] = useState(
    props?.route?.params?.paymentType
  );
  const [orderId] = useState(props?.route?.params?.orderId);
  const cartItems = useSelector<any>((state) => state?.cartItems);
  const razorPayOrder = useSelector<any>((state) =>
    JSON.stringify(state?.razorPayOrder)
  );
  const razorPayPayment = useSelector<any>((state) =>
    JSON.stringify(state?.razorPayPayment)
  );
  const [showCartUpdateModal, setShowCartUpdateModal] = useState(null);
  const [summaryData, setSummaryData] = useState({
    originalCartValue: null,
    totalFulfilmentValuePercent: null,
    totalFulfilmentPercent: null,
    totalQty: null,
    totalOrderedQty: null,
    totalOrderedQtyValue: null,
  });

  const totalSummary = () => {
    let originalCartValue = 0;
    let totalQty = 0;
    let totalOrderedQty = 0;
    let totalOrderedQtyValue = 0;

    cartItems?.forEach(async (cartItem) => {
      const loadProduct = await API.graphql({
        query: queries.getStoreProduct,
        variables: {
          id: cartItem?.storeProductId,
        },
      }).then((resp) => resp?.data?.getStoreProduct);

      originalCartValue += loadProduct?.sellingPrice * cartItem?.quantity;
      totalQty += cartItem?.quantity;
      totalOrderedQty += cartItem?.orderedQuantity;
      totalOrderedQtyValue +=
        loadProduct?.sellingPrice * cartItem?.orderedQuantity;

      const totalFulfilmentPercent = (totalQty / totalOrderedQty) * 100;
      const totalFulfilmentValuePercent =
        (originalCartValue / totalOrderedQtyValue) * 100;

      setSummaryData({
        originalCartValue: originalCartValue,
        totalFulfilmentValuePercent: totalFulfilmentValuePercent,
        totalFulfilmentPercent: totalFulfilmentPercent,
        totalQty: totalQty,
        totalOrderedQty: totalOrderedQty,
        totalOrderedQtyValue: totalOrderedQtyValue,
      });
    });
  };
  console.log("deliveryCharges", deliveryCharges);
  useEffect(() => {
    totalSummary();
  }, [cartItems]);
  const loadCart = async (cartId) => {
    if (cartId != null) {
      const cart = await API.graphql({
        query: queries.getCart,
        variables: { id: cartId },
      }).then((resp) => resp.data.getCart);
      setDeliveryCharges(cart?.deliveryCharges);
      setCartOrderedValue(cart?.originalCartValue);
    }
  };

  const loadOrderDetails = async () => {
    if (orderId != null) {
      dispatch(showLoading(true));
      const order = await API.graphql({
        query: queries.getOrder,
        variables: { id: orderId },
      }).then((resp) => resp.data.getOrder);
      dispatch(fetchCartItems(order?.cartId));
      setOrder(order);
      setUser(order?.user);
      setPaymentType(order?.paymentType);
      setAddress(JSON.parse(order?.deliveryAddress));
      dispatch(fetchRazorPayOrderByOrderId(order?.id, order?.cartId));
      dispatch(showLoading(false));
      loadCart(order?.cartId);
    } else {
      dispatch(fetchCartItems(order?.cartId));
      dispatch(fetchRazorPayOrderByOrderId(order?.id, order?.cartId));
    }
  };
  useEffect(() => {
    loadOrderDetails();
  }, []);
  console.log("cartOrderedValue", cartOrderedValue);
  const createRefundOrder = async (refundValue) => {
    const storeId = await getItemFromAsyncStorage("store_id");
    const createRefundOrderInput = {
      orderId: order.id,
      cartId: order.cartId,
      userId: user.id,
      storeId: storeId,
      refundAmount: refundValue,
      razorPayOrder: razorPayOrder,
      refundReason: Refund.REASON,
      refundStatus: Refund.STATUS,
      razorPayPayment: razorPayPayment,
      shortOrderId: order.shortId,
      notes: razorPayOrder,
    };
    await API.graphql({
      query: mutations.createRefundOrder,
      variables: { input: createRefundOrderInput },
    })
      .then((resp) => resp.data.createRefundOrder)
      .catch((err) => {
        dispatch({
          alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        });
        return null;
      });
  };

  const checkTotalSold = async (storeProduct) => {
    if (storeProduct.totalQuantity <= storeProduct.totalSold) {
      const updateStoreProductInput = {
        id: storeProduct.id,
        mrp: null,
        isInInventory: false,
        discount: null,
        totalQuantity: null,
        totalSold: null,
      };
      await API.graphql({
        query: mutations.updateStoreProduct,
        variables: { input: updateStoreProductInput },
      }).then(dispatch(fetchAllStoreProducts(null)));
    }
  };

  const updateTotalSold = () => {
    cartItems?.forEach(async (item) => {
      const storeProduct = await API.graphql({
        query: queries.getStoreProduct,
        variables: { id: item.storeProductId },
      }).then((resp) => resp.data.getStoreProduct);

      if (storeProduct?.totalSold == null && storeProduct?.totalQuantity) {
        const updateStoreProductInput = {
          id: item.storeProductId,
          totalSold: item.quantity,
        };

        await API.graphql({
          query: mutations.updateStoreProduct,
          variables: { input: updateStoreProductInput },
        })
          .then((resp) => checkTotalSold(resp.data.updateStoreProduct))
          .catch((err) => {
            dispatch({
              alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
              actionButtonTitle: "OK",
            });
            return null;
          });
      } else if (
        storeProduct?.totalSold !== null &&
        storeProduct?.totalQuantity
      ) {
        const updateStoreProductInput = {
          id: item.storeProductId,
          totalSold: storeProduct?.totalSold + item.quantity,
        };

        await API.graphql({
          query: mutations.updateStoreProduct,
          variables: { input: updateStoreProductInput },
        })
          .then((resp) => checkTotalSold(resp.data.updateStoreProduct))
          .catch((err) => {
            dispatch({
              alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
              actionButtonTitle: "OK",
            });
            return null;
          });
      }
    });
  };

  const updateCart = async (updatedCartValue, cartId) => {
    const updateCartInput = {
      id: cartId,
      updatedCartValue: updatedCartValue,
    };
    if (updatedCartValue != null && cartId != null) {
      await API.graphql({
        query: mutations.updateCart,
        variables: {
          input: updateCartInput,
        },
      }).catch((err) => {
        dispatch({
          alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        });
        return null;
      });
    }
  };

  const proceedToPackHandler = async () => {
    navigation.navigate("BottomTabs");
    const updateOrderStatus = {
      id: order.id,
      orderStatus:
        summaryData?.originalCartValue == 0
          ? OrderStatus.DECLINED
          : OrderStatus.DELIVERY_IN_PROGRESS,
    };

    const updatedOrder = await API.graphql({
      query: mutations.updateOrder,
      variables: {
        input: updateOrderStatus,
      },
    })
      .then((resp) => resp.data.updateOrder)
      .catch((err) => {
        dispatch({
          alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        });
        return null;
      });
    if (updatedOrder?.orderStatus == OrderStatus.DECLINED) {
      if (updatedOrder?.paymentType == PaymentType.ONLINE) {
        await createRefundOrder(cartOrderedValue);
      }
      await sendNotificationToTopic(
        "Order is cancelled",
        "Your order with id " + order.shortId + " is cancelled by merchant.",
        "CAU" + user.id,
        { orderId: order.id }
      );
      dispatch(fetchStoreOrders());
      return;
    }
    updateTotalSold();

    if (summaryData?.totalOrderedQtyValue != summaryData?.originalCartValue) {
      if (updatedOrder.paymentType == PaymentType.ONLINE) {
        await createRefundOrder(
          summaryData?.totalOrderedQtyValue - summaryData?.originalCartValue
        );
      }
      await sendNotificationToTopic(
        "Order status updated",
        "Your order with id " +
          order.shortId +
          " has been modified by merchant and ready to be deliver.",
        "CAU" + user.id,
        { orderId: order.id, shortId: order.shortId }
      );
      await updateCart(summaryData?.originalCartValue, updatedOrder?.cartId);
    } else {
      await sendNotificationToTopic(
        "Order status updated",
        "Your order with id " + order.shortId + " is ready to be deliver.",
        "CAU" + user.id,
        { orderId: order.id, shortId: order.shortId }
      );
    }

    dispatch(fetchAllStoreProducts(null));
    if (updatedOrder.paymentType == PaymentType.ONLINE) {
      let totalMerchantAmount = summaryData?.originalCartValue;
      if (deliveryCharges) totalMerchantAmount += deliveryCharges;
      await processMerchantPayment(totalMerchantAmount);
    }
    dispatch(fetchStoreOrders());
  };

  const confirmDeliveryHandler = async () => {
    dispatch(showLoading(true));
    const updateOrderStatus = {
      id: order.id,
      orderStatus: OrderStatus.DELIVERED,
    };

    await API.graphql({
      query: mutations.updateOrder,
      variables: { input: updateOrderStatus },
    }).catch((err) => {
      dispatch({
        alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
        actionButtonTitle: "OK",
      });
      return null;
    });

    await sendNotificationToTopic(
      "Order status updated",
      "Your order with ID " + order.shortId + " is delivered.",
      "CAU" + user.id,
      { orderId: order.id }
    );
    dispatch(fetchStoreOrders());
    dispatch(showLoading(false));
    navigation.navigate("BottomTabs");
  };

  const processMerchantPayment = async (finalCartAmount) => {
    console.log("finalCartAmount", finalCartAmount);
    try {
      dispatch(showLoading(true));
      const processMerchantPaymentReq = {
        amount: finalCartAmount,
        orderId: order.id,
        storeId: order.storeId,
        cartId: order.cartId,
      };
      console.log("processMerchantPayment.Req", processMerchantPaymentReq);

      const processMerchantPaymentRes = await API.graphql({
        query: mutations.processMerchantPayment,
        variables: processMerchantPaymentReq,
      }).catch((err) => {
        crashlytics().recordError(err);
        console.log("processMerchantPaymentRes.err", err);
        dispatch(
          showAlertToast({
            alertMessage: err?.message || AlertMessage.SOMETHING_WENT_WRONG,
            actionButtonTitle: "OK",
          })
        );
        return null;
      });
      console.log("processMerchantPaymentRes", processMerchantPaymentRes);
      dispatch(showLoading(false));
    } catch (error) {
      console.log("processMerchantPayment.error", error);
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  };
  const getOrderDetailComponent = () => (
    <OrderDetail
      user={user}
      orderStatus={order?.orderStatus}
      order={order}
      address={address}
      storeName={storeName}
      storeImage={storeImage}
      paymentType={paymentType}
    />
  );

  const getCustomerOrderHeader = () => (
    <CustomerOrderHeader
      status={order?.orderStatus}
      item="Item"
      price="Price per unit"
      orderedQuantity={
        order?.orderStatus == OrderStatus.CONFIRMED
          ? "Availability"
          : "Ordered Quantity"
      }
      deliveredQuantity={
        order?.orderStatus == OrderStatus.CONFIRMED
          ? "Quantity"
          : "Delivered Quantity"
      }
      total="Total"
      availability="Availability"
      quantity="Quantity"
    />
  );

  const getNewOrderView = () => (
    <>
      <DeliveryAddressCard user={user} address={address} />
      <View style={styles.summaryTableContainer}>
        <SummaryTable showCartOrderedValue summaryData={summaryData} />
      </View>

      <Button
        width={scaledValue(666)}
        height={scaledValue(103)}
        title={
          summaryData?.originalCartValue == 0
            ? "Cancel Order"
            : "Proceed To Pack"
        }
        onPress={proceedToPackHandler}
        backgroundColor="#F8993A"
        borderColor="#F8993A"
        color="#FFFFFF"
        borderRadius={scaledValue(8)}
        fontSize={scaledValue(30)}
        fontFamily="Lato-Medium"
      />
    </>
  );

  const getExitingOrderView = () => (
    <>
      {order?.orderStatus == OrderStatus.DELIVERY_IN_PROGRESS && (
        <Button
          width={scaledValue(666)}
          height={scaledValue(103)}
          title="Confirm Delivery"
          onPress={confirmDeliveryHandler}
          backgroundColor="#F8993A"
          borderColor="#F8993A"
          color="#FFFFFF"
          borderRadius={scaledValue(8)}
          fontSize={scaledValue(30)}
          fontFamily="Lato-Medium"
        />
      )}
    </>
  );
  return (
    <View style={styles.respondToOrderView}>
      <Header
        headerTitle={
          order?.orderStatus == OrderStatus.CONFIRMED && "Respond To Order"
        }
        textButton={
          order?.orderStatus == OrderStatus.CONFIRMED &&
          "Quantity ordered: " + cartItems?.length
        }
        goBack={() => {
          props.navigation.goBack();
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.respondToOrderMainView}>
          {getOrderDetailComponent()}

          <View style={styles.customerOrderView}>
            {getCustomerOrderHeader()}

            {cartItems?.map((item) => (
              <CustomerOrderedItem
                status={order?.orderStatus}
                orderId={order?.id}
                cartItem={item}
                itemQuantity={item?.quantity}
                itemId={item?.storeProductId}
                setShowCartUpdateModal={setShowCartUpdateModal}
              />
            ))}
          </View>

          {order?.orderStatus == OrderStatus.CONFIRMED && getNewOrderView()}

          {getExitingOrderView()}
        </View>
      </ScrollView>

      {showCartUpdateModal && (
        <NotifyCartUpdateModal
          visible={true}
          onCancelHandler={showCartUpdateModal.onCancelHandler}
          onAcceptHandler={showCartUpdateModal.onAcceptHandler}
        />
      )}
    </View>
  );
};

export default RespondToOrder;
