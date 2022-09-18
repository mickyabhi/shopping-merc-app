import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Stepper from "../../components/StepperUI";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import Button from "../../components/Button";
import mobile from "../../../assets/images/mobile.png";
import InputText from "../../components/InputText";
import { HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { isNumeric } from "../../utils/common.utils";

const Register = (props) => {
  const [number, setNumber] = useState("");
  const hasErrors = () => {
    return !isNumeric(number);
  };
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <Header
          headerTitle="Register As Merchant"
          goBack={() => {
            props.navigation.goBack();
          }}
        />
        <Stepper />
        <View style={styles.mainView}>
          <InputText
            label="Please enter your number"
            mode="outlined"
            style={styles.input}
            underlineColor="transparent"
            maxLength={10}
            name="Name"
            keyboardType="numeric"
            onChangeText={(value) => {
              setNumber(value);
            }}
            value={number}
            position={<TextInput.Icon name={mobile} />}
          />
        </View>
        <HelperText type="error" visible={hasErrors()}>
          Phone Number is invalid!
        </HelperText>
        <Button
          title="Next"
          top={{ top: scaledValue(40) }}
          disable={number.length !== 10 || !isNumeric(number)}
          onPress={() => {
            props.navigation.navigate("RegisterStoreInfo");
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: scaledValue(26),
    top: scaledValue(200),
    marginBottom: scaledValue(120),
    width: "90%",
    alignSelf: "center",
    textAlign: "left",
    justifyContent: "center",
    backgroundColor: "white",
  },
  label: {
    top: scaledValue(190),
    left: scaledValue(100),
    fontFamily: "Lato-Bold",
    fontSize: scaledValue(26),
  },
  mainView: {
    flexDirection: "column",
    bottom: scaledValue(90),
  },
});

export default Register;
