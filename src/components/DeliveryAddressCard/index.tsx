import React from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import marker from "../../../assets/images/marker.png";
import { styles } from "./styles";
const DeliveryAddress = (props) => {
  return (
    <Card mode="outlined" style={styles.deliveryAddressCard}>
      <View style={styles.addressLabelTextView}>
        <Text allowFontScaling={false} style={styles.deliveryAddressText}>
          Delivery address
        </Text>
        <Text allowFontScaling={false} style={styles.addressTypeText}>
          Address Type: {props?.address?.tag}
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles.contactNameText}>
        Contact person: {props?.user?.firstName}
      </Text>
      <View style={styles.addressTextView}>
        <Image style={styles.locationMarkImage} source={marker} />
        <Text
          allowFontScaling={false}
          style={styles.addressText}
          numberOfLines={2}
        >
          {props?.address?.address ||
            props?.address?.location +
              ", " +
              props?.address?.city +
              ", " +
              props?.address?.state +
              ", " +
              props?.address?.pincode}
        </Text>
      </View>
    </Card>
  );
};

export default DeliveryAddress;
