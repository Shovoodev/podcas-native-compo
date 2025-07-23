import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Progress } from "./ui/progress";

const ControlBar = () => {
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);

  const statusRef = useRef<AVPlaybackStatusSuccess | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<number>(0.0);

  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePress = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/shake.mp3"),
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsPlaying(true);
    } else {
      const status = await sound.getStatusAsync();

      if ("isPlaying" in status && status.isLoaded) {
        if (status.isPlaying && status.durationMillis) {
          const time: any = (status.durationMillis / 1000).toFixed(2);
          setDuration(time);
          await sound.pauseAsync();
          setIsPlaying(false);
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
    }
  };

  const changeSpeed = async () => {
    const newSpeed = speed < 5 ? speed + 1 : 1;
    setSpeed(newSpeed);
  };

  return (
    <View>
      <View>
        <View className=" flex-row mb-8 gap-3 items-center">
          <Text>0.00</Text>
          <Progress value={progress} />
          <Text>{duration}</Text>
        </View>
      </View>
      <View className="flex-row justify-between px-1 items-center">
        <View className="rounded-3xl ml-4 p-4">
          <TouchableOpacity onPress={changeSpeed}>
            <Text className="text-xl underline text-white">{speed}x</Text>
          </TouchableOpacity>
        </View>
        <View className="rounded-3xl ml-4 p-4">
          <TouchableOpacity>
            <Text>
              <AntDesign name="stepbackward" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-indigo-400 rounded-full ml-4 p-8">
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome name="pause" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="rounded-3xl ml-4 p-4">
          <Text>
            <TouchableOpacity>
              <AntDesign name="stepforward" size={24} color="white" />
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default ControlBar;
