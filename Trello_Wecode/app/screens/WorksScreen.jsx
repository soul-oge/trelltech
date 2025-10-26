import { View, Text, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Workspace() {
  const [affWork, setAffWork] = useState(false);
  const [textWork, setTextWork] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [idWork, setIdWork] = useState();

  const API = "f397235e4ae558c6a5d03a8a9f7c4da4";
  const TOKEN = "ATTA25b7fb60347aa39c151fa13b2e17ddbc039bb6d262bab67c6a7804a2ab0cd1de8166F729";

  const getAllWorkspaces = async () => {
    try {
      const response = await fetch(`https://api.trello.com/1/members/me/organizations?key=${API}&token=${TOKEN}` );
      if (!response.ok) {
        throw new Error("Erreur de récupération des workspaces");
      }
      
      const recup = await response.json();
      setWorkspaces(recup);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de récupérer les workspaces.");
    } 
  };

  useEffect(() => {
    getAllWorkspaces();
  }, []);

  const createWorkspace = async () => {

    if (textWork.trim() === "") {
      Alert.alert("Le nom du workspace ne peut pas être vide.");
      return;
    }
    try {
      const response = await fetch(`https://api.trello.com/1/organizations?displayName=${textWork}&key=${API}&token=${TOKEN}`,
        { method: "POST" }
      );
      if (!response.ok) {
        throw new Error("Échec de la création du workspace");
      }
      const recup = await response.json();
      
      setWorkspaces([...workspaces, recup]);
      setTextWork("");
      setAffWork(false);
      Alert.alert("Workspace créé avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Impossible de créer le workspace.");
    }
  };

  const getIdToDel = (id) => {
    setIdWork(id)
  }

  const deleteWorkspace = async (workspaceId) => {
  try {
    const response = await fetch(`https://api.trello.com/1/organizations/${workspaceId}?key=${API}&token=${TOKEN}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du workspace");
    }
   
    setWorkspaces(workspaces.filter(work => work.id !== workspaceId));

  } catch (error) {
    console.log(error);

  }
};


  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex items-center pt-4  w-full h-32">
        {!affWork ? (
          <TouchableOpacity onPress={() => setAffWork(true)} className="w-64 h-[60px] bg-blue-400 border border-blue-300 rounded-md flex justify-center items-center" >
            <Text className="text-white text-xl">+ Add new Workspace</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex flex-col gap-4 items-center mt-2">
            <TextInput value={textWork} onChangeText={setTextWork}  multiline={true} placeholder="Name workspace"  className="w-72 h-[40px] bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg text-black"  />
            <View className="flex flex-row gap-4">
              <TouchableOpacity onPress={createWorkspace}  className="bg-green-600 px-3 py-2 rounded-lg" >
                  <Text className="text-white font-semibold">Add new Workspace</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setAffWork(false)}  className="bg-green-500 px-3 py-2 rounded-lg" >
                <Text className="text-white font-semibold">Retour</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
        {/* <View className="flex items-center">
          <View>
            <Text className="p-2 text-2xl">
              My Workspaces
            </Text>
          </View>
          <View className="border-b border-gray-500 h-px w-[350px]" />
        </View> */}

      <View>
        <ScrollView className="p-2">
        {workspaces.map((work) => (
        <View key={work.id} className="flex items-start p-4 flex-row gap-3">
          <Link href={{ pathname: "/screens/BoardsScreen", params: { workspaceId: work.id, workspaceName: work.displayName } }} asChild>
            <TouchableOpacity className="bg-blue-500 shadow-green-600 shadow-lg rounded-sm w-[270px] h-[50px] mb-3 flex justify-start">
              <Text className="text-white text-start text-lg p-2 ">
                {work.displayName}
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() =>{getIdToDel(work.id); setIsVisible(true)}} className="bg-red-500 flex items-center justify-center rounded-md h-[50px] w-[50px]">
            <Text className="text-white ">Delete</Text>
          </TouchableOpacity>
          
        </View>
        ))}
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        
          <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
            <View className="bg-white w-70 max-w-md rounded-lg p-6 shadow-lg">
              <Text className="text-xl font-bold mb-4">Attempt to delete a Workspace</Text>
          
              <TouchableOpacity onPress={() => { deleteWorkspace(idWork);  setIsVisible(false); }} className="bg-blue-600 px-4 py-2 rounded-md mb-3">
                  <Text className="text-white font-semibold text-center">Delete</Text>
                </TouchableOpacity>
          
                <TouchableOpacity onPress={() => setIsVisible(false)} className="bg-gray-400 px-4 py-2 rounded-md" >
                    <Text className="text-white font-semibold text-center">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
    </View>
      
    </View>
  );
}
