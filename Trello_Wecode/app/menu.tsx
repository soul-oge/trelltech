import React, { useState } from "react";
import {Button, View, Text, ScrollView,TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export default function Menu() {
  const [inputTask, setInputTask] = useState(false);
  const [inputProcess, setInputProcess] = useState(false);
  const [inputToDo, setInputToDo] = useState(false);
  const [inputOrg, setInputOrg] = useState(false);

  const [textTask, setTextTask] = useState("");
  const [textInProcess, setTextInProcess] = useState("");
  const [textToDo, setTextToDo] = useState("");
  const [textOrg, setTextOrg] = useState("");

  //pour ouvrir un task 
//   const [isVisible, setIsVisible] = useState(false);
const clic =()=> {
    console.log('Bonton cliqué')
}


  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-100 p-3" >
      <ScrollView horizontal={true} className="space-x-3">


        <View className="flex-row items-start gap-5  bg-gray-100 rounded-xl p-3">
          <View className="bg-black rounded-xl p-3 w-80">
            <Text className="text-lg font-bold mb-3 text-white">TASKS</Text>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>CRUD WORKSPACE</Text>
              {/* <Button title="Open Modal" onPress={clic}  /> */}
            </View>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>CRUD BOARD</Text>
            </View>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>CRUD BOARD</Text>
            </View>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>CRUD BOARD</Text>
            </View>
            {!inputTask ? (
              <TouchableOpacity onPress={() => setInputTask(true)} className="flex flex-row items-center mt-2">
                <Text className="text-xl text-white">+</Text>
                <Text className=" ml-1 text-white">Add a card</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex flex-row items-center mt-2">
                <TextInput value={textTask} onChangeText={setTextTask} placeholder="Name card" className="flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-black"/>
                <TouchableOpacity onPress={() => { setTextTask("");
                    setInputTask(false); }} className="bg-blue-600 px-3 py-2 rounded-lg ml-2" >
                  <Text className="text-white font-semibold">Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>


          <View className="bg-black rounded-xl p-3 w-80">
            <Text className="text-lg font-bold mb-3 text-white">IN PROCESS</Text>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>AUTHENTICATION FLOW</Text>
            </View>
            <View className="bg-gray-200 p-3 rounded-lg mb-2">
              <Text>AUTHENTICATION FLOW</Text>
            </View>
            {!inputProcess ? (
              <TouchableOpacity onPress={() => setInputProcess(true)} className="flex flex-row items-center mt-2" >
                <Text className="text-xl text-white">+</Text>
                <Text className=" ml-1 text-white">Add a card</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex flex-row items-center mt-2">
                <TextInput value={textInProcess} onChangeText={setTextInProcess} placeholder="Name card" className="flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-black"/>
                <TouchableOpacity onPress={() => { setTextInProcess("");
                    setInputProcess(false); }}  className="bg-blue-600 px-3 py-2 rounded-lg ml-2">
                  <Text className="text-white font-semibold">Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View className="bg-black rounded-xl p-3 w-80">
            <Text className="text-lg font-bold mb-3 text-white">TO DO</Text>
            {!inputToDo ? (
              <TouchableOpacity  onPress={() => setInputToDo(true)}  className="flex flex-row items-center mt-2" >
                <Text className="text-xl  text-white">+</Text>
                <Text className=" ml-1 text-white">Add a card</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex flex-row items-center mt-2">
                <TextInput value={textToDo} onChangeText={setTextToDo} placeholder="Name card"   className="flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-black" />
                <TouchableOpacity onPress={() => { setTextToDo("");
                    setInputToDo(false); }}  className="bg-blue-600 px-3 py-2 rounded-lg ml-2" >
                  <Text className="text-white font-semibold">Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>


        <View className="bg-blue-600 rounded-xl p-3 h-[80px] ">
          {!inputOrg ? (
            <TouchableOpacity onPress={() => setInputOrg(true)}  className="flex flex-row items-center">
              <Text className="text-xl text-white">+</Text>
              <Text className="text-white ml-1">Add a Organization</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center mt-2">
              <TextInput value={textOrg}  onChangeText={setTextOrg}  placeholder="Organization name..."   className="flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-black" />
              <TouchableOpacity
                onPress={() => { setTextOrg("");
                  setInputOrg(false); }}  className="bg-black px-3 py-2 rounded-lg ml-2">
                <Text className="text-blue-600 font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
