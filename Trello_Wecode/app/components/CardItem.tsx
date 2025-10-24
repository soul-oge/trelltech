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
    <View style={{ padding: 8, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, marginBottom: 8, backgroundColor: 'white' }}>
      {editing ? (
        <View>
          <TextInput value={name} onChangeText={setName} placeholder="Nom de la carte" />
          <TouchableOpacity onPress={() => (setEditing(false), onRename(name))}>
            <Text style={{ color: '#2563EB', marginTop: 6 }}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={{ fontWeight: '600' }}>{card.name}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
            <TouchableOpacity onPress={() => setEditing(true)}><Text>Renommer</Text></TouchableOpacity>
            <TouchableOpacity onPress={onDelete}><Text style={{ color: '#DC2626' }}>Supprimer</Text></TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
