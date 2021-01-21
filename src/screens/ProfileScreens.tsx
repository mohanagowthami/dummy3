// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
// screens
import Profile from './Profile'
import ProfileSettings from './ProfileSettings'
import AccountSettings from './AccountSettings'
import ProfileScreen from './ProfileScreen'

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

                {/* <Stack.Screen
                    name="profileSettings"
                    component={ProfileSettings}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="accountSettings"
                    component={AccountSettings}
                    options={{
                        headerShown: false,
                        // headerTitleStyle: { color: 'white' },
                    }}
                />
            </Stack.Navigator>
        )
    }
}
export default ProfileScreens
