// react
import React from "react"
// react-native
import { StyleSheet } from "react-native"
// react-navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// expo location

// icons
import {
  ProfileSvg,
  CalenderSvg,
  HappySvg,
  HomeSvg,
  ExploreSvg,
} from "../../../assets/svgs/icons/icons-bottomTab"
// screens
import ExploreScreen from "../../screens/ExploreScreen"
import LuckyCardsScreen from "../../screens/LuckyCardsScreen"
import HomeScreens from "../../screens/HomeScreens"
import ProfileScreens from "../../screens/ProfileScreens"
import CalenderScreens from "../../screens/CalendarScreens"
// colors
import { colors } from "../../lib/colors"
import RestaurantsNearYou from "../../screens/RestaurantsNearYou"
import { Context } from "../../lib/content"

// creating bottom tab navigator
const Tab = createBottomTabNavigator()

interface IState {
  latitude: number | null
  longitude: number | null
}
class BottomTab extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    {
      this.state = {
        latitude: null,
        longitude: null,
      }
    }
  }

  async componentDidMount() {}

  render() {
    const { latitude, longitude } = this.state
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.orange,
          keyboardHidesTabBar: true,
          labelPosition: "below-icon",
          style: styles.tabBarStyles,
          labelStyle: styles.label,
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreens}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <HomeSvg
                name="home"
                fill={color}
                width={wp("5.86%")}
                height={hp("2.89%")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="explore"
          component={RestaurantsNearYou}
          options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color }) => (
              <ExploreSvg
                name="explore"
                fill={color}
                width={wp("5.86%")}
                height={hp("2.89%")}
              />
            ),
          }}
        />

        <Tab.Screen
          name="luckyCards"
          component={LuckyCardsScreen}
          options={{
            tabBarLabel: "Lucky Cards",
            tabBarIcon: ({ color }) => (
              <HappySvg
                name="luckyCards"
                fill={color}
                width={wp("5.86%")}
                height={hp("2.89%")}
              />
            ),
          }}
        />

        <Tab.Screen
          name="calender"
          component={CalenderScreens}
          options={{
            tabBarLabel: "Planner",
            tabBarIcon: ({ color }) => (
              <CalenderSvg
                name="calender"
                fill={color}
                width={wp("5.86%")}
                height={hp("2.89%")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreens}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <ProfileSvg
                name="profile"
                fill={color}
                width={wp("5.86%")}
                height={hp("2.89%")}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}
const styles = StyleSheet.create({
  tabBarStyles: {
    paddingTop: hp("1%"),
    height: hp("8%"),
  },
  label: {
    fontFamily: "AirbnbCerealBook",
    fontWeight: "500",
    fontSize: wp("3.2%"),
    marginTop: hp("0.92%"),
    paddingBottom: hp("1%"),
    textAlign: "center",
  },
})
export default BottomTab
