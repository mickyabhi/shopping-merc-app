import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { IconButton, RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { fetchOrdersForGraph } from "../../screens/AppStore/actions";
import { scaledValue } from "../../utils/design.utils";
import { styles } from "./styles";
import backIcon from "../../../assets/images/back.png";
import { useNavigation } from "@react-navigation/native";

const SalesSummaryHeader = (props) => {
  const navigation = useNavigation<any>();
  const date = new Date();
  const dispatch = useDispatch();
  const sevenDaysAgo = date.setDate(date.getDate() - 7);
  const oneMonthAgo = date.setDate(date.getMonth() - 1);
  const oneYearAgo = date.setDate(date.getMonth() - 12);

  const [radioValue, setRadioValue] = useState("week");

  useEffect(() => {
    if (radioValue == "week") {
      dispatch(fetchOrdersForGraph(new Date(sevenDaysAgo).toISOString()));
    }
    if (radioValue == "month") {
      dispatch(fetchOrdersForGraph(new Date(oneMonthAgo).toISOString()));
    }
    if (radioValue == "year") {
      dispatch(fetchOrdersForGraph(new Date(oneYearAgo).toISOString()));
    }
  }, [radioValue]);

  console.log("radioValue===", radioValue);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#F78326" />
      <LinearGradient colors={["#F78326", "#F8993A"]}>
        <View style={styles.ratingView}>
          <IconButton
            icon={backIcon}
            color="#fff"
            size={scaledValue(34)}
            onPress={() => navigation.goBack()}
          />
          <Text allowFontScaling={false} style={styles.storeNameText}>
            The Butcher Shop
          </Text>
          <Text allowFontScaling={false} style={styles.ratingText}>
            Rating:
            <Text allowFontScaling={false} style={styles.ratingValue}>
              <Text style={styles.star}>★</Text> {props?.rating?.toFixed(1)}
            </Text>
          </Text>
        </View>
        <View style={styles.latestDataView}>
          <Text allowFontScaling={false} style={styles.latestDataText}>
            Showing data for last
          </Text>
          <Text allowFontScaling={false} style={styles.pendingOrdersText}>
            {props?.pendingOrders ? props?.pendingOrders : 0} Pending Orders
          </Text>
        </View>
        <View style={{ marginVertical: scaledValue(45.09) }}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setRadioValue(newValue);
              props?.setRadioButtonValue(newValue);
            }}
            value={radioValue}
          >
            <View style={styles.radioBtn}>
              <TouchableOpacity
                style={styles.radioBtnTouchable}
                onPress={() => {
                  setRadioValue("week");
                  props?.setRadioButtonValue("week");
                }}
              >
                <RadioButton value="week" color="#ffffff" />
                <Text allowFontScaling={false} style={styles.radioText}>
                  1 Week
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.radioBtnTouchable}
                onPress={() => setRadioValue("month")}
              >
                <RadioButton value="month" color="#ffffff" />
                <Text allowFontScaling={false} style={styles.radioText}>
                  1 Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioBtnTouchable}
                onPress={() => setRadioValue("year")}
              >
                <RadioButton value="year" color="#ffffff" />
                <Text allowFontScaling={false} style={styles.radioText}>
                  1 Year
                </Text>
              </TouchableOpacity> */}
            </View>
          </RadioButton.Group>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SalesSummaryHeader;
