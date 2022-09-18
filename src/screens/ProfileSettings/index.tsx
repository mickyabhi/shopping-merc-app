import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import ImagePicker from "react-native-image-crop-picker";
import ChooseImageModal from "./components/ChooseImageModal";
import phnIcon from "../../../assets/images/call.png";
import email from "../../../assets/images/email_img.png";
import Input from "../../components/InputText";
import { isEmail, isNumeric } from "../../utils/common.utils";
import Button from "../../components/Button";
import storeIcon from "../../../assets/images/store_icon.png";
import {
  getItemFromAsyncStorage,
  uploadImageInS3,
} from "../../utils/storage.utils";
import { useSelector, useDispatch } from "react-redux";
import * as mutations from ".././../graphql/mutations";
import { API } from "aws-amplify";
import {
  fetchStoreData,
  fetchStoreImage,
  showAlertToast,
  showLoading,
} from "../AppStore/actions";
import { trackAnalytics } from "../../utils/analytics.utils";
import editIcon from "../../../assets/images/edit-pen.png";
import { AlertMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const ProfileSettings = (props) => {
  const placeHolderImage =
    "https://blocalappstorage.s3.ap-south-1.amazonaws.com/dummy_camera_image.png";
  const [imageSelectModal, setImageSelectModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const storeImage = useSelector<any>((state) => state?.storeImage);
  const dispatch = useDispatch();
  const store = useSelector<any>((state) => state?.store);
  const user = useSelector<any>((state) => state?.user);

  useEffect(() => {
    setProfile({
      name: "" || store?.name,
      altMobile: "" || user?.secondaryNumber,
      email: "" || user?.email,
    });
  }, [store]);

  const hasErrorsAltMobile = () => {
    return profile?.altMobile ? !isNumeric(profile?.altMobile) : null;
  };
  const hasErrorsEmail = () => {
    return profile?.email ? !isEmail(profile?.email) : null;
  };
  const updateUserProfile = async () => {
    dispatch(showLoading(true));
    const imagePath = image ? await uploadImageInS3(image) : null;
    const currentUserId = await getItemFromAsyncStorage("current_user_id");
    const storeId = await getItemFromAsyncStorage("store_id");

    if (imagePath != null) {
      const createStoreImageInput = {
        storeId: storeId,
        imagePath: imagePath,
      };

      await API.graphql({
        query: mutations.createStoreImage,
        variables: { input: createStoreImageInput },
      }).catch((error) => {
        crashlytics().recordError(error);
        dispatch(
          showAlertToast({
            alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
            actionButtonTitle: "OK",
          })
        );
        return null;
      });
    }

    const updateStoreInput = {
      id: storeId,
      name: profile?.name,
    };

    const updateStoreResp = await API.graphql({
      query: mutations.updateStore,
      variables: { input: updateStoreInput },
    })
      .then((resp) => resp.data.updateStore)
      .catch((error) => {
        crashlytics().recordError(error);
        dispatch(
          showAlertToast({
            alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
            actionButtonTitle: "OK",
          })
        );
        return null;
      });

    if (profile.email) {
      const updateUserInput = {
        id: currentUserId,
        secondaryNumber: profile.altMobile,
        email: profile.email,
      };

      await API.graphql({
        query: mutations.updateUser,
        variables: { input: updateUserInput },
      })
        .then((resp) => resp.data.updateUser)
        .catch((error) => {
          crashlytics().recordError(error);
          dispatch(
            showAlertToast({
              alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
              actionButtonTitle: "OK",
            })
          );
          return null;
        });
    }

    if (updateStoreResp != null) {
      dispatch(fetchStoreData());
      dispatch(fetchStoreImage());
      props.navigation.navigate("Home");
      dispatch(
        showAlertToast({
          alertMessage: "Store profile updated",
        })
      );
    }
    dispatch(showLoading(false));
  };

  return (
    <View style={styles.profileSettingsView}>
      <Header
        headerTitle="Settings"
        goBack={() => {
          trackAnalytics().trackEvents("ProfileSettings", {
            CTA: "SettingBackIcon",
          });
          props.navigation.goBack();
        }}
      />
      <View style={styles.profileSettingsMainView}>
        <Text allowFontScaling={false} style={styles.storeImageText}>
          Store Image
        </Text>
        <Image source={editIcon} style={styles.editIconStyle} />

        <TouchableOpacity
          onPress={() => {
            trackAnalytics().trackEvents("ProfileSettings", {
              CTA: "StoreImage",
            });
            setImageSelectModal(true);
          }}
          style={styles.imageSelectorTouchableView}
        >
          <Image
            style={styles.storeImage}
            resizeMode="contain"
            source={{
              uri: image
                ? image
                : storeImage[storeImage?.length - 1]?.imagePath ||
                  placeHolderImage,
            }}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Input
            label="Alternate Mobile Number"
            name="altMobile"
            maxLength={10}
            keyboardType="numeric"
            mode="flat"
            style={styles.input}
            onChangeText={(value) => {
              setProfile({ ...profile, altMobile: value });
            }}
            value={profile?.altMobile}
            position={<TextInput.Icon name={phnIcon} color="#ff7402" />}
          />
          {hasErrorsAltMobile() && (
            <HelperText type="error" visible={hasErrorsAltMobile()}>
              Phone Number is invalid!
            </HelperText>
          )}

          <Input
            label="Email"
            name="Email"
            mode="flat"
            maxLength={50}
            style={styles.input}
            onChangeText={(value) => {
              trackAnalytics().trackEvents("ProfileSettings", {
                CTA: "UpdatedEmail",
                data: profile.email,
              });
              setProfile({ ...profile, email: value });
            }}
            value={profile?.email}
            position={<TextInput.Icon name={email} color="#F8993A" />}
          />
          {hasErrorsEmail() && (
            <HelperText type="error" visible={hasErrorsEmail()}>
              Enter vaild email
            </HelperText>
          )}
          <Input
            label="Name"
            name="Name"
            maxLength={25}
            mode="flat"
            style={styles.input}
            onChangeText={(value) => {
              setProfile({ ...profile, name: value });
            }}
            value={profile?.name}
            underlineColor="transparent"
            position={<TextInput.Icon name={storeIcon} color="#F8993A" />}
          />
        </View>
        <Button
          backgroundColor="#F8993A"
          disableColor="#FBCC9C"
          disableBorderColor="#FBCC9C"
          width={scaledValue(659.69)}
          height={scaledValue(106.5)}
          borderRadius={scaledValue(8)}
          title="Update"
          color="#fff"
          fontFamily="Lato-Bold"
          borderColor="#F8993A"
          onPress={updateUserProfile}
        />
      </View>
      <ChooseImageModal
        visible={imageSelectModal}
        onDismiss={() => setImageSelectModal(false)}
        selectImage={() => {
          ImagePicker.openPicker({
            width: scaledValue(1800),
            height: scaledValue(928),
            cropping: true,
          }).then((image) => {
            setImage(image.path);
          });
          setImageSelectModal(false);
        }}
        takeImage={() => {
          ImagePicker.openCamera({
            width: scaledValue(1800),
            height: scaledValue(928),
            cropping: true,
          }).then((image) => {
            setImage(image.path);
          });

          setImageSelectModal(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  profileSettingsView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSettingsMainView: {
    flex: 1,
    alignItems: "center",
    paddingTop: scaledValue(26.13),
  },
  storeImageText: {
    width: scaledValue(675),
    fontSize: scaledValue(26),
    fontFamily: "Lato-Bold",
    marginBottom: scaledValue(22.87),
  },

  storeImage: {
    flex: 1,
    borderRadius: scaledValue(7),
  },

  imageSelectorTouchableView: {
    borderWidth: 1,
    borderColor: "#F5672E",
    width: scaledValue(675),
    height: scaledValue(350),
    borderRadius: scaledValue(7),
  },
  inputContainer: {
    width: scaledValue(642.56),
    borderWidth: scaledValue(1),
    borderColor: "#0000004D",
    borderRadius: scaledValue(24),
    marginTop: scaledValue(64),
    marginBottom: scaledValue(59.52),
    paddingHorizontal: scaledValue(15),
  },
  input: {
    backgroundColor: "transparent",
    fontSize: scaledValue(26),
    fontFamily: "Lato-Regular",
    height: scaledValue(106.58),
  },
  editIconStyle: {
    width: scaledValue(25.97),
    height: scaledValue(25.7),
    position: "absolute",
    top: scaledValue(29.29),
    right: scaledValue(45.85),
  },
});

export default ProfileSettings;
