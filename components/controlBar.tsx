import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Popover from "react-native-popover-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Progress } from "./ui/progress";
import { useOFMapApi } from "~/common/mediaContext";
import formatMillis from "~/common/Foramtions";

const ControlBar = () => {
  const [speed, setSpeed] = useState<any>(1);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const statusRef = useRef<AVPlaybackStatusSuccess | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const { setProgressPass, progressPass, setDuration } = useOFMapApi();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  //

  //

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

  const changeSpeed = async () => {
    const newSpeed = speed < 5 ? speed + 1 : 1;
    setSpeed(newSpeed);
  };

  return (
    <View>
      <View>
        <View className=" flex-row mb-8 gap-3 items-center">
          <Text>{formatMillis(position)}</Text>

          <Progress value={progress} />

          <Text>-{formatMillis(timeLeft)}</Text>
        </View>
      </View>
      <View className="flex-row justify-between px-1 items-center">
        <View className="rounded-3xl ml-4 p-4">
          <TouchableOpacity onPress={changeSpeed}>
            <Popover
              from={
                <TouchableOpacity>
                  <Text className="text-xl underline text-white ">
                    {speed}x
                  </Text>
                </TouchableOpacity>
              }
            >
              <View className=" h-34 w-80 bg-transparent gap-2 bottom-0">
                <Text className=" text-center text-2xl text-black font-mono flex-row justify-center  p-2 rounded-full bg-violet-300">
                  1x
                </Text>
                <Text className=" text-center text-2xl text-black font-mono flex-row justify-center border  p-2 rounded-full bg-violet-300">
                  1x
                </Text>
                <Text className=" text-center text-2xl text-black font-mono flex-row justify-center border p-2 rounded-full bg-violet-300">
                  1x
                </Text>
              </View>
            </Popover>
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
    </View>
  );
};

export default ControlBar;
