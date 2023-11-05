import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorilerim from './components/Favorilerim';


export default function App() {
  const Stack = createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title:''}}/>
        <Stack.Screen name="Favorilerim" component={Favorilerim} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
