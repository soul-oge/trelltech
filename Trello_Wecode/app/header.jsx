import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "react-native-drawer-layout";
import Home from "./screens/HomeScreen";
import ModalTask from "./screens/TasksScreen";
import Workspace from "./screens/WorksScreen";
import Baords from "./screens/BoardsScreen"


export default function DrawerExample() {
  const [open, setOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Home");

  const renderScreen = () => {
    if (currentScreen === "Home") return <Home />;
    if (currentScreen === "Boards") return <Baords/>;
   
    if (currentScreen === "Workspace") return <Workspace/>;
    if (currentScreen === "ModalTask") return <ModalTask/>;

  };

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerPosition="left"
      drawerType="front"
      renderDrawerContent={() => (
        <View className="flex-1 bg-white p-6">
          <Text className="text-lg font-bold mb-4">Menu</Text>
          <TouchableOpacity onPress={() => { setCurrentScreen("Home"); setOpen(false); }}>
            <Text className="text-base mb-3"> Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurrentScreen("Boards"); setOpen(false); }}>
            <Text className="text-base mb-3"> Boards</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurrentScreen("Workspace"); setOpen(false); }}>
            <Text className="text-base mb-3"> Workspace</Text>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => { setCurrentScreen("ModalTask"); setOpen(false); }}>
            <Text className="text-base mb-3"> Task</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      
      <View className="flex-row items-center bg-white py-4 px-5 shadow-md">
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">Trello</Text>
      </View>

      
      {renderScreen()}
    </Drawer>
  );
}
