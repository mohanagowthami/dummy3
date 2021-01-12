import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/common/CustomButton";
import CustomTextField from "../components/common/CustomTextField";
import { colors } from "../lib/colors";
import Svg, { SvgCssUri } from "react-native-svg";
import WelcomeSvg from "../../assets/svgs/WelcomeSvg";
import GetDimensions from "../components/common/GetDimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import FacebookSvg from "../../assets/svgs/FacebookSvg";
import TwitterSvg from "../../assets/svgs/TwitterSvg";
import GoogleSvg from "../../assets/svgs/GoogleSvg";

// props for login screen
interface ILoginScreen {
  navigation: any;
}
// LoginScreen class definition
class LoginScreen extends Component<ILoginScreen, {}> {
  // callBack function
  callBack = (value: string) => console.log(value, "on call back value");

  // navigate to signUp page
  handleNavigation = () => {
    console.log("signUp");
    this.props.navigation.navigate("signUp");
  };

  // Get OTP Button function
  onPressOTPButton = () => {};
  render() {
    // navigation as prop
    const { navigation } = this.props;
    return (
      <GetDimensions
        //rendering the dimensions from getDimensions
        render={(dimensions) => {
          const { window, screen } = dimensions;
          return (
            <View style={styles.container}>
              <WelcomeSvg width={wp("66.35%")} height={hp("23.25%")} />
              <Text
                style={[styles.loginText, { fontSize: window.width * 0.096 }]}
              >
                Login
              </Text>
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
                  <FacebookSvg width={wp("14.66%")} height={hp("7.23%")} />
                  <TwitterSvg width={wp("14.66%")} height={hp("7.23%")} />
                  <GoogleSvg width={wp("14.66%")} height={hp("7.23%")} />
                </View>
                <Text>
                  <Text style={styles.newToFrappy}>New to Frappy? </Text>
                  <Text style={styles.signUp} onPress={this.handleNavigation}>
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: "10%",
    backgroundColor: colors.white,
  },
  tinyLogo: {
    width: "90%",
    height: "30%",
  },
  loginText: {
    color: colors.darkBlack,
    margin: "1%",
    fontSize: 10,
    fontFamily: "AirbnbCerealBold",
  },
  inputBox: {
    marginTop: "7%",
  },
  loginBottom: {
    height: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginButtonBox: {
    marginTop: "7%",
    marginBottom: "7%",
  },
  loginWith: {
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  newToFrappy: {
    fontSize: 14,
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  signUp: {
    fontSize: 14,
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
});
