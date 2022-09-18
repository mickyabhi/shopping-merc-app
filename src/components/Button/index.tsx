import React from "react";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import editIcon from "../../../assets/images/pens.png";
import { scaledValue } from "../../utils/design.utils";

const Button = (props) => (
  <TouchableOpacity
    disabled={props.disable}
    onPress={props.onPress}
    style={{
      width: props.width,
      height: props.height,
      borderWidth: 1,
      borderRadius: props.borderRadius,
      borderColor: props.disable ? props.disableBorderColor : props.borderColor,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.disable
        ? props.disableColor
        : props.backgroundColor,
    }}
  >
    <View style={styles.buttonTextView}>
      {props?.title == "EDIT" && (
        <Image source={editIcon} style={styles.editIcon} />
      )}
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
        }}
      >
        {props.title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  buttonTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: { width: scaledValue(19.74), height: scaledValue(14.68) },
});
