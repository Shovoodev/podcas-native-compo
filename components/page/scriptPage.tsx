import { useRouter } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { SpeachType } from "~/common/types";
import ScriptText from "~/assets/dummy/scriptdata";
import { Progress } from "../ui/progress";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const ScriptTap = ({ speaker, text }: SpeachType) => {
  return (
    <Card className=" px-4 mb-2">
      <CardTitle className=" text-2xl">{speaker}</CardTitle>
      <CardDescription>{text}</CardDescription>
    </Card>
  );
};
const ScriptPage = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        className="flex h-screen"
      >
        <View className=" flex-row items-center justify-between">
          <View className=" flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <View className=" flex-row gap-5 items-center">
                <AntDesign
                  className=" ml-3 mb-4"
                  name="arrowleft"
                  size={20}
                  color="white"
                />
                <Text className=" text-2xl text-white  font-bold p-2 mb-4">
                  Scripts
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {ScriptText && ScriptText !== null ? (
            ScriptText.map((item, index) => {
              return (
                <ScriptTap
                  key={index}
                  speaker={item.speaker}
                  text={item.text}
                />
              );
            })
          ) : (
            <View> no text </View>
          )}
        </View>
      </ScrollView>
      <View className=" flex-row items-center bottom-52 absolute border py-2 rounded-xl w-screen border-gray-700 bg-neutral-600">
        <View className=" flex-row items-center mr-1 w-[70%] p-1 px-4 gap-2">
          <Image
            className=" rounded-xl"
            source={require("../../assets/images/cube_prod.png")}
            style={{ height: 60, width: 60 }}
          />
          <View className=" w-full">
            <Text className=" text-white text-xl font-bold">The art of ai</Text>
            <Progress value={40} className=" bg-gray-800" />
          </View>
        </View>

        <View className=" items-center  flex-row ">
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
              <TouchableOpacity>
                <FontAwesome name="pause" size={12} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScriptPage;
