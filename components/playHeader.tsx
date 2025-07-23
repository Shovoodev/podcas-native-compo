import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import ControlBar from "./controlBar";

const PlayHeader = () => {
  return (
    <View className="flex justify-between h-screen">
      <View
        style={{ paddingTop: 50 }}
        className=" flex-row justify-between px-3"
      >
        <View className=" flex-row justify-between items-center">
          <TouchableOpacity>
            <AntDesign name="down" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className=" flex-row gap-8 p-9">
          <TouchableOpacity>
            <Feather name="upload" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className=" mb-8 px-6">
        <View className=" items-center ">
          <Card>
            <CardHeader>
              <CardDescription className=" text-muted-foreground text-center items-center">
                06/12/2023
              </CardDescription>
              <CardTitle className=" text-center"> Future of AR</CardTitle>
              <CardDescription className=" text-center px-6">
                {" "}
                this is the description ot the album asdfasdf asdfa sdfas
              </CardDescription>
            </CardHeader>
          </Card>
        </View>
        <View className=" flex-row mb-8 gap-3 items-center">
          <Text>0.00</Text>
          <Progress value={50} />
          <Text>- 0.00</Text>
        </View>
        <View>
          <ControlBar />
        </View>
        <View className=" items-center p-3 mb-6">
          <Text className=" text-white font-semibold"> Create New Episode</Text>
        </View>
      </View>
    </View>
  );
};

export default PlayHeader;
