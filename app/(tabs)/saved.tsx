/** @format */

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const Page = (props: Props) => {
  const [bookedmarkNews, setBookmarkedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true);
      console.log("token", token);
      if (res) {
        console.log("bookmark res", res);
        let query_string = res.join(",");
        console.log("query string ", query_string);

        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
        );
        setBookmarkedNews(response.data.results);
        setIsLoading(false);
      } else {
        setBookmarkedNews([]);
        setIsLoading(false);
      }
    });
  };

  const NewsItem = ({ item }: { item: NewsDataType }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image_url }} style={styles.itemImg} />
        <View style={styles.itemInfo}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.sourceinfo}>
            <Image
              source={{ uri: item.source_icon }}
              style={styles.sourceIcon}
            />
            <Text style={styles.sourceName}>{item.source_name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            data={bookedmarkNews}
            renderItem={({ item, index }) => {
              return (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  sourceinfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  sourceIcon: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  sourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
});
