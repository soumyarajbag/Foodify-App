import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { categoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const Categories = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1 gap-5"
            >
              <View className="rounded-full p-[6px]">
                <Image
                  source={{ uri: category.image }}
                  style={{ height: hp(6), width: hp(6) }}
                  className="rounded-full"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
