import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      
    <View className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <Image className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" source={{uri: "https://via.placeholder.com/150"}}/>
        <View className="p-4">
            <Text className="text-xl  font-semibold">Beautiful Card</Text>
            <Text className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante sit amet tellus ornare tincidunt.</Text>
          <Pressable className="bg-blue-500 rounded-full mt-4 py-2 px-4 active:bg-blue-600">
            <Text className="text-white text-center font-medium">Learn More</Text>
          </Pressable>
        </View>

    </View>
    
    <Link href='/about' asChild>
        <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-full">
          <Text className="text-white text-lg font-semibold">Aller à About</Text>
        </TouchableOpacity>
      </Link>

        <Link href='/header' asChild>
        <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-full">
          <Text className="text-white text-lg font-semibold">Aller au header</Text>
        </TouchableOpacity>
      </Link>
        <Link href='/about' asChild>
            <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-full">
            <Text className="text-white text-lg font-semibold">Aller à About</Text>
            </TouchableOpacity>
        </Link>

        <Link href='/menu' asChild>
            <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-full">
            <Text className="text-white text-lg font-semibold">Menu</Text>
            </TouchableOpacity>
        </Link>

        <Link href='/' asChild>
            <TouchableOpacity className="bg-blue-700 px-6 py-3 rounded-full">
            <Text className="text-white text-lg font-semibold">Acceuil</Text>
            </TouchableOpacity>
        </Link>
    </View>
  );
}
