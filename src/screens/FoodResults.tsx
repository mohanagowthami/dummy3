// react
import React, { Component, createRef } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-snap-carousel
import Carousel from "react-native-snap-carousel"
//icons
import {
  NavigationIcon,
  BackIcon,
} from "../../assets/svgs/icons/icons-directions"
import { Rating, ClockIcon, SearchIcon } from "../../assets/svgs/icons"
// colors
import { colors } from "../lib/colors"
// components
import CustomButton from "../components/buttons/CustomButton"
// service
import RestaurantService from "../services/restaurants.service"
import TravelService from "../services/travel.service"
import ShoppingMallService from "../services/shoppingmall.service"
import { SafeAreaView } from "react-native-safe-area-context"
// helper
import {
  deriveArrayFromString,
  getDistanceFromLatLon,
  getRequireImage,
} from "../lib/helper"
// content
import { Context } from "../lib/content"

interface IProps {
  navigation: any
}
// divisioning of the screen

// state - data
interface Istate {
  category: string
  categorySearchResults: any
  searchText: string
  isLoading: boolean
  totalPages: number
  currentPage: number
  flatListLoading: boolean
}
// data
const details = {
  profileDetails: [
    {
      name: "Rohit Sharma",
      image:
        "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      place: "Hyderabad",
    },
  ],
  results: [
    {
      name: "Saleem",
      type: "Biryani",
      address: "Opposite VIT",
      place: "Vellore",
      time: 25,
      rating: 4.3,
      noOfratings: "200+",
      photo1:
        "https://media.istockphoto.com/photos/indian-chicken-biryani-served-in-a-terracotta-bowl-with-yogurt-over-picture-id979891994?k=6&m=979891994&s=612x612&w=0&h=AZUYF4BdDzWeZ6q2puAzcqD0miXvAct42o7Hgump6ZA=",
      photo2: "",
      photp3: "",
      photo4: "",
    },
    {
      name: "McDonald's",
      type: "Chinese",
      place: "Hyderabad",
      time: 25,
      rating: 4.3,
      noOfratings: "200+",
      photo1:
        "https://media.istockphoto.com/photos/authentic-chicken-biryani-with-onion-raita-picture-id516401834?k=6&m=516401834&s=612x612&w=0&h=GUFCrtpi_MEWzt5RUvBh6v2jsG127n8LG2FyU9IYbbs=",
      photo2: "",
      photp3: "",
      photo4: "",
    },
    {
      name: "McDonald's",
      type: "Chinese",
      place: "Hyderabad",
      time: 25,
      rating: 4.3,
      noOfratings: "200+",
      photo1:
        "https://media.istockphoto.com/photos/fish-biryani-with-basmati-rice-indian-food-picture-id488481490?k=6&m=488481490&s=612x612&w=0&h=J8lIVq-5pPU-ta0BRZPaHY3WVXf6nbSJqAW9E2J-qDs=",
      photo2: "",
      photp3: "",
      photo4: "",
    },
    {
      name: "McDonald's",
      type: "Chinese",
      place: "Hyderabad",
      time: 25,
      rating: 4.3,
      noOfratings: "200+",
      photo1: "",
      photo2: "",
      photp3: "",
      photo4: "",
    },
  ],
}

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class FoodSearchResults extends Component<IProps, Istate> {
  carousel: any

  flatListRef: any = createRef()

  constructor(props: IProps) {
    super(props)
    this.state = {
      category: "food",
      categorySearchResults: [],
      searchText: "",
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
      flatListLoading: false,
    }
  }

  heading = () => {
    return (
      <>
        <View style={styles.backicon}>
          <Pressable onPress={() => this.props.navigation.navigate("home")}>
            <BackIcon
              width={wp("3.13%")}
              height={hp("2.84%")}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          </Pressable>
        </View>

        <Text style={[styles.filter, { paddingTop: hp("0.4%") }]}>Filter</Text>
      </>
    )
  }

  _renderItem({ item, index }: any) {
    return (
      <View style={styles.renderItemsContainer} key={index}>
        {item.image ? (
          <Image
            style={styles.sliderImage}
            source={{
              uri: item.image,
            }}
          />
        ) : (
          <Image style={styles.sliderImage} source={item} />
        )}
      </View>
    )
  }

  getDataFromSearchAPI = () => {
    const { searchText, currentPage, category } = this.state

    if (searchText !== "") {
      let service
      if (category === "food") service = restaurantService
      else if (category === "travel") service = travelService
      else service = shoppingService
      const stateData = { ...this.state }
      service
        .search(searchText, currentPage)
        .then((response: any) => {
          stateData.totalPages = response.info.pages

          if (currentPage > 1) {
            stateData.categorySearchResults = [
              ...stateData.categorySearchResults,
              ...response.results,
            ]
          } else {
            stateData.categorySearchResults = response.results
          }
          stateData.isLoading = false
          stateData.flatListLoading = false
        })
        .catch((error: any) => {
          stateData.isLoading = false
          stateData.flatListLoading = false
        })
        .finally(() => {
          stateData.searchText = this.state.searchText
          this.setState(stateData)
        })
    } else {
      this.setState({ ...this.state, categorySearchResults: [] })
    }
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    const { searchText, currentPage, categorySearchResults } = this.state
    if (prevState.searchText !== searchText && searchText !== "") {
      const stateData = { ...this.state }
      stateData.currentPage = 1
      if (categorySearchResults.length == 0) stateData.flatListLoading = true
      this.setState(stateData)
      const timeout = categorySearchResults.length === 0 ? 0 : 300
      const classThis = this
      setTimeout(function () {
        classThis.getDataFromSearchAPI()
      }, timeout)
    } else if (searchText === "" && categorySearchResults.length !== 0) {
      this.setState({ ...this.state, categorySearchResults: [] })
    }
    if (prevState.currentPage !== currentPage) this.getDataFromSearchAPI()
  }

  handleNavigation = (address: string) => {
    this.props.navigation.navigate("navigation", { address })
  }

  flatListRenderItem = (prop: any) => {
    const { categorySearchResults, category } = this.state
    const number_of_ratings = categorySearchResults.length
    const {
      menu_images,
      name,
      tags,
      dining_rating,
      address,
      id,
      latitude,
      longitude,
      establishment_category,
    } = prop.item

    let formatedCusines = []
    if (typeof tags === "string" && tags !== "")
      formatedCusines = deriveArrayFromString(tags)
    else if (tags !== null) formatedCusines = tags

    const taggedName = formatedCusines.length > 0 ? formatedCusines[0] : name

    const images =
      menu_images.length > 0
        ? menu_images
        : [getRequireImage(taggedName, establishment_category)]

    const place = address.split(",")

    const durationDetails = getDistanceFromLatLon(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(this.context.latitude),
      parseFloat(this.context.longitude)
    )

    return (
      <Pressable
        onPress={() =>
          this.props.navigation.navigate("itemInDetail", {
            id: id,
            address: address,
          })
        }
      >
        <Carousel
          layout={"stack"}
          layoutCardOffset={wp("5%")}
          ref={(ref: any) => (this.carousel = ref)}
          data={images}
          sliderWidth={wp("95%")}
          itemWidth={wp("95%")}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={(index: number) => {}}
        />
        <View style={styles.carouselContainer}>
          <View>
            <Text style={styles.restaurantName}>{name}</Text>
          </View>
          <View style={styles.detailsContainerWrapper}>
            <View style={{ width: "90%" }}>
              {formatedCusines.length > 0 && (
                <View style={styles.detailsContainer}>
                  {formatedCusines.map((tag: string, index: number) => {
                    return (
                      <View style={styles.formattedTagsContainer} key={index}>
                        <View style={styles.dotStyle}></View>
                        <Text style={styles.restaurantType}>
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              )}
              <View style={styles.rating}>
                <Text style={styles.ratingNumber}>{dining_rating}</Text>

                <Rating width={wp("4%")} height={hp("3%")} />

                <Text style={styles.ratingText}>
                  {`${number_of_ratings} Ratings`}
                </Text>
                <View style={styles.clockWrapper}>
                  <ClockIcon width={wp("6%")} height={hp("5%")} />
                  <Text style={styles.timeText}>{durationDetails.time}</Text>
                </View>
              </View>
            </View>
            <Pressable
              style={styles.navigationIcon}
              onPress={() => this.handleNavigation(address)}
            >
              <NavigationIcon width={wp("7.46%")} height={hp("3.68%")} />
            </Pressable>
          </View>
        </View>
      </Pressable>
    )
  }

  onChangeText = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }

  updateCategory = (category: string) => {
    this.setState({ ...this.state, category: category, searchText: "" })
  }
  handleCrossIcon = () => {
    this.setState({ ...this.state, searchText: "" })
  }

  renderCategoryButtons = () => {
    const { searchText, category } = this.state

    return (
      <React.Fragment>
        <View style={styles.searchButton}>
          <SearchIcon width={wp("5%")} height={wp("5%")} />
          <TextInput
            placeholder="Explore spots near you"
            style={styles.searchInput}
            onChangeText={this.onChangeText}
            autoFocus={true}
            value={searchText}
          />
          {searchText !== "" && (
            <Text style={styles.crossIcon} onPress={this.handleCrossIcon}>
              X
            </Text>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            onPressButton={() => this.updateCategory("food")}
            title="Food"
            buttonStyles={[
              styles.smallButton,
              {
                backgroundColor:
                  category !== "food" ? "rgba(255,108,101,0.2)" : colors.orange,
                borderColor: colors.orange,
              },
            ]}
            buttonTextStyles={[
              styles.buttonTextStyles,
              {
                color: category !== "food" ? colors.orange : colors.white,
              },
            ]}
          />
          <CustomButton
            onPressButton={() => this.updateCategory("travel")}
            title="Travel"
            buttonStyles={[
              styles.smallButton,
              {
                backgroundColor:
                  category !== "travel"
                    ? "rgba(253,210,106,0.2)"
                    : colors.yellow,
                borderColor: colors.yellow,
              },
            ]}
            buttonTextStyles={[
              {
                color: category !== "travel" ? colors.yellow : colors.white,
              },
              styles.buttonTextStyles,
            ]}
          />
          <CustomButton
            onPressButton={() => this.updateCategory("shopping")}
            title="Shopping"
            buttonStyles={[
              styles.smallButton,
              {
                backgroundColor:
                  category !== "shopping"
                    ? "rgba(102,197,218,0.3)"
                    : colors.skyBlue,
                borderColor: colors.skyBlue,
              },
            ]}
            buttonTextStyles={[
              {
                color: category !== "shopping" ? colors.skyBlue : colors.white,
              },
              styles.buttonTextStyles,
            ]}
          />
        </View>
      </React.Fragment>
    )
  }

  loadMore = () => {
    const stateData = { ...this.state }
    stateData.currentPage = stateData.currentPage + 1
    this.setState(stateData)
  }

  renderFooter = () => {
    const {
      searchText,
      categorySearchResults,
      currentPage,
      totalPages,

      flatListLoading,
    } = this.state

    if (flatListLoading)
      return <ActivityIndicator size="large" color={colors.darkBlack} />
    else if (
      categorySearchResults === "no objects" ||
      (searchText !== "" && categorySearchResults.length == 0)
    )
      return <Text style={styles.noResultsFound}>No Results Found</Text>
    else if (currentPage < totalPages && searchText !== "")
      return (
        <Text onPress={this.loadMore} style={styles.loadMoreText}>
          Load more...
        </Text>
      )
    else return null
  }

  render() {
    const {
      isLoading,
      categorySearchResults,
      category,
      searchText,
      flatListLoading,
    } = this.state

    return (
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <View style={styles.mainContainer}>
          {isLoading ? (
            <ActivityIndicator color={colors.darkBlack} size="large" />
          ) : (
            <FlatList
              data={categorySearchResults}
              renderItem={this.flatListRenderItem.bind(this)}
              keyExtractor={(item: any) => item.id.toString()}
              extraData={category}
              ListFooterComponent={this.renderFooter()}
              ref={(ref) => (this.flatListRef = ref)}
              keyboardShouldPersistTaps="always"
              ListHeaderComponent={this.renderCategoryButtons()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }
}
FoodSearchResults.contextType = Context

const styles = StyleSheet.create({
  crossIcon: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
    color: colors.darkBlack,
    display: "flex",
    alignSelf: "flex-end",
  },
  loadMoreText: {
    marginVertical: hp("3%"),
    fontSize: hp("3%"),
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: wp("7%"),
  },
  noResultsFound: {
    paddingHorizontal: wp("7%"),
    fontFamily: "ArchivoBold",
    fontSize: wp("4%"),
    color: colors.darkBlack,
  },
  clockWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  formattedTagsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainerWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    marginTop: hp("2%"),
  },
  safeAreaViewStyle: {
    flex: 1,
  },
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  dotStyle: {
    width: wp("1%"),
    height: wp("1%"),
    borderRadius: wp("0.5%"),
    backgroundColor: colors.greyTwo,
    marginRight: wp("1%"),
  },
  safeAreaViewStyles: {
    flex: 1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    padding: wp("4%"),
    paddingHorizontal: wp("4%"),
  },
  heading: {
    display: "flex",
    paddingTop: hp("2%"),
    paddingBottom: hp("2.10%"),
    paddingLeft: wp("7.46%"),
    paddingRight: wp("5.33%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: wp("0.150%"),
    borderBottomColor: colors.borderbottomcolor,
  },
  backicon: {
    // paddingLeft: wp('7.44%'),
    paddingTop: hp("1.2%"),
    // paddingRight: wp('15.46%'),
  },
  title: {
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
    // paddingTop: hp('2%'),
    // justifyContent: 'center',
    // paddingLeft: wp('6%'),
  },
  filter: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4.26%"),
    color: colors.namecolor,
  },
  searchCount: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5.33%"),
    paddingTop: wp("3.15%"),
    paddingLeft: wp("5.33%"),
    paddingBottom: hp("2.63%"),
    color: colors.greyishBlack,
  },
  renderItemsContainer: {
    // padding: wp('5%'),
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    paddingTop: hp("2.5%"),
    paddingLeft: wp("5.33%"),
    paddingRight: wp("5.33%"),
    // justifyContent: 'space-between',
    // height: wp('34%'),
    // alignItems: 'center',
  },
  sliderImage: {
    width: "100%",
    height: hp("28.34%"),
    borderRadius: wp("3%"),
  },
  paginationContainer: {
    display: "flex",
    flex: 1,
    position: "absolute",
    marginTop: wp("37%"),
    marginLeft: wp("62%"),
  },
  inactiveDotStyles: {
    width: wp("2.13%"),
    height: wp("1.33%"),
    borderRadius: wp("0.6667%"),
    marginHorizontal: -1,
    backgroundColor: colors.white,
    borderColor: colors.white,
    // borderWidth: 1,
  },
  activeDotStyles: {
    width: wp("2.13%"),
    height: wp("1.33%"),
    borderRadius: wp("0.6667%"),
    marginHorizontal: -1,
    backgroundColor: colors.white,
  },
  restaurantName: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5.33%"),
    color: colors.namecolor,
    marginTop: hp("3%"),
  },
  carouselContainer: { paddingLeft: wp("6.67%") },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: hp("0.8%"),
    flexWrap: "wrap",
    width: "75%",
  },
  restaurantType: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.26%"),
    color: colors.grey,
    marginRight: wp("2%"),
  },
  address: {
    width: wp("1.066%"),
    height: wp("1.066%"),
    marginLeft: wp("2.66%"),
    marginRight: hp("1.31%"),
    alignSelf: "center",
    borderRadius: wp("0.503%"),
    backgroundColor: colors.grey,
  },
  addressText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.26%"),
    color: colors.grey,
  },
  location: {
    width: wp("1.066%"),
    height: wp("1.066%"),
    marginLeft: wp("2.66%"),
    marginRight: hp("1.31%"),
    alignSelf: "center",
    borderRadius: wp("0.503%"),
    backgroundColor: colors.grey,
  },
  locationText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.26%"),
    color: colors.grey,
  },
  navigationIcon: {
    display: "flex",
    flex: 1,
    flexDirection: "row-reverse",
    paddingLeft: wp("7.2%"),
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
    marginRight: wp("7.808%"),
    marginLeft: wp("3%"),
  },
  ratingNumber: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
    marginRight: wp("3%"),
  },
  ratingIcon: {
    display: "flex",
    alignSelf: "center",
    paddingRight: wp("2.184%"),
  },

  timeText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
    marginLeft: wp("3%"),
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "2%",
    backgroundColor: colors.lightGrey,
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    color: colors.grey,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallButton: {
    width: wp("27%"),
    borderRadius: wp("5%"),
    marginTop: wp("5.3%"),
    paddingVertical: wp("3%"),
    marginBottom: wp("4%"),
    borderWidth: wp("0.3%"),
  },
  buttonTitle: {
    fontFamily: "AirbnbCerealBold",
    fontSize: wp("4%"),
    lineHeight: wp("5%"),
  },
  buttonTextStyles: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4%"),
    lineHeight: wp("5%"),
  },
})

export default FoodSearchResults
