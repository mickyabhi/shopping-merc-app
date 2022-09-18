import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
const LoadingComponent = () => {
  return (
    <View style={styles.loaderView}>
      <ActivityIndicator size="large" color="#eb6d1a" />
    </View>
  );
};

export default LoadingComponent;
