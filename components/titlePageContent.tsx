import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import TrackCard from "./trackCard";

const TitlePageContent = () => {
  const router = useRouter();
  return (
    <View style={{ paddingTop: 50 }} className="flex h-screen">
      <View className=" flex-row  justify-between">
        <View className=" flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.replace("/")}>
            <AntDesign
              className=" ml-3"
              name="arrowleft"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View className=" flex-row gap-8 p-9">
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TrackCard />
      </View>
    </View>
  );
};

export default TitlePageContent;
