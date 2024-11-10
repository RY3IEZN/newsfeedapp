/** @format */

import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {/* about */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        {/* feedback */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        {/* privacy policy */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policy</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        {/* darkmode */}
        <TouchableOpacity style={[styles.itemBtn, { alignItems: "center" }]}>
          <Text style={styles.itemBtnText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#3e3e3e" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            value={isEnabled}
            onValueChange={toggleSwitch}
          />
        </TouchableOpacity>
        {/* logout */}
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnText, { color: "red" }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color={"red"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
});

export default Page;
