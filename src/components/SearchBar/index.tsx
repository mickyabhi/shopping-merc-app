import React from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";
import { IconButton } from "react-native-paper";

import { scaledValue } from "../../utils/design.utils";
const SearchBar = (props) => (
  <View style={styles.searchBar}>
    <IconButton
      onPress={props.onPress}
      size={props.size}
      icon={props?.icon}
      style={styles.searchIcon}
      color={props.color}
    />
    <TextInput
      style={styles.searchBox}
      placeholder={props?.placeholder}
      allowFontScaling={false}
      onChangeText={props?.onChangeText}
    />
  </View>
);

export default SearchBar;
const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: scaledValue(6),
    justifyContent: "center",
  },
  searchBox: {
    borderRadius: scaledValue(10),
    borderWidth: scaledValue(1),
    width: scaledValue(659),
    borderColor: "#00000045",
    paddingHorizontal: scaledValue(30.5),
    height: Platform.OS === "ios" ? scaledValue(80) : undefined,
    color: "#000000",
  },
  searchIcon: {
    position: "absolute",
    right: scaledValue(22.3),
  },
});
