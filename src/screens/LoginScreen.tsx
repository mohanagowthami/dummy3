import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/common/CustomButton";
import CustomTextField from "../components/common/CustomTextField";
import { colors } from "../lib/colors";
import Svg, { SvgCssUri } from "react-native-svg";
import WelcomeSvg from "../../assets/svgs/WelcomeSvg";
import GetDimensions from "../components/common/GetDimensions";

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
              <WelcomeSvg
                width={window.width * 0.66}
                height={window.width * 0.47}
              />
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "10%",
    paddingBottom: 0,
    position: "relative",
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
    width: "100%",
    height: "25%",
    display: "flex",
    padding: "10%",
    paddingVertical: 0,
    position: "absolute",
    bottom: "6%",
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
});
