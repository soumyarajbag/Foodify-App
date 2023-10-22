import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import { Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "react-native";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ categories, recipes }) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="text-neutral-600 font-semibold"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || recipes.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
};

export const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => {
          navigation.navigate("RecipeDetails", { ...item });
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            height: index % 3 == 0 ? hp(25) : hp(35),
            width: "100%",
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(2.1) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.lenght > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Recipes;
