import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../components/common/CustomButton'
import CustomTextField from '../components/common/CustomTextField'
import { colors } from '../lib/colors'
import Svg, { SvgCssUri } from 'react-native-svg'
import WelcomeSvg from '../../assets/svgs/WelcomeSvg'
import GetDimensions from '../components/common/GetDimensions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import FacebookSvg from '../../assets/svgs/FacebookSvg'
import TwitterSvg from '../../assets/svgs/TwitterSvg'
import GoogleSvg from '../../assets/svgs/GoogleSvg'

// props for login screen
interface ILoginScreen {
    navigation: any
}
// LoginScreen class definition
class LoginScreen extends React.Component<ILoginScreen, {}> {
    _isMounted = false
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }

    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    // callBack function
    callBack = (value: string) => console.log(value, 'on call back value')

    // navigate to signUp page
    handleNavigation = () => {
        console.log('signUp')
        this.props.navigation.navigate('signUp')
    }

    // Get OTP Button function
    onPressOTPButton = () => {}
    render() {
        // navigation as prop
        const { navigation } = this.props
        const styles = StyleSheet.create({
            container: {
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                paddingTop: hp('3.68%'),
                paddingRight: wp('7.4%'),
                paddingLeft: wp('7.2%'),
                paddingBottom: hp('5.52%'),
                padding: '10%',
                backgroundColor: colors.white,
            },
            tinyLogo: {
                width: '90%',
                height: '30%',
            },
            loginText: {
                color: colors.darkBlack,
                margin: '1%',
                marginTop: hp('2.56%'),
                fontSize: hp('4.069%'),
                fontFamily: 'AirbnbCerealBold',
            },
            inputBox: {
                marginTop: '7%',
                //marginBottom: hp("5%"),
            },
            loginBottom: {
                display: 'flex',
                width: wp('54.66%'),
                height: hp('24.41%'),
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '7%',
            },
            loginButtonBox: {
                // marginTop: '7%',
                // marginBottom: '7%',
            },
            loginWith: {
                fontSize: hp('2.36%'),
                marginTop: hp('8.28%'),
                marginBottom: hp('5.92%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.lightBlack,
            },
            newToFrappy: {
                fontSize: hp('1.842%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.lightBlack,
            },
            signUp: {
                fontSize: hp('1.842%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.orange,
            },
            socialIconsContainer: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: wp('54.66%'),
                // height: hp('7.23%'),
            },
        })

        return (
            <ScrollView
                style={{ display: 'flex', flex: 1, backgroundColor: 'white' }}
            >
                <View style={styles.container}>
                    <WelcomeSvg
                        style={{
                            marginTop: hp('9.47%'),
                            width: wp('66.35%'),
                            height: hp('23.25%'),
                        }}
                    />
                    <Text style={styles.loginText}>Login</Text>
                    <CustomTextField
                        onCallBack={this.callBack}
                        placeholder="Mobile Number"
                        style={styles.inputBox}
                    />
                    <CustomButton
                        title="Get OTP"
                        buttonType="basic"
                        onPressButton={this.onPressOTPButton}
                        style={styles.loginButtonBox}
                    />

                    <View style={styles.loginBottom}>
                        <Text style={styles.loginWith}>Or Login with...</Text>
                        <View style={styles.socialIconsContainer}>
                            <FacebookSvg
                                width={wp('14.66%')}
                                height={hp('7.23%')}
                            />
                            <TwitterSvg
                                width={wp('14.66%')}
                                height={hp('7.23%')}
                            />
                            <GoogleSvg
                                width={wp('14.66%')}
                                height={hp('7.23%')}
                            />
                        </View>
                        <Text style={{ marginTop: hp('4.73%') }}>
                            <Text style={styles.newToFrappy}>
                                New to Frappy?{' '}
                            </Text>
                            <Text
                                style={styles.signUp}
                                onPress={this.handleNavigation}
                            >
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default LoginScreen
