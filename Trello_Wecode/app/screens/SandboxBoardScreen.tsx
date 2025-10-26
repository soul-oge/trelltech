import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams } from "expo-router";
import {useMemo, useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ListColumn from "../../app/components/ListColumn";
import {
  useArchiveList,
  useCreateList,
  useLists,
  useUpdateListName,
} from "../../app/features/lists/hooks";


export default function SandboxBoardScreen() {
 const params = useLocalSearchParams<{ boardId?: string | string[]; boarId?: string | string[] }>();
 const boardId = useMemo(() => {
   const raw = params.boardId ?? params.boarId;
   const v = Array.isArray(raw) ? raw[0] : raw;
   return typeof v === "string" ? v.trim() : "";
 }, [params]);
 
 console.log("[UI] boardId =", JSON.stringify(boardId), "len=", boardId?.length);

  const { data: lists, isLoading, error } = useLists(boardId);
  const createList = useCreateList(boardId);
  const updateListName = useUpdateListName(boardId);
  const archiveList = useArchiveList(boardId);

  const [newList, setNewList] = useState("");
  const [inputOrg, setInputOrg] = useState(false);
  // const [isAdding, setIsAdding] = useState(false);
  


  return (
    <View style={{ flex:1, backgroundColor:'#F3F4F6', padding:12 }}>
      {/* Sélecteur/entrée du boardId (quand les boards existeront, tu le passeras via nav) */}
      <View style={{ flexDirection:'row', gap:8, marginBottom:10 }}>
      </View>

      {/* Ajout liste */}
      <View style={{ flexDirection:'row', gap:8, marginBottom:10 }}>
        <TextInput
          value={newList}
          onChangeText={setNewList}
          placeholder="Nouvelle liste…"
          style={{ flex:1, backgroundColor:'white', borderRadius:10, paddingHorizontal:10, borderWidth:1, borderColor:'#E5E7EB' }}
        />
        <TouchableOpacity onPress={() => { if (newList.trim()) {console.log('er'); createList.mutate(newList.trim()); setNewList(''); }}}>
          <Text style={{ color:'#2563EB', padding:10 }}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <Text>Chargement…</Text>}
      {error && <Text>Erreur: {(error as Error).message}</Text>}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight:12 }}>
        {(lists || []).map((list) => (
          <ListColumn
            key={list.id}
            list={list}
            onRename={(name) => updateListName.mutate({ listId: list.id, name })}
            onArchive={() => archiveList.mutate(list.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}