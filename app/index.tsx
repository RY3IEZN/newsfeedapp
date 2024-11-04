/** @format */

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { title } from "process";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={require("@/assets/images/getting-started.jpg")}
      >
        <View style={styles.welcomeScreenText}>
          <Animated.Text
            entering={FadeInRight.delay(300).duration(500)}
            style={styles.title}
          >
            Stay Updated
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.delay(700).duration(500)}
            style={styles.subtitle}
          >
            Get breaking news and personalized updates directly to our feed
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.homeBtnText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeScreenText: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
  },
  homeBtn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  homeBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
