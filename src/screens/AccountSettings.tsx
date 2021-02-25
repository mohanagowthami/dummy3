// react
import React, { Component } from "react"
// react-native
import {
  Text,
  StyleSheet,
  View,
  Switch,
  ScrollView,
  Pressable,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"
// react-native / NewAppScreen
import { Colors } from "react-native/Libraries/NewAppScreen"
// icons
import { ForwardIcon } from "../../assets/svgs/icons/icons-directions"
import {
  Profile,
  Facebook,
  Refer,
  NotificationsTwo,
  Logout,
  FAQ,
  RatingGreen,
} from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"
// props
interface IProps {
  navigation: any
}
// state
interface IState {
  switchArray: Array<{
    name: string
    isEnabled: boolean
  }>
}

const accountList = [
  {
    representationSvg: Facebook,
    title: "Add Social Account",
    description: "Add Facebook, Twitter etc ",
    actionIcon: ForwardIcon,
  },
  {
    representationSvg: Refer,
    title: "Refer to Friends",
    description: "Get $10 for reffering friends",
    actionIcon: ForwardIcon,
  },
]

const notificationsList = [
  {
    representationSvg: NotificationsTwo,
    title: "Push Notifications",
    description: "For daily update you will get it",
    actionIcon: Switch,
  },
  {
    representationSvg: NotificationsTwo,
    title: "SMS Notifications",
    description: "For daily update you will get it",
    actionIcon: Switch,
  },
  {
    representationSvg: NotificationsTwo,
    title: "Promotional Notifications",
    description: "For daily update you will get it",
    actionIcon: Switch,
  },
]

const moreList = [
  {
    representationSvg: RatingGreen,
    title: "Rate Us",
    description: "Rate us playstore, appstor",
    actionIcon: ForwardIcon,
  },
  {
    representationSvg: FAQ,
    title: "FAQ",
    description: "Frequently asked questions",
    actionIcon: ForwardIcon,
  },
  {
    representationSvg: Logout,
    title: "Logout",
    actionIcon: ForwardIcon,
  },
]

class AccountSettings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      switchArray: [
        {
          name: "push",
          isEnabled: false,
        },
        {
          name: "push",
          isEnabled: false,
        },
        {
          name: "push",
          isEnabled: false,
        },
      ],
    }
  }

  onPressAction = (title: string) => {
    if (title === "Rate Us") {
      this.props.navigation.navigate("feedBack")
    }
  }
  toggleSwitch = (index: number) => {
    let dummySwitchArray = [...this.state.switchArray]
    dummySwitchArray[index].isEnabled = !dummySwitchArray[index].isEnabled
    this.setState({ switchArray: dummySwitchArray })
  }

  renderSettings = (list: any) => {
    return (
      <View style={styles.settingsContainer}>
        {list.map((element: any, index: number) => {
          const {
            representationSvg: RepresentationSvg,
            title,
            description,
            actionIcon: ActionIcon,
          } = element
          const { switchArray } = this.state
          return (
            <View key={index}>
              <View style={styles.profileContainer}>
                <Pressable
                  onPress={() => {
                    if (index == 0) {
                      this.props.navigation.navigate("profile", {
                        isEditable: false,
                      })
                    }
                  }}
                >
                  <View style={styles.settingContainer}>
                    <View style={styles.representationSvgContainer}>
                      <RepresentationSvg
                        width={wp("6%")}
                        height={hp("3%")}
                        color={colors.greyTwo}
                      />
                    </View>
                    <View>
                      <Text style={styles.titleText}>{title}</Text>
                      {title !== "Logout" && (
                        <Text style={styles.descriptionText}>
                          {description}
                        </Text>
                      )}
                    </View>
                  </View>
                </Pressable>

                {list === notificationsList ? (
                  <ActionIcon
                    trackColor={{
                      false: colors.lightGreyThree,
                      true: "green",
                    }}
                    thumbColor={colors.white}
                    ios_backgroundColor={Colors.grey}
                    onValueChange={() => this.toggleSwitch(index)}
                    value={switchArray[index].isEnabled}
                    style={styles.switch}
                  />
                ) : (
                  <Pressable onPress={() => this.onPressAction(title)}>
                    <ActionIcon width={wp("4%")} height={hp("2.3%")} />
                  </Pressable>
                )}
              </View>
              {description !=
                (accountList[2] &&
                  accountList[2].description &&
                  moreList[2].description) && (
                <View style={styles.borderLine} />
              )}
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>
            <Text style={styles.description}>
              Update your settings like notifications,
              {"\n"}payments, profile edit etc.
            </Text>
            {this.renderSettings(accountList)}
            <Text style={styles.settingsHeading}>NOTIFICATIONS</Text>
            {this.renderSettings(notificationsList)}
            <Text style={styles.settingsHeading}>MORE</Text>
            {this.renderSettings(moreList)}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp("2%"),
    paddingTop: hp("4%"),
    backgroundColor: colors.white,
    display: "flex",
    paddingRight: 0,
  },
  title: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("7.8%"),
    lineHeight: wp("9%"),
    letterSpacing: 0.18,
    marginBottom: wp("1%"),
  },
  description: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2"),
    lineHeight: wp("7.8%"),
    letterSpacing: -0.4,
    color: colors.grey,
  },
  settingsHeading: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2%"),
    color: colors.darkBlack,
    lineHeight: wp("7.5%"),
    fontWeight: "500",
    letterSpacing: wp("0.05%"),
  },
  settingsContainer: { marginVertical: wp("5%") },
  settingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: wp("5%"),
    paddingRight: wp("4%"),
  },
  representationSvgContainer: {
    width: wp("10%"),
    marginRight: wp("2%"),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2%"),
    color: colors.darkBlack,
    lineHeight: wp("4.2%"),
    letterSpacing: 0.28,
    fontWeight: "400",
  },
  descriptionText: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("3.8%"),
    lineHeight: wp("4.2%"),
    color: colors.grey,
    letterSpacing: 0.28,
    marginTop: wp("3%"),
  },
  switch: {
    transform: [{ scaleX: wp("0.4%") }, { scaleY: wp("0.4%") }],
  },
  borderLine: {
    width: "100%",
    height: wp("0.05%"),
    backgroundColor: colors.lightGreyFive,
    marginLeft: wp("12%"),
  },
})

export default AccountSettings
