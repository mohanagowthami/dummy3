// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native"
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
import {
  recapList as imagesList,
  rectangleImageList,
  shoppingMallList,
  travellingList,
} from "../lib/content"
import { SafeAreaView } from "react-native-safe-area-context"
import RestaurantService from "../services/restaurants.service"
import TravelService from "../services/travel.service"
import ShoppingMallService from "../services/shoppingmall.service"
import Loader from "../components/elements/Loader"
import { getRequireImage } from "../lib/helper"

interface IProps {
  navigation: any
  route: any
  recapList: any
}

interface Istate {
  recapList: any
  isLoaded: boolean
  currentPage: number
  totalPages: number
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

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class Recap extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    {
      this.state = {
        recapList: [],
        isLoaded: false,
        totalPages: 1,
        currentPage: 1,
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

  fetchData = () => {
    const { category } = this.props.route.params
    const { currentPage } = this.state
    let service
    if (category === "food") service = restaurantService
    else if (category === "travel") service = travelService
    else if (category === "shopping") service = shoppingService

    service
      ?.getRecap(currentPage)
      .then((response: any) => {
        this.setState({
          ...this.state,
          isLoaded: true,
          recapList: [...this.state.recapList, ...response.results],
          totalPages: response.info.pages,
        })
      })
      .catch((error) => {
        this.setState({ ...this.state, isLoaded: true })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData()
    }
  }

  renderFooter = () => {
    const { currentPage, totalPages } = this.state
    if (currentPage < totalPages) {
      return (
        <Text onPress={this.loadMore} style={styles.loadMoreText}>
          Load more...
        </Text>
      )
    } else {
      return null
    }
  }

  flatListRecapItem = (item: any, index: number) => {
    const { category } = this.props.route.params
    const {
      showFullAddress,

      listing: { name, address, id, images },
      rating,
      numberOfRatings,
    } = item

    const list =
      category === "food"
        ? rectangleImageList
        : category === "travel"
        ? travellingList
        : shoppingMallList

    return (
      <Pressable
        onPress={() =>
          this.props.navigation.navigate("itemInDetail", {
            id: id,
            address: address,
          })
        }
      >
        <View style={styles.recapItemContaineer}>
          {images.length > 0 ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: images[0].image,
                }}
                style={styles.recapImage}
                resizeMode="cover"
              />
            </View>
          ) : (
            <View style={styles.imageWrapper}>
              <Image
                source={getRequireImage(name, category)}
                style={styles.recapImage}
              />
            </View>
          )}

          <View style={styles.restaurantTitleContainer}>
            <Text style={styles.restaurantTitle}>{name}</Text>
            {!showFullAddress ? (
              <View style={styles.showFullAddressWrapper}>
                <Text
                  onPress={() => this.onPressReadMore(index)}
                  style={styles.recapCardText}
                  numberOfLines={1}
                >
                  {address}
                </Text>
              </View>
            ) : (
              <Text style={styles.recapCardText}>{address}</Text>
            )}
            <View style={styles.ratingContainer}>
              <View style={styles.ratingInnerWrapper}>
                <Rating width={wp("4.2%")} height={hp("4.2%")} />
                <Text style={styles.noOfRatings}>
                  {Math.round(rating)}({numberOfRatings} ratings)
                </Text>
              </View>

              <Pressable
                style={styles.navigationIcon}
                onPress={() => this.handleNavigation(address)}
              >
                <NavigationIcon width={wp("7.8%")} height={hp("3.68%")} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.borderLine}></View>
      </Pressable>
    )
  }
  renderHeader = () => {
    return <Text style={styles.frappyText}>Recap</Text>
  }

  loadMore = () => {
    const stateData = { ...this.state }
    stateData.currentPage = stateData.currentPage + 1
    this.setState(stateData)
  }
  render() {
    const { recapList, isLoaded, currentPage, totalPages } = this.state
    return (
      <>
        {isLoaded ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <FlatList
              data={recapList}
              renderItem={({ item, index }) =>
                this.flatListRecapItem(item, index)
              }
              keyExtractor={(item: any) => item.id.toString()}
              ListFooterComponent={this.renderFooter}
              style={{ padding: wp("5%"), marginBottom: wp("4%") }}
              ListHeaderComponent={this.renderHeader}
            />
          </SafeAreaView>
        ) : (
          <Loader />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
  },
  loadMoreText: {
    marginVertical: hp("3%"),
    fontSize: hp("3%"),
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: wp("7%"),
    marginBottom: wp("12%"),
  },
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
