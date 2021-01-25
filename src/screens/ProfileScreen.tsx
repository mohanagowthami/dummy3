// react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
//icons
import { ForwardIcon } from '../../assets/svgs/icons/icons-directions'
import Notifications from '../../assets/svgs/icons/icons-profile/Notifications'
import Search from '../../assets/svgs/icons/icons-profile/Search'
import Share from '../../assets/svgs/icons/icons-profile/Share'
import Social from '../../assets/svgs/icons/icons-profile/Social'
import Settings from '../../assets/svgs/icons/icons-profile/Settings'
import Logout from '../../assets/svgs/icons/icons-profile/Logout'
// colors
import { colors } from '../lib/colors'

interface IProps {
    navigation: any
}
// divisioning of the screen
interface IDetailsType {
    profileDetails: Array<any>
}
// state - data
interface Istate {
    categoryData: IDetailsType
    activeIndex: number
    notificationsCount: number
}
// data
const details = {
    profileDetails: [
        {
            name: 'Rohit Sharma',
            image:
                'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            // 'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            place: 'Hyderabad',
        },
    ],
}

class ProfileScreen extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            categoryData: details,
            activeIndex: 0,
            notificationsCount: 0,
        }
    }

    render() {
        return (
            <ScrollView style={styles.maincontainer}>
                <View style={styles.profilecontainer}>
                    {this.state.categoryData.profileDetails.map(
                        (item, index) => {
                            const { name, image, place } = item
                            return (
                                <View style={styles.container} key={index}>
                                    <View style={styles.imageandbackicon}>
                                        <Image
                                            style={styles.profileimage}
                                            resizeMode="cover"
                                            source={{
                                                uri: image,
                                            }}
                                        />
                                        <Pressable
                                            // style={{ backgroundColor: 'cyan' }}
                                            onPress={() =>
                                                this.props.navigation.navigate(
                                                    'profile'
                                                )
                                            }
                                        >
                                            <ForwardIcon
                                                paddingTop={wp('20%')}
                                                width={wp('2.92%')}
                                                height={hp('2.86%')}
                                            />
                                        </Pressable>
                                    </View>
                                    <View style={styles.nameandplace}>
                                        <Text style={styles.name}>{name}</Text>
                                        <Text style={styles.place}>
                                            {place}
                                        </Text>
                                        <View style={styles.line} />
                                    </View>
                                </View>
                            )
                        }
                    )}
                </View>
                <View style={styles.optionscontainer}>
                    <View style={styles.optioncontainer}>
                        <Notifications
                            width={wp('5.86%')}
                            height={hp('2.89%')}
                        />
                        <Text style={styles.optionstext}>Notifications</Text>
                        <View style={styles.notificationcount}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    color: colors.white,
                                    fontSize: wp('3%'),
                                }}
                            >
                                3
                                {/* <Text>{this.state.notificationsCount}</Text> */}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Search width={wp('5.86%')} height={hp('2.89%')} />
                        <Text style={styles.optionstext}>Search</Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Share width={wp('5.86%')} height={hp('2.89%')} />
                        <Text style={styles.optionstext}>
                            Share with your friends
                        </Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Social width={wp('5.86%')} height={hp('2.89%')} />
                        <Text style={styles.optionstext}>Social</Text>
                    </View>
                    <Pressable
                        onPress={() =>
                            this.props.navigation.navigate('accountSettings')
                        }
                    >
                        <View style={styles.optioncontainer}>
                            <Settings
                                width={wp('5.86%')}
                                height={hp('2.89%')}
                            />
                            <Text style={styles.optionstext}>Settings</Text>
                        </View>
                    </Pressable>
                    <View style={styles.optioncontainer}>
                        <Logout width={wp('5.86%')} height={hp('2.89%')} />
                        <Text style={styles.optionstext}>Logout</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        paddingTop: hp('6.02%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        paddingBottom: hp('1%'),
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        display: 'flex',
        flex: 1,
    },
    profilecontainer: {
        display: 'flex',
        flex: 1,
        paddingTop: hp('0.5%'),
    },
    imageandbackicon: {
        display: 'flex',
        flexDirection: 'row',
        // width:wp(""),
        // height: wp('12.368%'),
        paddingRight: wp('12.8%'),
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    profileimage: {
        width: wp('25.006%'),
        height: wp('20.368%'),
        borderRadius: wp('2%'),
    },
    name: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.4%'),
        color: colors.namecolor,
    },
    place: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('3.73%'),
        paddingTop: hp('1.052%'),
        color: colors.grey,
    },
    nameandplace: {
        paddingTop: hp('3.55%'),
        paddingBottom: hp('6.93%'),
        lineHeight: hp('1.1%'),
    },
    line: {
        height: hp('0.3%'),
        width: wp('85%'),
        borderRadius: 4,
        marginTop: hp('3.42%'),
        backgroundColor: colors.lightGreyTwo,
    },
    optionscontainer: {
        display: 'flex',
        flex: 1,
        // backgroundColor: 'yellow',
        // alignItems: 'center',
    },
    optioncontainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: wp('5.86%'),
        paddingBottom: hp('5.92%'),
        // justifyContent: 'center',
        // backgroundColor: 'cyan',
    },
    optionstext: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.8%'),
        color: colors.optionsblack,
        paddingLeft: wp('13.33%'),
    },
    notificationcount: {
        width: wp('7.2%'),
        height: wp('7.2%'),
        marginLeft: wp('25.33%'),
        backgroundColor: colors.orange,
        borderRadius: wp('3.6%'),
        justifyContent: 'center',
    },
})
export default ProfileScreen
