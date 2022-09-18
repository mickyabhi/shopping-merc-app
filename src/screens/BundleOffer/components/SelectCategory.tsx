import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { scaledValue } from "../../../utils/design.utils";

const SelectCategory = () => {
  const [items, setItem] = useState();
  const arr = [
    { name: "Atta", id: 1 },
    { name: "Oil", id: 2 },
    { name: "Pulses", id: 3 },
    { name: "Rice", id: 4 },
  ];

  const showData = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryView,
          item.id === items ? { backgroundColor: "#F3901E" } : null,
        ]}
        onPress={() => {
          setItem(item.id);
        }}
      >
        <Text
          style={item.id === items ? { color: "#fff" } : { color: "black" }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList data={arr} horizontal renderItem={showData} />
    </View>
  );
};
const styles = StyleSheet.create({
  categoryView: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: scaledValue(60),
    marginRight: scaledValue(20),
    paddingVertical: scaledValue(10),
    borderRadius: scaledValue(20),
  },
});

export default SelectCategory;
