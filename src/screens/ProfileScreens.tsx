// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator } from '@react-navigation/stack'
// screens
import Profile from './Profile'
import AccountSettings from './AccountSettings'
import ProfileScreen from './ProfileScreen'

// creating stack for navigation
const Stack = createStackNavigator()

class ProfileScreens extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="profileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="accountSettings"
                    component={AccountSettings}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        )
    }
}
export default ProfileScreens
