// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator } from '@react-navigation/stack'
// screens
import HomeScreen from './HomeScreen'
import ItemInDetailScreen from './ItemInDetailScreen'
import LocalFavourites from './LocalFavourites'

const Stack = createStackNavigator()
class HomeScreens extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="localFavourites"
                    component={LocalFavourites}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="itemInDetail"
                    component={ItemInDetailScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )
    }
}
export default HomeScreens
