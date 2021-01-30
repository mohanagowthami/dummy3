// react
import React from "react"
// react native
import { Text } from "react-native"
// react navigation
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
// expo-font
import * as Font from "expo-font"
// Screens
import LoginScreen from "./src/screens/LoginScreen"
import SignUpScreen from "./src/screens/SignUpScreen"
import OnboardingScreens from "./src/screens/OnboardingScreens"
import PickYourChoice from "./src/screens/PickYourChoice"
// components
import BottomTab from "./src/components/elements/BottomTab"

// creating stack navigator
const Stack = createStackNavigator()

// loading fonts using useFonts()
export default function App() {
    const [loaded] = Font.useFonts({
        AirbnbCerealBold: require("./assets/fonts/AirbnbCerealBold.ttf"),
        AirbnbCerealBook: require("./assets/fonts/AirbnbCerealBook.ttf"),
        ArchivoRegular: require("./assets/fonts/ArchivoRegular.ttf"),
        ArchivoBold: require("./assets/fonts/ArchivoBold.ttf"),
    })

    // conditioning to check loaded fonts
    if (!loaded) {
        return <Text>Loading</Text>
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="onBoarding"
                    component={OnboardingScreens}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="signUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="pickYourChoice"
                    component={PickYourChoice}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="bottomTab"
                    component={BottomTab}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
