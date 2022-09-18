import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, SafeAreaView } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import Button from "../../components/Button";
import locationIcon from "../../../assets/images/locationIcon.png";
import MapView from "react-native-maps";
import mark from "../../../assets/images/location.png";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { getItemFromAsyncStorage } from "../../utils/storage.utils";
import { geocodeLatLng } from "../../utils/common.utils";

const MapScreen = (props) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const loadAddress = async (lat, long) => {
    const addressResp = await geocodeLatLng(lat, long);
    setAddress(addressResp);
  };

  const setCurrentLocation = async () => {
    const lat = await getItemFromAsyncStorage("latitude");
    const long = await getItemFromAsyncStorage("longitude");
    setLocation({
      latitude: JSON.parse(lat) || props?.route?.params?.latitude || 12.9542946,
      longitude:
        JSON.parse(long) || props?.route?.params?.longitude || 77.4908535,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const createAddress = () => {
    const createAddressInput = {
      address: address?.address || "",
      location: address?.location || "",
      landmark: address?.landmark || "",
      city: address?.city,
      pincode: address?.pincode,
      latitude: address?.latitude,
      longitude: address?.longitude,
      state: address?.state,
    };
    navigation.navigate("RegisterStoreInfo", {
      createAddressInput: createAddressInput,
    });
  };

  useEffect(() => {
    loadAddress(location?.latitude, location?.longitude);
  }, [location]);

  useEffect(() => {
    setCurrentLocation();
  }, [props]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="#F78326" />

      <View style={styles.mapView}>
        <MapView
          initialRegion={location}
          onRegionChangeComplete={(location) => setLocation(location)}
          style={styles.map}
        ></MapView>
        <Image source={mark} style={styles.marker} />
      </View>

      <View style={styles.bottomView}>
        <Text allowFontScaling={false} style={styles.deliveryText}>
          SELECT DELIVERY LOCATION
        </Text>
        <View style={styles.areaDetailsMainView}>
          <View style={styles.areaDetails}>
            <Image source={locationIcon} style={styles.locationImage} />
            <Text allowFontScaling={false} style={styles.areaText}>
              {address?.location || address?.city || address?.landmark}
            </Text>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.address} numberOfLines={2}>
          {`${address?.address ? address?.address : ""} ${
            address?.location ? address?.location : ""
          } ${address?.landmark ? address?.landmark : ""} ${
            address?.city ? address?.city : ""
          } ${address?.state ? address?.state : ""} ${
            address?.pincode ? address?.pincode : ""
          }`}
        </Text>
        <Button
          width={scaledValue(653.21)}
          height={scaledValue(118.53)}
          title="Confirm Location"
          backgroundColor="#F8993A"
          borderColor="#F8993A"
          color="#FFFFFF"
          borderRadius={scaledValue(24)}
          fSize={scaledValue(33)}
          fontFamily="Lato-Bold"
          onPress={createAddress}
        />
      </View>
    </SafeAreaView>
  );
};
export default MapScreen;
