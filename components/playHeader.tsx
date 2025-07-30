import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import ControlBar from "./controlBar";
import { useRouter } from "expo-router";
import * as SeparatorPrimitive from "@rn-primitives/separator";

const PlayHeader = () => {
  const router = useRouter();
  return (
    <View className="flex justify-between h-screen mb-3">
      <View
        style={{ paddingTop: 50 }}
        className=" flex-row justify-between px-3"
      >
        <View className=" flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.replace("/playList")}>
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
                this is the description ot the album asdfasdf asdfa sdfas
              </CardDescription>
            </CardHeader>
          </Card>
        </View>

        <View>
          <ControlBar progressValue={90} />
        </View>
        <SeparatorPrimitive.Root className=" mb-3" />
        <View className=" items-center p-4 mb-6 border mt-3 rounded-3xl border-white">
          <TouchableOpacity>
            <Text className=" text-white font-bold text-xl ">
              Create New Episode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlayHeader;
