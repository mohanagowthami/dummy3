// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Image, Pressable } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

// colors
import { colors } from "../lib/colors"

interface IProps {
  navigation: any
  route: any
  hallOfFameList: any
}

// state - data
interface Istate {}

const colorsList = [
  "#FFEA75",
  "#FFE8E7",
  "#C3F4FF",
  "#E2F0FF",
  "#FFE2F5",
  "#E1E2FF",
  "#FFE5B2",
]

class HallOfFame extends Component<IProps, Istate> {
  render() {
    const { hallOfFameList } = this.props.route.params

    return (
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View style={[styles.TitleContainer]}>
            <Text style={styles.frappyText}>Hall of Fame</Text>
          </View>
          <View style={styles.hallOfFameWrapper}>
            {hallOfFameList &&
              hallOfFameList.map((item: any, index: number) => {
                const { review_images } = item
                console.log(review_images, "review_images")
                return review_images.map((ele: any, index: number) => {
                  const { image } = ele
                  return (
                    <Pressable
                      key={index}
                      onPress={() =>
                        this.props.navigation.navigate("fullImage", {
                          imageUrl: image,
                        })
                      }
                    >
                      <Image
                        style={styles.hallOfFameImage}
                        source={{
                          uri: image,
                        }}
                        resizeMode="cover"
                      />
                    </Pressable>
                  )
                })
              })}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  hallOfFameWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: wp("15%"),
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("5%"),
  },
  frappyText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
  },
  mainContainer: {
    display: "flex",
    padding: wp("5%"),
    backgroundColor: colors.white,
  },
  heading: {
    display: "flex",
    paddingTop: hp("2%"),
    paddingBottom: hp("2.10%"),
    paddingLeft: wp("7.46%"),
    paddingRight: wp("5.33%"),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "cyan",
  },
  backicon: {
    paddingTop: hp("1.2%"),
  },
  title: {
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
  },
  recapImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  recapItemContaineer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: wp("5%"),
  },
  recapCardText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.8%"),
    color: colors.lightGreyThree,
  },
  hallOfFameImage: {
    width: wp("28%"),
    height: wp("28%"),
    marginTop: wp("5%"),
    borderRadius: wp("5%"),
  },
})

export default HallOfFame
