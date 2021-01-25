// react
import React from 'react'
// react-native
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// icons
import {
    ProfileSvg,
    CalenderSvg,
    HappySvg,
    HomeSvg,
    ExploreSvg,
} from '../../../assets/svgs/icons/icons-bottomTab'
// screens
import ExploreScreen from '../../screens/ExploreScreen'
import LuckyCardsScreen from '../../screens/LuckyCardsScreen'
import HomeScreens from '../../screens/HomeScreens'
import ProfileScreens from '../../screens/ProfileScreens'
import CalenderScreens from '../../screens/CalendarScreens'
// colors
import { colors } from '../../lib/colors'

// creating bottom tab navigator
const Tab = createBottomTabNavigator()

class BottomTab extends React.Component<{}, {}> {
    render() {
        return (
            <Tab.Navigator
                sceneContainerStyle={{ paddingTop: hp('3%') }}
                tabBarOptions={{
                    activeTintColor: colors.orange,
                    keyboardHidesTabBar: true,
                }}
            >
                <Tab.Screen
                    name="home"
                    component={HomeScreens}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <HomeSvg
                                name="home"
                                fill={color}
                                width={wp('5.2%')}
                                height={hp('2.8%')}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="explore"
                    component={ExploreScreen}
                    options={{
                        tabBarLabel: 'Explore',
                        tabBarIcon: ({ color }) => (
                            <ExploreSvg
                                name="explore"
                                fill={color}
                                width={wp('5.2%')}
                                height={hp('2.8%')}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="luckyCards"
                    component={LuckyCardsScreen}
                    options={{
                        tabBarLabel: 'Lucky Cards',
                        tabBarIcon: ({ color }) => (
                            <HappySvg
                                name="luckyCards"
                                fill={color}
                                width={wp('5.2%')}
                                height={hp('2.8%')}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="calender"
                    component={CalenderScreens}
                    options={{
                        tabBarLabel: 'Calender',
                        tabBarIcon: ({ color }) => (
                            <CalenderSvg
                                name="calender"
                                fill={color}
                                width={wp('5.2%')}
                                height={hp('2.8%')}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="profile"
                    component={ProfileScreens}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <ProfileSvg
                                name="profile"
                                fill={color}
                                width={wp('5.2%')}
                                height={hp('2.8%')}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}
export default BottomTab
