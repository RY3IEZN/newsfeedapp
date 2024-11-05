/** @format */

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { SharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scollX }: Props) => {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <Text>{slideItem.title}</Text>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 100,
    borderRadius: 20,
  },
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
