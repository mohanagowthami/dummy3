import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
    Button,
} from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import FacebookSvg from '../../assets/svgs/FacebookSvg'
import GoogleSvg from '../../assets/svgs/GoogleSvg'
import TwitterSvg from '../../assets/svgs/TwitterSvg'

import WelcomeSvg from '../../assets/svgs/WelcomeSvg'
import SignUpForm from '../forms/SignUpForm'
import { colors } from '../lib/colors'
import Modal from 'react-native-modal'
import CustomButton from '../components/common/CustomButton'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import CustomTextField from '../components/common/CustomTextField'

interface ISignUpScreen {
    navigation: any
}

interface State {
    modalVisible: any
}

class SignUpScreen extends Component<ISignUpScreen, State> {
    constructor(props: ISignUpScreen) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    onPressVerifyAndContinue = () => {
        this.setModalVisible()
    }
    renderModalContent = () => {
        return (
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>OTP Verification</Text>
                <Text style={styles.modalDescription}>
                    Enter the OTP you received to{' '}
                </Text>
                <Text style={styles.phonenumber}>+91-9100950567</Text>
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
                    style={{ width: '90%' }}
                    onPressButton={this.onPressVerifyAndContinue}
                />
                <Text style={styles.codeText}>
                    Did’t receive code?
                    <Text style={styles.resendOTP}>Resend OTP</Text>
                </Text>
            </View>
        )
    }

    setModalVisible = () => {
        this.setState((prevState, props) => ({
            modalVisible: !prevState.modalVisible,
        }))
    }

    onPressGetOTP = () => {
        this.setModalVisible()
    }

    render() {
        const { navigation } = this.props
        const { modalVisible } = this.state
        return (
            <>
                {this.state.modalVisible && (
                    <View>
                        <Modal
                            isVisible={this.state.modalVisible}
                            backdropColor={colors.white}
                            backdropOpacity={0.7}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
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
        width: '90%',
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
        width: '10%',

        borderBottomColor: colors.darkGrey,
    },
})
