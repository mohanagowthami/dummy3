import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
// SVGs
import FacebookSvg from '../../assets/svgs/FacebookSvg'
import GoogleSvg from '../../assets/svgs/GoogleSvg'
import TwitterSvg from '../../assets/svgs/TwitterSvg'
import WelcomeSvg from '../../assets/svgs/WelcomeSvg'
// SignUp Form
import SignUpForm from '../forms/SignUpForm'
import { colors } from '../lib/colors'
import Modal from 'react-native-modal'
// Custom Button & Custom TextField
import CustomButton from '../components/common/CustomButton'
import CustomTextField from '../components/common/CustomTextField'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

//interface for signup screen
interface ISignUpScreen {
    navigation: any
}
// interface for modal state
interface State {
    modalVisible: any
}
//Main Class
class SignUpScreen extends React.Component<ISignUpScreen, State> {
    _isMounted = false
    constructor(props: ISignUpScreen) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }
    // check mounting of component
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }
    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    // Verify & Continue Function
    onPressVerifyAndContinue = () => {
        this.setModalVisible()
    }

    // Modal function for pop up
    renderModalContent = () => {
        const styles = StyleSheet.create({
            modalContainer: {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: colors.white,
                padding: '5%',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: wp('90%'),
            },
            modalTitle: {
                fontSize: wp('4%'),
                fontStyle: 'normal',
                fontFamily: 'AirbnbCerealBold',
            },
            modalDescription: {
                fontSize: wp('3%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.grey,
                fontWeight: '400',
                margin: wp('3%'),
            },
            phonenumber: {
                fontSize: wp('3%'),
                fontFamily: 'AirbnbCerealBold',
                color: colors.grey,
                fontWeight: 'bold',
                margin: wp('3%'),
                textAlign: 'center',
                marginTop: 0,
            },
            codeText: {
                fontSize: wp('3%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.grey,
                fontWeight: '400',
                margin: wp('3%'),
            },
            resendOTP: {
                fontSize: wp('3%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.orange,
                fontWeight: '400',
                margin: wp('4%'),
            },
            otpFieldContainer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                marginVertical: '3%',
                marginTop: 0,
            },
            customTextFieldStyles: {
                width: wp('13.33%'),
                borderBottomColor: colors.darkGrey,
            },
        })

        return (
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>OTP Verification</Text>
                <Text style={styles.modalDescription}>
                    Enter the OTP you received to{' '}
                </Text>
                <Text style={styles.phonenumber}>+91-9100950567</Text>
                {/* OTP Section*/}
                <View style={styles.otpFieldContainer}>
                    <CustomTextField
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                    />
                    <CustomTextField
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                    />
                    <CustomTextField
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                    />
                    <CustomTextField
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                    />
                </View>

                <CustomButton
                    title="Verify and Continue"
                    buttonType="basic"
                    style={{ width: wp('69.33%') }}
                    onPressButton={this.onPressVerifyAndContinue}
                />
                <Text style={styles.codeText}>
                    Did’t receive code?
                    <Text style={styles.resendOTP}> Resend OTP</Text>
                </Text>
            </View>
        )
    }
    // Modal enabling function => True or False
    setModalVisible = () => {
        this.setState((prevState, props) => ({
            modalVisible: !prevState.modalVisible,
        }))
    }
    // Get OTP button sets the modal to true from initial false state
    onPressGetOTP = () => {
        this.setModalVisible()
    }
    // render
    render() {
        const { navigation } = this.props
        const { modalVisible } = this.state
        const styles = StyleSheet.create({
            container: {
                display: 'flex',
                backgroundColor: '#fff',
                alignItems: 'center',
                padding: '10%',
                paddingBottom: 0,
                position: 'relative',
            },
            loginText: {
                color: colors.darkBlack,
                margin: '1%',
                fontSize: hp('4.069%'),
                fontFamily: 'AirbnbCerealBold',
            },
            loginBottom: {
                display: 'flex',
                width: wp('100%'),
                height: hp('25%'),
                backgroundColor: '#fff',
                marginBottom: '7%',

                alignItems: 'center',
                justifyContent: 'space-between',
            },
            loginButtonBox: {
                marginTop: '7%',
                marginBottom: '7%',
            },
            loginWith: {
                fontSize: hp('2.02%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.lightBlack,
                //marginTop: hp("4.61%"),
            },
            haveAnAccount: {
                fontSize: hp('1.576%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.lightBlack,
            },
            signIn: {
                fontSize: hp('1.576%'),
                fontFamily: 'AirbnbCerealBook',
                color: colors.orange,
            },
            socialIconsContainer: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '60%',
            },
        })
        return (
            <>
                {this.state.modalVisible && (
                    <View>
                        <Modal
                            isVisible={this.state.modalVisible}
                            backdropColor={colors.white}
                            backdropOpacity={0.9}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* This call renders the modal*/}
                                {this.renderModalContent()}
                            </View>
                        </Modal>
                    </View>
                )}
                <ScrollView>
                    <View style={styles.container}>
                        <WelcomeSvg
                            width={wp('66.35%')}
                            height={hp('19.90%')}
                        />
                        <Text style={styles.loginText}>SignUp</Text>
                        <SignUpForm onPressGetOTP={this.onPressGetOTP} />

                        <View style={[styles.loginBottom]}>
                            <Text style={styles.loginWith}>
                                Or Login with...
                            </Text>
                            <View style={styles.socialIconsContainer}>
                                <FacebookSvg
                                    width={wp('14.66%')}
                                    height={hp('6.19')}
                                />
                                <TwitterSvg
                                    width={wp('14.66%')}
                                    height={hp('6.19')}
                                />
                                <GoogleSvg
                                    width={wp('14.66%')}
                                    height={hp('6.19')}
                                />
                            </View>
                            <Text>
                                <Text style={styles.haveAnAccount}>
                                    Already have an account?
                                </Text>
                                <Text
                                    style={styles.signIn}
                                    onPress={() =>
                                        this.props.navigation.navigate('login')
                                    }
                                >
                                    Sign In
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}
export default SignUpScreen
