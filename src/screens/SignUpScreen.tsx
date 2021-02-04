// react
import React from "react"
// react native
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native"
// react-native-modal
import Modal from "react-native-modal"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// icons
import {
  FacebookSvg,
  TwitterSvg,
  GoogleSvg,
} from "../../assets/svgs/icons/icons-login"
// components
import SignUpForm from "../components/forms/SignUpForm"
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
// services
import UserService from "../services/user.service"
import { Logo } from "../../assets/svgs/icons"
//interface for signup screen
interface ISignUpScreen {
  navigation: any
}
// interface for modal state
interface State {
  modalVisible: any
  isLoading: boolean
}

const Welcome = require("../../assets/images/welcome.png")
//Main Class
const userService = new UserService()
class SignUpScreen extends React.Component<ISignUpScreen, State> {
  inputRef: any
  constructor(props: ISignUpScreen) {
    super(props)
    this.state = {
      modalVisible: false,
      isLoading: false,
    }
    this.inputRef = Array(4).fill(React.createRef())
  }
  // Verify & Continue Function
  onPressVerifyAndContinue = () => {
    this.setModalVisible()
    this.props.navigation.navigate("pickYourChoice")
  }

  onChangeOtp = (index: number) => {
    this.inputRef[index].focus()
  }

  // Modal function for pop up
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
          buttonStyles={styles.resendOTPButton}
          buttonTextStyles={styles.resendOTPButtonText}
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
  onPressGetOTP = async () => {
    // this.setModalVisible()
    const token = await userService.getAccessToken()
    if (token) this.props.navigation.navigate("pickYourChoice")
  }
  // render
  render() {
    const { isLoading } = this.state
    return (
      <SafeAreaView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.modal}>
            {this.state.modalVisible && (
              <View>
                <Modal
                  isVisible={this.state.modalVisible}
                  backdropColor={colors.white}
                  backdropOpacity={0.9}
                >
                  <View style={styles.modalView}>
                    {/* This call renders the modal*/}
                    {this.renderModalContent()}
                  </View>
                </Modal>
              </View>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <View style={styles.container}>
                <Image
                  style={styles.welcome}
                  resizeMode="contain"
                  source={Welcome}
                />
                <Text style={styles.loginText}>SignUp</Text>
                <SignUpForm onPressGetOTP={this.onPressGetOTP} />
                <View style={[styles.loginBottom]}>
                  <Text style={styles.loginWith}>Or Login with...</Text>
                  <View style={styles.socialIconsContainer}>
                    <FacebookSvg width={wp("14.66%")} height={hp("6.19")} />
                    <TwitterSvg width={wp("14.66%")} height={hp("6.19")} />
                    <GoogleSvg width={wp("14.66%")} height={hp("6.19")} />
                  </View>
                  <Text>
                    <Text style={styles.haveAnAccount}>
                      Already have an account?{" "}
                    </Text>
                    <Text
                      style={styles.signIn}
                      onPress={() => this.props.navigation.navigate("login")}
                    >
                      Sign In
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: hp("6%"),
    paddingRight: wp("7.4%"),
    paddingLeft: wp("7.2%"),
    paddingBottom: hp("5.52%"),
  },
  loginText: {
    color: colors.darkBlack,
    margin: "1%",
    fontSize: wp("9%"),
    fontFamily: "AirbnbCerealBold",
  },
  loginBottom: {
    display: "flex",
    width: wp("100%"),
    height: hp("25%"),
    backgroundColor: "#fff",
    // marginBottom: '7%',
    marginTop: hp("3%"),
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginButtonBox: {
    marginTop: "7%",
    marginBottom: "7%",
  },
  loginWith: {
    fontSize: wp("4%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  haveAnAccount: {
    fontSize: wp("3.73%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  signIn: {
    fontSize: wp("3.73%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.orange,
  },
  socialIconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: colors.white,
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
  welcome: {
    width: wp("66.35%"),
    height: hp("23.25%"),
  },
  codeText: {
    fontSize: wp("3%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.grey,
    fontWeight: "400",
    margin: wp("3%"),
  },
  resendOTPButton: { width: wp("69.33%") },
  resendOTPButtonText: {
    fontFamily: "ArchivoBold",
    fontSize: wp("4%"),
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
})
export default SignUpScreen
