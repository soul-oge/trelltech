import { View, Text, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

export default function Boards() {
  const [isVisible, setIsVisible] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [board, setBoard] = useState([]);
  const { workspaceId, workspaceName } = useLocalSearchParams();

  const API = "f397235e4ae558c6a5d03a8a9f7c4da4";
  const TOKEN = "ATTA25b7fb60347aa39c151fa13b2e17ddbc039bb6d262bab67c6a7804a2ab0cd1de8166F729";

  const WORKSPACE_ID = workspaceId; 
  const WORKSPACE_NAME = workspaceName; 

  const getBoard = async () => {
    try {
      const response = await fetch(`https://api.trello.com/1/organizations/${WORKSPACE_ID}/boards?key=${API}&token=${TOKEN}`);
      if (!response.ok) throw new Error("Erreur de récupération des boards");
      const recup = await response.json();
      setBoard(recup);
    } catch (error) {
      console.error(error);
      Alert.alert("Impossible de récupérer les boards.");
    } 
  };

  useEffect(() => {
    if (WORKSPACE_ID) getBoard();
  }, []);

  const createBoard = async () => {
    if (boardName.trim() === "") {
      Alert.alert("Le nom du board ne peut pas être vide.");
      return;
    }
    try {                   
      const response = await fetch(`https://api.trello.com/1/boards/?name=${boardName}&idOrganization=${WORKSPACE_ID}&key=${API}&token=${TOKEN}`, { method: "POST" });
      if (!response.ok) throw new Error("Échec de la création du board");
      const recup = await response.json();
      setBoard([...board, recup]);
      setBoardName("");
      setIsVisible(false);
      Alert.alert("Board créé avec succès !");
    } catch (error) {
      console.error(error);
      Alert.alert("Impossible de créer le board.");
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${API}&token=${TOKEN}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression du board");
      setBoard(board.filter(boar => boar.id !== boardId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-gray-300 w-full h-full">
      <View className="h-[120px] flex justify-center">
        <Text className="text-center text-2xl text-green-500">{WORKSPACE_NAME}</Text>
      </View>

      <View className="flex items-center mb-2">
        <View className="border-b border-gray-500 h-px w-[350px]" />
      </View>

      <ScrollView className="p-2">
        <View className="flex flex-row flex-wrap gap-4 justify-center">
          <TouchableOpacity onPress={() => setIsVisible(true)} className="w-[45%] h-[100px] shadow-md bg-blue-400 border flex justify-center items-center border-blue-200 rounded-md">
            <Text className="text-ms text-white">+ Add new Board</Text>
          </TouchableOpacity>

          {board.map(boar => (
            <View key={boar.id} className="w-[45%] h-[100px] shadow-xl border border-blue-200 rounded-md overflow-hidden relative">
              <View className="bg-blue-500 h-[80px] w-full" ></View>

              <View className="h-[20%] justify-center items-center bg-white">
                <Text className="text-center text-sm font-semibold">{boar.name}</Text>
                <Link href={{ pathname: "/screens/SandboxBoardScreen", params: { boarId: boar.id } }} asChild>
                  <TouchableOpacity className="bg-blue-500 shadow-green-600 shadow-lg rounded-sm w-[270px] h-[50px] mb-3 flex justify-start">
                    <Text className="text-white text-start text-lg p-2 ">
                      {boar.name}
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

            <TouchableOpacity onPress={() => deleteBoard(boar.id)} className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded" >
              <Text className="text-white text-xs">Delete</Text>
            </TouchableOpacity>
          </View>
          ))}
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={() => setIsVisible(false)} >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white w-70 max-w-md rounded-lg p-6 shadow-lg">
            <Text className="text-xl font-bold mb-4">Board</Text>
            <TextInput value={boardName} onChangeText={setBoardName} multiline={true} className="w-60 p-2 border border-gray-600 rounded-lg text-base mb-6" placeholder="Enter your board name" placeholderTextColor="#9CA3AF" />
            <TouchableOpacity onPress={() => { createBoard(); setBoardName(""); setIsVisible(false); }} className="bg-blue-600 px-4 py-2 rounded-md mb-3">
              <Text className="text-white font-semibold text-center">Add new Board</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)} className="bg-gray-400 px-4 py-2 rounded-md" >
              <Text className="text-white font-semibold text-center">Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
