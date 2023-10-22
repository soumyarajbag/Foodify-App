import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "react-native";
import {
  BellIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { TextInput } from "react-native";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecipes = async (category) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  };
  useEffect(() => {
    getCategories();
    getRecipes(activeCategory);
  }, []);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
        className="space-y-6 pt-10"
      >
        <View className="mx-4 flex-row justify-between items-center mb-0">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-1 mb-2">
          <Text style={{ fontSize: hp(3) }} className="text-neutral-600">
            Hello , Soumyaraj !
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(2.8) }}
              className="font-semibold text-neutral-600"
            >
              Choose Your Food !
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(2.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at{" "}
            <Text style={{ fontSize: hp(3) }} className="text-amber-400">
              Home
            </Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search Any Recipe !"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            className="flex-1 mb-1 pl-3  tracking-wider text-base"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={5} />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
