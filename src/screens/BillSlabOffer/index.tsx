import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import OfferSelector from "../../components/OfferSelector";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import { Checkbox, Divider } from "react-native-paper";
import TermAndConditionModal from "./Components/TermAndConditionModal";
import DropDownWithLabel from "../../components/DropDownWithLabel";
import DateAndTimeInput from "../../components/DateAndTimeInput";
const BillSlabOffer = (props) => {
  const offerInDays = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
  ];
  const offerQty = [
    { label: "2", value: 2 },
    { label: "4", value: 4 },
    { label: "10", value: 10 },
  ];
  const offCost = [
    { label: "500", value: 500 },
    { label: "999", value: 999 },
    { label: "1999", value: 1999 },
  ];
  const offRs = [
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "500", value: 500 },
  ];
  const discount = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
  ];
  const offerMenu = [
    {
      label: "Chicken",
      value: "Chicken",
    },
    {
      label: "Tumeric",
      value: "Tumeric",
    },
    {
      label: "Red Chilli",
      value: "Red Chilli",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [checkDateTime, setCheckDateTime] = useState("");
  const [startOfferColon, setStartOfferColon] = useState("");
  const [endOfferColon, setEndOfferColon] = useState("");
  const [offerDuration, setOfferDuration] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  const [offer, setOffer] = useState({
    qty: "",
    menu: "",
    cost: "",
    amountOff: "",
    freeItem: "",
    discount: "",
    daysNotShopped: "",
    inDays: "",
    timesShopped: "",
    shoppedForRs: "",
    scratchCard: "",
  });

  const getDate = (date) => {
    if (checkDateTime == "start") {
      setOfferDuration({
        ...offerDuration,
        startDate: date?.toLocaleDateString(),
      });
    } else {
      setOfferDuration({
        ...offerDuration,
        endDate: date?.toLocaleDateString(),
      });
    }
    hideDatePicker();
  };
  const getTime = (time) => {
    if (checkDateTime == "end") {
      setOfferDuration({
        ...offerDuration,
        endTime: time?.toLocaleTimeString(),
      });
      setEndOfferColon(";");
    } else {
      setOfferDuration({
        ...offerDuration,
        startTime: time?.toLocaleTimeString(),
      });
      setStartOfferColon(";");
    }
    hideTimePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };
  const [checkedNumber, setCheckedNumber] = useState("");

  return (
    <View style={styles.container}>
      <Header
        headerTitle={props.route.params.headerTitle}
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.route.params.headerTitle === "Bill slab offer" && (
          <View>
            <View style={styles.dateTimePickerMainView}>
              <DateAndTimeInput
                label="Start Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("start");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("start");
                }}
                value={
                  offerDuration?.startDate +
                  startOfferColon +
                  offerDuration?.startTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
              <DateAndTimeInput
                label="End Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("end");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("end");
                }}
                value={
                  offerDuration?.endDate +
                  endOfferColon +
                  offerDuration?.endTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
            </View>
            <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below." />
            <View style={styles.billSlabOfferDropDownView}>
              <DropDownWithLabel
                label="Buy for Rs."
                selectedValue={offer?.cost}
                width={scaledValue(250)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                borderRadius={scaledValue(5)}
                disable={offer?.cost === "" ? true : false}
                arr={offCost}
                onValueChange={(itemValue) =>
                  setOffer({ ...offer, cost: itemValue })
                }
              />
            </View>
            <Divider style={styles.dividerLine} />
            <OfferSelector
              checkedNumber={checkedNumber}
              offRs={offRs}
              discount={discount}
              offer={offer}
              setOffer={setOffer}
              offerInput={(offer) => setOffer({ ...offer, freeItem: offer })}
              setCheckedNumber={setCheckedNumber}
              headerTitle={props.route.params.headerTitle}
            />
            <Divider style={styles.dividerLine} />

            <View style={styles.bottomView}>
              {checkedNumber === "first" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy for Rs. {offer?.cost} & get Rs. {offer.amountOff} off.
                </Text>
              )}
              {checkedNumber === "second" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy for Rs. {offer?.cost} & get {offer.freeItem} free.
                </Text>
              )}
              {checkedNumber === "third" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy for Rs. {offer?.cost} & get {offer.discount}% discount.
                </Text>
              )}

              {checkedNumber != "second" && checkedNumber != "third" && (
                <View style={styles.termConditionView}>
                  <Checkbox
                    color="#F78326"
                    status={checked ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    I have read and agree to the{" "}
                    <Text
                      onPress={() => setShowModal(true)}
                      style={styles.termsConditionText}
                    >
                      terms and conditions
                    </Text>
                  </Text>
                </View>
              )}
              <View style={styles.bottomTab}>
                <Button
                  title="Save offer"
                  disableColor="#A3A3A3"
                  disableBorderColor="#A3A3A3"
                  width={scaledValue(663.15)}
                  height={scaledValue(85.94)}
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  color="#FFFFFF"
                  disable={
                    checkedNumber === "first" && checked
                      ? false
                      : checkedNumber === "second"
                      ? false
                      : checkedNumber === "third"
                      ? false
                      : true
                  }
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(30)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.navigation.navigate("BillSlabCard", {
                      offerDuration: offerDuration,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {props.route.params.headerTitle === "Product offer" && (
          <View>
            <View style={styles.dateTimePickerMainView}>
              <DateAndTimeInput
                label="Start Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("start");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("start");
                }}
                value={
                  offerDuration?.startDate +
                  startOfferColon +
                  offerDuration?.startTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
              <DateAndTimeInput
                label="End Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("end");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("end");
                }}
                value={
                  offerDuration?.endDate +
                  endOfferColon +
                  offerDuration?.endTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
            </View>
            <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below." />
            <View style={styles.productOfferDropDownView}>
              <DropDownWithLabel
                label="Buy"
                selectedValue={offer?.qty}
                width={scaledValue(190.63)}
                height={scaledValue(61.57)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                borderRadius={scaledValue(5)}
                disable={offer?.qty === "" ? true : false}
                arr={offerQty}
                onValueChange={(itemValue) =>
                  setOffer({ ...offer, qty: itemValue })
                }
              />
              <DropDownWithLabel
                label="Kg"
                selectedValue={offer?.menu}
                width={scaledValue(320.47)}
                height={scaledValue(61.57)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                borderRadius={scaledValue(5)}
                disable={offer?.menu === "" ? true : false}
                arr={offerMenu}
                onValueChange={(itemValue) =>
                  setOffer({ ...offer, menu: itemValue })
                }
              />
            </View>
            <Divider style={styles.dividerLine} />
            <OfferSelector
              checkedNumber={checkedNumber}
              offRs={offRs}
              discount={discount}
              offer={offer}
              setOffer={setOffer}
              offerInput={(offer) => setOffer({ ...offer, freeItem: offer })}
              setCheckedNumber={setCheckedNumber}
              headerTitle={props.route.params.headerTitle}
            />
            <Divider style={styles.dividerLine} />
            <View style={styles.bottomView}>
              {checkedNumber === "first" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy {offer?.qty} Kg {offer?.menu} & get Rs. {offer.amountOff}{" "}
                  off.
                </Text>
              )}
              {checkedNumber === "second" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy {offer?.qty} Kg {offer?.menu} & get {offer.freeItem} free.
                </Text>
              )}
              {checkedNumber === "third" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Buy {offer?.qty} Kg {offer?.menu} & get {offer.discount} %
                  discount.
                </Text>
              )}
              <View style={styles.bottomTab}>
                <Button
                  title="Save offer"
                  width={scaledValue(663.15)}
                  height={scaledValue(85.94)}
                  disableColor="#CACACA"
                  disableBorderColor="#CACACA"
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  color="#FFFFFF"
                  disable={checkedNumber ? false : true}
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(30)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.navigation.navigate("BillSlabCard", {
                      offerDuration: offerDuration,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {props.route.params.headerTitle === "Recency customer offer" && (
          <View>
            <View style={styles.dateTimePickerMainView}>
              <DateAndTimeInput
                label="Start Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("start");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("start");
                }}
                value={
                  offerDuration?.startDate +
                  startOfferColon +
                  offerDuration?.startTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
              <DateAndTimeInput
                label="End Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("end");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("end");
                }}
                value={
                  offerDuration?.endDate +
                  endOfferColon +
                  offerDuration?.endTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
            </View>
            <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below." />
            <View style={styles.billSlabOfferDropDownView}>
              <InputTextWithLabel
                keyboardType="numeric"
                subLabel="days not shopped"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.5"
                disable={offer?.daysNotShopped !== "" ? false : true}
                onChangeText={(item) =>
                  setOffer({ ...offer, daysNotShopped: item })
                }
              />
              <Divider style={styles.dividerLine} />
              <InputTextWithLabel
                label="Shop for Rs.   "
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.5"
                disable={offer?.cost !== "" ? false : true}
                onChangeText={(item) => setOffer({ ...offer, cost: item })}
              />
            </View>
            <Divider style={styles.dividerLine} />
            <OfferSelector
              checkedNumber={checkedNumber}
              offRs={offRs}
              discount={discount}
              offer={offer}
              setOffer={setOffer}
              offerInput={(offer) => setOffer({ ...offer, freeItem: offer })}
              setCheckedNumber={setCheckedNumber}
              headerTitle={props.route.params.headerTitle}
            />
            <Divider style={styles.dividerLine} />
            <View style={styles.bottomView}>
              {checkedNumber === "first" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs.{offer?.cost} & get Rs. {offer.amountOff} off.
                </Text>
              )}
              {checkedNumber === "second" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.freeItem} free.
                </Text>
              )}
              {checkedNumber === "third" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.discount} % discount.
                </Text>
              )}
              <View style={styles.bottomTab}>
                <Button
                  title="Save offer"
                  width={scaledValue(663.15)}
                  height={scaledValue(85.94)}
                  disableColor="#CACACA"
                  disableBorderColor="#CACACA"
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  color="#FFFFFF"
                  disable={checkedNumber ? false : true}
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(30)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.navigation.navigate("BillSlabCard", {
                      offerDuration: offerDuration,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {props.route.params.headerTitle === "Frequency customers" && (
          <View>
            <View style={styles.dateTimePickerMainView}>
              <DateAndTimeInput
                label="Start Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("start");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("start");
                }}
                value={
                  offerDuration?.startDate +
                  startOfferColon +
                  offerDuration?.startTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
              <DateAndTimeInput
                label="End Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("end");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("end");
                }}
                value={
                  offerDuration?.endDate +
                  endOfferColon +
                  offerDuration?.endTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
            </View>
            <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below." />
            <View style={styles.frequencyCustomersDropdownView}>
              <InputTextWithLabel
                subLabel="times shopped in"
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.5"
                disable={offer?.timesShopped !== "" ? false : true}
                onChangeText={(item) =>
                  setOffer({ ...offer, timesShopped: item })
                }
              />
              <InputTextWithLabel
                subLabel="days."
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.20"
                disable={offer?.inDays !== "" ? false : true}
                onChangeText={(item) => setOffer({ ...offer, inDays: item })}
              />
            </View>
            <Divider style={styles.dividerLine} />
            <View style={styles.frequencyCustomersInputTextView}>
              <InputTextWithLabel
                label="Shop for Rs.  "
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.20"
                disable={offer?.cost !== "" ? false : true}
                onChangeText={(item) => setOffer({ ...offer, cost: item })}
              />
            </View>
            <Divider style={styles.dividerLine} />
            <OfferSelector
              checkedNumber={checkedNumber}
              offRs={offRs}
              discount={discount}
              offer={offer}
              setOffer={setOffer}
              offerInput={(offer) => setOffer({ ...offer, freeItem: offer })}
              setCheckedNumber={setCheckedNumber}
              headerTitle={props.route.params.headerTitle}
            />
            <Divider style={styles.dividerLine} />
            <View style={styles.bottomView}>
              {checkedNumber === "first" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs.{offer?.cost} & get Rs. {offer.amountOff} off.
                </Text>
              )}
              {checkedNumber === "second" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.freeItem} free.
                </Text>
              )}
              {checkedNumber === "third" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.discount} % discount.
                </Text>
              )}
              <View style={styles.bottomTab}>
                <Button
                  title="Save offer"
                  width={scaledValue(663.15)}
                  height={scaledValue(85.94)}
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  disableColor="#CACACA"
                  disableBorderColor="#CACACA"
                  color="#FFFFFF"
                  disable={checkedNumber ? false : true}
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(30)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.navigation.navigate("BillSlabCard", {
                      offerDuration: offerDuration,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {props.route.params.headerTitle === "Monetary customers" && (
          <View>
            <View style={styles.dateTimePickerMainView}>
              <DateAndTimeInput
                label="Start Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("start");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("start");
                }}
                value={
                  offerDuration?.startDate +
                  startOfferColon +
                  offerDuration?.startTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
              <DateAndTimeInput
                label="End Date & Time"
                showDatePicker={() => {
                  setDatePickerVisible(true);
                  setCheckDateTime("end");
                }}
                showTimePicker={() => {
                  setTimePickerVisible(true);
                  setCheckDateTime("end");
                }}
                value={
                  offerDuration?.endDate +
                  endOfferColon +
                  offerDuration?.endTime
                }
                width={scaledValue(333)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(24)}
                fontFamily="Lato-Regular"
                color="#000000"
              />
            </View>
            <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below." />
            <View style={styles.frequencyCustomersDropdownView}>
              <InputTextWithLabel
                label="Shopped for Rs.   "
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.1000"
                disable={offer?.shoppedForRs !== "" ? false : true}
                onChangeText={(item) =>
                  setOffer({ ...offer, shoppedForRs: item })
                }
              />
              <DropDownWithLabel
                label="in"
                subLabel="days"
                selectedValue={offer?.inDays}
                width={scaledValue(190.63)}
                height={scaledValue(62)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                borderRadius={scaledValue(5)}
                disable={offer?.inDays === "" ? true : false}
                arr={offerInDays}
                onValueChange={(itemValue) =>
                  setOffer({ ...offer, inDays: itemValue })
                }
              />
            </View>
            <Divider style={styles.dividerLine} />
            <View style={styles.frequencyCustomersInputTextView}>
              <InputTextWithLabel
                label="Shop for Rs.  "
                keyboardType="numeric"
                width={scaledValue(137.63)}
                height={scaledValue(63)}
                disableBorderColor="#707070"
                borderColor="#F8993A"
                borderRadius={scaledValue(5)}
                disableBorderWidth={scaledValue(1)}
                borderWidth={scaledValue(2)}
                fontSize={scaledValue(26)}
                fontFamily="Lato-Regular"
                alignItems="center"
                placeholder="eg.20"
                disable={offer?.cost !== "" ? false : true}
                onChangeText={(item) => setOffer({ ...offer, cost: item })}
              />
            </View>
            <Divider style={styles.dividerLine} />
            <OfferSelector
              checkedNumber={checkedNumber}
              offRs={offRs}
              discount={discount}
              offer={offer}
              setOffer={setOffer}
              offerInput={(offer) => setOffer({ ...offer, freeItem: offer })}
              setCheckedNumber={setCheckedNumber}
              headerTitle={props.route.params.headerTitle}
            />
            <Divider style={styles.dividerLine} />
            <View style={styles.bottomView}>
              {checkedNumber === "first" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs.{offer?.cost} & get Rs. {offer.amountOff} off.
                </Text>
              )}
              {checkedNumber === "second" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.freeItem} free.
                </Text>
              )}
              {checkedNumber === "third" && (
                <Text allowFontScaling={false} style={styles.text}>
                  Shop for Rs. {offer?.cost} & get {offer.discount} % discount.
                </Text>
              )}
              <View style={styles.bottomTab}>
                <Button
                  title="Save offer"
                  width={scaledValue(663.15)}
                  height={scaledValue(85.94)}
                  disableColor="#CACACA"
                  disableBorderColor="#CACACA"
                  backgroundColor="#F8993A"
                  borderColor="#F8993A"
                  color="#FFFFFF"
                  disable={checkedNumber ? false : true}
                  borderRadius={scaledValue(8)}
                  fontSize={scaledValue(30)}
                  fontFamily="Lato-Medium"
                  onPress={() => {
                    props.navigation.navigate("BillSlabCard", {
                      offerDuration: offerDuration,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <TermAndConditionModal
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={getDate}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={getTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  dateTimePickerMainView: {
    paddingLeft: scaledValue(45.42),
    marginBottom: scaledValue(41.83),
  },
  billSlabOfferDropDownView: {
    paddingLeft: scaledValue(48.29),
  },
  productOfferDropDownView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  frequencyCustomersDropdownView: {
    flexDirection: "row",
    paddingLeft: scaledValue(50.81),
  },
  frequencyCustomersInputTextView: {
    paddingLeft: scaledValue(51.81),
  },
  line: {
    borderColor: "#ECECEC",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
  radioButton: {
    top: scaledValue(50),
    left: scaledValue(50),
  },
  selectContainer: {
    flexDirection: "row",
  },
  bottomView: {
    paddingLeft: scaledValue(42.44),
  },
  text: {
    color: "#30740A",
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(26),
    marginTop: scaledValue(53.3),
  },
  productOfferBottomText: {
    color: "#30740A",
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(26),
    marginTop: scaledValue(53.3),
    marginBottom: scaledValue(40),
  },
  recencyCustomerOfferBottomText: {
    color: "#30740A",
    fontFamily: "Lato-Medium",
    fontSize: scaledValue(26),
    marginTop: scaledValue(53.3),
    marginBottom: scaledValue(40),
  },
  FrequencyCustomerBottomText: {},
  termConditionView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaledValue(49.91),
  },
  bottomText: {
    color: "#000000",
    fontFamily: "Lato-Regular",
    fontSize: scaledValue(26),
  },
  termsConditionText: {
    color: "#F8993A",
    fontFamily: "Lato-Semibold",
    fontSize: scaledValue(26),
    textDecorationLine: "underline",
  },
  dividerLine: {
    marginTop: scaledValue(39.69),
  },
  bottomTab: {
    marginBottom: scaledValue(49.06),
    marginTop: scaledValue(36),
  },
});

export default BillSlabOffer;
