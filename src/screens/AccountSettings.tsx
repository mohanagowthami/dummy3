// react
import React, { Component } from 'react'
// react-native
import {
    Text,
    StyleSheet,
    View,
    Switch,
    ScrollView,
    SafeAreaView,
    Pressable,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
// colors
import { colors } from '../lib/colors'
// icons
import ForwardIcon from '../../assets/svgs/icons/ForwardIcon'
import ProfileIcon from '../../assets/svgs/icons/profile/Profile'
import FacebookIcon from '../../assets/svgs/icons/profile/Facebook'
import ShareIcon from '../../assets/svgs/icons/profile/ShareTwo'
import Notifications from '../../assets/svgs/icons/profile/NotificationsTwo'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Rating } from '../../assets/svgs'
import Logout from '../../assets/svgs/icons/profile/Logout'
import FAQ from '../../assets/svgs/icons/profile/FrequentlyAskedQuestions'

interface IProps {
    navigation: any
}

interface IState {
    switchArray: Array<{
        name: string
        isEnabled: boolean
    }>
}

const accountList = [
    {
        representationSvg: ProfileIcon,
        title: 'Profile Information',
        description: 'Change your account information',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: FacebookIcon,
        title: 'Add Social Account',
        description: 'Add Facebook, Twitter etc ',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: ShareIcon,
        title: 'Refer to Friends',
        description: 'Get $10 for reffering friends',
        actionIcon: ForwardIcon,
    },
]

const notificationsList = [
    {
        representationSvg: Notifications,
        title: 'Push Notifications',
        description: 'For daily update you will get it',
        actionIcon: Switch,
    },
    {
        representationSvg: Notifications,
        title: 'SMS Notifications',
        description: 'For daily update you will get it',
        actionIcon: Switch,
    },
    {
        representationSvg: Notifications,
        title: 'Promotional Notifications',
        description: 'For daily update you will get it',
        actionIcon: Switch,
    },
]

const moreList = [
    {
        representationSvg: Rating,
        title: 'Rate Us',
        description: 'Rate us playstore, appstor',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: FAQ,
        title: 'FAQ',
        description: 'Frequently asked questions',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: Logout,
        title: 'Logout',
        actionIcon: ForwardIcon,
    },
]

