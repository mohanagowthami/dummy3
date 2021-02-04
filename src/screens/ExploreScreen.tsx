// react
import React, { Component } from "react"
// react-navigation
import { createStackNavigator } from "@react-navigation/stack"
// screens
import FoodSearchResults from "./FoodResults"
import Locations from "./Locations"
import Notifications from "./Notifications"

// creating stack for navigation screens
const Stack = createStackNavigator()

class ExploreScreen extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="locations"
          component={Locations}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="foodSearchResults"
          component={FoodSearchResults}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
}
export default ExploreScreen
