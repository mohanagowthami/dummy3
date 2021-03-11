// react
import React, { Component } from "react"
// service
import SocialLoginService from "../../services/social-login.service"
// social-login
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"
import * as AppAuth from "expo-app-auth"
// react-native
import { Pressable, View, StyleSheet } from "react-native"
// assets
import { FacebookSvg, GoogleSvg } from "../../../assets/svgs/icons/icons-login"
// AppID
import { APPID } from "../../lib/content"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const socialLoginService = new SocialLoginService()

interface IProps {
  navigation: any
  onClick: () => void
}

class SocialLogins extends Component<IProps, {}> {
  logIn = async () => {
    try {
      this.props.onClick()
      await Facebook.initializeAsync({
        appId: APPID,
      })
      const { type, token }: any = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ["public_profile", "email"],
        }
      )

      if (type === "success") {
        socialLoginService
          .facebookSignIn({
            token: token,
          })
          .then((response) => {
            this.props.onClick()

            if (response["username"])
              this.props.navigation.replace("pickYourChoice")
            else this.props.navigation.replace("bottomTab")
          })
          .catch((error) => {
            this.props.onClick()
            alert("something went wrong, please try later")
          })
      } else {
        this.props.onClick()
      }
    } catch (error: any) {
      alert("something went wrong, please try later")
      this.props.onClick()
    }
  }

  googleLogin = async () => {
    try {
      this.props.onClick()
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
            this.props.onClick()
            if (response["username"])
              this.props.navigation.replace("pickYourChoice")
            else this.props.navigation.replace("bottomTab")
          })
          .catch(() => {
            this.props.onClick()
            alert("something went wrong, please try later")
          })
      } else {
        this.props.onClick()
      }
    } catch (error) {
      alert("something went wrong, please try later")
      this.props.onClick()
    }
  }

  render() {
    return (
      <View style={styles.socialIconsContainer}>
        <Pressable onPress={this.logIn}>
          <FacebookSvg width={wp("14.66%")} height={hp("7.23%")} />
        </Pressable>

        <Pressable onPress={this.googleLogin}>
          <GoogleSvg width={wp("14.66%")} height={hp("7.23%")} />
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  socialIconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: wp("40.66%"),
  },
})

export default SocialLogins
