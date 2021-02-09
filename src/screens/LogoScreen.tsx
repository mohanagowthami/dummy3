import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Logo } from "../../assets/svgs/icons"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { colors } from "../lib/colors"

interface IProps {}
interface IState {}

class LogoScreen extends Component<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <Logo width={wp("60%")} height={wp("45%")} />
      </View>
    )
  }
}
export default LogoScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
})
