import React, { useEffect, useState } from "react";
import { StatusBar, SafeAreaView, View, Text, FlatList } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import LinearGradient from "react-native-linear-gradient";
import { IconButton, Divider } from "react-native-paper";
import AvatarItems from "../AvatarItems";
import { useSelector } from "react-redux";
import { trackAnalytics } from "../../utils/analytics.utils";
import { getCategoryImage } from "../../utils/constants";
import { styles } from "./styles";
const TopHeader = (props) => {
  const subCategory = useSelector<any>((state) => state?.subCategory);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const onCategorySelected = (category) => {
    props?.onCategorySelected(category);
    setSelectedCategory(category);
    trackAnalytics().trackEvents("ManageInventory", {
      CTA: "SelectedCategory",
      EnableInventory: selectedCategory,
    });
  };

  useEffect(() => {
    if (subCategory && subCategory.length && props?.onCategorySelected) {
      onCategorySelected(subCategory[0]);
    }
  }, [subCategory]);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#F78326" />
      <LinearGradient
        style={styles.topHeaderView}
        colors={["#F78326", "#F8993A"]}
      >
        <View style={styles.headerView}>
          <IconButton
            icon={props.headerIcon}
            color="#fff"
            size={props.iconSize}
            onPress={props.onPress}
          />
          <Text allowFontScaling={false} style={styles.headerTitleText}>
            {props?.storeName}
          </Text>
          {props.headerScreen === "Home" && (
            <>
              <Divider style={styles.dividerElement} />
              <Text allowFontScaling={false} style={styles.ratingText}>
                ★{" "}
                {isNaN(props?.rating?.toFixed(1))
                  ? "0.0"
                  : props?.rating?.toFixed(1)}
              </Text>
            </>
          )}
        </View>
        <View style={styles.headerContent}>
          {props.headerScreen === "Home" && (
            <>
              <View style={styles.contentView}>
                <Text allowFontScaling={false} style={styles.respondText}>
                  Respond To
                </Text>
                <Text allowFontScaling={false} style={styles.ordersText}>
                  ORDERS
                </Text>
              </View>
              <View style={styles.contentView}>
                <Text
                  allowFontScaling={false}
                  style={styles.numbersOfOrderText}
                >
                  {props?.totalOrders}
                </Text>
                <Text allowFontScaling={false} style={styles.totalOrderText}>
                  Total Orders Today
                </Text>
              </View>
            </>
          )}
          {props.headerScreen === "ManageInventory" && (
            <View style={styles.headerContentView}>
              <Text allowFontScaling={false} style={styles.headerContentText}>
                {props.headerContentText}
              </Text>
              <View style={styles.avatarIconsView}>
                {subCategory && (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={subCategory.sort()}
                    renderItem={({ item }) => (
                      <AvatarItems
                        imageSize={scaledValue(105)}
                        color="#fff"
                        headerTitle={item}
                        categoriesImage={getCategoryImage(item)}
                        backgroundColor={
                          selectedCategory == item ? "#FAB875" : null
                        }
                        onPress={() => {
                          onCategorySelected(item);
                        }}
                        paddingHorizontal={scaledValue(70)}
                      />
                    )}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TopHeader;
