// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
// screens
import HomeScreen from './HomeScreen'
import ItemInDetailScreen from './ItemInDetailScreen'
import LocalFavourites from './LocalFavourites'
import ReviewsAndRating from './ReviewsAndRating'
import FeedBackScreen from './FeedBackScreen'

const Stack = createStackNavigator()
class HomeScreens extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="feedBack"
                    component={FeedBackScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="reviewsAndRating"
                    component={ReviewsAndRating}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="itemInDetail"
                    component={ItemInDetailScreen}
                    options={{
                        headerShown: false,
                    }}
                />
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
            </Stack.Navigator>
        )
    }
}
export default HomeScreens
