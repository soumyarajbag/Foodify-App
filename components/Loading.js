import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const Loading = (props) => {
  return (
    <View className="flex-1 flex justify-center items-center ">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
