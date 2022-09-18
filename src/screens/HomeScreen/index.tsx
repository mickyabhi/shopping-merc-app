import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import AvatarItem from "../../components/AvatarItems";
import OrderCard from "../../components/OrderCard";
import orderIcon from "../../../assets/images/menu1.png";
import activeOrderIcon from "../../../assets/images/select_menu1.png";
import deliveryInProgressIcon from "../../../assets/images/menu2.png";
import activeDeliveryInProgressIcon from "../../../assets/images/select_menu2.png";
import deliveryIcon from "../../../assets/images/menu3.png";
import activeDeliveryIcon from "../../../assets/images/select_menu3.png";
import allOrdersIcon from "../../../assets/images/menu4.png";
import activeAllOrderIcon from "../../../assets/images/select_menu4.png";
import TopHeader from "../../components/TopHeader";
import drawerIcon from "../../../assets/images/drawer_img.png";
import LogoutModal from "./Components/LogoutModal";
import { useSelector, useDispatch } from "react-redux";
import { calculateRating, formatDateString } from "../../utils/common.utils";
import {
  showLogOutModal,
  showRateUsModal,
  fetchStoreData,
  fetchStoreOrders,
  fetchStoreImage,
  fetchOrderRatingByStoreId,
} from "../AppStore/actions";
import RateUsModal from "./Components/RateUsModal";
import { trackAnalytics } from "../../utils/analytics.utils";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import { API } from "aws-amplify";
import * as subscriptions from "../../graphql/subscriptions";
import { styles } from "./styles";
import { OrderStatus, OrderStatusMapping } from "../../utils/constants";
import notifee, { EventType, AndroidImportance } from "@notifee/react-native";
import { useNavigation } from "@react-navigation/core";
import messaging from "@react-native-firebase/messaging";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const logOutModalState = useSelector<any>((state) => state?.logOutModal);
  const rateUsModalState = useSelector<any>((state) => state?.rateUsModal);
  const storeName = useSelector<any>((state) => state?.store?.name);
  const storeImage = useSelector<any>((state) => state?.storeImage);
  const orders = useSelector<any>((state) => state?.orders);
  const orderRating = useSelector<any>((state) => state?.storeRating);
  const [totalOrder, setTotalOrder] = useState([]);
  const [rating, setRating] = useState([]);
  const [activeOrderButton, setActiveOrderButton] = useState(
    OrderStatusMapping.CONFIRMED
  );
  const [orderSubscription, setOrderSubscription] = useState(null);
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
    calculateOrderRating(orderRating);
  }, [orderRating]);

  const filteredOrders = () => {
    if (activeOrderButton == "All orders") return orders;
    else if (activeOrderButton != "All orders")
      return orders?.filter(
        (order) =>
          order.orderStatus
            .replace(OrderStatus.CONFIRMED, OrderStatusMapping.CONFIRMED)
            .replace(
              OrderStatus.DELIVERY_IN_PROGRESS,
              OrderStatusMapping.DELIVERY_IN_PROGRESS
            )
            .replace(OrderStatus.DELIVERED, OrderStatusMapping.DELIVERED) ==
          activeOrderButton
      );
  };

  useEffect(() => {
    const date = new Date().toLocaleString();
    if (orders != null) {
      setTotalOrder(
        orders?.filter(
          (item) => formatDateString(item?.createdAt) == formatDateString(date)
        )
      );
      loadOrderRating(orders);
    }
  }, [orders]);

  const orderWithSubscription = async () => {
    const storeId = await getItemFromAsyncStorage("store_id");
    const subscription = await API.graphql({
      query: subscriptions.onUpdateOrderByStoreId,
      variables: { storeId: storeId },
    }).subscribe({
      next: ({ provider, value }) => {
        dispatch(fetchStoreOrders());
        console.log("provider", provider);
        console.log("value", value);
      },
      error: (error) => {
        dispatch(fetchStoreOrders());
        console.log(JSON.stringify(error));
      },
    });
    setOrderSubscription(subscription);
  };

  const handleNotificationNavigation = (remoteMessage) => {
    if (remoteMessage?.orderId != null) {
      navigation.navigate("RespondToOrderScreen", {
        orderId: remoteMessage.orderId,
      });
    }
    if (remoteMessage?.userId != null) {
      navigation.navigate("ChatScreen", {
        userId: remoteMessage?.userId,
        orderId: remoteMessage?.shortId,
        userName: remoteMessage?.userName,
      });
    }
  };

  useEffect(() => {
    orderWithSubscription();
    dispatch(fetchStoreData());
    dispatch(fetchStoreOrders());
    dispatch(fetchStoreImage());
    loadOrderRating();
    messaging().onMessage(async (message) => {
      const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        sound: "tring",
        importance: AndroidImportance.HIGH,
      });
      if (message == null) return;
      const notificationData =
        message?.notification?.body != null ? message?.notification : message;

      const data = JSON.parse(message?.data?.body);

      if (notificationData?.body != null || notificationData?.title != null) {
        await notifee.displayNotification({
          title: notificationData?.title || notificationData?.body,
          body: notificationData?.body || notificationData?.title,
          data: data,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            smallIcon: "ic_launcher",
          },
        });
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data?.body != null) {
          remoteMessage = JSON.parse(remoteMessage?.data?.body);
          handleNotificationNavigation(remoteMessage);
        }
      });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage?.data?.body != null) {
        remoteMessage = JSON.parse(remoteMessage?.data?.body);
        handleNotificationNavigation(remoteMessage);
      }
    });

    return () => {
      if (orderSubscription != null) orderSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        case EventType.PRESS:
          if (detail?.notification?.data?.orderId != null) {
            navigation.navigate("RespondToOrderScreen", {
              orderId: detail?.notification?.data?.orderId,
            });
          }

          if (detail?.notification?.data?.userId != null) {
            navigation.navigate("ChatScreen", {
              userId: detail?.notification?.data?.userId,
              orderId: detail?.notification?.data?.shortId,
              userName: detail?.notification?.data?.userName,
            });
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    filteredOrders();
  }, [activeOrderButton]);

  return (
    <View style={styles.homePageView}>
      <TopHeader
        rating={calculateRating(rating)}
        totalOrders={totalOrder?.length}
        storeName={storeName}
        onPress={() => {
          trackAnalytics().trackEvents("HomePage", {
            CTA: "Drawer",
          });
          props.navigation.openDrawer();
        }}
        headerIcon={drawerIcon}
        headerScreen="Home"
        iconSize={scaledValue(43)}
      />
      <View style={styles.homePageMainView}>
        <View style={styles.avatarItemsView}>
          <AvatarItem
            imageSize={scaledValue(96)}
            avatarImage={
              activeOrderButton === OrderStatusMapping.CONFIRMED
                ? activeOrderIcon
                : orderIcon
            }
            headerTitle="Ordered"
            color={
              activeOrderButton === OrderStatusMapping.CONFIRMED
                ? "#FF8000"
                : "gray"
            }
            onPress={() => {
              trackAnalytics().trackEvents("HomePage", {
                CTA: "StatusOrdered",
              });
              setActiveOrderButton(OrderStatusMapping.CONFIRMED);
            }}
          />
          <AvatarItem
            imageSize={scaledValue(96)}
            avatarImage={
              activeOrderButton === OrderStatusMapping.DELIVERY_IN_PROGRESS
                ? activeDeliveryInProgressIcon
                : deliveryInProgressIcon
            }
            headerTitle="Delivery In Progress"
            color={
              activeOrderButton === OrderStatusMapping.DELIVERY_IN_PROGRESS
                ? "#ADC705"
                : "gray"
            }
            onPress={() => {
              trackAnalytics().trackEvents("HomePage", {
                CTA: "StatusDeliveryInProgress",
              });
              setActiveOrderButton(OrderStatusMapping.DELIVERY_IN_PROGRESS);
            }}
          />
          <AvatarItem
            imageSize={scaledValue(96)}
            avatarImage={
              activeOrderButton === OrderStatusMapping.DELIVERED
                ? activeDeliveryIcon
                : deliveryIcon
            }
            headerTitle="Delivered"
            color={
              activeOrderButton === OrderStatusMapping.DELIVERED
                ? "#03A454"
                : "gray"
            }
            onPress={() => {
              trackAnalytics().trackEvents("HomePage", {
                CTA: "StatusDelivered",
              });
              setActiveOrderButton(OrderStatusMapping.DELIVERED);
            }}
          />
          <AvatarItem
            imageSize={scaledValue(96)}
            avatarImage={
              activeOrderButton === "All orders"
                ? activeAllOrderIcon
                : allOrdersIcon
            }
            headerTitle="All orders"
            color={activeOrderButton === "All orders" ? "#4E588B" : "gray"}
            onPress={() => {
              trackAnalytics().trackEvents("HomePage", {
                CTA: "StatusAllOrders",
              });
              setActiveOrderButton("All orders");
            }}
          />
        </View>

        <View style={styles.cardsView}>
          {orders && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => dispatch(fetchStoreOrders())}
                />
              }
              showsVerticalScrollIndicator={false}
              data={filteredOrders()?.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              )}
              renderItem={({ item }) => (
                <OrderCard
                  order={item}
                  storeName={storeName}
                  storeImage={storeImage}
                />
              )}
            />
          )}
        </View>
      </View>
      <RateUsModal
        visible={rateUsModalState}
        onDismiss={() => dispatch(showRateUsModal(false))}
      />
      <RateUsModal visible={false} />
      <LogoutModal
        visible={logOutModalState}
        onDismiss={() => {
          dispatch(showLogOutModal(false));
        }}
      />
    </View>
  );
};

export default HomePage;
