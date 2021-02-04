// react
import React, { Component } from "react"
// react-navigation
import { createStackNavigator } from "@react-navigation/stack"
// screens
import AddDateToCalender from "./AddDateToCalender"
import FrappyPlannerCalendar from "./FrappyPlannerCalendar"
import FrappyPlannerCards from "./FrappyPlannerCards"
import Notifications from "./Notifications"

// creating stack for navigation screens
const Stack = createStackNavigator()

class CalenderScreens extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="frappyCalender"
          component={FrappyPlannerCalendar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addDateToCalender"
          component={AddDateToCalender}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="frappyCards"
          component={FrappyPlannerCards}
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
export default CalenderScreens
