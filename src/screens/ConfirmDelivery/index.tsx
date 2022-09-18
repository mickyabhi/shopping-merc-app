import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import { scaledValue } from "../../utils/design.utils";
import ItemDetail from "./components/ItemDetail";
import OrderInfo from "./components/OrderInfo";
import Header from "../../components/Header";
import { OrderStatusMapping } from "../../utils/constants";
const ConfirmDelivery = (props) => {
  const order = props.route.params.order;
  return (
    <View style={styles.container}>
      <Header
        goBack={() => {
          props.navigation.navigate("DashBoard");
        }}
      />
      <OrderInfo order={order} />
      <ItemDetail />
      {order.status === OrderStatusMapping.DELIVERY_IN_PROGRESS ? (
        <Button
          title="Confirm Delivery"
          top={{
            top: scaledValue(70),
          }}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ConfirmDelivery;
