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
import { FacebookSvg, GoogleSvg } from "../../assets/svgs/icons/icons-login"
// components
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
// services
import AuthService from "../services/auth.service"
import UserService from "../services/user.service"
import SocialLoginService from "../services/social-login.service"
// svgs
import { CloseEye, Logo, OpenEye } from "../../assets/svgs/icons"
// social-login
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"
import * as AppAuth from "expo-app-auth"
// yup
import * as yup from "yup"
// formik
import { Formik } from "formik"
// content
import { APPID } from "../lib/content"

// props for login screen
interface ILoginScreen {
  navigation: any
}
// LoginScreen class definition
interface State {
  modalVisible: any
  isLoading: boolean

  errorText: string
  showPassword: boolean
  showOnlyEmail: boolean
}
const Welcome = require("../../assets/images/welcome.png")
const authService = new AuthService()
const userService = new UserService()
const socialLoginService = new SocialLoginService()

export const loginValidationSchema = yup.object().shape({
  showOnlyEmail: yup.boolean(),
  showOnlyPasswords: yup.boolean(),
  email: yup
    .string()
    .email("Enter valid email address")
    .when("showOnlyPasswords", {
      is: false,
      then: yup.string().required("Email address is required"),
    }),

  password: yup.string().when("showOnlyEmail", {
    is: true,
    then: yup.string().required("Password is required"),
  }),
  confirmPassword: yup.string().when("showOnlyPasswords", {
    is: true,
    then: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and Confirmation Password must match"
      )
      .required("Confirm Password is required"),
  }),
})
class LoginScreen extends React.Component<ILoginScreen, State> {
  values: any
  token: any

  constructor(props: ILoginScreen) {
    super(props)
    this.state = {
      modalVisible: false,
      isLoading: false,

      errorText: "",
      showPassword: false,
      showOnlyEmail: false,
    }
    this.token = null
    this.values = {}
  }

