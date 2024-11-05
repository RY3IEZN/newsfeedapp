/** @format */

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userIcon}
          source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>User</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userIcon: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
  },
});
