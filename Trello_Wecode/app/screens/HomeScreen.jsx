import "react-native-gesture-handler";
import * as React from "react";
import { Text, View } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";


// const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    // <NavigationContainer>
    //   <Drawer.Navigator
    //     screenOptions={{
    //       headerShown: false, 
    //       drawerStyle: {
    //         backgroundColor: "#fff",
    //         width: 240,
    //       },
    //       drawerActiveTintColor: "#6B21A8", 
    //       drawerLabelStyle: {
    //         fontSize: 16,
    //       },
    //     }}
    //   >
    //     <Drawer.Screen name="Accueil" />
    //     <Drawer.Screen name="Paramètres"  />
    //   </Drawer.Navigator>
    // </NavigationContainer>
        <View className="flex-1 items-center justify-center bg-white">
    
    <Text className="text-xl font-bold text-blue-500">
        Welcome to Home!
      </Text>
      </View>
  );
}
