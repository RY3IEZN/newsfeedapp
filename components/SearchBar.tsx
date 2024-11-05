/** @format */

import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize="none"
          style={styles.searchText}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  searchbar: {
    backgroundColor: "#e4e4e4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
});
