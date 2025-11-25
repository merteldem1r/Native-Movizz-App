import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Saved = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
        <Text className="text-white text-center mt-10 text-xl">Saved Movies</Text>
      </ScrollView>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});
