/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const NewList = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>NewList</Text>
    </View>
  );
};

export default NewList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
