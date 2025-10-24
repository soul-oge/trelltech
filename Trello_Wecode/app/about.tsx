import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View  className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-purple-600 mb-6">
        Page À propos
      </Text>

      <Link href="/">
        <Text className="text-blue-500 underline"> Retour à l&apos;accueil</Text>
      </Link>
      <Button title=""></Button>
    </View>
  );
}