  // navigate to signUp page
  handleNavigation = () => {
    this.setState({ ...this.setState, errorText: "" })
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

  onSubmitValues = (values: any) => {
    this.setState({
      ...this.state,
      isLoading: true,
    })
    const { showOnlyEmail } = this.state

    if (showOnlyEmail) {
      authService
        .forgotPassword({ email: values.email })
        .then((response) => {
          console.log(response, "email")
          if (response.token) this.token = response.token
          this.setState({
            ...this.state,
            isLoading: false,
            showOnlyEmail: false,
          })
          alert("Password reset link send to your email")
        })
        .catch((e: any) => {
          console.log(e, " error email")
          this.token = null
          this.setState({
            ...this.state,
            isLoading: false,
            errorText: "Please enter registered email address",
          })
        })
    } else {
      authService
        .logIn({ email: values.email, password: values.password })
        .then((response) => {
          authService
            .authenticateUser(response.access, response.refresh)
            .then(() => {
              this.setState({
                ...this.state,
                isLoading: false,
                modalVisible: true,
                errorText: "",
              })
              setTimeout(() => {
                this.setState({ ...this.state, modalVisible: false })
                this.props.navigation.navigate("bottomTab")
              }, 300)
            })
        })
        .catch((error) => {
          console.log(error, "in login")
          this.setState({
            ...this.state,
            isLoading: false,
            modalVisible: false,
            errorText: error.detail,
          })
        })
    }
  }

  onChange = (name: string, value: string) => {
    this.values[name] = value
  }

  handleEyeIconPress = () => {
    console.log("calling")

    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }
  onPressForgotPassword = () => {
    this.setState({
      ...this.state,
      showOnlyEmail: true,

      errorText: "",
    })
  }

  logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: APPID,
      })
      const { type, token }: any = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ["public_profile", "email"],
        }
      )

      if (type === "success") {
        this.setState({ ...this.state, isLoading: true })
        socialLoginService
          .facebookSignIn({
            token: token,
          })
          .then((response) => {
            this.setState({
              ...this.state,
              isLoading: false,
              errorText: "",
            })
            console.log(response, "response after facebook signin")
            if (response["username"])
              this.props.navigation.navigate("pickYourChoice")
            else this.props.navigation.navigate("bottomTab")
          })
          .catch((error) => {
            console.log(error)
            this.setState({ ...this.state, isLoading: false })
            alert("something went wrong, please try later")
          })
      }
    } catch (error: any) {
      console.log(error)
      alert("something went wrong, please try later")
    }
  }

  googleLogin = async () => {
    //  androidStandaloneAppClientId: `161958723866-lfpurm811vojam8562471re3l3bbnd0t.apps.googleusercontent.com`,
    const { type, accessToken, user }: any = await Google.logInAsync({
      scopes: ["profile", "email"],
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,

      clientId:
        "161958723866-lfpurm811vojam8562471re3l3bbnd0t.apps.googleusercontent.com",

      androidStandaloneAppClientId:
        "161958723866-lfpurm811vojam8562471re3l3bbnd0t.apps.googleusercontent.com",
    })

    if (type === "success") {
      this.setState({ ...this.state, isLoading: true })
      socialLoginService
        .googleSignIn({ token: accessToken })
        .then((response) => {
          this.setState({ ...this.state, isLoading: false, errorText: "" })
          if (response["username"])
            this.props.navigation.navigate("pickYourChoice")
          else this.props.navigation.navigate("bottomTab")
        })
        .catch((error) => {
          console.log(error, "error")
          this.setState({
            ...this.state,
            isLoading: false,
            errorText: error,
          })
          alert("something went wrong, please try later")
        })
    }
  }
  render() {
    // navigation as prop
    const { navigation } = this.props
    const {
      isLoading,
      errorText,

      modalVisible,
      showPassword,
      showOnlyEmail,
    } = this.state
    const loginTitle = showOnlyEmail ? "Confirm Email" : "Login"

    return (
      <>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <ScrollView
            style={styles.mainContainer}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{
                email: "",
                password: "",

                showOnlyEmail: showOnlyEmail,
              }}
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
                        backdropOpacity={0.8}
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
                    {errorText !== "" && (
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
                    {!showOnlyEmail && (
                      <>
                        <View style={styles.passwordContainer}>
                          <TextInput
                            onChangeText={handleChange("password")}
                            placeholder="Enter Password"
                            style={[styles.inputBox, styles.passwordBox]}
                            secureTextEntry={showPassword ? false : true}
                            value={values.password}
                          />
                          {values.password !== "" &&
                            (showPassword ? (
                              <Pressable
                                onPress={() => this.handleEyeIconPress()}
                                hitSlop={{
                                  top: 30,
                                  bottom: 30,
                                  left: 30,
                                  right: 30,
                                }}
                              >
                                <OpenEye width={wp("5%")} height={wp("5%")} />
                              </Pressable>
                            ) : (
                              <Pressable
                                onPress={() => this.handleEyeIconPress()}
                              >
                                <CloseEye
                                  width={wp("5%")}
                                  height={wp("5%")}
                                  hitSlop={{
                                    top: 30,
                                    bottom: 30,
                                    left: 30,
                                    right: 30,
                                  }}
                                />
                              </Pressable>
                            ))}
                        </View>
                        {touched.password && errors.password ? (
                          <Text style={styles.error}>{errors.password}</Text>
                        ) : null}
                      </>
                    )}
                    <View>
                      <CustomButton
                        title={loginTitle}
                        onPressButton={handleSubmit}
                        buttonTextStyles={styles.verifyContinueButtonText}
                      />
                      {!showOnlyEmail && (
                        <Text
                          style={styles.forgotYourPasswordStyles}
                          onPress={this.onPressForgotPassword}
                        >
                          Forgot your password?
                        </Text>
                      )}
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
  forgotYourPasswordStyles: {
    fontSize: wp("4%"),
    color: colors.orange,
    fontFamily: "ArchivoRegular",
    marginVertical: wp("4%"),
    textAlign: "center",
  },
  passwordBox: {
    borderBottomWidth: 0,
    width: "85%",
    padding: 0,
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#DFE1E6",
    alignItems: "center",
  },
  error: {
    color: colors.orange,
    fontSize: wp("3%"),
    fontFamily: "ArchivoRegular",
    textAlign: "left",
    display: "flex",
    alignSelf: "flex-start",
  },
  errorStyles: {
    fontSize: wp("4%"),
    color: colors.orange,
    fontFamily: "ArchivoRegular",
    marginVertical: wp("4%"),
    textAlign: "center",
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
    flex: 1,
    width: "100%",
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
    justifyContent: "space-around",
    width: wp("40.66%"),
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
