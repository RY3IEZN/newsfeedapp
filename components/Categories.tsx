/** @format */

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

type Props = {
  onCategoryChange: (category: string) => void;
};

const Categories = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 2, y: 0, animated: true });
    });

    onCategoryChange(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleSelectCategory(index)}
            ref={(el) => (itemRef.current[index] = el)}
            key={index}
            style={[
              styles.item,
              activeIndex === index && styles.itemActiveStyle,
            ]}
          >
            <Text
              style={[
                styles.itemText,
                activeIndex === index && styles.itemActiveText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemActiveStyle: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemActiveText: {
    fontWeight: "600",
    color: Colors.white,
  },
  itemWrapper: {
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    letterSpacing: 0.5,
    fontSize: 14,
    color: Colors.darkGrey,
  },
});
