import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View>
      <View  className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-or-600 mb-6">
        Page À propos
      </Text>

      <Link href="/">
        <Text className="text-blue-500 underline"> Retour à l&apos;accueil</Text>
      </Link>
      
    </View>
    {/* <View className="flex flex-col w-full h-[200px] items-center justify-center">
      <View className="border w-80 h-[80px] bg-green-500 rounded-t-lg">
        <Text>Name Workspace</Text>
      </View>

      <View className="border w-80 h-[80px] bg-red-400 rounded-b-2xl">
        <Text>
          Delete
        </Text>
      </View>
    </View> */}
    <View className="border bg-green-400 w-[100%] h-[100%]">
      <View className="border w-[80%] h-[50%]">

      </View>
    </View>
    </View>
  );
}

