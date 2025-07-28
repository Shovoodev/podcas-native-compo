import React from "react";
import { Image, View } from "react-native";

const PlayList = () => {
  return (
    <View className=" flex-1 justify-center items-center">
      <Image
        className=" h-22 w-23"
        source={require("../assets/images/cube_prod.png")}
      />
    </View>
  );
};

export default PlayList;
