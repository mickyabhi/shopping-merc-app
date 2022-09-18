import React from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import { scaledValue } from "../../utils/design.utils";
import { styles } from "./styles";

const Stepper = (props) => (
  <View style={styles.stepperView}>
    <View>
      <Badge style={styles.activeBadgeStyle} size={scaledValue(70)}>
        1
      </Badge>
    </View>
    <Text allowFontScaling={false} style={styles.storeInfoText}>
      Store Info
    </Text>

    <View
      style={
        props.registerInfoType == "Bank Info"
          ? styles.activeLineView
          : styles.lineView
      }
    />
    <View>
      <Badge
        style={
          props.registerInfoType == "Bank Info"
            ? styles.activeBadgeStyle
            : styles.badgeStyle
        }
        size={scaledValue(70)}
      >
        2
      </Badge>
    </View>
    <Text
      style={
        props.registerInfoType == "Bank Info"
          ? styles.activeBankingInfoText
          : styles.bankingInfoText
      }
    >
      Banking Info
    </Text>
  </View>
);

export default Stepper;
