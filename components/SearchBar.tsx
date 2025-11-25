import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder,
  value,
  onPress,
  onChangeText,
  onSubmit,
  editable = true,
  autoFocus = false,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
      <TextInput
        onSubmitEditing={onSubmit}
        onPressIn={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        editable={editable}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default SearchBar;
