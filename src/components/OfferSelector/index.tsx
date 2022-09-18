import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { scaledValue } from "../../utils/design.utils";
import DropDownWithLabel from "../DropDownWithLabel";
import InputTextWithLabel from "../InputTextWithLabel";

const OfferSelector = (props) => {
  const [radioValue, setRadioValue] = useState("");
  return (
    <View style={styles.offerSelectorMainView}>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            color="#F5672E"
            onPress={() => props.setCheckedNumber("first")}
            status={props.checkedNumber === "first" ? "checked" : "unchecked"}
            value={props.checkedNumber}
          />
        </View>
        <DropDownWithLabel
          label="Get Rs."
          selectedValue={props.offer?.amountOff}
          width={scaledValue(210)}
          height={scaledValue(62)}
          disableBorderColor="#707070"
          borderColor="#F8993A"
          disableBorderWidth={scaledValue(1)}
          borderWidth={scaledValue(2)}
          borderRadius={scaledValue(5)}
          subLabel="off"
          disable={props.checkedNumber === "first" ? false : true}
          arr={props.offRs}
          onValueChange={(itemValue) =>
            props.setOffer({ ...props.offer, amountOff: itemValue })
          }
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            color="#F5672E"
            onPress={() => props.setCheckedNumber("second")}
            status={props.checkedNumber === "second" ? "checked" : "unchecked"}
            value={radioValue}
          />
        </View>
        <InputTextWithLabel
          label="Get    "
          width={scaledValue(400)}
          height={scaledValue(70)}
          value={props?.offer?.freeItem}
          disableBorderColor="#707070"
          borderColor="#F8993A"
          borderRadius={scaledValue(5)}
          disableBorderWidth={scaledValue(1)}
          borderWidth={scaledValue(2)}
          fontSize={scaledValue(26)}
          fontFamily="Lato-Regular"
          alignItems="center"
          subLabel="free"
          placeholder="Search as you type"
          disable={props.checkedNumber === "second" ? false : true}
          onChangeText={(item) => props.offerInput(item)}
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            color="#F5672E"
            onPress={() => props.setCheckedNumber("third")}
            status={props.checkedNumber === "third" ? "checked" : "unchecked"}
          />
        </View>
        <DropDownWithLabel
          selectedValue={props.offer?.discount}
          label="Get "
          fontSize={scaledValue(26)}
          width={scaledValue(210)}
          height={scaledValue(61.57)}
          disableBorderColor="#707070"
          borderColor="#F8993A"
          disableBorderWidth={scaledValue(1)}
          borderWidth={scaledValue(2)}
          borderRadius={scaledValue(5)}
          subLabel="% discount"
          disable={props.checkedNumber === "third" ? false : true}
          arr={props.discount}
          onValueChange={(itemValue) =>
            props.setOffer({ ...props.offer, discount: itemValue })
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  offerSelectorMainView: {
    paddingLeft: scaledValue(48.44),
  },
  radioButton: {
    top: scaledValue(50),
  },
  selectContainer: {
    flexDirection: "row",
  },
});

export default OfferSelector;
