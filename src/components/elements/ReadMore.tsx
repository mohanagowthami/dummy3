// react
import React, { Component } from "react"
// react native
import { Text, StyleSheet } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// icons
import { ReadMore } from "../../../assets/svgs/icons"
// colors
import { colors } from "../../lib/colors"

interface IProps {
  textStyes?: any
  onPressReadmore: () => void
}
interface IState {}

class ReadMoreComponent extends Component<IProps, IState> {
  onPress = () => {
    const { onPressReadmore } = this.props
    onPressReadmore()
  }

  render() {
    const { textStyes } = this.props

    const stylesOfText = textStyes
      ? [styles.readmore, textStyes]
      : styles.readmore
    return (
      <Text style={stylesOfText} onPress={this.onPress}>
        Readmore <ReadMore />
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  readmore: {
    color: colors.darkorange,
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("3.73%"),
  },
})

export default ReadMoreComponent
