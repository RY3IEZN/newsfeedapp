/** @format */

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { NewsDataType } from "@/types";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(news[0].article_id);
    }
  }, [isLoading]);

  const getNews = async () => {
    try {
      setIsLoading(true);
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error Message:", error.message);
    }
  };

  const saveBookMark = async (newsId: string) => {
    setBookmarked(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value: string) => value === newsId);
        if (data !== null) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          Alert.alert("News saved");
        }
      } else {
        let bookmark = [];
        bookmark.push(newsId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        Alert.alert("News saved");
      }
    });
  };

  const removeBookMark = async (newsId: string) => {
    setBookmarked(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id: string) => id !== newsId);
    });
    console.log("removed!!!!");
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    Alert.alert("News Unsave");
  };

  const renderBookmark = async (newsId: string) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res != null) {
        let data = res.find((value: string) => value === newsId);
        return data == null ? setBookmarked(false) : setBookmarked(true);
      }
    });
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                bookmarked
                  ? removeBookMark(news[0].article_id)
                  : saveBookMark(news[0].article_id);
              }}
            >
              <Ionicons
                name={bookmarked ? "heart" : "heart-outline"}
                size={22}
                color={bookmarked ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : news.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfoText}>{news[0].pubDate}</Text>
            <Text style={styles.newsInfoText}>{news[0].source_name}</Text>
            <Text style={styles.newsInfoText}>{news[0].article_id}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImage} />
          {/* may God Bless with me a better Job, so that i can pay for Api credits and Advance api features */}
          {/* replace with a checker, if content exist display content or else display description */}
          {/* <Text style={styles.newsContent}>{news[0].content}</Text> */}
        </ScrollView>
      ) : (
        <View>
          <Text>Failed to load, Drag to refreah.</Text>
        </View>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  newsImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 10,
    color: Colors.black,
    letterSpacing: 0.6,
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
