
import AntDesign from '@expo/vector-icons/AntDesign'
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CardItem({ card, onRename, onDelete }: {
  card: { id: string; name: string };
  onRename: (name: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(card.name);

  return (
    <View className="  bg-white p-3 rounded-lg shadow-sm mb-2 border border-gray-100">
      {editing ? (
        <View>
          <TextInput value={name} onChangeText={setName} placeholder="Nom de la carte" className='border border-gray-200 rounded-lg px-2 py-1' />
          <TouchableOpacity onPress={() => (setEditing(false), onRename(name))}>
            <Text className="text-blue-600 font-semibold">Enregistrer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className=" flex-row justify-between gap-4 mt-2">
            <TouchableOpacity onPress={() => setEditing(true)}>
          <Text className="font-semibold text-gray-800">{card.name}</Text>

              {/* <Text  className="text-gray-600">Renommer</Text> */}
              </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              {/* <Text className="text-red-500">Supprimer</Text> */}
            <AntDesign name="close" size={16} color="gray" className='justify-end' />
              </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
