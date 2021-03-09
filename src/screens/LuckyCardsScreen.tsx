// react
import React, { Component } from "react"
// react-native
import { Text, StyleSheet, Image } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-safe-area-context
import { SafeAreaView } from "react-native-safe-area-context"
// colors
import { colors } from "../lib/colors"
//

import comingSoon from "../../assets/coming-soon.png"
class LuckyCardsScreen extends Component<{}, {}> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={comingSoon} resizeMode="cover" />
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: hp("0.5%"),
    padding: wp("1%"),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6%"),
    color: colors.orange,
  },
  image: {
    width: wp("100%"),
    height: hp("60%"),
  },
})
export default LuckyCardsScreen
