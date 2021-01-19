import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ExploreScreen from '../screens/ExploreScreen'
import LuckyCardsScreen from '../screens/LuckyCardsScreen'
import CalenderScreen from '../screens/CalenderScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { colors } from '../lib/colors'
import * as Svg from 'react-native-svg'
import ProfileSvg from '../../assets/svgs/ProfileSvg'
import CalenderSvg from '../../assets/svgs/CalendarSvg'
import HappySvg from '../../assets/svgs/HappySvg'
import HomeSvg from '../../assets/svgs/HomeSvg'
import DirectionSvg from '../../assets/svgs/DirectionSvg'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

const Tab = createBottomTabNavigator()
class BottomTab extends React.Component<{}, {}> {
    // check mounting of component
    componentDidMount() {
        loc(this)
    }
    componentWillUnMount() {
        rol()
    }
    render() {
        return (
            <Tab.Navigator
                sceneContainerStyle={{ paddingTop: hp('3%') }}
                tabBarOptions={{
                    activeTintColor: colors.orange,
                }}
            >
                <Tab.Screen
                    name="home"
                    component={HomeScreen}
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
                            <DirectionSvg
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
                    component={CalenderScreen}
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
                    component={ProfileScreen}
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
