// react
import React from "react"
// react native
import {
    ScrollView,
    TextInput,
    View,
    Image,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// modal
import Modal from "react-native-modal"
// icons
import {
    FacebookSvg,
    TwitterSvg,
    GoogleSvg,
} from "../../assets/svgs/icons/icons-login"
// components
import CustomButton from "../components/buttons/CustomButton"
import CustomTextField from "../components/input-controllers/CustomTextField"
// colors
import { colors } from "../lib/colors"
// services
import AuthService from "../services/auth.service"

// props for login screen
interface ILoginScreen {
    navigation: any
}
// LoginScreen class definition
interface State {
    modalVisible: any
    isLoading: boolean
}
const Welcome = require("../../assets/images/welcome.png")
const authService = new AuthService()
class LoginScreen extends React.Component<ILoginScreen, State> {
    inputRef: any
    values: any
    constructor(props: ILoginScreen) {
        super(props)
        this.state = {
            modalVisible: false,
            isLoading: false,
        }
        this.inputRef = Array(4).fill(React.createRef())
        this.values = {}
    }
    onChangeOtp = (index: number) => {
        this.inputRef[index].focus()
    }

    onPressVerifyAndContinue = () => {
        this.setModalVisible()
        this.props.navigation.navigate("pickYourChoice")
    }

    // callBack function
    callBack = (value: string) => {}

    // navigate to signUp page
    handleNavigation = () => {
        this.props.navigation.navigate("signUp")
    }

    renderModalContent = () => {
        return (
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>OTP Verification</Text>
                <Text style={styles.modalDescription}>
                    Enter the OTP you received to{" "}
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
                    buttonStyles={{ width: wp("69.33%") }}
                    buttonTextStyles={{
                        fontFamily: "ArchivoBold",
                        fontSize: wp("4%"),
                    }}
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
    // Get OTP Button function
    onPressOTPButton = () => {
        // this.setModalVisible()
        this.setState({
            ...this.state,
            isLoading: true,
        })
        console.log(this.values, "values")
        authService
            .logIn(this.values)
            .then((response) => {
                // console.log(response)
                authService.authenticateUser(response.access, response.refresh)
            })
            .then(() => {
                this.props.navigation.navigate("pickYourChoice")
            })
            .catch((error) => {
                console.log(error, "error")
                alert(error)
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
            })
    }

    onChange = (name: string, value: string) => {
        this.values[name] = value
    }

    render() {
        // navigation as prop
        const { navigation } = this.props
        const { isLoading } = this.state
        return (
            <>
                {isLoading ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* {this.renderModalContent()} */}
                        <ActivityIndicator />
                    </View>
                ) : (
                    <ScrollView
                        style={{ backgroundColor: colors.white }}
                        keyboardShouldPersistTaps="always"
                    >
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
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {/* This call, renders the modal*/}
                                        {this.renderModalContent()}
                                    </View>
                                </Modal>
                            </View>
                        )}
                        <View style={styles.container}>
                            <Image
                                style={styles.welcome}
                                resizeMode="contain"
                                source={Welcome}
                            />
                            <Text style={styles.loginText}>Login</Text>
                            <CustomTextField
                                onChange={(value) =>
                                    this.onChange("email", value)
                                }
                                placeholder="Enter Email Id"
                                style={styles.inputBox}
                            />
                            <CustomTextField
                                onChange={(value) =>
                                    this.onChange("password", value)
                                }
                                placeholder="Enter Password"
                                style={styles.inputBox}
                            />
                            <View>
                                <CustomButton
                                    title="Get OTP"
                                    onPressButton={this.onPressOTPButton}
                                    buttonTextStyles={[
                                        {
                                            fontFamily: "ArchivoBold",
                                            fontSize: wp("4%"),
                                        },
                                    ]}
                                />
                            </View>

                            <View style={styles.loginBottom}>
                                <Text style={styles.loginWith}>
                                    Or Login with...
                                </Text>
                                <View style={styles.socialIconsContainer}>
                                    <FacebookSvg
                                        width={wp("14.66%")}
                                        height={hp("7.23%")}
                                    />
                                    <TwitterSvg
                                        width={wp("14.66%")}
                                        height={hp("7.23%")}
                                    />
                                    <GoogleSvg
                                        width={wp("14.66%")}
                                        height={hp("7.23%")}
                                    />
                                </View>
                                <Text style={{ marginTop: hp("1.73%") }}>
                                    <Text style={styles.newToFrappy}>
                                        New to Frappy?{" "}
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
                )}
            </>
        )
    }
}
const styles = StyleSheet.create({
    welcome: {
        // marginTop: hp('6.47%'),
        width: wp("66.35%"),
        height: hp("23.25%"),
    },
    modalContainer: {
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: "5%",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: wp("90%"),
    },
    modalTitle: {
        fontSize: wp("4%"),
        fontStyle: "normal",
        fontFamily: "AirbnbCerealBold",
    },
    modalDescription: {
        fontSize: wp("3%"),
        fontFamily: "AirbnbCerealBook",
        color: colors.grey,
        fontWeight: "400",
        margin: wp("3%"),
    },
    phonenumber: {
        fontSize: wp("3%"),
        fontFamily: "AirbnbCerealBold",
        color: colors.grey,
        fontWeight: "bold",
        margin: wp("3%"),
        textAlign: "center",
        marginTop: 0,
    },
    codeText: {
        fontSize: wp("3%"),
        fontFamily: "AirbnbCerealBook",
        color: colors.grey,
        fontWeight: "400",
        margin: wp("3%"),
    },
    resendOTP: {
        fontSize: wp("3%"),
        fontFamily: "AirbnbCerealBook",
        color: colors.orange,
        fontWeight: "400",
        margin: wp("4%"),
    },
    otpFieldContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginVertical: "3%",
        marginTop: 0,
    },
    customTextFieldStyles: {
        width: wp("13.33%"),
        borderBottomColor: colors.darkGrey,
        padding: "2%",
        borderBottomWidth: 2,
        textAlign: "center",
        fontFamily: "AirbnbCerealBook",
        fontSize: hp("2%"),
    },
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        paddingTop: hp("4.68%"),
        paddingRight: wp("7.4%"),
        paddingLeft: wp("7.2%"),
        // paddingBottom: hp('5.52%'),
        backgroundColor: colors.white,
    },
    tinyLogo: {
        width: "90%",
        height: "30%",
    },
    loginText: {
        color: colors.darkBlack,
        margin: "1%",
        // marginTop: hp('2.56%'),
        fontSize: wp("9%"),
        fontFamily: "AirbnbCerealBold",
    },
    inputBox: {
        // marginTop: '7%',
        fontFamily: "ArchivoRegular",
        marginTop: hp("3%"),
        marginBottom: hp("1%"),
        fontSize: wp("4.2%"),
    },
    loginBottom: {
        display: "flex",
        width: wp("54.66%"),
        height: hp("24.41%"),
        alignItems: "center",
        justifyContent: "space-between",
        // marginBottom: hp('7%'),
    },
    loginButtonBox: {
        marginTop: "7%",
        marginBottom: "7%",
    },
    loginWith: {
        fontSize: wp("3.7%"),
        marginTop: hp("2.28%"), //-5
        marginBottom: hp("2.92%"), //-3
        fontFamily: "AirbnbCerealBook",
        color: colors.lightBlack,
    },
    newToFrappy: {
        fontSize: wp("3.73%"),
        fontFamily: "AirbnbCerealBook",
        color: colors.lightBlack,
    },
    signUp: {
        fontSize: wp("3.73%"),
        fontFamily: "AirbnbCerealBook",
        color: colors.orange,
    },
    socialIconsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: wp("54.66%"),
    },
})
export default LoginScreen
