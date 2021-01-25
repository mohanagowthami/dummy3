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
} from 'react-native-responsive-screen'
// react-native / NewAppScreen
import { Colors } from 'react-native/Libraries/NewAppScreen'
// icons
import { ForwardIcon } from '../../assets/svgs/icons/icons-directions'
import {
    Profile,
    Facebook,
    Refer,
    NotificationsTwo,
    Logout,
    FAQ,
    Rating,
} from '../../assets/svgs/icons/icons-profile'

// colors
import { colors } from '../lib/colors'

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
        representationSvg: Profile,
        title: 'Profile Information',
        description: 'Change your account information',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: Facebook,
        title: 'Add Social Account',
        description: 'Add Facebook, Twitter etc ',
        actionIcon: ForwardIcon,
    },
    {
        representationSvg: Refer,
        title: 'Refer to Friends',
        description: 'Get $10 for reffering friends',
        actionIcon: ForwardIcon,
    },
]

const notificationsList = [
    {
        representationSvg: NotificationsTwo,
        title: 'Push Notifications',
        description: 'For daily update you will get it',
        actionIcon: Switch,
    },
    {
        representationSvg: NotificationsTwo,
        title: 'SMS Notifications',
        description: 'For daily update you will get it',
        actionIcon: Switch,
    },
    {
        representationSvg: NotificationsTwo,
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

    renderSettings = (list: any) => {
        return (
            <View style={{ marginVertical: wp('5%') }}>
                {list.map((element: any, index: number) => {
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
                                            color={colors.greyTwo}
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
                                        {title !== 'Logout' && (
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

                                {list === notificationsList ? (
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
                                            this.state.switchArray[index]
                                                .isEnabled
                                        }
                                        style={{
                                            transform: [
                                                { scaleX: wp('0.4%') },
                                                { scaleY: wp('0.4%') },
                                            ],
                                        }}
                                    />
                                ) : (
                                    <ActionIcon
                                        width={wp('4%')}
                                        height={wp('4%')}
                                    />
                                )}
                            </View>
                            {description !=
                                (accountList[2].description &&
                                    moreList[2].description) && (
                                <View
                                    style={{
                                        width: '100%',
                                        height: wp('0.05%'),
                                        backgroundColor: colors.lightGreyFive,
                                        marginLeft: wp('12%'),
                                    }}
                                />
                            )}
                        </View>
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
                    {this.renderSettings(accountList)}
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
                    {this.renderSettings(notificationsList)}
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
                    {this.renderSettings(moreList)}
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
