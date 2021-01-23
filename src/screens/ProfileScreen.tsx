import { ScrollView } from 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'

import BackIcon from '../../assets/svgs/icons/BackIcon'
import ForwardIcon from '../../assets/svgs/icons/ForwardIcon'
//icons
import Notifications from '../../assets/svgs/icons/profile/Notifications'
import Search from '../../assets/svgs/icons/profile/Search'
import Share from '../../assets/svgs/icons/profile/Share'
import Social from '../../assets/svgs/icons/profile/Social'
import Settings from '../../assets/svgs/icons/profile/Settings'
import Logout from '../../assets/svgs/icons/profile/Logout'

import CustomButton from '../components/common/CustomButton'
import CustomTextField from '../components/common/CustomTextField'
// colors
import { colors } from '../lib/colors'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

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
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
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
                                <View style={styles.container}>
                                    <View style={styles.imageandbackicon}>
                                        <Image
                                            style={styles.profileimage}
                                            resizeMode="cover"
                                            source={{
                                                uri: image,
                                            }}
                                        />
                                        <Pressable
                                            onPress={() =>
                                                this.props.navigation.navigate(
                                                    'profile'
                                                )
                                            }
                                        >
                                            <ForwardIcon />
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
                        <Notifications />
                        <Text style={styles.optionstext}>Notifications</Text>
                        <View style={styles.notificationcount}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    color: colors.white,
                                }}
                            >
                                3
                                {/* <Text>{this.state.notificationsCount}</Text> */}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Search />
                        <Text style={styles.optionstext}>Search</Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Share />
                        <Text style={styles.optionstext}>
                            Share with your friends
                        </Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Social />
                        <Text style={styles.optionstext}>Social</Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Settings />
                        <Text style={styles.optionstext}>Settings</Text>
                    </View>
                    <View style={styles.optioncontainer}>
                        <Logout />
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
        paddingRight: wp('12.8%'),
        justifyContent: 'space-between',
    },
    profileimage: {
        width: wp('25.006%'),
        height: wp('12.368%'),
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
        // display: 'flex',
        // flex: 1,
        width: wp('7.2%'),
        height: hp('3.55%'),
        marginLeft: wp('25.33%'),
        backgroundColor: colors.orange,
        borderRadius: hp('1.77%'),
        justifyContent: 'center',
    },
})
export default ProfileScreen
