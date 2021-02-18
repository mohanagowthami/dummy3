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
  Pressable,
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
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"
import * as AppAuth from "expo-app-auth"
import * as yup from "yup"
import { Formik } from "formik"

// props for login screen
interface ILoginScreen {
  navigation: any
}
// LoginScreen class definition
interface State {
  modalVisible: any
  isLoading: boolean
  showError: boolean
  errorText: string
}
const Welcome = require("../../assets/images/welcome.png")
const authService = new AuthService()
const userService = new UserService()

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup.string().required("Password is required"),
})

class LoginScreen extends React.Component<ILoginScreen, State> {
  inputRef: any
  values: any
  constructor(props: ILoginScreen) {
    super(props)
    this.state = {
      modalVisible: false,
      isLoading: false,
      showError: false,
      errorText: "",
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
        <Logo width={wp("50%")} height={hp("28%")} />

        <Text style={styles.hurryText}>Hurray!</Text>
        <Text style={styles.logginSuccessfullyText}>
          You have successfully{" "}
        </Text>
        <Text style={styles.logginSuccessfullyText}>Logged In</Text>
      </View>
    )
  } // Modal enabling function => True or False
  setModalVisible = () => {
    this.setState((prevState, props) => ({
      modalVisible: !prevState.modalVisible,
    }))
  }
  // Get OTP Button function
  onSubmitValues = (data: any) => {
    // this.setModalVisible()
    this.setState({
      ...this.state,
      isLoading: true,
    })
    console.log(data, "data in login screen")
    authService
      .logIn(data)
      .then((response) => {
        console.log(response, "response")
        this.setState({
          ...this.state,
          isLoading: false,
          modalVisible: true,
        })

        authService.authenticateUser(response.access, response.refresh)
      })
      .then(() => {
        this.setState(
          {
            ...this.state,
            isLoading: false,
            modalVisible: false,
          },
          () => this.props.navigation.navigate("bottomTab")
        )
      })
      .catch((error) => {
        console.log(error, "in login")
        this.setState({
          ...this.state,
          isLoading: false,
          showError: true,
          modalVisible: false,
          errorText: error.detail,
        })
      })
  }

  onChange = (name: string, value: string) => {
    this.values[name] = value
  }

  logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "881191042676304",
      })
      const { type, token }: any = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ["public_profile"],
        }
      )
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        const jsonResponse = await response.json()

        alert(` ${(await response.json()).name}!`)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  googleLogin = async () => {
    const { type, accessToken, user }: any = await Google.logInAsync({
      androidClientId: `161958723866-lfpurm811vojam8562471re3l3bbnd0t.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
      androidStandaloneAppClientId:
        "161958723866-lfpurm811vojam8562471re3l3bbnd0t.apps.googleusercontent.com",
    })
    console.log(type, accessToken, "type,accessToken")

    if (type === "success") {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const userInfoResponseJson = await userInfoResponse.json()
      console.log(userInfoResponseJson, "responseJson in google")
    }
  }
  render() {
    // navigation as prop
    const { navigation } = this.props
    const { isLoading, errorText, showError, modalVisible } = this.state

    return (
      <>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            {/* {this.renderModalContent()} */}
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <ScrollView
            style={styles.mainContainer}
            keyboardShouldPersistTaps="always"
          >
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                this.onSubmitValues(values)
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  {modalVisible && (
                    <View>
                      <Modal
                        isVisible={modalVisible}
                        backdropColor={colors.white}
                        backdropOpacity={0.9}
                      >
                        <View style={styles.renderModalContainer}>
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
                    {showError && (
                      <Text style={styles.errorStyles}>{errorText}</Text>
                    )}
                    <TextInput
                      onChangeText={handleChange("email")}
                      placeholder="Enter Email Id"
                      style={styles.inputBox}
                      value={values.email}
                    />
                    {touched.email && errors.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}
                    <TextInput
                      onChangeText={handleChange("password")}
                      placeholder="Enter Password"
                      style={styles.inputBox}
                      secureTextEntry
                      value={values.password}
                    />
                    {touched.password && errors.password ? (
                      <Text style={styles.error}>{errors.password}</Text>
                    ) : null}
                    <View>
                      <CustomButton
                        title="Login"
                        onPressButton={handleSubmit}
                        buttonTextStyles={styles.verifyContinueButtonText}
                      />
                    </View>

                    <View style={styles.loginBottom}>
                      <Text style={styles.loginWith}>Or Login with...</Text>
                      <View style={styles.socialIconsContainer}>
                        <Pressable onPress={this.logIn}>
                          <FacebookSvg
                            width={wp("14.66%")}
                            height={hp("7.23%")}
                          />
                        </Pressable>

                        <TwitterSvg width={wp("14.66%")} height={hp("7.23%")} />
                        <Pressable onPress={this.googleLogin}>
                          <GoogleSvg
                            width={wp("14.66%")}
                            height={hp("7.23%")}
                          />
                        </Pressable>
                      </View>
                      <Text style={styles.signupContainer}>
                        <Text style={styles.newToFrappy}>New to Frappy? </Text>
                        <Text
                          style={styles.signUp}
                          onPress={this.handleNavigation}
                        >
                          Sign up
                        </Text>
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: colors.orange,
    fontSize: wp("3%"),
    fontFamily: "ArchivoRegular",
    textAlign: "left",
    display: "flex",
    alignSelf: "flex-start",
  },
  errorStyles: {
    color: colors.orange,
    fontSize: wp("6%"),
    fontFamily: "AirbnbCerealBold",
  },

  mainContainer: { backgroundColor: colors.white },
  welcome: {
    // marginTop: hp('6.47%'),
    width: wp("66.35%"),
    height: hp("23.25%"),
  },
  renderModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  verifyContinueButton: { width: wp("69.33%") },
  tinyLogo: {
    width: "90%",
    height: "30%",
  },
  verifyContinueButtonText: {
    fontFamily: "ArchivoBold",
    fontSize: wp("4%"),
  },
  loginText: {
    color: colors.darkBlack,
    margin: "1%",
    // marginTop: hp('2.56%'),
    fontSize: wp("9%"),
    fontFamily: "AirbnbCerealBold",
  },
  inputBox: {
    width: wp("85.33%"),
    margin: "3%",
    marginLeft: wp("0%"),
    fontSize: wp("4.26%"),
    marginRight: wp("0%"),
    padding: wp("2%"),
    borderBottomWidth: 2,
    paddingLeft: 0,
    borderBottomColor: "#DFE1E6",
    // borderRadius: wp("2.66%"),
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
  signupContainer: { marginTop: hp("1.73%") },
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
