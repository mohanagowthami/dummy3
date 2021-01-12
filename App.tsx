import React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import * as Font from "expo-font";
import SignUpScreen from "./src/screens/SignUpScreen";
import BottomTab from "./src/components/BottomTab";

// creating stack navigator
const Stack = createStackNavigator();

// loading fonts using useFonts()
export default function App() {
  const [loaded] = Font.useFonts({
    AirbnbCerealBold: require("./assets/fonts/AirbnbCerealBold.ttf"),
    AirbnbCerealBook: require("./assets/fonts/AirbnbCerealBook.ttf"),
  });

  // conditioning to load fonts
  if (!loaded) {
    return <Text>Loading</Text>;
  }

  return (
    // Outer NavigationContainer
    <NavigationContainer>
      {/* Stack Navigator */}
      <Stack.Navigator>
        {/* Stack Screens */}
        {/* <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="bottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
