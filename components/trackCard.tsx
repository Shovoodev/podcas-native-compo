import React from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TrackData from "~/assets/dummy/trackdata";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { TrackType } from "~/common/types";

const TrackCard = ({
  title,
  description,
  image,
  episode,
  duration,
  scriptLink,
}: TrackType) => {
  const router = useRouter();
  return (
    <Card className="flex-row items-center  space-x-4 gap-3 mb-2 rounded-xl shadow p-2">
      <Image
        className=" mr-2"
        source={{ uri: image }}
        style={{ height: 90, width: 90, borderRadius: 10 }}
      />
      <View className="flex-1">
        <CardTitle className=" text-2xl">{title}</CardTitle>
        <CardDescription numberOfLines={1}>{description}</CardDescription>
        <View className=" flex-row">
          <Text className="text-white text-sm mt-1 items-center ">
            {episode}
            <Entypo name="dot-single" size={20} color="white" />
          </Text>

          <Text className="text-white text-sm mt-1 ">Duration: {duration}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.push(scriptLink);
          }}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const TrackList = () => {
  return (
    <ScrollView className="p-4">
      {TrackData.map((item, index) => (
        <TrackCard
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          episode={item.episode}
          duration={item.duration}
          scriptLink={item.scriptLink}
        />
      ))}
    </ScrollView>
  );
};

export default TrackList;
