import { ScrollView } from "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import FacebookSvg from "../../assets/svgs/FacebookSvg";
import GoogleSvg from "../../assets/svgs/GoogleSvg";
import TwitterSvg from "../../assets/svgs/TwitterSvg";

import WelcomeSvg from "../../assets/svgs/WelcomeSvg";
import SignUpForm from "../forms/SignUpForm";
import { colors } from "../lib/colors";

interface ISignUpScreen {
  navigation: any;
}

class SignUpScreen extends Component<ISignUpScreen, {}> {
  constructor(props: ISignUpScreen) {
    super(props);
  }

  onPressOTPButton = () => {};
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <WelcomeSvg width={wp("66.35%")} height={hp("19.90%")} />
          <Text style={styles.loginText}>SignUp</Text>
          <SignUpForm />

          <View style={styles.loginBottom}>
            <Text style={styles.loginWith}>Or Login with...</Text>
            <View style={styles.socialIconsContainer}>
              <FacebookSvg width={wp("14.66%")} height={hp("6.19")} />
              <TwitterSvg width={wp("14.66%")} height={hp("6.19")} />
              <GoogleSvg width={wp("14.66%")} height={hp("6.19")} />
            </View>
            <Text>
              <Text style={styles.haveAnAccount}>Already have an account?</Text>
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
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "10%",
    paddingBottom: wp("0%"),
  },

  loginText: {
    color: colors.darkBlack,
    margin: "1%",
    fontSize: hp("4.069%"),
    fontFamily: "AirbnbCerealBold",
  },

  loginBottom: {
    display: "flex",
    width: wp("100%"),
    height: hp("25%"),
    backgroundColor: "#fff",
    marginBottom: "7%",

    alignItems: "center",
    justifyContent: "space-between",
  },
  loginButtonBox: {
    marginTop: "7%",
    marginBottom: "7%",
  },
  loginWith: {
    fontSize: hp("2.02%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  haveAnAccount: {
    fontSize: hp("1.576%"),
    fontFamily: "AirbnbCerealBook",
    color: colors.lightBlack,
  },
  signIn: {
    fontSize: hp("1.576%"),
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
});
