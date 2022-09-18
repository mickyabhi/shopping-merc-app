import axios from "axios";
import moment from "moment";
import { customAlphabet } from "nanoid/non-secure";
import { Auth } from "aws-amplify";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isEmptyString = (str) => {
  return str == null || str.toString().trim() === "";
};

export const isIFSC = (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);

export const isNumeric = (value) => /^[0-9]*$/.test(value);

export const isEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const gstCheck = (gst) => {
  return /[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/.test(
    gst
  );
};

export const calculateRating = (rating) => {
  return rating?.reduce((partialSum, a) => partialSum + a, 0) / rating?.length;
};

export const formatDateString = (dateString) => {
  let date = new Date();
  if (dateString != null) date = new Date(dateString);
  return moment(date).format("DD-MM-YYYY");
};

export const getShortId = (size = 12) => {
  const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ", size);
  return nanoid();
};

var upiIdRegex = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}/;

export const isUpiIdValid = (value) => upiIdRegex.test(value);

export const signOutUser = async (clearStorage = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth()
        .signOut()
        .catch((err) => console.log("auth().signOut().err", err));
      await Auth.signOut().catch((err) =>
        console.log("Auth().signOut().err", err)
      );
      if (clearStorage) {
        await AsyncStorage.clear();
      }
    } catch (error) {
      reject(error);
    }
    resolve("Success");
  });
};

export const loadAmplifyAuth = async () => {
  await Auth.currentAuthenticatedUser()
    .then((res) =>
      console.log("loadAmplifyAuth.currentAuthenticatedUser.res", res)
    )
    .catch((err) =>
      console.log("loadAmplifyAuth.currentAuthenticatedUser.err:", err)
    );
  await Auth.currentCredentials()
    .then((res) => console.log("loadAmplifyAuth.currentCredentials.res", res))
    .catch((err) =>
      console.log("loadAmplifyAuth.currentCredentials.err:", err)
    );
  await Auth.currentSession()
    .then((res) => console.log("loadAmplifyAuth.currentSession.res", res))
    .catch((err) => console.log("loadAmplifyAuth.currentSession.err:", err));
  await Auth.currentUserInfo()
    .then((res) => console.log("loadAmplifyAuth.currentUserInfo.res", res))
    .catch((err) =>
      console.log("loadAmplifyAuth.currentUserInfo.err:", err.error)
    );
  return Auth.currentUserPoolUser()
    .then((res) => console.log("loadAmplifyAuth.currentUserPoolUser.res", res))
    .catch((err) =>
      console.log("loadAmplifyAuth.currentUserPoolUser.err:", err)
    );
};

export const geocodeLatLng = async (lat, long) => {
  const apiKey = "AIzaSyDewabbTSyGCcdgfWiskDDqtpQJ7qy5I98";
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;

  console.log("geocodeLatLng.apiUrl", apiUrl);

  const geocodeLatLngResp = await axios
    .get(apiUrl)
    .then((resp) => resp?.data)
    .catch((error) => console.log("resp.Address.error", error));

  console.log("geocodeLatLngResp", geocodeLatLngResp);

  const addressResp = {
    city: null,
    state: null,
    address: null,
    pincode: null,
    location: null,
    landmark: null,
    latitude: lat,
    longitude: long,
  };

  geocodeLatLngResp?.results?.forEach((address) => {
    const address_components = address.address_components;
    address_components.forEach((address_component) => {
      if (
        address_component.types.includes("locality") &&
        addressResp.city == null
      ) {
        addressResp.city = address_component.long_name;
      }

      if (
        address_component.types.includes("premise") &&
        addressResp.address == null
      ) {
        addressResp.address = address.formatted_address;
      }

      if (
        address_component.types.includes("neighborhood") &&
        addressResp.landmark == null
      ) {
        addressResp.landmark = address_component.long_name;
      }

      if (
        address_component.types.includes("sublocality") &&
        address_component.types.includes("sublocality_level_1") &&
        addressResp.location == null
      ) {
        addressResp.location = address_component.long_name;
      }

      if (
        address_component.types.includes("postal_code") &&
        addressResp.pincode == null
      ) {
        addressResp.pincode = address_component.long_name;
      }

      if (
        address_component.types.includes("administrative_area_level_1") &&
        addressResp.state == null
      ) {
        addressResp.state = address_component.long_name;
      }
    });

    // console.log('address', address);
  });

  return addressResp;
};

export const weekIndex = (index) => {
  if (index == -1) {
    return 6;
  } else if (index == -2) {
    return 5;
  } else if (index == -3) {
    return 4;
  } else if (index == -4) {
    return 3;
  } else if (index == -5) {
    return 2;
  } else if (index == -6) {
    return 1;
  } else if (index == -7) {
    return 0;
  } else {
    return index;
  }
};
