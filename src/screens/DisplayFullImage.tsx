import React from "react"
import { Image, Pressable, StyleSheet, View } from "react-native"
import { BackIcon } from "../../assets/svgs/icons/icons-directions"
import { colors } from "../lib/colors"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

interface IProps {
  imageUrl: string
  navigation: any
  route: any
}

class DisplayFullImage extends React.Component<IProps, {}> {
  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { imageUrl } = this.props.route.params
    return (
      <View style={styles.container}>
        <Pressable onPress={this.handleBack} style={styles.backIconStyle}>
          <BackIcon />
        </Pressable>

        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        ></Image>
      </View>
    )
  }
}
export default DisplayFullImage

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: wp("5%"),
  },
  image: {
    width: "100%",
    height: hp("60%"),
  },
  backIconStyle: {
    position: "absolute",
    top: hp("5%"),
    left: hp("3%"),
  },
})
