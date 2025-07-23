import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ControlBar = () => {
  const [speed, setSpeed] = useState(1);

  const changeSpeed = () => {
    setSpeed((prevSpeed) => (prevSpeed < 5 ? prevSpeed + 1 : 1));
  };
  return (
    <View className=" flex-row justify-between px-1 items-center">
      <View className="  rounded-3xl ml-4 p-4">
        <TouchableOpacity onPress={changeSpeed}>
          <Text className=" text-xl underline text-white"> {speed}x</Text>
        </TouchableOpacity>
      </View>
      <View className="  rounded-3xl ml-4 p-4">
        <TouchableOpacity>
          <Text>
            <AntDesign name="stepbackward" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" bg-indigo-400 rounded-full ml-4 p-8">
        <TouchableOpacity>
          <FontAwesome name="pause" size={24} color="white  " />
        </TouchableOpacity>
      </View>
      <View className="  rounded-3xl ml-4 p-4">
        <Text>
          <TouchableOpacity>
            <AntDesign name="stepforward" size={24} color="white" />
          </TouchableOpacity>{" "}
        </Text>
      </View>
      <View className="  rounded-3xl ml-4 p-4 mr-4">
        <Text>
          <TouchableOpacity>
            <FontAwesome5 name="scroll" size={18} color="white" />
          </TouchableOpacity>{" "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ControlBar;
