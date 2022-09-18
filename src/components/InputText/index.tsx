import React from "react";
import { TextInput } from "react-native-paper";
import { scaledValue } from "../../utils/design.utils";

const InputText = (props) => {
  return (
    <TextInput
      ref={props.useRef}
      editable={props.editable}
      label={props.label}
      autoCapitalize="characters"
      secureTextEntry={props.secureTextEntry}
      style={props.style}
      value={props.value}
      contextMenuHidden={props.contextMenuHidden}
      mode={props.mode}
      onChangeText={props.onChangeText}
      underlineColor={props.underlineColor}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      outlineColor={props.outlineColor ? props.outlineColor : "#0000004D"}
      theme={{
        roundness: scaledValue(24),
        colors: { primary: "#F8993AC7" },
      }}
      left={props.position}
      right={props.rightPosition}
    />
  );
};

export default InputText;
