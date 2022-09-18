import React, { useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scaledValue } from "../../utils/design.utils";
import discountIcon from "../../../assets/images/discountIcon.png";
const BillSlabOfferCard = (props) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.billSlabOfferCardMainView}>
        <Image style={styles.image} source={discountIcon} />
        <View style={styles.cardBody}>
          <View>
            <Text allowFontScaling={false} style={styles.heading}>
              Bill Slab Offer
            </Text>
            <Text allowFontScaling={false} style={styles.subHeading}>
              Buy for Rs. 500 & get 10% discount.
            </Text>
            <Text allowFontScaling={false} style={styles.startDateText}>
              Start Date:{"   "}
              <Text allowFontScaling={false} style={styles.startDateSubText}>
                {props.offerDuration.startDate +
                  "," +
                  props.offerDuration.startTime}
              </Text>
            </Text>
            <Text allowFontScaling={false} style={styles.endDateText}>
              End Date:{"   "}
              <Text allowFontScaling={false} style={styles.endDateSubText}>
                {props.offerDuration.endDate +
                  "," +
                  props.offerDuration.endTime}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bottomView}
            onPress={() => {
              props.setShowModal(true);
              props.setShowOfferSuccess("first");
            }}
          >
            <Text allowFontScaling={false} style={styles.deleteText}>
              Delete{" "}
            </Text>
            <IconButton
              icon="delete"
              size={20}
              color="gray"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BillSlabOfferCard;

const styles = StyleSheet.create({
  cardView: {
    width: scaledValue(659),
    borderColor: "#CDCDCD",
    borderRadius: scaledValue(8),
    alignSelf: "center",
    marginTop: scaledValue(37),
    elevation: scaledValue(2),
    paddingLeft: scaledValue(45),
    paddingTop: scaledValue(36),
  },
  billSlabOfferCardMainView: {
    flexDirection: "row",
  },
  image: {
    width: scaledValue(60),
    height: scaledValue(60),
  },
  cardBody: {
    marginLeft: scaledValue(41),
  },
  heading: {
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(24),
    color: "#000000",
    marginBottom: scaledValue(13),
  },
  subHeading: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(24),
    color: "gray",
    marginBottom: scaledValue(14),
  },
  startDateText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "gray",
    marginBottom: scaledValue(14),
  },
  startDateSubText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "#F3901E",
  },
  endDateText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "gray",
  },
  endDateSubText: {
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(18),
    color: "#F3901E",
  },
  bottomView: {
    flexDirection: "row",
    marginLeft: scaledValue(364),
  },
  deleteText: {
    fontSize: scaledValue(28),
    fontFamily: "Lato-Semibold",
    color: "gray",
    marginTop: scaledValue(20),
    marginRight: scaledValue(6),
  },
  deleteIcon: {
    // marginTop: scaledValue(19),
    right: scaledValue(29),
  },
});
