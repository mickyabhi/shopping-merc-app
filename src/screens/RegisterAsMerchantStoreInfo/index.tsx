import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import Header from "../../components/Header";
import Stepper from "../../components/StepperUI";
import { scaledValue } from "../../utils/design.utils";
import ImagePicker from "react-native-image-crop-picker";
import InputText from "../../components/InputText";
import { HelperText, Switch, TextInput } from "react-native-paper";
import Button from "../../components/Button";
import user_image from "../../../assets/images/person.png";
import call from "../../../assets/images/call.png";
import mail from "../../../assets/images/mail.png";
import store from "../../../assets/images/store.png";
import govt from "../../../assets/images/govt.png";
import category from "../../../assets/images/category.png";
import user_store from "../../../assets/images/store.png";
import area from "../../../assets/images/area2.png";
import landMark from "../../../assets/images/landmark2.png";
import city from "../../../assets/images/city2.png";
import gst from "../../../assets/images/gst.png";
import userPinCode from "../../../assets/images/pin_code.png";
import rupee from "../../../assets/images/rupee.png";
import { API } from "aws-amplify";
import {
  getShortId,
  gstCheck,
  isEmptyString,
  isNumeric,
} from "../../utils/common.utils";
import { Picker } from "@react-native-picker/picker";
import {
  getItemFromAsyncStorage,
  setItemInAsyncStorage,
  uploadImageInS3,
} from "../../utils/storage.utils";
import * as queries from "../../graphql/queries";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStoreCategories,
  showAlertToast,
  showLoading,
} from "../AppStore/actions";
import * as mutations from "../../graphql/mutations";
import { AlertMessage } from "../../utils/constants";
import crashlytics from "@react-native-firebase/crashlytics";

