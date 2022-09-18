import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { View, Text } from "react-native";
import { scaledValue } from "../../utils/design.utils";
const InputTextWithLabel = (props) => {
  return (
    <View style={styles.rowView}>
      <Text allowFontScaling={false} style={styles.label}>
        {props.label}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={(item) => props.onChangeText(item)}
        keyboardType={props.keyboardType}
        value={props?.value}
        style={{
          width: props.width,
          height: props.height,
          borderColor: props.disable
            ? props.disableBorderColor
            : props.borderColor,
          borderWidth: props.disable
            ? props.disableBorderWidth
            : props.borderWidth,
          borderRadius: props.borderRadius,
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
          alignItems: props.alignItems,
        }}
      />
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
  },
  subLabel: {
    alignSelf: "center",
    marginLeft: scaledValue(20),
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(26),
  },
});

export default InputTextWithLabel;
