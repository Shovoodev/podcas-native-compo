import React, { useEffect, useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import TrackCard from "../trackCard";
import { Text } from "../ui/text";
import { Progress } from "../ui/progress";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useOFMapApi } from "~/common/mediaContext";
import { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";

const TitlePageContent = () => {
  const router = useRouter();
  const statusRef = useRef<AVPlaybackStatusSuccess | null>(null);

  const {
    progressPass,
    duration,
    sound,
    setSound,
    setIsPlaying,
    isPlaying,
    setDuration,
    progress,
    setProgress,
    timeLeft,
    setTimeLeft,
    setProgressPass,
    setPosition,
  } = useOFMapApi();
  const value = (progressPass / duration) * 100;

  // const handlePress = async () => {
  //   if (!sound) {
  //     const { sound: newSound } = await Audio.Sound.createAsync(
  //       require("../../assets/music/Shake.mp3"),
  //       { shouldPlay: true },
  //       onPlaybackStatusUpdate
  //     );
  //     setSound(newSound);
  //     setIsPlaying(true);
  //   } else {
  //     const status = await sound.getStatusAsync();

  //     if ("isPlaying" in status && status.isLoaded) {
  //       if (status.isPlaying && status.durationMillis) {
  //         await sound.pauseAsync();
  //         const val = status.positionMillis;
  //         const length = status.durationMillis;
  //         setIsPlaying(false);
  //         setProgressPass(val);
  //         setDuration(length);
  //       } else {
  //         await sound.playAsync();
  //         setIsPlaying(true);
  //       }
  //     } else {
  //       console.error("Playback error:", status);
  //     }
  //   }
  // };
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.durationMillis) {
      const percentage = (status.positionMillis / status.durationMillis) * 100;
      setProgress(percentage);
      statusRef.current = status;
      const positionchange = status.positionMillis;
      setPosition(positionchange);
      const durationchange = status.durationMillis;
      setTimeLeft(durationchange - positionchange);
    }
  };

  return (
    <View style={{ paddingTop: 50 }} className="flex h-screen">
      <View className=" flex-row  justify-between">
        <View className=" flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.replace("/")}>
            <View className=" flex-row gap-5">
              <AntDesign
                className=" ml-3"
                name="arrowleft"
                size={20}
                color="white"
              />
              <Text className=" text-2xl text-white  font-bold ">
                The Future of A1{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className=" flex-row gap-8 p-9">
          <TouchableOpacity
            onPress={() => {
              console.log("script");
              router.push("/script");
            }}
          >
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TrackCard />
      </View>
      <View className=" flex items-center justify-center border py-2 rounded-3xl mx-4 border-white p-1">
        <Text className=" font-semibold text-white text-xl">
          Create Next Episode
        </Text>
      </View>
      <View className=" flex-row justify-center items-center  bottom-24 absolute border py-2 rounded-xl border-gray-700 bg-neutral-600">
        <View className=" flex-row items-center mr-1 w-[70%] p-1 px-4 gap-2">
          <Image
            className=" rounded-xl"
            source={require("../../assets/images/cube_prod.png")}
            style={{ height: 60, width: 60 }}
          />
          <View className=" w-full">
            <Text className=" text-white text-xl font-bold">The art of ai</Text>
            <Progress value={value} />
          </View>
        </View>

        <View className=" items-center flex-row ">
          <View className=" flex-row gap-3 ">
            <TouchableOpacity className=" pt-4 bg-gray-700 rounded-full p-1">
              <Feather
                className=" px-3"
                name="rotate-ccw"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <View className="bg-violet-300 rounded-full  p-6">
              {/* <TouchableOpacity onPress={handlePress}> */}
              <TouchableOpacity>
                <FontAwesome name="pause" size={12} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TitlePageContent;
