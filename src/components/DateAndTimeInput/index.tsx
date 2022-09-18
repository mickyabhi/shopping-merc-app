import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { scaledValue } from "../../utils/design.utils";
import datePickerIcon from "../../../assets/images/datePickerIcon.png";
import timePickerIcon from "../../../assets/images/timePickerIcon.png";
const DateAndTimeInput = (props) => {
  return (
    <View style={styles.rowView}>
      <Text allowFontScaling={false} style={styles.label}>
        {props.label}
      </Text>
      <TextInput
        placeholder="dd/mm/yy ; hh/mm am"
        value={props?.value}
        style={{
          width: props?.width,
          height: props?.height,
          borderColor: props?.value
            ? props?.borderColor
            : props?.disableBorderColor,
          borderWidth: props?.value
            ? props?.borderWidth
            : props?.disableBorderWidth,
          borderTopLeftRadius: scaledValue(5),
          borderBottomLeftRadius: scaledValue(5),
          fontSize: props?.fontSize,
          fontFamily: props?.fontFamily,
          color: props?.color,
        }}
      />
      <View style={styles.iconView}>
        <TouchableOpacity onPress={props?.showDatePicker}>
          <Image style={styles.datePickerIcon} source={datePickerIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={props?.showTimePicker}>
          <Image style={styles.timePickerIcon} source={timePickerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateAndTimeInput;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    marginLeft: scaledValue(20),
    marginTop: scaledValue(32.43),
  },
  label: {
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    marginRight: scaledValue(18.51),
  },
  pickedDate: {
    fontSize: scaledValue(26),
    color: "#000000",
    fontFamily: "Lato-Regular",
    justifyContent: "center",
    alignSelf: "center",
  },
  timeIcon: {
    backgroundColor: "gray",
  },
  dateIcon: {
    backgroundColor: "gray",
  },
  iconView: {
    backgroundColor: "orange",
    flexDirection: "row",
    width: scaledValue(95.02),
    height: scaledValue(62),
    justifyContent: "space-around",
    alignItems: "center",
    borderTopRightRadius: scaledValue(5),
    borderBottomRightRadius: scaledValue(5),
    borderWidth: scaledValue(2),
    borderColor: "#F8993A",
  },
  datePickerIcon: {
    width: scaledValue(26),
    height: scaledValue(28.5),
  },
  timePickerIcon: {
    width: scaledValue(26),
    height: scaledValue(26),
  },
});
