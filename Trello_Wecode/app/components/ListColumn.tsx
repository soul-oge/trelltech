import React, { useState, useMemo } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCards, useCreateCard, useDeleteCard, useUpdateCard } from '../../app/features/cards/hooks';
import CardItem from './CardItem';

export default function ListColumn({ list, onRename, onArchive }: {
  list: { id: string; name: string };
  onRename: (name: string) => void;
  onArchive: () => void;
}) {
  const [inputTask, setInputTask] = useState(false);
  const { data: cards } = useCards(list.id);
  const createCard = useCreateCard(list.id);
  const deleteCard = useDeleteCard(list.id);
  const updateCard = useUpdateCard(list.id);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(list.name);

  const footer = useMemo(() => (
  !inputTask ? (
    <TouchableOpacity
      onPress={() => setInputTask(true)}
      className="flex flex-row items-center mt-3 bg-white/30 rounded-lg p-2 border border-dashed border-gray-400"
    >
      <Text className="text-2xl text-gray-700 font-bold mr-1">+</Text>
      <Text className="text-gray-700 text-base font-medium">Add a card</Text>
    </TouchableOpacity>
  ) : (
    <View className="mt-3 bg-white rounded-lg p-3 border border-gray-300 shadow-sm">
      <TextInput
        placeholder="Nouvelle carte…"
        value={title}
        onChangeText={setTitle}
        className="bg-gray-100 rounded-lg px-3 py-2 border border-gray-300 text-gray-800"
      />

      <View className="flex flex-row justify-end mt-3">
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-lg mr-2"
          onPress={() => {
            if (title.trim()) {
              createCard.mutate(title.trim());
              setTitle('');
              setInputTask(false);
            }
          }}
        >
          <Text className="text-white font-semibold">Ajouter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-400 px-4 py-2 rounded-lg"
          onPress={() => {
            setTitle('');
            setInputTask(false);
          }}
        >
          <Text className="text-white font-semibold">Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
), [createCard, inputTask, title]);


  return (
    <View className="w-64  bg-gray-200 rounded-xl p-3 mr-3 shadow" style={{ maxHeight: 500 }}>
      {editing ? (
        <View>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="Nom de la liste"
            className="bg-white rounded-lg px-2 py-1 border border-gray-300"
          />
          <TouchableOpacity onPress={() => { setEditing(false); onRename(newName); }} className="mt-2">
            <Text className="text-blue-600 font-semibold">Enregistrer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          {/* <View className="flex-row gap-3"> */}
            <TouchableOpacity onPress={() => setEditing(true)}>
          <Text className="font-bold text-gray-800">{list.name}</Text>
              
              {/* <Text className="text-gray-600">Renommer</Text> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={onArchive}>
              <Text className="text-red-500">Archiver</Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>
      )}

      <FlatList
        className="mt-3"
        data={cards || []}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <CardItem
            card={item}
            onRename={(name) => updateCard.mutate({ cardId: item.id, patch: { name } })}
            onDelete={() => deleteCard.mutate(item.id)}
          />
        )}
        ListFooterComponent={footer}
      />
    </View>
  );
}