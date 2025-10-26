import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StackScreen } from 'react-native-screens';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Sandbox" screens={SandboxBoardScreen} options={{ title: 'Trello' }} />

                {/* <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}