import React from "react";
import { Text, View } from "react-native";
import { OrderStatus } from "../../utils/constants";
import { styles } from "./styles";
const CustomerOrderHeader = (props) => {
  return (
    <View style={styles.customerOrderHeaderView}>
      <Text allowFontScaling={false} style={styles.itemText}>
        {props.item}
      </Text>

      {props.status == OrderStatus.CONFIRMED && (
        <>
          <Text allowFontScaling={false} style={styles.orderedPriceText}>
            {props?.price}
          </Text>
          <Text allowFontScaling={false} style={styles.availabilityText}>
            {props?.availability}
          </Text>
          <Text allowFontScaling={false} style={styles.quantityText}>
            {props?.quantity}
          </Text>
          <Text allowFontScaling={false} style={styles.orderedTotalText}>
            {props?.total}
          </Text>
        </>
      )}

      {props.status == OrderStatus.DELIVERY_IN_PROGRESS && (
        <>
          <Text allowFontScaling={false} style={styles.priceText}>
            {props?.price}
          </Text>
          <Text allowFontScaling={false} style={styles.orderedQuantityText}>
            {props?.orderedQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.deliveredQuantityText}>
            {props?.deliveredQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.totalText}>
            {props?.total}
          </Text>
        </>
      )}
      {props?.status == OrderStatus.DELIVERED && (
        <>
          <Text allowFontScaling={false} style={styles.deliveredItmPrice}>
            {props?.price}
          </Text>
          <Text allowFontScaling={false} style={styles.orderedQuantityText}>
            {props?.orderedQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.deliveredQuantityText}>
            {props?.deliveredQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.totalText}>
            {props?.total}
          </Text>
        </>
      )}

      {props?.status == OrderStatus.DECLINED && (
        <>
          <Text allowFontScaling={false} style={styles.deliveredItmPrice}>
            {props?.price}
          </Text>
          <Text allowFontScaling={false} style={styles.orderedQuantityText}>
            {props?.orderedQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.deliveredQuantityText}>
            {props?.deliveredQuantity}
          </Text>
          <Text allowFontScaling={false} style={styles.totalText}>
            {props?.total}
          </Text>
        </>
      )}
    </View>
  );
};

export default CustomerOrderHeader;
