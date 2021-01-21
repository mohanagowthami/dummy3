import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import BackIcon from '../../assets/svgs/icons/BackIcon'
import ForwardIcon from '../../assets/svgs/icons/ForwardIcon'
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

class Profile extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            categoryData: details,
            activeIndex: 0,
            notificationsCount: 0,
        }
    }
    _renderinfo = () => {
        return (
            <View style={styles.profilecontainer}>
                {this.state.categoryData.profileDetails.map((item, index) => {
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
                            </View>
                            <View style={styles.nameandplace}>
                                <Text style={styles.name}>{name}</Text>
                                <Text style={styles.place}>{place}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
    _renderdetails = () => {
        return (
            <View>
                <Text>Username</Text>
                <Text>UserName</Text>
                <View style={styles.line} />
                <Text>Email</Text>
                <Text>Email</Text>
                <View style={styles.line} />
                <Text>Phone</Text>
                <Text>Phone</Text>
                <View style={styles.line} />
                <Text>Gender</Text>
                <Text>Gender</Text>
                <View style={styles.line} />
                <Text>Date of Birth</Text>
                <Text>Date of Birth</Text>
                <View style={styles.line} />
            </View>
        )
    }
    render() {
        return (
            <View style={styles.maincontainer}>
                <View>
                    <BackIcon />
                    <View>{/* <Image /> */}</View>
                </View>
                <Text>Profile</Text>
                {this._renderinfo()}
                {this._renderdetails()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        flex: 1,
        paddingTop: hp('2.93%'),
    },
    profilecontainer: {
        display: 'flex',
        paddingTop: hp('0.5%'),
    },
    container: {
        display: 'flex',
    },
    imageandbackicon: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: wp('12.8%'),
        // justifyContent: 'space-between',
    },
    profileimage: {
        display: 'flex',
        width: wp('25.006%'),
        height: wp('12.368%'),
        alignSelf: 'center',
    },
    name: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.4%'),
        alignSelf: 'center',
        color: colors.namecolor,
    },
    place: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('3.73%'),
        paddingTop: hp('1.052%'),
        alignSelf: 'center',
        color: colors.grey,
    },
    nameandplace: {
        paddingTop: hp('3.55%'),
        paddingBottom: hp('6.93%'),
        lineHeight: hp('1.1%'),
    },
    backicon: {
        paddingLeft: wp('7.44%'),
        paddingTop: hp('0.1%'),
        paddingRight: wp('15.46%'),
    },
    line: {
        height: hp('0.3%'),
        width: wp('85%'),
        borderRadius: 4,
        marginTop: hp('3.42%'),
        backgroundColor: colors.lightGreyTwo,
    },
})
export default Profile
