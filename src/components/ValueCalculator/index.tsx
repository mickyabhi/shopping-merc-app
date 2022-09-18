import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { scaledValue } from "../../utils/design.utils";

const ValueCalculator = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const calculation = (itm) => {
    if (itm === "add") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
    console.log(quantity, "valueContainer");
  };
  return (
    <View
      style={[
        styles.valueContainer,
        props.containerStyle && {
          backgroundColor: "#fff",
          color: "#000",
          borderColor: "black",
          borderWidth: 0.5,
        },
      ]}
    >
      {!quantity ? (
        <TouchableOpacity
          onPress={() => {
            calculation("add");
          }}
        >
          <Text allowFontScaling={false} style={styles.addValue}>
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.valueContainer}>
          <TouchableOpacity
            style={styles.calculate}
            onPress={() => {
              calculation();
            }}
          >
            <Text allowFontScaling={false} style={styles.value}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calculate}>
            <Text allowFontScaling={false} style={styles.value}>
              {quantity}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              calculation("add");
            }}
            style={styles.calculate}
          >
            <Text allowFontScaling={false} style={styles.value}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  valueContainer: {
    width: scaledValue(120),
    height: scaledValue(50),
    backgroundColor: "#F79539",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    borderRadius: scaledValue(10),
  },
  value: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    // fontSize: scaledValue(26),
    // top: scaledValue(10),
  },
  addValue: {
    textAlignVertical: "center",
    color: "#fff",
    top: scaledValue(7),
  },
  calculate: {
    flex: 1,
    width: scaledValue(120),
    height: scaledValue(50),
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default ValueCalculator;
