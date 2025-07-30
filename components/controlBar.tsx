import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Popover from "react-native-popover-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Progress } from "./ui/progress";
import { useOFMapApi } from "~/common/mediaContext";
import formatMillis from "~/common/Foramtions";

import { useRouter } from "expo-router";

const ControlBar = () => {
  const router = useRouter();
  const [speed, setSpeed] = useState<any>(1);
  const statusRef = useRef<AVPlaybackStatusSuccess | null>(null);
  const {
    setProgressPass,
    progressPass,
    setDuration,
    duration,
    sound,
    setSound,
    setIsPlaying,
    isPlaying,
    setProgress,
    progress,
    setPosition,
    setTimeLeft,
    timeLeft,
    position,
  } = useOFMapApi();

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const changeSpeed = async () => {
    const newSpeed = speed < 5 ? speed + 1 : 1;
    setSpeed(newSpeed);
  };
  useEffect(() => {}, []);

  const handlePress = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/Shake.mp3"),
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsPlaying(true);
    } else {
      const status = await sound.getStatusAsync();

      if ("isPlaying" in status && status.isLoaded) {
        if (status.isPlaying && status.durationMillis) {
          await sound.pauseAsync();
          const val = status.positionMillis;
          const length = status.durationMillis;
          setIsPlaying(false);
          setProgressPass(val);
          setDuration(length);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        console.error("Playback error:", status);
      }
    }
  };
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
    <View>
      <View className=" items-center">
        <View className=" flex-row mb-4 gap-3 w-[345px] items-center">
          <Text className=" text-white">{formatMillis(position)}</Text>

          <Progress value={progress} />

          <Text className=" text-white">-{formatMillis(timeLeft)}</Text>
        </View>
      </View>
      <View className="flex-row justify-between px-1 items-center">
        <View className="rounded-3xl ml-4 p-4">
          <TouchableOpacity onPress={changeSpeed}>
            <Text className="text-xl underline text-white ">{speed}x</Text>
          </TouchableOpacity>
        </View>
        <View className=" ml-4 p-4 rounded-full bg-gray-600 ">
          <TouchableOpacity>
            <Text>
              <Feather name="rotate-ccw" size={28} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-violet-300 rounded-full ml-4 p-8">
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome name="pause" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View className="ml-4 p-4 rounded-full bg-gray-600">
          <Text>
            <TouchableOpacity>
              <Entypo name="cw" size={28} color="white" />
            </TouchableOpacity>
          </Text>
        </View>
        <View className="rounded-3xl ml-4 p-4 mr-4">
          <Text>
            <TouchableOpacity>
              <FontAwesome5 name="scroll" size={18} color="white" />
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <View className=" absolute bottom-0 mt-60"></View>
    </View>
  );
};

export default ControlBar;
