import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import DropDownWithLabel from "../../components/DropDownWithLabel";
import InputTextWithLabel from "../../components/InputTextWithLabel";
import Header from "../../components/Header";
import { scaledValue } from "../../utils/design.utils";
import Heading from "../../components/Heading";
import OfferSelector from "../../components/OfferSelector";

const ProductOffer = (props) => {
  const [productOffer, setProductOffer] = useState({
    cost: "",
    offer: "",
    kg: "",
  });

  const menu = [
    {
      label: "Chicken masala 200gm",
      value: "Chicken masala 200gm",
    },
    {
      label: "Tumeric masala 200gm",
      value: "tumeric masala 200gm",
    },
    {
      label: "RedChilli masala 200gm",
      value: "redChilli masala 200gm",
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        headerTitle="Product Offer"
        goBack={() => {
          props.navigation.goBack();
        }}
      />
      <Heading data="Please fill in the condition(Buy for '...' and select any one of the offer below" />
      <View style={{ flexDirection: "row" }}>
        <InputTextWithLabel
          label="Buy "
          onChangeText={(itm) =>
            setProductOffer({ ...productOffer, cost: itm })
          }
          placeholder="eg.1"
        />
        <DropDownWithLabel
          label="kg"
          width={scaledValue(350)}
          arr={menu}
          onValueChange={(itemValue, itemIndex) =>
            setProductOffer({ ...productOffer, kg: itemValue })
          }
        />
      </View>
      <OfferSelector />
      {/* <View style={styles.line} />
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            onPress={() => setCheckedNumber('first')}
            status={checkedNumber === 'first' ? 'checked' : 'unchecked'}
          />
        </View>
        <DropDownWithLabel
          placeholder="eg 50"
          label="Get Rs "
          arr={offRs}
          subLabel=" off"
          // selectedValue={slabOffer?.offer}
          onValueChange={(itemValue, itemIndex) =>
            setProductOffer({...productOffer, offer: itemValue})
          }
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            onPress={() => setCheckedNumber('second')}
            status={checkedNumber === 'second' ? 'checked' : 'unchecked'}
          />
        </View>
        <DropDownWithLabel
          label="Get "
          // selectedValue={slabOffer?.offer}
          onValueChange={(itemValue, itemIndex) =>
            setProductOffer({...productOffer, offer: itemValue})
          }
          arr={offRs}
          subLabel=" free"
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            onPress={() => setCheckedNumber('third')}
            status={checkedNumber === 'third' ? 'checked' : 'unchecked'}
          />
        </View>
        <DropDownWithLabel
          // selectedValue={slabOffer?.offer}
          onValueChange={(itemValue, itemIndex) =>
            setProductOffer({...productOffer, offer: itemValue})
          }
          label="Get "
          arr={offRs}
          subLabel="% discount"
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            onPress={() => setCheckedNumber('fourth')}
            status={checkedNumber === 'fourth' ? 'checked' : 'unchecked'}
          />
        </View>
        <InputTextWithLabel
          label="Get Rs"
          placeholder="eg.50"
          subLabel="scratch card"
          onChangeText={itm => setProductOffer({...productOffer, offer: itm})}
        />
      </View> */}
      <View style={styles.line} />
      <Button
        title="Save offer"
        top={{ top: scaledValue(40) }}
        // onPress={() => {
        //   props.navigation.navigate('RegisterStoreInfo');
        // }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: scaledValue(50),
    width: "90%",
    marginLeft: scaledValue(30),
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  radioButton: {
    top: scaledValue(50),
    left: scaledValue(50),
  },
  selectContainer: {
    flexDirection: "row",
  },
});

export default ProductOffer;
