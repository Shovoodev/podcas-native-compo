import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type TrackType = {
  title: string;
  description: string;
  image: string;
  duration: number;
};
const albumData = [
  {
    title: "Echoes of Silence",
    description:
      "A moody collection of ambient soundscapes and haunting melodies.",
    image: "https://picsum.photos/seed/album1/400/400",
    duration: 45,
  },
  {
    title: "Sunset Drive",
    description: "Chill electronic beats perfect for cruising at golden hour.",
    image: "https://picsum.photos/seed/album2/400/400",
    duration: 34,
  },
  {
    title: "Acoustic Dreams",
    description: "Soft acoustic guitar and piano tunes for peaceful moments.",
    image: "https://picsum.photos/seed/album3/400/400",
    duration: 33.0,
  },
];

const TrackCard = ({ title, description, image, duration }: TrackType) => {
  return (
    <Card className="flex-row items-center space-x-4 p-3 mb-3 rounded-xl shadow">
      <Image
        source={{ uri: image }}
        style={{ height: 60, width: 60, borderRadius: 10 }}
      />
      <View className="flex-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription numberOfLines={1}>{description}</CardDescription>
        <Text className="text-gray-500 text-sm mt-1 justify-end">
          Duration: {duration}
        </Text>
      </View>
    </Card>
  );
};

const TrackList = () => {
  return (
    <ScrollView className="p-4">
      {albumData.map((item, index) => (
        <TrackCard
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          duration={item.duration}
        />
      ))}
    </ScrollView>
  );
};

export default TrackList;
