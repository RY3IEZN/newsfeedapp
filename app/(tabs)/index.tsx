/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  // useEffect(() => {
  //   getBreakingNews();
  // }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=gb&language=en&image=1&removeduplicate=1`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error: any) {
      console.log("Error Message:", error.message);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      <BreakingNews newsList={breakingNews} />
      {/* {breakingNews.map((item, index) => (
        <Text>{item.title}</Text>
      ))} */}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
