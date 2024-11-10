/** @format */

import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = { newsList: NewsDataType[] };

const NewList = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <>
          {newsList.map((item, index) => (
            <Link href={`/news/${item.article_id}`} asChild key={index}>
              <TouchableOpacity>
                <View key={index} style={styles.itemContainer}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.itemImg}
                  />
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
              </TouchableOpacity>
            </Link>
          ))}
        </>
      )}
    </View>
  );
};

export default NewList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
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
});
