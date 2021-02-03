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
import UserService from "../services/user.service"
import { Logo } from "../../assets/svgs/icons"

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
const userService = new UserService()
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

    async componentDidMount() {
        // userService
        //     .getUser()
        //     .then((res) => {
        //         if (res.username) this.props.navigation.navigate("bottomTab")
        //     })
        //     .catch((error) => console.log(error, "get user"))
    }

    renderModalContent = () => {
        return (
            <View style={styles.modalContainer}>
                <Logo width={wp("50%")} height={hp("28%")} />

                <Text style={styles.hurryText}>Hurray!</Text>
                <Text style={styles.logginSuccessfullyText}>
                    You have successfully{" "}
                </Text>
                <Text style={styles.logginSuccessfullyText}>Logged In</Text>
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
            modalVisible: true,
        })
        // console.log(this.values, 'values')
        authService
            .logIn(this.values)
            .then((response) => {
                authService.authenticateUser(response.access, response.refresh)
            })
            .then(() => {
                this.setState({
                    ...this.state,
                    modalVisible: false,
                })
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
                                secureText={true}
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
    hurryText: {
        fontFamily: "AirbnbCerealBold",
        fontWeight: "700",
        fontSize: wp("7%"),
        lineHeight: wp("12%"),
        color: colors.darkBlack,
    },
    logginSuccessfullyText: {
        fontFamily: "AirbnbCerealBook",
        fontWeight: "400",
        fontSize: wp("4.2%"),
        letterSpacing: wp("0.001%"),
        color: colors.greyTwo,
        lineHeight: wp("7%"),
    },
})
export default LoginScreen