class AccountSettings extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            switchArray: [
                {
                    name: 'push',
                    isEnabled: false,
                },
                {
                    name: 'push',
                    isEnabled: false,
                },
                {
                    name: 'push',
                    isEnabled: false,
                },
            ],
        }
    }

    toggleSwitch = (index: number) => {
        let dummySwitchArray = [...this.state.switchArray]
        dummySwitchArray[index].isEnabled = !dummySwitchArray[index].isEnabled
        this.setState({ switchArray: dummySwitchArray })
    }
    renderNotifications = () => {
        return (
            <View style={{ marginVertical: wp('5%') }}>
                {notificationsList.map((element, index) => {
                    const {
                        representationSvg: RepresentationSvg,
                        title,
                        description,
                        actionIcon: ActionIcon,
                    } = element

                    return (
                        <View key={index}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: wp('5%'),
                                    paddingRight: wp('4%'),
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: wp('10%'),
                                            marginRight: wp('2%'),
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <RepresentationSvg
                                            width={wp('7%')}
                                            height={wp('7%')}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: 'ArchivoRegular',
                                                fontSize: wp('4.2%'),
                                                color: colors.darkBlack,
                                                lineHeight: wp('4.2%'),
                                                letterSpacing: 0.28,
                                                fontWeight: '400',
                                                marginBottom: wp('3%'),
                                            }}
                                        >
                                            {title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'AirbnbCerealBook',
                                                fontSize: wp('3.8%'),
                                                lineHeight: wp('4.2%'),
                                                color: colors.grey,
                                                letterSpacing: 0.28,
                                            }}
                                        >
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                                <ActionIcon
                                    trackColor={{
                                        false: colors.lightGreyThree,
                                        true: 'green',
                                    }}
                                    thumbColor={colors.white}
                                    ios_backgroundColor={Colors.grey}
                                    onValueChange={() =>
                                        this.toggleSwitch(index)
                                    }
                                    value={
                                        this.state.switchArray[index].isEnabled
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: wp('0.4%') },
                                            { scaleY: wp('0.4%') },
                                        ],
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: wp('0.05%'),
                                    backgroundColor: colors.lightGreyFive,
                                    marginLeft: wp('12%'),
                                }}
                            ></View>
                        </View>
                    )
                })}
            </View>
        )
    }

    renderMoreList = () => {
        return (
            <View style={{ marginVertical: wp('5%') }}>
                {moreList.map((element, index) => {
                    const {
                        representationSvg: RepresentationSvg,
                        title,
                        description,
                        actionIcon: ActionIcon,
                    } = element

                    return (
                        <View key={index}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: description
                                        ? wp('5%')
                                        : wp('10%'),
                                    paddingRight: wp('4%'),
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: wp('10%'),
                                            marginRight: wp('2%'),
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <RepresentationSvg
                                            width={wp('4.6%')}
                                            height={wp('4.6%')}
                                            color={colors.grey}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: 'ArchivoRegular',
                                                fontSize: wp('4.2%'),
                                                color: colors.darkBlack,
                                                lineHeight: wp('4.2%'),
                                                letterSpacing: 0.28,
                                                fontWeight: '400',
                                            }}
                                        >
                                            {title}
                                        </Text>
                                        {description && (
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'AirbnbCerealBook',
                                                    fontSize: wp('3.8%'),
                                                    lineHeight: wp('4.2%'),
                                                    color: colors.grey,
                                                    letterSpacing: 0.28,
                                                    marginTop: wp('3%'),
                                                }}
                                            >
                                                {description}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <ActionIcon
                                    width={wp('4%')}
                                    height={wp('4%')}
                                />
                            </View>
                            {description && (
                                <View
                                    style={{
                                        width: '100%',
                                        height: wp('0.05%'),
                                        backgroundColor: colors.lightGreyFive,
                                        marginLeft: wp('12%'),
                                    }}
                                ></View>
                            )}
                        </View>
                    )
                })}
            </View>
        )
    }

    onPressSettings = (name: string) => {
        if (name === 'Profile Information')
            this.props.navigation.navigate('profile')
    }

    renderAccountSettings = () => {
        return (
            <View style={{ marginVertical: wp('5%') }}>
                {accountList.map((element, index) => {
                    const {
                        representationSvg: RepresentationSvg,
                        title,
                        description,
                        actionIcon: ActionIcon,
                    } = element

                    return (
                        <Pressable
                            key={index}
                            onPress={() => this.onPressSettings(title)}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: wp('5%'),
                                    paddingRight: wp('5%'),
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: wp('10%'),
                                            marginRight: wp('2%'),
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <RepresentationSvg
                                            width={
                                                index === 0
                                                    ? wp('4%')
                                                    : wp('7%')
                                            }
                                            height={
                                                index === 0
                                                    ? wp('4%')
                                                    : wp('7%')
                                            }
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: 'ArchivoRegular',
                                                fontSize: wp('4.2%'),
                                                color: colors.darkBlack,
                                                lineHeight: wp('4.2%'),
                                                letterSpacing: 0.28,
                                                fontWeight: '400',
                                                marginBottom: wp('3%'),
                                            }}
                                        >
                                            {title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'AirbnbCerealBook',
                                                fontSize: wp('3.8%'),
                                                lineHeight: wp('4.2%'),
                                                color: colors.grey,
                                                letterSpacing: 0.28,
                                            }}
                                        >
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                                <ActionIcon
                                    width={wp('4%')}
                                    height={wp('4%')}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: wp('0.05%'),
                                    backgroundColor: colors.lightGreyFive,
                                    marginLeft: wp('12%'),
                                }}
                            ></View>
                        </Pressable>
                    )
                })}
            </View>
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Account Settings</Text>
                    <Text style={styles.description}>
                        Update your settings like notifications,
                        {'\n'}payments, profile edit etc.
                    </Text>
                    {this.renderAccountSettings()}
                    <Text
                        style={{
                            fontFamily: 'ArchivoRegular',
                            fontSize: wp('4.2%'),
                            color: colors.darkBlack,
                            lineHeight: wp('7.5%'),
                            fontWeight: '500',
                            letterSpacing: wp('0.05%'),
                        }}
                    >
                        NOTIFICATIONS
                    </Text>
                    {this.renderNotifications()}
                    <Text
                        style={{
                            fontFamily: 'ArchivoRegular',
                            fontSize: wp('4.2%'),
                            color: colors.darkBlack,
                            lineHeight: wp('7.5%'),
                            fontWeight: '500',
                            letterSpacing: wp('0.05%'),
                        }}
                    >
                        MORE
                    </Text>
                    {this.renderMoreList()}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: colors.white,
        display: 'flex',
        paddingRight: 0,
    },
    title: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('7.8%'),
        lineHeight: wp('9%'),
        letterSpacing: 0.18,
        marginBottom: wp('1%'),
    },
    description: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.2'),
        lineHeight: wp('7.8%'),
        letterSpacing: -0.4,
        color: colors.grey,
    },
})

export default AccountSettings
