import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

const Heading = (props) => (
  <View style={styles.container}>
    <Text allowFontScaling={false} style={styles.text}>
      {props.data}
    </Text>
  </View>
);

export default Heading;
