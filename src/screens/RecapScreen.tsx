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

//icons
import { NavigationIcon } from "../../assets/svgs/icons/icons-directions"
import { Rating } from "../../assets/svgs/icons"
// colors
import { colors } from "../lib/colors"
import ReadMoreComponent from "../components/elements/ReadMore"
import { recapList as imagesList } from "../lib/content"
import { SafeAreaView } from "react-native-safe-area-context"

interface IProps {
  navigation: any
  route: any
  recapList: any
}

interface Istate {
  recapList: any
}

const colorsList = [
  "#FFEA75",
  "#FFE8E7",
  "#C3F4FF",
  "#E2F0FF",
  "#FFE2F5",
  "#E1E2FF",
  "#FFE5B2",
]

const dummyImage =
  "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg"
class Recap extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    {
      this.state = {
        recapList: this.props.route.params.recapList,
      }
    }
  }
  onPressReadMore = (index: number) => {
    let stateData = { ...this.state }

    stateData.recapList[index].showFullAddress = true
    this.setState(stateData)
  }
  handleNavigation = (address: string) => {
    this.props.navigation.navigate("navigation", { address: address })
  }
  render() {
    const { recapList } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <View style={[styles.TitleContainer]}>
              <Text style={styles.frappyText}>Recap</Text>
            </View>
            <View>
              {recapList &&
                recapList.map((ele: any, index: number) => {
                  const {
                    id,
                    name,
                    address,
                    averageRatings,
                    numberOfRatings,
                    review_images,
                    showFullAddress,
                    user_rating,
                    restaurant,
                  } = ele
                  return (
                    <Pressable
                      key={index}
                      onPress={() =>
                        this.props.navigation.navigate("itemInDetail", {
                          id: restaurant,
                          address: address,
                        })
                      }
                    >
                      <View style={styles.recapItemContaineer}>
                        {review_images.length > 0 ? (
                          <Image
                            source={{
                              uri: review_images[0].image,
                            }}
                            style={styles.recapImage}
                          />
                        ) : (
                          <Image
                            source={
                              imagesList[
                                Math.floor(Math.random() * imagesList.length)
                              ]
                            }
                            style={styles.recapImage}
                          />
                        )}

                        <View style={styles.restaurantTitleContainer}>
                          <Text style={styles.restaurantTitle}>{name}</Text>
                          {!showFullAddress ? (
                            <Pressable
                              style={styles.showFullAddressWrapper}
                              onPress={() => this.onPressReadMore(index)}
                            >
                              <Text
                                style={styles.recapCardText}
                                numberOfLines={1}
                              >
                                {address}
                              </Text>
                            </Pressable>
                          ) : (
                            <Text style={styles.recapCardText}>{address}</Text>
                          )}
                          <View style={styles.ratingContainer}>
                            <View style={styles.ratingInnerWrapper}>
                              <Rating width={wp("4.2%")} height={hp("4.2%")} />
                              <Text style={styles.noOfRatings}>
                                {user_rating}({numberOfRatings} ratings)
                              </Text>
                            </View>

                            <Pressable
                              style={styles.navigationIcon}
                              onPress={() => this.handleNavigation(address)}
                            >
                              <NavigationIcon
                                width={wp("7.8%")}
                                height={hp("3.68%")}
                              />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      <View style={styles.borderLine}></View>
                    </Pressable>
                  )
                })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  showFullAddressWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  ratingInnerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  noOfRatings: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.8%"),
    color: colors.lightGreyThree,

    marginLeft: wp("2%"),
  },
  navigationIcon: {
    display: "flex",
    alignSelf: "flex-end",
  },
  restaurantTitle: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2%"),
    color: colors.darkBlack,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    padding: "4%",
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
    alignItems: "center",
    paddingVertical: wp("5%"),
  },
  recapCardText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.8%"),
    color: colors.lightGreyThree,
  },
  restaurantTitleContainer: {
    flex: 1,
    padding: wp("5%"),
    justifyContent: "space-between",
  },
  borderLine: {
    height: 1,
    backgroundColor: colors.lightGreyTwo,
  },
})

export default Recap
