// react
import React, { FC, useEffect, useState } from "react"
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
import UserService from "./src/services/user.service"
import LogoScreen from "./src/screens/LogoScreen"

// creating stack navigator
const Stack = createStackNavigator()

const userService = new UserService()

// loading fonts using useFonts()
export default function App() {
  let isMounted: boolean = false
  const [isSignedIn, setSignedIn] = useState(false)
  const [isLoading, setLoadingStatus] = useState(true)
  useEffect(() => {
    isMounted = true
    async function getUser() {
      try {
        const response = await userService.getUser()
        if (response) {
          console.log(response, "response")
          if (response.id && isMounted) {
            setSignedIn(true)
            setLoadingStatus(false)
          }
        }
      } catch (error) {
        console.log(error, "in  error")
      } finally {
        setLoadingStatus(false)
      }
    }
    getUser()
    return () => {
      isMounted = false
    }
  }, [])
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
  console.log(isSignedIn)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="logoScreen"
            component={LogoScreen}
            options={{ headerShown: false }}
          />
        ) : isSignedIn ? (
          <Stack.Screen
            name="bottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
