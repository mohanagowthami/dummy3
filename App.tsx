// react
import React, { FC, useEffect, useRef, useState } from "react"
// react native
import { Platform, Text } from "react-native"
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
import { Context } from "./src/lib/content"
import * as Location from "expo-location"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

// creating stack navigator
const Stack = createStackNavigator()

const userService = new UserService()

// loading fonts using useFonts()

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  return token
}

export default function App() {
  let isMounted: boolean = false
  const [isSignedIn, setSignedIn] = useState(false)
  const [isLoading, setLoadingStatus] = useState(true)
  const [latitude, setLatitude] = useState<any>(null)
  const [longitude, setLongitude] = useState<any>(null)
  const [expoPushToken, setExpoPushToken] = useState<any>("")
  const [notification, setNotification] = useState<any>(false)
  const notificationListener: any = useRef<any>()
  const responseListener: any = useRef<any>()

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => {
  //     console.log("token,", token)
  //     setExpoPushToken(token)
  //   })

  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification)
  //     }
  //   )

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response, "response in notification listener")
  //     }
  //   )

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener)
  //     Notifications.removeNotificationSubscription(responseListener)
  //   }
  // }, [])
  useEffect(() => {
    isMounted = true

    async function getUser() {
      try {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== "granted") {
          setLoadingStatus(false)
          alert("please grant permission to access current location")
        } else {
          if (isMounted) {
            Promise.all([
              Location.getCurrentPositionAsync({}),
              userService.getUser(),
            ])
              .then((values) => {
                console.log(values, "values in app.tsx")
                setLatitude(values[0].coords.latitude)
                setLongitude(values[0].coords.longitude)
                if (values[1] && values[1].id) {
                  setSignedIn(true)
                  setLoadingStatus(false)
                } else {
                  setSignedIn(false)
                  setLoadingStatus(false)
                }
              })
              .catch((error) => {
                setLoadingStatus(false)
                setLoadingStatus(false)
              })
          }
        }
      } catch (error) {}
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
  console.log(isLoading, !loaded, isSignedIn, "owthami loading status")
  return (
    <Context.Provider value={{ latitude: latitude, longitude: longitude }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoading || !loaded ? (
            <Stack.Screen
              name="logoScreen"
              component={LogoScreen}
              options={{ headerShown: false }}
            />
          ) : isSignedIn ? (
            <>
              <Stack.Screen
                name="bottomTab"
                component={BottomTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="pickYourChoice"
                component={PickYourChoice}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
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
    </Context.Provider>
  )
}
