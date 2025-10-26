import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ListColumn from "../../app/components/ListColumn";
import {
  useArchiveList,
  useCreateList,
  useLists,
  useUpdateListName,
} from "../../app/features/lists/hooks";


export default function SandboxBoardScreen() {
  //const [boardId, setBoardId] = useState("demo-board");
  const { data: lists, isLoading, error } = useLists(boardId);
  const createList = useCreateList(boardId);
  const updateListName = useUpdateListName(boardId);
  const archiveList = useArchiveList(boardId);

  const [newList, setNewList] = useState("");
  const [inputOrg, setInputOrg] = useState(false);
  // const [isAdding, setIsAdding] = useState(false);
  const { boardId } = useLocalSearchParams();


  return (
    <View className="flex-1 bg-gray-100 p-3">
   
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Mon tableau</Text>
      </View>

     
      {/* <View className="flex-row gap-2 mb-3">
        <TextInput
          value={boardId}
          onChangeText={setBoardId}
          placeholder="boardId"
          className="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200"
        />
        <TouchableOpacity
          onPress={() => setBoardId(boardId.trim())}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Charger</Text>
        </TouchableOpacity>
      </View> */}


      {isLoading && <Text>Chargement…</Text>}
      {error && <Text>Erreur : {(error as Error).message}</Text>}
      
<KeyboardAvoidingView className="flex-1 bg-gray-100 p-3" >

      <ScrollView horizontal={true} 
        // contentContainerStyle={{ paddingRight: 12 }}
        className="space-x-3"
      >
        {(lists || []).map((list) => (
          <ListColumn
            key={list.id}
            list={list}
            onRename={(name) => updateListName.mutate({ listId: list.id, name })}
            onArchive={() => archiveList.mutate(list.id)}
          />
        ))}  


        <View className="flex-row gap-2 bg-gray-200 w-64 rounded-xl  mr-3 p-3 h-[80px]">
        {!inputOrg ? (
           <TouchableOpacity onPress={() => setInputOrg(true)}  className="flex flex-row items-center">
              <Text className="text-xl text-black">+</Text>
              <Text className="text-black ml-1">Add List</Text>
            </TouchableOpacity>
          ) : (
        <View className="flex flex-row items-center mt-2">
        <TextInput
          value={newList}
          onChangeText={setNewList}
          placeholder="Nouvelle liste…"
          className="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200"
        />
        <TouchableOpacity
          onPress={() => {
            if (newList.trim()) {
              createList.mutate(newList.trim());
              setNewList("");
            }
          }}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Ajoute</Text>
        </TouchableOpacity>

         <TouchableOpacity
          onPress={() => {
          setInputOrg(false)
          setNewList("")
          }}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          {/* <Text className="text-white font-semibold">Annulé</Text> */}
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
        )}
        </View> 
      </ScrollView>
      
       
    </KeyboardAvoidingView>
    </View>

    
  );
}
