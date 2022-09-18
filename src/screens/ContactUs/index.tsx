import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { Platform } from "react-native";
import { Linking } from "react-native";
import Header from "../../components/Header";
import backIcon from "../../../assets/images/back.png";
import emailImg from "../../../assets/images/email_img.png";
import mobileIcon from "../../../assets/images/mobile_image.png";
import { trackAnalytics } from "../../utils/analytics.utils";
const ContactUs = () => {
  const mailTo = () => {
    Linking.openURL(`mailto:support@blocal.co.in`);
    trackAnalytics().trackEvents("ContactUs", {
      CTA: "mailTo",
    });
  };
  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${9108601005}`;
    } else {
      phoneNumber = `telprompt:${9108601005}`;
    }

    Linking.openURL(phoneNumber);

    trackAnalytics().trackEvents("ContactUs", {
      CTA: "makeCall",
    });
  };
  return (
    <View style={styles.contactUsView}>
      <Header backNavigationIcon={backIcon} headerTitle="Contact Us" />
      <TouchableOpacity style={styles.contactUsCardView} onPress={makeCall}>
        <Image
          style={styles.contactImg}
          source={mobileIcon}
          tintColor="#F8993D"
        />
        <View>
          <Text allowFontScaling={false} style={styles.contactMsgText}>
            Our Toll-free Number
          </Text>
          <Text allowFontScaling={false} style={styles.contactText}>
            9108601005
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactUsCardView} onPress={mailTo}>
        <Image style={styles.emailImg} source={emailImg} tintColor="#F8993A" />
        <View>
          <Text allowFontScaling={false} style={styles.contactMsgText}>
            Send Email To
          </Text>
          <Text allowFontScaling={false} style={styles.contactText}>
            support@blocal.co.in
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;
