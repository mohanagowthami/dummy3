// react
import React, { Component } from 'react'
// react-navigation
import { createStackNavigator } from '@react-navigation/stack'
// screens
import HomeScreen from './HomeScreen'
import ItemInDetailScreen from './ItemInDetailScreen'
import LocalFavourites from './LocalFavourites'
import ReviewsAndRating from './ReviewsAndRating'
import FeedBackScreen from './FeedBackScreen'
import FoodSearchResults from './FoodResults'
import RestaurantsNearYou from './RestaurantsNearYou'
import Navigation from './Navigation'
import Notifications from './Notifications'
import Recap from './RecapScreen'
import HallOfFame from './HallOfFameScreen'

// creating stack for navigation screens
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
                    name="itemInDetail"
                    component={ItemInDetailScreen}
                    options={{
                        headerShown: false,
                    }}
                />
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
                    name="restaurantsNearYou"
                    component={RestaurantsNearYou}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="navigation"
                    component={Navigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="localFavourites"
                    component={LocalFavourites}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="recap"
                    component={Recap}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="hallOfFame"
                    component={HallOfFame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="searchFoodResults"
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
export default HomeScreens
