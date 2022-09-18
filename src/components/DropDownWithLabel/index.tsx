import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, Text } from "react-native";
import { scaledValue, scaleFactor } from "../../utils/design.utils";
const DropDownWithLabel = (props) => {
  return (
    <View style={styles.rowView}>
      <Text allowFontScaling={false} style={styles.label}>
        {props.label}
      </Text>
      <View
        style={[
          styles.dropDownContainer,
          {
            width: props.width,
            height: props.height,
            borderColor: props.disable
              ? props.disableBorderColor
              : props.borderColor,
            borderWidth: props.disable
              ? props.disableBorderWidth
              : props.borderWidth,
            borderRadius: props.borderRadius,
          },
        ]}
      >
        <Picker
          selectedValue={props.selectedValue}
          style={{ width: props.width, fontSize: props.fontSize }}
          // itemStyle={styles.pickerItem}
          onValueChange={props.onValueChange}
          dropdownIconColor={props.disable ? "#707070" : "#F8993A"}
        >
          {props.arr.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label} value={item.value} />
            );
          })}
        </Picker>
      </View>
      {props.subLabel && (
        <Text allowFontScaling={false} style={styles.subLabel}>
          {props.subLabel}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    marginLeft: scaledValue(20),
    marginTop: scaledValue(50),
  },
  label: {
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(26),
    color: "#000000",
  },
  dropDownContainer: {
    // borderWidth: 1,
    // borderColor: "#ECECEC",
    // borderRadius: scaledValue(8),
    // width: scaledValue(280),
    // height: scaledValue(70),
    justifyContent: "center",
    marginLeft: scaledValue(20),
  },
  // pickerItem: {
  //   fontSize: scaledValue(10),
  // },
  subLabel: {
    alignSelf: "center",
    marginLeft: scaledValue(20),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(26),
    color: "#000000",
  },
});

export default DropDownWithLabel;