const RegisterStoreInfo = (props) => {
  const minimumOrder = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const placeHolder =
    "https://blocalappstorage.s3.ap-south-1.amazonaws.com/png--.png";

  const [disableRegisterButton, setDisableRegisterButton] = useState(false);
  const [toggleShow, setToggleShow] = useState(false);
  const [storeImage, setStoreImage] = useState(null);
  const [autoAddress, setAutoAddress] = useState(null);
  const categories = useSelector<any>((state) => state?.storeCategories);
  const [storeInfo, setStoreInfo] = useState<any>({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    storeName: "",
    govtLicense: "",
    gstNo: "",
    category: "",
    storeNo: "",
    area: "",
    landMark: "",
    pinCode: "",
    minAmount: "",
    deliveryCharges: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    setStoreInfo({
      area: autoAddress?.address || "",
      landMark: autoAddress?.landmark || "",
      pinCode: autoAddress?.pincode || "",
      city: autoAddress?.city || "",
      state: autoAddress?.state || "",
    });
  }, [autoAddress]);

  useEffect(() => {
    setAutoAddress(props?.route?.params?.createAddressInput);
  }, [props]);

  const isValidPinCode = () => {
    return storeInfo?.pinCode
      ? !isNumeric(storeInfo?.pinCode) || storeInfo?.pinCode?.length !== 6
      : null;
  };
  const handleGst = () => {
    return storeInfo?.gstNo
      ? !gstCheck(storeInfo?.gstNo) || isEmptyString(storeInfo?.gstNo)
      : null;
  };
  const isValidNumber = () => {
    return storeInfo?.number
      ? !isNumeric(storeInfo?.number) || storeInfo?.number?.length !== 10
      : null;
  };
  const checkStoreImage = () => {
    return !storeImage;
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: scaledValue(1800),
      height: scaledValue(928),
      cropping: true,
    }).then((resp) => {
      setStoreImage(resp.path);
    });
  };

  useEffect(() => {
    setDisableRegisterButton(
      isEmptyString(storeInfo?.firstName) ||
        isEmptyString(storeInfo?.lastName) ||
        storeInfo?.number?.length !== 10 ||
        storeInfo?.pinCode?.length !== 6 ||
        storeInfo?.category === "" ||
        !isNumeric(storeInfo?.number) ||
        isEmptyString(storeInfo?.storeName) ||
        isEmptyString(storeInfo?.govtLicense) ||
        isEmptyString(storeInfo?.gstNo) ||
        !isNumeric(storeInfo?.storeNo) ||
        isEmptyString(storeInfo?.area) ||
        isEmptyString(storeInfo?.landMark) ||
        !isNumeric(storeInfo?.pinCode) ||
        !gstCheck(storeInfo?.gstNo) ||
        !storeImage
    );
  }, [storeInfo, storeImage]);

  const submitStoreInfo = async () => {
    try {
      dispatch(showLoading(true));
      const currentUserId = await getItemFromAsyncStorage("current_user_id");
      let user = await API.graphql({
        query: queries.getUser,
        variables: { id: currentUserId },
      })
        .then((resp) => resp.data.getUser)
        .catch((err) => {
          crashlytics().recordError(err);
          return null;
        });

      let admin = await API.graphql({
        query: queries.storeAdminByUserId,
        variables: { userId: currentUserId },
      })
        .then((resp) => resp.data.storeAdminByUserId.items)
        .catch((err) => {
          crashlytics().recordError(err);
          return null;
        });
      props.navigation.navigate("BankInfo");
      const createAndUpdateUserInput = {
        id: currentUserId,
        primaryNumber: currentUserId,
        firstName: storeInfo?.firstName,
        lastName: storeInfo?.lastName,
        secondaryNumber: storeInfo?.number,
        email: storeInfo?.email,
      };

      if (user == null) {
        user = await API.graphql({
          query: mutations.createUser,
          variables: { input: createAndUpdateUserInput },
        }).then((resp) => resp.data.createUser);
      } else {
        user = await API.graphql({
          query: mutations.updateUser,
          variables: { input: createAndUpdateUserInput },
        }).then((resp) => resp.data.updateUser);
      }

      const createStoreInput = {
        id: getShortId(),
        name: storeInfo?.storeName,
        licenseNumber: storeInfo?.govtLicense,
        gstNumber: storeInfo?.gstNo,
        category: storeInfo?.category,
        primaryNumber: currentUserId,
        city: storeInfo?.city,
        landmark: storeInfo?.landMark,
        location: storeInfo?.landMark,
        latitude: autoAddress?.latitude,
        longitude: autoAddress?.longitude,
        pincode: storeInfo?.pinCode,
        address: storeInfo?.storeNo + ", " + storeInfo?.area,
        minimumAmount: storeInfo?.minAmount || 0,
        deliveryCharges: storeInfo?.deliveryCharges || 0,
        state: storeInfo?.state,
        contactNumber: storeInfo?.number,
      };

      const store = await API.graphql({
        query: mutations.createStore,
        variables: { input: createStoreInput },
      }).then((resp) => resp.data.createStore);

      let createAndUpdateAdminInput = {
        userId: currentUserId,
        storeId: store.id,
        storeAdminUserId: currentUserId,
        storeAdminStoreId: store.id,
      };

      if (admin.length == 0) {
        await API.graphql({
          query: mutations.createStoreAdmin,
          variables: { input: createAndUpdateAdminInput },
        }).then((resp) => resp.data.createStoreAdmin);
      } else {
        await API.graphql({
          query: mutations.updateStoreAdmin,
          variables: { input: createAndUpdateAdminInput },
        }).then((resp) => resp.data.updateStoreAdmin);
      }

      await setItemInAsyncStorage("store_id", store.id);
      const storeImagePath = storeImage
        ? await uploadImageInS3(storeImage)
        : null;
      const createStoreImageInput = {
        storeId: store.id,
        imagePath: storeImagePath,
      };

      if (storeImage != null) {
        await API.graphql({
          query: mutations.createStoreImage,
          variables: { input: createStoreImageInput },
        }).then((resp) => resp.data.createUserImage);
      }
      dispatch(showLoading(false));
    } catch (error) {
      dispatch(showLoading(false));
      crashlytics().recordError(error);
      dispatch(
        showAlertToast({
          alertMessage: error?.message || AlertMessage.SOMETHING_WENT_WRONG,
          actionButtonTitle: "OK",
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchStoreCategories());
  }, []);

  useEffect(() => {
    if (toggleShow) {
      minimumOrder?.current?.focus();
    }
  }, [toggleShow]);

  return (
    <View style={styles.registerStoreInfoView}>
      <Header
        headerTitle="Register As Merchant"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.scrollView}>
        <Stepper />
        <View style={styles.inputBoxContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            Store Image
          </Text>
          <TouchableOpacity onPress={chooseImage} style={styles.setStoreImage}>
            <FastImage
              style={styles.imgPicker}
              source={{ uri: storeImage ? storeImage : placeHolder }}
            />
          </TouchableOpacity>
          {checkStoreImage() && (
            <HelperText
              style={styles.imageHelperText}
              type="error"
              visible={checkStoreImage()}
            >
              Store Image Is Mandatory
            </HelperText>
          )}
        </View>
        <View style={styles.inputBoxContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            Store Details
          </Text>
          <View style={styles.inputContainer}>
            <InputText
              label="First Name(Required)"
              mode="flat"
              style={styles.input}
              maxLength={25}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, firstName: value });
              }}
              value={storeInfo?.firstName}
              position={<TextInput.Icon name={user_image} />}
            />

            <InputText
              label="Last Name(Required)"
              mode="flat"
              style={styles.input}
              maxLength={25}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, lastName: value });
              }}
              value={storeInfo?.lastName}
              position={<TextInput.Icon name={user_image} />}
            />
            <InputText
              label="Phone Number(Required)"
              mode="flat"
              style={styles.input}
              name="Name"
              maxLength={10}
              keyboardType="numeric"
              error={true}
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, number: value });
              }}
              value={storeInfo?.number}
              position={<TextInput.Icon name={call} />}
            />
            {isValidNumber() && (
              <HelperText type="error" visible={isValidNumber()}>
                Phone No. is Mandatory
              </HelperText>
            )}
            <InputText
              label="Email Id(Optional)"
              mode="flat"
              style={styles.input}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, email: value });
              }}
              value={storeInfo?.email}
              position={<TextInput.Icon name={mail} />}
            />

            <InputText
              label="Store Name(Required)"
              mode="flat"
              style={styles.input}
              maxLength={25}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, storeName: value });
              }}
              value={storeInfo?.storeName}
              position={<TextInput.Icon name={store} />}
            />
            <InputText
              label="Govt License/Shop Est Act(Required)"
              mode="flat"
              style={styles.input}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, govtLicense: value });
              }}
              value={storeInfo?.govtLicense}
              position={<TextInput.Icon name={govt} />}
            />
            <InputText
              label="GSTIN No(Required)"
              mode="flat"
              style={styles.input}
              name="Name"
              maxLength={15}
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, gstNo: value });
              }}
              value={storeInfo?.gstNo}
              position={<TextInput.Icon name={gst} />}
            />
            {handleGst() && (
              <HelperText type="error" visible={handleGst()}>
                Invalid GST No for ex : 18AABCU9603R1ZM
              </HelperText>
            )}
            <View>
              <Image source={category} style={styles.dropDownImg} />
              <Picker
                style={styles.picker}
                selectedValue={storeInfo?.category}
                dropdownIconColor="#808080"
                onValueChange={(itemValue) => {
                  setStoreInfo({
                    ...storeInfo,
                    category: itemValue,
                  });
                }}
              >
                <Picker.Item
                  color="gray"
                  label="Select Store Category"
                  enabled={false}
                />
                {categories?.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.inputBoxContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            Store Address
          </Text>
          <View style={styles.inputContainer}>
            <InputText
              label="Store No(Required)"
              mode="flat"
              style={styles.input}
              name="Name"
              maxLength={25}
              keyboardType="numeric"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, storeNo: value });
              }}
              value={storeInfo?.storeNo}
              position={<TextInput.Icon name={user_store} />}
            />
            <InputText
              label="Area(Required)"
              mode="flat"
              style={styles.input}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, area: value });
              }}
              value={storeInfo?.area}
              position={<TextInput.Icon name={area} />}
            />
            <InputText
              label="Landmark(Required)"
              mode="flat"
              style={styles.input}
              maxLength={32}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, landMark: value });
              }}
              value={storeInfo?.landMark}
              position={<TextInput.Icon name={landMark} />}
            />
            <InputText
              label="City(Required)"
              mode="flat"
              style={styles.input}
              maxLength={30}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, city: value });
              }}
              value={storeInfo?.city}
              position={<TextInput.Icon name={city} />}
            />
            <InputText
              label="State(Required)"
              mode="flat"
              style={styles.input}
              maxLength={50}
              name="Name"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, state: value });
              }}
              value={storeInfo?.state}
              position={<TextInput.Icon name={city} />}
            />
            <InputText
              label="Pin Code(Required)"
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              name="Name"
              maxLength={6}
              keyboardType="numeric"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, pinCode: value });
              }}
              value={storeInfo?.pinCode}
              position={<TextInput.Icon name={userPinCode} />}
            />
            {isValidPinCode() && (
              <HelperText type="error" visible={isValidPinCode()}>
                Invalid Pin Code
              </HelperText>
            )}
          </View>
        </View>
        <View style={styles.inputBoxContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            Delivery details
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                height: scaledValue(110),
                flex: 1,
                alignContent: "space-around",
              },
            ]}
          >
            <InputText
              useRef={minimumOrder}
              label="Set minimum cost of delivery"
              editable={toggleShow}
              mode="flat"
              style={styles.input}
              name="Name"
              keyboardType="numeric"
              underlineColor="transparent"
              onChangeText={(value) => {
                setStoreInfo({ ...storeInfo, minAmount: value });
              }}
              value={storeInfo?.minAmount}
              position={<TextInput.Icon name={rupee} />}
            />
            <Switch
              style={
                Platform.OS === "ios"
                  ? {
                      alignContent: "flex-end",
                      left: scaledValue(500),
                      bottom: scaledValue(80),
                      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    }
                  : styles.toggle
              }
              trackColor={{ false: "#767577", true: "#F5672E" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setToggleShow(!toggleShow);
              }}
              value={toggleShow}
            />
          </View>
          {toggleShow && (
            <View>
              <Text allowFontScaling={false} style={styles.minOrderValueText}>
                If the minimum order value is not met.
              </Text>
              <View style={styles.deliveryChargesView}>
                <Text>Apply delivery charges:</Text>
                <View style={styles.pickerView}>
                  <Image source={rupee} style={styles.dropDownImg} />
                  <Picker
                    selectedValue={storeInfo?.deliveryCharges}
                    dropdownIconColor="#808080"
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setStoreInfo({
                        ...storeInfo,
                        deliveryCharges: itemValue,
                      })
                    }
                  >
                    <Picker.Item color="gray" enabled={false} />
                    <Picker.Item label="0" value="0" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="35" value="35" />
                    <Picker.Item label="40" value="40" />
                    <Picker.Item label="45" value="45" />
                    <Picker.Item label="50" value="50" />
                    <Picker.Item label="55" value="55" />
                    <Picker.Item label="60" value="60" />
                    <Picker.Item label="65" value="65" />
                    <Picker.Item label="70" value="70" />
                    <Picker.Item label="75" value="75" />
                    <Picker.Item label="80" value="80" />
                    <Picker.Item label="85" value="85" />
                    <Picker.Item label="90" value="90" />
                    <Picker.Item label="95" value="95" />
                    <Picker.Item label="100" value="100" />
                  </Picker>
                </View>
              </View>
            </View>
          )}
          <View style={styles.bottomButton}>
            <Button
              width={scaledValue(661.11)}
              height={scaledValue(106.05)}
              title="Next"
              borderRadius={scaledValue(8)}
              disableColor="#FBCC9C"
              disableBorderColor="#FBCC9C"
              backgroundColor="#F8993A"
              color="#FFFFFF"
              borderColor="#F8993A"
              fontSize={scaledValue(30)}
              fontFamily="Lato-Bold"
              disable={disableRegisterButton}
              onPress={submitStoreInfo}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterStoreInfo;
