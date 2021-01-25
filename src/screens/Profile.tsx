import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import BackIcon from '../../assets/svgs/icons/BackIcon'
import ForwardIcon from '../../assets/svgs/icons/ForwardIcon'
import Camera from '../../assets/svgs/icons/profile/Camera'
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
                'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
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
                        <View key={index}>
                            <View style={styles.container}>
                                <View
                                    style={{
                                        paddingLeft: wp('6.8%'),
                                        paddingTop: hp('3.57%'),
                                    }}
                                >
                                    <Pressable
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'accountSettings'
                                            )
                                        }
                                    >
                                        <BackIcon
                                            width={wp('2.92%')}
                                            height={hp('2.86%')}
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.imageandbackicon}>
                                    <View style={styles.imagecontainer}>
                                        <Image
                                            style={styles.profileimage}
                                            resizeMode="contain"
                                            source={{
                                                uri: image,
                                            }}
                                        />
                                        <View style={styles.cameraicon}>
                                            <Camera />
                                        </View>
                                    </View>
                                </View>
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
            <View style={styles.optionscontainer}>
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Username</Text>
                    <Text style={styles.details}>UserName</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Email</Text>
                    <Text style={styles.details}>Email</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Phone</Text>
                    <Text style={styles.details}>Phone</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Gender</Text>
                    <Text style={styles.details}>Gender</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Date of Birth</Text>
                    <Text style={styles.details}>Date of Birth</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <ScrollView style={styles.maincontainer}>
                {this._renderinfo()}
                {this._renderdetails()}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        flex: 1,
        paddingTop: hp('2.93%'),
        backgroundColor: colors.white,
    },
    profilecontainer: {
        display: 'flex',
        paddingTop: hp('1%'),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageandbackicon: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagecontainer: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: wp('25.4%'),
    },
    profileimage: {
        display: 'flex',
        position: 'relative',
        width: wp('38.93%'),
        height: hp('19.210%'),
        alignSelf: 'center',
        marginLeft: wp('10%'),
        // paddingLeft: wp('8%'),
        borderRadius: wp('9.605%'),
    },
    cameraicon: {
        position: 'absolute',
        width: wp('8.66%'),
        height: wp('8.66%'),
        left: wp('47%'),
        top: hp('11.3%'),
        right: wp('3%'),
        borderRadius: wp('4.33%'),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
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
        // paddingBottom: hp('6.93%'),
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
    optionscontainer: {
        display: 'flex',
        padding: wp('7%'),
    },
    optioncontainer: {
        display: 'flex',
        flexDirection: 'row',
        // borderBottomColor: 'red',
        paddingTop: hp('3%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: wp('3%'),
    },
    heading: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.53%'),
        color: '#B8BBC6',
    },
    details: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.53%'),
        color: '#333A4D',
    },
})
export default Profile
