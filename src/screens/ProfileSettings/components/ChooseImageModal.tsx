/* eslint-disable react/prop-types */
import * as React from "react";
import { Modal, Text } from "react-native-paper";
import cameraIcon from "../../../../assets/images/cameraIcon.png";
import galleryIcon from "../../../../assets/images/gallery_icon.png";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { scaledValue } from "../../../utils/design.utils";
const ChooseImageModal = (props) => {
  const containerStyle = {
    backgroundColor: "white",
    position: "absolute",
    top: scaledValue(505.5),
    left: scaledValue(101.25),
    right: scaledValue(101.75),
    borderRadius: scaledValue(24),
  };
  return (
    <Modal
      visible={props.visible}
      onDismiss={props.onDismiss}
      contentContainerStyle={containerStyle}
    >
      <View style={styles.modalMainView}>
        <Text allowFontScaling={false} style={styles.selectImageText}>
          Select Image Source
        </Text>
        <View style={styles.chooseImageModalView}>
          <TouchableOpacity
            onPress={props.takeImage}
            style={styles.selectImageView}
          >
            <Image style={styles.takeImageNdGallery} source={cameraIcon} />
            <Text allowFontScaling={false} style={styles.selectImageTypeText}>
              Take a Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.selectImage}
            style={styles.selectImageView}
          >
            <Image source={galleryIcon} style={styles.takeImageNdGallery} />
            <Text allowFontScaling={false} style={styles.selectImageTypeText}>
              Add from gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseImageModal;
const styles = StyleSheet.create({
  modalMainView: {
    width: scaledValue(547),
    height: scaledValue(323.47),
    alignItems: "center",
    paddingTop: scaledValue(43.5),
  },
  selectImageText: {
    fontSize: scaledValue(30),
    fontFamily: "Lato-Bold",
    marginBottom: scaledValue(37),
  },
  chooseImageModalView: {
    width: scaledValue(385.538),
    height: scaledValue(93),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  takeImageNdGallery: {
    width: scaledValue(93),
    height: scaledValue(93),
  },
  selectImageTypeText: {
    fontSize: scaledValue(24),
    fontFamily: "Lato-Bold",
    marginTop: scaledValue(15.57),
  },
  selectImageView: {
    alignItems: "center",
  },
});
