// react
import React, { Component } from "react"
// react-navigation
import { createStackNavigator } from "@react-navigation/stack"
// screens
import HomeScreen from "./HomeScreen"
import ItemInDetailScreen from "./ItemInDetailScreen"
import LocalFavourites from "./LocalFavourites"
import ReviewsAndRating from "./ReviewsAndRating"
import FeedBackScreen from "./FeedBackScreen"
import FoodSearchResults from "./FoodResults"
import RestaurantsNearYou from "./RestaurantsNearYou"
import Navigation from "./Navigation"
import Notifications from "./Notifications"
import Recap from "./RecapScreen"
import HallOfFame from "./HallOfFameScreen"
import Locations from "./Locations"

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
            </Stack.Navigator>
        )
    }
}
export default ExploreScreen

// // react
// import React, { Component } from 'react'
// // react-native
// import { Text, StyleSheet } from 'react-native'
// // react-native-responsive-screen
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen'
// import { SafeAreaView } from 'react-native-safe-area-context'

// class ExploreScreen extends Component<{}, {}> {
//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <Text
//                     style={{ fontFamily: 'ArchivoRegular', fontSize: wp('6%') }}
//                 >
//                     Explore Screen
//                 </Text>
//             </SafeAreaView>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         flex: 1,
//         paddingTop: hp('0.5%'),
//         padding: wp('1%'),
//     },
// })
// export default ExploreScreen
