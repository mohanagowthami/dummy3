
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {

    const [loaded] = Font.useFonts({
      AirbnbCerealBold: require('./assets/fonts/AirbnbCerealBold.ttf'),
      AirbnbCerealBook:require('./assets/fonts/AirbnbCerealBook.ttf')
  });

  if (!loaded) {
    return <Text>Loading</Text>
  }
 
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}


