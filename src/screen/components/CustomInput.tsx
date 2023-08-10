import React from "react";
import { TextInput } from "react-native";
import { colors } from "../../constants/colors";
import { Shadow } from "react-native-shadow-2";

export default function CustomInput({
  setValue,
  value,
  width,
  placeholder,
  secureTextEntry,
  additionalStyles,
  onSubmitEditing,
  keyboardType,
  multiline,
}: {
  setValue: (value: string) => void;
  value: string | undefined;
  width: string;
  placeholder: string | undefined;
  secureTextEntry: boolean;
  additionalStyles?: string;
  onSubmitEditing?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
}) {
  return (
    <Shadow
      startColor={"rgba(88, 101, 242, 0.2)"}
      distance={3}
      style={{
        borderRadius: 30,
      }}
    >
      {!multiline ? (
        <TextInput
          className={`text-white ${width} font-roboto rounded-full bg-black/70 p-3 text-start h-10 ${additionalStyles}`}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.silver}
          onChangeText={(text) => setValue(text)}
          value={value}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          multiline={false}
        />
      ) : (
        <TextInput
          className={`text-white h-44 ${width} align-text-top font-roboto rounded-md bg-black/70 p-3 ${additionalStyles}`}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.silver}
          onChangeText={(text) => setValue(text)}
          value={value}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          multiline={true}
          selection={{ start: 0, end: 0 }}
          style={{ textAlignVertical: "top" }}
        />
      )}
    </Shadow>
  );
}
