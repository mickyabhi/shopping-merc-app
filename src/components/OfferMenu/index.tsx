import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { scaledValue } from "../../utils/design.utils";
import { useNavigation } from "@react-navigation/native";

const OfferMenu = (props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("BillSlabOffer", {
          headerTitle: props.headerTitle,
        });
      }}
    >
      <Card containerStyle={styles.cardView}>
        <View>
          <View>
            <Image style={styles.image} source={props.item.img} />
          </View>
          <Card.Divider />
          <Text allowFontScaling={false} style={styles.headerTitle}>
            {props.headerTitle}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardView: {
    borderRadius: scaledValue(10),
    marginTop: scaledValue(42),
    width: scaledValue(318),
    height: scaledValue(214),
    padding: 0,
    paddingVertical: scaledValue(30),
    paddingHorizontal: scaledValue(20),
  },
  image: {
    width: scaledValue(65),
    height: scaledValue(65),
    resizeMode: "contain",
    marginBottom: scaledValue(20),
  },
  headerTitle: {
    fontFamily: "Lato,Regular",
    fontSize: scaledValue(26),
  },
  card: {
    width: "50%",
    borderRadius: 10,
  },
});

export default OfferMenu;
