import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { scaledValue } from "../../utils/design.utils";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { Avatar } from "react-native-paper";
import backIcon from "../../../assets/images/back.png";
import { styles } from "./styles";
const Header = (props) => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#F78326" />
      <LinearGradient colors={["#F78326", "#F8993A"]}>
        <Appbar.Header style={styles.appbar}>
          <View style={styles.leftIcons}>
            <IconButton
              icon={backIcon}
              color="#fff"
              size={scaledValue(34)}
              onPress={() => navigation.goBack()}
            />
            {props?.avatarImage && (
              <Avatar.Image
                size={scaledValue(90)}
                source={{ uri: props?.avatarImage }}
                style={styles?.avatarImage}
              />
            )}
            <Text allowFontScaling={false} style={styles.headerTitle}>
              {props?.headerTitle}
            </Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => {}}>
              <Text allowFontScaling={false} style={styles.textButton}>
                {props?.textButton}
              </Text>
            </TouchableOpacity>
          </View>
        </Appbar.Header>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;
