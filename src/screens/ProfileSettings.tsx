import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

import CustomButton from '../components/buttons/CustomButton'
import CustomTextField from '../components/input-controllers/CustomTextField'
import BackIcon from '../../assets/svgs/icons/BackIcon'

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

/// acount settings -> profile settings -> this page {navigation}

class ProfileSettings extends Component<IProps, Istate> {
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
            <View style={styles.maincontainer}>
                <View style={styles.heading}>
                    <View style={styles.backicon}>
                        <Pressable
                            onPress={() =>
                                this.props.navigation.navigate(
                                    'accountSettings'
                                )
                            }
                        >
                            <BackIcon
                                width={wp('3.13%')}
                                height={hp('2.84%')}
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.profset}>Profile Settings</Text>
                </View>
                <View
                    style={{
                        paddingLeft: wp('5.33%'),
                        paddingRight: wp('5.33%'),
                    }}
                >
                    <View>
                        <Text style={styles.options}>FULL NAME</Text>
                        <CustomTextField
                            placeholder="User Name"
                            style={[styles.inputBox]}
                        />
                    </View>
                    <View>
                        <Text style={styles.options}>EMAIL ADDRESS</Text>
                        <CustomTextField
                            placeholder="Email Id"
                            style={styles.inputBox}
                        />
                    </View>
                    <View>
                        <Text style={styles.options}>PHONE NUMBER</Text>
                        <CustomTextField
                            placeholder="Phone Number"
                            style={styles.inputBox}
                        />
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        paddingTop: hp('40.94%'),
                        // backgroundColor: 'black',
                    }}
                >
                    <CustomButton
                        title="Change Settings"
                        buttonStyles={{ width: wp('89.66%') }}
                        onPressButton={() => {
                            console.log('Change Setting')
                        }}
                    />
                </View>
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
    backicon: {
        paddingLeft: wp('7.44%'),
        paddingTop: hp('2%'),
        paddingRight: wp('15.46%'),
    },
    heading: {
        display: 'flex',
        paddingTop: hp('1%'),
        paddingBottom: hp('5.52%'),
        flexDirection: 'row',
    },
    profset: {
        fontFamily: 'ArchivoBold',
        fontSize: wp('5%'),
        paddingTop: hp('2%'),
        // justifyContent: 'center',
        paddingLeft: wp('6%'),
    },
    inputBox: {
        // marginTop: '7%',
        fontFamily: 'ArchivoRegular',
        width: wp('80%'),
        fontSize: wp('4.22%'),
        marginBottom: hp('2.5%'),
    },
    options: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('3.2%'),
        alignItems: 'center',
        color: '#7A869A',
    },
})
export default ProfileSettings
