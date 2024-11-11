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
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { NewsDataType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const page = (props: Props) => {
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading2, setIsLoading2] = useState(false);

  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

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

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      setIsLoading2(true);
      let categoryString = "";
      let countryString = "";
      let queryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1${categoryString}&removeduplicate=1${countryString}${queryString}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading2(false);
      }
    } catch (error: any) {
      console.log("Error Message:", error.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading2 ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            data={news}
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

export default page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
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
