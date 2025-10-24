import React, { useState } from 'react';
import {TextInput,  Modal, View, Text, Button,TouchableOpacity } from 'react-native';

export default function ModalTask(props) {
 const [isVisible, setIsVisible] = useState(false);
 
 return (
   <View className="flex-1 justify-center items-center bg-gray-100">


     {/* <Button title="Open Modal" onPress={() => setIsVisible(true)} /> */}
     <Modal
      onPress={props.onPress}
       animationType="slide"
       transparent={true}
       visible={isVisible}
       onRequestClose={() => setIsVisible(false)}>
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          
          <View className="bg-white w-70 max-w-md rounded-lg p-6 shadow-lg">
            <Text className="text-xl font-bold mb-4">Task</Text>
            <Text className="text-gray-700 mb-6">
              checklists
            </Text>
            <TextInput
        className="w-3/4 p-2 border border-gray-600 rounded-lg text-base mb-6 "
        placeholder="Enter your text"
        placeholderTextColor="#9CA3AF"
      />
            
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              className="bg-blue-500 px-4 py-2 rounded-md "
            >
              <Text className="text-white font-semibold text-center">Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
     </Modal>
   </View>
 );
}

