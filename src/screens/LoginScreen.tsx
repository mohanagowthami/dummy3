// React
import React from 'react'
// React native
import { ScrollView, TextInput, View, Text, StyleSheet } from 'react-native'
// React native responsive screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
// Modal
import Modal from 'react-native-modal'
// components
import CustomButton from '../components/common/CustomButton'
import CustomTextField from '../components/common/CustomTextField'
// colors
import { colors } from '../lib/colors'
// Svgs
import WelcomeSvg from '../../assets/svgs/WelcomeSvg'
import FacebookSvg from '../../assets/svgs/FacebookSvg'
import TwitterSvg from '../../assets/svgs/TwitterSvg'
import GoogleSvg from '../../assets/svgs/GoogleSvg'

// props for login screen
interface ILoginScreen {
    navigation: any
}
// LoginScreen class definition
interface State {
    modalVisible: any
}
class LoginScreen extends React.Component<ILoginScreen, State> {
    _isMounted: boolean
    inputRef: any
    constructor(props: ILoginScreen) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.inputRef = Array(4).fill(React.createRef())
        this._isMounted = false
    }
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }

    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    // callBack function
    callBack = (value: string) => {
        console.log(value, 'on call back value')
    }

    // navigate to signUp page
    handleNavigation = () => {
        this.props.navigation.navigate('signUp')
    }

    // Modal enabling function => True or False
    setModalVisible = () => {
        this._isMounted &&
            this.setState((prevState, props) => ({
                modalVisible: !prevState.modalVisible,
            }))
    }
    // Get OTP Button function
    onPressOTPButton = () => {
        this.setModalVisible()
    }

    onChangeOtp = (index: number) => {
        this.inputRef[index].focus()
    }

    onPressVerifyAndContinue = () => {
        this.props.navigation.navigate('pickYourChoice')
    }

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
                padding: '2%',
                borderBottomWidth: 2,
                textAlign: 'center',
                fontFamily: 'AirbnbCerealBook',
                fontSize: hp('2%'),
            },
        })
        console.log(this.inputRef, 'inputRef')
        return (
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>OTP Verification</Text>
                <Text style={styles.modalDescription}>
                    Enter the OTP you received to{' '}
                </Text>
                <Text style={styles.phonenumber}>+91-9100950567</Text>
                {/* OTP Section*/}
                <View style={styles.otpFieldContainer}>
                    <TextInput
                        autoFocus
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(1)}
                        ref={(ref) => (this.inputRef[0] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(2)}
                        ref={(ref) => (this.inputRef[1] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(3)}
                        ref={(ref) => (this.inputRef[2] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        ref={(ref) => (this.inputRef[3] = ref)}
                    />
                </View>

                <CustomButton
                    title="Verify and Continue"
                    buttonStyles={{ width: wp('69.33%') }}
                    onPressButton={this.onPressVerifyAndContinue}
                />
                <Text style={styles.codeText}>
                    Did’t receive code?
                    <Text style={styles.resendOTP}> Resend OTP</Text>
                </Text>
            </View>
        )
    }
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
            },
            loginBottom: {
                display: 'flex',
                width: wp('54.66%'),
                height: hp('24.41%'),
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '7%',
            },
            loginButtonBox: {},
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
            },
        })

        return (
            <ScrollView>
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
                )}{' '}
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
                        onPressButton={this.onPressOTPButton}
                        buttonStyles={styles.loginButtonBox}
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
