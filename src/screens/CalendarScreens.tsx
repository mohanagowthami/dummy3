// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator } from '@react-navigation/stack'
// screens
import ReviewsAndRating from './ReviewsAndRating'
import AddDateToCalender from './AddDateToCalender'

const Stack = createStackNavigator()
class CalenderScreens extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="addDate"
                    component={AddDateToCalender}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="reviewsAndRating"
                    component={ReviewsAndRating}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )
    }
}
export default CalenderScreens
