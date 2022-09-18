import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import PreviousOrderCard from "../../components/PreviousOrderCard";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { OrderStatus } from "../../utils/constants";
const PreviousOrder = (props) => {
  const orders = useSelector<any>((state) => state?.orders);
  const [order, setOrder] = useState([]);
  const deliveredOrders = () => {
    if (orders != null)
      setOrder(
        orders?.filter((order) => order.orderStatus == OrderStatus.DELIVERED)
      );
  };
  useEffect(() => {
    deliveredOrders();
  }, [orders]);

  return (
    <View style={styles.previousOrderView}>
      <Header
        headerTitle="Previous Orders"
        textButton={`${order?.length} Total Orders`}
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.previousOrderMainView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={order?.sort(
            (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
          )}
          renderItem={({ item }) => (
            <PreviousOrderCard
              shortId={item?.shortId}
              createdAt={item?.createdAt}
              userId={item?.userId}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PreviousOrder;
