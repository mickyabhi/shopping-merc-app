import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar } from "react-native-paper";
import { MessageType } from "../../../utils/constants";
import { scaledValue } from "../../../utils/design.utils";

const Send = (props) => {
  const [userLabelName] = useState(props?.label?.split(" "));
  const [storeName] = useState(props?.storeName?.split(" "));
  return (
    <>
      {props?.senderId == props?.storeId && (
        <>
          {props?.type != MessageType.IMAGE && (
            <View style={styles.chatAreaView}>
              <View style={styles.chatTextView}>
                <Text allowFontScaling={false} style={styles.message}>
                  {props?.message}
                </Text>
              </View>
              {!props?.storeImage && (
                <Avatar.Text
                  size={scaledValue(110)}
                  label={`${storeName[0] ? storeName[0].charAt(0) : ""}${
                    storeName[1] ? storeName[1].charAt(0) : ""
                  }`}
                  labelStyle={styles.labelText}
                  style={styles.labelStyle}
                />
              )}
              {props?.storeImage && (
                <Avatar.Image
                  size={scaledValue(110)}
                  source={{
                    uri: props?.storeImage
                      ? props?.storeImage[0]?.imagePath
                      : null,
                  }}
                  style={styles.labelStyle}
                />
              )}
            </View>
          )}
          {props?.type == MessageType.IMAGE && (
            <View style={styles.storeImageAreaView}>
              <TouchableOpacity
                style={styles.storeImageView}
                onPress={props?.onPress}
              >
                <FastImage
                  source={{ uri: props?.message }}
                  style={styles.chatImage}
                />
              </TouchableOpacity>

              {!props?.storeImage && (
                <Avatar.Text
                  size={scaledValue(110)}
                  label={`${storeName[0] ? storeName[0].charAt(0) : ""}${
                    storeName[1] ? storeName[1].charAt(0) : ""
                  }`}
                  labelStyle={styles.labelText}
                  style={styles.labelStyle}
                />
              )}
              {props?.storeImage && (
                <Avatar.Image
                  size={scaledValue(110)}
                  source={{
                    uri: props?.storeImage
                      ? props?.storeImage[0]?.imagePath
                      : null,
                  }}
                  style={styles.labelStyle}
                />
              )}
            </View>
          )}
        </>
      )}

      {props?.senderId != props?.storeId && (
        <>
          {props?.type != MessageType.IMAGE && (
            <View style={styles.userChatAreaView}>
              {!props?.userImage && (
                <Avatar.Text
                  size={scaledValue(110)}
                  label={`${userLabelName ? userLabelName[0].charAt(0) : ""}${
                    userLabelName ? userLabelName[1].charAt(0) : ""
                  }`}
                  labelStyle={styles.labelText}
                  style={styles.userLabelStyle}
                />
              )}
              {props?.userImage && (
                <Avatar.Image
                  size={scaledValue(110)}
                  source={{
                    uri: props?.userImage
                      ? props?.userImage[0]?.imagePath
                      : null,
                  }}
                  style={styles.userLabelStyle}
                />
              )}
              <View style={styles.userChatTextView}>
                <Text allowFontScaling={false} style={styles.userMessage}>
                  {props?.message}
                </Text>
              </View>
            </View>
          )}
          {props?.type == MessageType.IMAGE && (
            <View style={styles.userImageChatAreaView}>
              {!props?.userImage && (
                <Avatar.Text
                  size={scaledValue(110)}
                  label={`${userLabelName ? userLabelName[0]?.charAt(0) : ""}${
                    userLabelName ? userLabelName[1]?.charAt(0) : ""
                  }`}
                  labelStyle={styles.labelText}
                  style={styles.userLabelStyle}
                />
              )}

              {props?.userImage && (
                <Avatar.Image
                  size={scaledValue(110)}
                  source={{
                    uri: props?.userImage
                      ? props?.userImage[0]?.imagePath
                      : null,
                  }}
                  style={styles.userLabelStyle}
                />
              )}
              <TouchableOpacity
                style={styles.userImageView}
                onPress={props?.onPress}
              >
                <FastImage
                  source={{ uri: props?.message }}
                  style={styles.chatImage}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Send;

const styles = StyleSheet.create({
  chatTextView: {
    backgroundColor: "#F1F1F1",
    paddingHorizontal: scaledValue(50),
    paddingVertical: scaledValue(25),
    borderWidth: scaledValue(1),
    borderColor: "#C3C3C3",
    borderTopRightRadius: scaledValue(24),
    borderTopLeftRadius: scaledValue(24),
    borderBottomLeftRadius: scaledValue(24),
    justifyContent: "center",
  },

  userChatTextView: {
    backgroundColor: "#F9993A",
    paddingHorizontal: scaledValue(50),
    paddingVertical: scaledValue(25),
    borderWidth: scaledValue(1),
    borderColor: "#F9993A",
    borderTopRightRadius: scaledValue(24),
    borderTopLeftRadius: scaledValue(24),
    borderBottomRightRadius: scaledValue(24),
    justifyContent: "center",
  },

  chatAreaView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: scaledValue(44),
  },

  userImageChatAreaView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginBottom: scaledValue(44),
  },

  userChatAreaView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: scaledValue(44),
  },
  labelText: {
    fontSize: scaledValue(30),
    color: "#fff",
    fontFamily: "Lato-Regular",
  },
  labelStyle: {
    backgroundColor: "#C3C3C3",
    marginLeft: scaledValue(10),
  },

  userLabelStyle: {
    backgroundColor: "#f9993A",
    marginRight: scaledValue(10),
  },

  message: {
    maxWidth: scaledValue(337),
    color: "#000000",
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
  },
  userMessage: {
    maxWidth: scaledValue(337),
    color: "#FFFFFF",
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
  },

  storeImageAreaView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: scaledValue(44),
  },

  storeImageView: {
    backgroundColor: "#C3C3C3",
    paddingHorizontal: scaledValue(4),
    paddingVertical: scaledValue(4),
    borderWidth: scaledValue(1),
    borderColor: "#C3C3C3",
    borderTopRightRadius: scaledValue(24),
    borderTopLeftRadius: scaledValue(24),
    borderBottomLeftRadius: scaledValue(24),
    justifyContent: "center",
  },

  storeLabelStyle: {
    backgroundColor: "#868686",
    marginRight: scaledValue(10),
  },

  userImageView: {
    backgroundColor: "#F9993A",
    paddingHorizontal: scaledValue(4),
    paddingVertical: scaledValue(4),
    borderWidth: scaledValue(1),
    borderColor: "#C3C3C3",
    borderTopRightRadius: scaledValue(24),
    borderTopLeftRadius: scaledValue(24),
    borderBottomRightRadius: scaledValue(24),
    justifyContent: "center",
  },

  chatImage: {
    width: scaledValue(400),
    height: scaledValue(400),
    borderTopRightRadius: scaledValue(24),
    borderTopLeftRadius: scaledValue(24),
    borderBottomLeftRadius: scaledValue(24),
    borderBottomRightRadius: scaledValue(24),
  },
});
