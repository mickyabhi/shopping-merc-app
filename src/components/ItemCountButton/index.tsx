import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const ItemsCountButton = (props) => {
  const isAdditionDisable = () =>
    !props.disable || props.disableAddition || !props.additionHandler;

  const isSubtractionDisable = () =>
    props.quantity == 0 ||
    !props.disable ||
    props.disableSubtraction ||
    !props.subtractionHandler;

  return (
    <View style={styles.CountButtonView}>
      <TouchableOpacity
        onPress={props.subtractionHandler}
        style={styles.subtractionButton}
        disabled={isSubtractionDisable()}
      >
        <Text
          style={
            isSubtractionDisable() ? styles.disableTextColor : styles.textColor
          }
        >
          -
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.countView}>
        <Text allowFontScaling={false} style={styles.countButtonTitle}>
          {props.quantity}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.additionHandler}
        style={styles.additionButton}
        disabled={isAdditionDisable()}
      >
        <Text
          style={
            isAdditionDisable() ? styles.disableTextColor : styles.textColor
          }
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemsCountButton;
