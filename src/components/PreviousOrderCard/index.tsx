import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import { Avatar } from "react-native-paper";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { formatDateString } from "../../utils/common.utils";
import { styles } from "./styles";

const PreviousOrderItem = (props) => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const loadUserInfo = async (userId) => {
    const userInfo = await API.graphql({
      query: queries.userByPrimaryNumber,
      variables: { primaryNumber: userId },
    }).then((resp) => resp?.data?.userByPrimaryNumber?.items[0]);

    setUser(userInfo);
  };
  const loadAddress = async (id) => {
    const user = await API.graphql({
      query: queries.addressByUserId,
      variables: { userId: id },
    }).then((resp) => resp?.data?.addressByUserId.items[0]);

    setAddress(user);
  };
  useEffect(() => {
    loadUserInfo(props?.userId);
    loadAddress(props?.userId);
  }, []);

  return (
    <View style={styles.previousOrderItemCardView}>
      <View style={styles.rowView}>
        <Avatar.Text
          style={styles.avatarStyle}
          labelStyle={styles.avatarLabel}
          size={scaledValue(83)}
          label={`${user?.firstName ? user?.firstName?.charAt(0) : ""}${
            user?.lastName ? user?.lastName?.charAt(0) : ""
          }`}
        />
        <View style={styles.detailView}>
          <Text allowFontScaling={false} style={styles.orderId}>
            Order ID: {props?.shortId}
          </Text>
          <Text allowFontScaling={false} style={styles.date}>
            Date: {formatDateString(props?.createdAt)}
          </Text>
          <Text allowFontScaling={false} style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.address}
          >
            {address?.address
              ? address?.address
              : "" + ", " + address?.location
              ? address?.location
              : "" + ", " + address?.city
              ? address?.city
              : ""}
          </Text>
        </View>
        <View style={styles.statusView}>
          <View style={styles.statusCircle}></View>
          <Text allowFontScaling={false} style={styles.status}>
            Delivered
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PreviousOrderItem;
