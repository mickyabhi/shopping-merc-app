import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import productOfferIcon from "../../../assets/images/productOfferIcon.png";
import { styles } from "./styles";
const ProductOfferCard = (props) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.billSlabOfferCardMainView}>
        <Image style={styles.image} source={productOfferIcon} />
        <View style={styles.cardBody}>
          <View>
            <Text allowFontScaling={false} style={styles.heading}>
              Product Offer
            </Text>
            <Text allowFontScaling={false} style={styles.subHeading}>
              Buy 2kg chicken & get chicken masala 200gm free.
            </Text>
            <Text allowFontScaling={false} style={styles.startDateText}>
              Start Date:{"   "}
              <Text allowFontScaling={false} style={styles.startDateSubText}>
                06/12/2021, 12:00 PM
              </Text>
            </Text>
            <Text allowFontScaling={false} style={styles.endDateText}>
              End Date:{"   "}
              <Text allowFontScaling={false} style={styles.endDateSubText}>
                06/01/2022, 12:00 PM
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

export default ProductOfferCard;
