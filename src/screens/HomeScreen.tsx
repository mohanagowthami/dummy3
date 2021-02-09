// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ImageBackground,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-snap-carousel
import Carousel, { Pagination } from "react-native-snap-carousel"
// expo location
import * as Location from "expo-location"
// svgs
import {
  BellIcon,
  NavigationIcon,
  Rating,
  RightArrow,
  SearchIcon,
  WavingHand,
} from "../../assets/svgs/icons"
// components
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
// services
import RestaurantService from "../services/restaurants.service"
import ShoppingMallService from "../services/shoppingmall.service"
import TravelService from "../services/travel.service"
import UserService from "../services/user.service"
// helper
import { deriveArrayFromString } from "../lib/helper"
import { dishesList, recapList, rectangleImageList } from "../lib/content"
import ReadMoreComponent from "../components/elements/ReadMore"

interface IProps {
  navigation: any
  route: any
}
// divisioning of the screen
interface ICategoryType {
  trendsList: Array<any>
  localFavouritesList: Array<any>
  recapList: Array<any>
  hallOfFame: Array<any>
}
// state - data
interface Istate {
  category: string
  categoryData: Array<{ isDatafetched: boolean; data: ICategoryType }>
  activeIndex: number
  isLoading: boolean
  username: string
  searchText: string
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
// data
const content = {
  // first division - trends list data
  trendsList: [
    {
      title: "restaurant1",
      description: "dish1",
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    },
    {
      title: "restaurant2",
      description: "dish2",
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    },
    {
      title: "restaurant3",
      description: "dish3",
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    },
  ],
  // second division - local favourites data
  localFavouritesList: [
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "Burgers",
      companyName: "King Bakers",
      rating: 4.8,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "Burgers",
      companyName: "King Bakers",
      rating: 4.8,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "Burgers",
      companyName: "King Bakers",
      rating: 4.8,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "Burgers",
      companyName: "King Bakers",
      rating: 4.8,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "Burgers",
      companyName: "King Bakers",
      rating: 4.8,
    },
  ],
  // third division - recap data
  recapList: [
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "KFC",
      location: "882 Swift Courts Apt",
      averageRatings: 4.8,
      numberOfRatings: 233,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "KFC",
      location: "882 Swift Courts Apt",
      averageRatings: 4.8,
      numberOfRatings: 233,
    },
    {
      image:
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
      name: "KFC",
      location: "882 Swift Courts Apt",
      averageRatings: 4.8,
      numberOfRatings: 233,
    },
  ],
  // fourth division - hall of fame data
  hallOfFame: [
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
  ],
}
// Main class component

const dummyImage =
  "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg"

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
const userService = new UserService()

class HomeScreen extends Component<IProps, Istate> {
  carousel: any
  scrollRef: any
  subscribe: any

  // destructuring props and state
  constructor(props: IProps) {
    super(props)
    this.scrollRef = React.createRef()
    this.state = {
      category: "food",
      categoryData: [
        {
          isDatafetched: false,
          data: {
            trendsList: [],
            localFavouritesList: [],
            recapList: [],
            hallOfFame: [],
          },
        },
        {
          isDatafetched: false,
          data: {
            trendsList: [],
            localFavouritesList: [],
            recapList: [],
            hallOfFame: [],
          },
        },
        {
          isDatafetched: false,
          data: {
            trendsList: [],
            localFavouritesList: [],
            recapList: [],
            hallOfFame: [],
          },
        },
      ],
      activeIndex: 0,
      isLoading: false,
      username: "",
      searchText: "",
    }
  }

  getFormatedRecapList = (recapList: any) => {
    return recapList.map((ele: any) => {
      return { ...ele, showFullAddress: false }
    })
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync()
    if (status !== "granted") {
      alert("please grant permission to access current location")
    } else {
      let location = await Location.getCurrentPositionAsync({})
      console.log("user location", location)
      const locationCoordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      this.setState({
        ...this.state,
        isLoading: true,
      })
      userService
        .updateUserCurrentLocation(locationCoordinates)
        .then((response) => {
          restaurantService
            .getRestaurantDataFromServer()
            .then((values) => {
              let stateData = { ...this.state }
              stateData.categoryData[0].data.localFavouritesList =
                values[0].results
              stateData.categoryData[0].data.hallOfFame = values[1]
              stateData.categoryData[0].data.recapList = this.getFormatedRecapList(
                values[2]
              )
              stateData.categoryData[0].isDatafetched = true
              stateData.categoryData[0].data.trendsList = content.trendsList
              stateData.isLoading = false
              stateData.username = values[3].username
              this.setState(stateData)
            })
            .catch((error) => console.log(error, "error in home screen"))
        })
        .catch((error) =>
          console.log(error, "error in user current location saving")
        )
    }
    this.subscribe = this.props.navigation.addListener("focus", () => {
      this.scrollRef.scrollTo({ x: 0, y: 0, animated: true })
    })
  }

  componentWillUnmount() {
    this.subscribe()
  }

  getActiveIndex = () => {
    const { category } = this.state
    if (category === "food") return 0
    else if (category === "travel") return 1
    else if (category === "shopping") return 2
    else return 0
  }

  getSelectedCategoryData = async () => {
    let service: any
    let index = 0
    let stateData = { ...this.state }
    if (stateData.category === "travel") {
      service = travelService
      index = 1
      stateData.category = "travel"
    } else if (stateData.category === "shopping") {
      service = shoppingService
      index = 2
      stateData.category = "shopping"
    }
    if (!stateData.categoryData[index].isDatafetched) {
      console.log("clicking")
      this.setState({
        ...this.state,
        isLoading: true,
      })
      service
        .getDataFromServer()
        .then((values: any) => {
          console.log(values, "values123")
          let stateData = { ...this.state }
          stateData.categoryData[index].data.localFavouritesList =
            values[0].results
          stateData.categoryData[index].data.hallOfFame = values[1]
          stateData.categoryData[
            index
          ].data.recapList = this.getFormatedRecapList(values[2])
          stateData.categoryData[index].isDatafetched = true
          stateData.categoryData[index].data.trendsList = content.trendsList
          stateData.isLoading = false
          this.setState(stateData)
        })
        .catch((error: any) => console.log(error, "error in home screen"))
    }
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.category !== this.state.category)
      this.getSelectedCategoryData()
  }

  // greeting function
  render_greeting(date: any) {
    if (date) {
      const hours = date.getHours()
      if (hours >= 3 && hours < 12) {
        return "Frappy morning"
      } else if (hours >= 12 && hours < 16) {
        return "Frappy afternoon"
      } else if (hours >= 16 && hours < 19) {
        return "Frappy evening"
      } else return "Frappy night"
    }
  }
  // rendering an item for carousel
  _renderItem({ item, index }: any) {
    return (
      <View
        style={[
          styles.renderItemContainer,
          {
            backgroundColor: `${
              colorsList[Math.floor(Math.random() * colorsList.length)]
            }`,
          },
        ]}
      >
        <View style={styles.descriptionContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <NavigationIcon width={wp("7.8")} height={hp("3.68%")} />
        </View>

        <ImageBackground
          style={styles.sliderImage}
          source={dishesList[Math.floor(Math.random() * dishesList.length)]}
        />
      </View>
    )
  }
  // pagination function
  get pagination() {
    const { categoryData, activeIndex } = this.state
    const index = this.getActiveIndex()
    return (
      <Pagination
        dotsLength={categoryData[index].data.trendsList.length}
        activeDotIndex={activeIndex}
        inactiveDotStyle={styles.inactiveDotStyles}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        dotStyle={styles.activeDotStyles}
      />
    )
  }
  // trends slider function
  renderTrendsSlider = () => {
    const { categoryData } = this.state
    console.log(
      categoryData[this.getActiveIndex()].data.trendsList,
      "trensdsList"
    )

    return (
      <>
        <Carousel
          layout={"default"}
          ref={(ref: any) => (this.carousel = ref)}
          data={categoryData[this.getActiveIndex()].data.trendsList}
          sliderWidth={wp("90%")}
          itemWidth={wp("90%")}
          renderItem={this._renderItem}
          loop={true}
          onSnapToItem={(index: number) => {
            this.setState({
              ...this.state,
              activeIndex: index,
            })
          }}
          // autoplay={true}
        />
        {categoryData[this.getActiveIndex()].data.trendsList && this.pagination}
      </>
    )
  }

  renderLocalFavourities = () => {
    const { categoryData } = this.state
    console.log(categoryData[0].data, "data from network")

    return (
      <ScrollView horizontal={true}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {categoryData[this.getActiveIndex()].data.localFavouritesList.map(
            (item, index) => {
              const { id, menu_images, name, rating, tags } = item

              const formatedCusines = deriveArrayFromString(tags)
              console.log(formatedCusines, "formatedCusines")

              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate("itemInDetail", {
                      id: id,
                    })
                  }
                  style={[
                    styles.renderLocalFavouritesItemWrapper,
                    {
                      backgroundColor: `${
                        colorsList[
                          Math.floor(Math.random() * colorsList.length)
                        ]
                      }`,
                    },
                  ]}
                >
                  {menu_images.length > 0 ? (
                    <ImageBackground
                      source={{
                        uri: menu_images[0].image,
                      }}
                      style={styles.localFavouriteBackgroundImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <ImageBackground
                      source={
                        rectangleImageList[
                          Math.floor(Math.random() * rectangleImageList.length)
                        ]
                      }
                      style={styles.localFavouriteBackgroundImage}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.renderLocalImagePortion2}>
                    <Text style={styles.formattedCuisinesText}>
                      {formatedCusines[0]}
                    </Text>
                    <Text style={styles.name}>{name}</Text>

                    <View style={styles.ratingWrapper}>
                      <Rating width={wp("4.2%")} height={hp("4.2%")} />
                      <Text
                        style={{
                          marginLeft: wp("2%"),
                        }}
                      >
                        {Math.round(rating)}
                      </Text>
                    </View>
                    <View style={styles.navigationWrapperStyles}>
                      <NavigationIcon width={wp("7.8%")} height={hp("3.68%")} />
                    </View>
                  </View>
                </Pressable>
              )
            }
          )}
        </View>
      </ScrollView>
    )
  }
  onChangeSearch = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }

  onPressReadMore = (index: number) => {
    const stateData = { ...this.state }
    console.log(stateData, "stateData")
    stateData.categoryData[this.getActiveIndex()].data.recapList[
      index
    ].showFullAddress = true
    this.setState(stateData)
  }

  onPressLocalFavorites = () => {
    this.props.navigation.navigate("localFavourites", {
      category: this.state.category,
    })
  }
  render() {
    // Main return function
    const { isLoading, username } = this.state
    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <ScrollView
            style={styles.container}
            ref={(ref) => (this.scrollRef = ref)}
          >
            <View>
              <View style={styles.heading}>
                <Text style={styles.frappyText}>
                  {this.render_greeting(new Date())}
                </Text>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("notifications")
                  }
                >
                  <BellIcon width={wp("6%")} height={wp("6%")} />
                </Pressable>
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </Text>
                <WavingHand width={wp("5.33%")} height={hp("2.63%")} />
              </View>
              <View style={styles.searchButton}>
                <SearchIcon width={wp("5%")} height={wp("5%")} />
                <TextInput
                  placeholder="Explore spots near you"
                  style={styles.searchInput}
                  onFocus={() =>
                    this.props.navigation.navigate("searchFoodResults")
                  }
                />
              </View>
              <View style={styles.buttonsContainer}>
                <CustomButton
                  onPressButton={() =>
                    this.setState({ ...this.state, category: "food" })
                  }
                  title="Food"
                  buttonStyles={[
                    styles.smallButton,
                    {
                      backgroundColor:
                        this.state.category !== "food"
                          ? "rgba(255,108,101,0.2)"
                          : colors.orange,
                      borderColor: colors.orange,
                    },
                  ]}
                  buttonTextStyles={[
                    styles.buttonTextStyles,
                    {
                      color:
                        this.state.category !== "food"
                          ? colors.orange
                          : colors.white,
                    },
                  ]}
                />
                <CustomButton
                  onPressButton={() =>
                    this.setState({ ...this.state, category: "travel" })
                  }
                  title="Travel"
                  buttonStyles={[
                    styles.smallButton,
                    {
                      backgroundColor:
                        this.state.category !== "travel"
                          ? "rgba(253,210,106,0.2)"
                          : colors.yellow,
                      borderColor: colors.yellow,
                    },
                  ]}
                  buttonTextStyles={[
                    {
                      color:
                        this.state.category !== "travel"
                          ? colors.yellow
                          : colors.white,
                    },
                    styles.buttonTextStyles,
                  ]}
                />
                <CustomButton
                  onPressButton={() =>
                    this.setState({ ...this.state, category: "shopping" })
                  }
                  title="Shopping"
                  buttonStyles={[
                    styles.smallButton,
                    {
                      backgroundColor:
                        this.state.category !== "shopping"
                          ? "rgba(102,197,218,0.3)"
                          : colors.skyBlue,
                      borderColor: colors.skyBlue,
                    },
                  ]}
                  buttonTextStyles={[
                    {
                      color:
                        this.state.category !== "shopping"
                          ? colors.skyBlue
                          : colors.white,
                    },
                    styles.buttonTextStyles,
                  ]}
                />
              </View>
              {/* calling trend slider function*/}
              {this.state.categoryData[this.getActiveIndex()].data &&
                this.renderTrendsSlider()}
              {this.state.categoryData[this.getActiveIndex()].data
                .localFavouritesList.length > 0 && (
                <>
                  <View style={styles.localFavouritesContainer}>
                    <Text style={styles.frappyText}>Local Favourites</Text>
                    <Pressable onPress={this.onPressLocalFavorites}>
                      <View style={styles.sectionHeaderWrapper}>
                        <Text style={styles.showAllText}>Show all</Text>
                        <RightArrow width={wp("1.59%")} height={hp("1.10%")} />
                      </View>
                    </Pressable>
                  </View>
                  {this.renderLocalFavourities()}
                </>
              )}

              {this.state.categoryData[this.getActiveIndex()].data.recapList
                .length > 0 && (
                <>
                  <View style={[styles.TitleContainer]}>
                    <Text style={styles.frappyText}>Recap</Text>
                    <Pressable
                      onPress={() =>
                        this.props.navigation.navigate("recap", {
                          recapList: this.state.categoryData[
                            this.getActiveIndex()
                          ].data.recapList,
                        })
                      }
                    >
                      <View style={styles.sectionHeaderWrapper}>
                        <Text style={styles.showAllText}>Show all</Text>
                        <RightArrow width={wp("1.59%")} height={hp("1.10%")} />
                      </View>
                    </Pressable>
                  </View>
                  <View>
                    <View>
                      {this.state.categoryData[
                        this.getActiveIndex()
                      ].data.recapList
                        .slice(0, 1)
                        .map((ele, index) => {
                          const {
                            name,
                            user_rating,
                            review_images,
                            address,
                            showFullAddress,
                          } = ele
                          const numberOfRatings = this.state.categoryData[
                            this.getActiveIndex()
                          ].data.recapList.length

                          return (
                            <React.Fragment key={index}>
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
                                      recapList[
                                        Math.floor(
                                          Math.random() * recapList.length
                                        )
                                      ]
                                    }
                                    style={styles.recapImage}
                                  />
                                )}

                                <View style={styles.restaurantTitleContainer}>
                                  <Text style={styles.restaurantTitle}>
                                    {name}
                                  </Text>
                                  {!showFullAddress ? (
                                    <View style={styles.showFullAddressWrapper}>
                                      <Text
                                        style={styles.recapCardText}
                                        numberOfLines={1}
                                      >
                                        {address}
                                      </Text>
                                      <ReadMoreComponent
                                        onPressReadmore={() =>
                                          this.onPressReadMore(index)
                                        }
                                      />
                                    </View>
                                  ) : (
                                    <Text style={styles.recapCardText}>
                                      {address}
                                    </Text>
                                  )}
                                  <View style={styles.ratingContainer}>
                                    <View style={styles.ratingInnerWrapper}>
                                      <Rating
                                        width={wp("4.2%")}
                                        height={hp("4.2%")}
                                      />
                                      <Text style={styles.noOfRatings}>
                                        {user_rating}({numberOfRatings} ratings)
                                      </Text>
                                    </View>

                                    <View style={styles.navigationIcon}>
                                      <NavigationIcon
                                        width={wp("7.8%")}
                                        height={hp("3.68%")}
                                      />
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.borderLine}></View>
                            </React.Fragment>
                          )
                        })}
                    </View>
                  </View>
                </>
              )}

              {this.state.categoryData[this.getActiveIndex()].data.hallOfFame
                .length > 0 && (
                <>
                  <View style={[styles.TitleContainer]}>
                    <Text style={styles.frappyText}>Hall of Fame</Text>
                    <View style={styles.sectionHeaderWrapper}>
                      <Pressable
                        onPress={() =>
                          this.props.navigation.navigate("hallOfFame", {
                            hallOfFameList: this.state.categoryData[
                              this.getActiveIndex()
                            ].data.hallOfFame,
                          })
                        }
                      >
                        <View style={styles.showAll}>
                          <Text style={styles.showAllText}>Show all</Text>
                          <RightArrow
                            width={wp("1.59%")}
                            height={hp("1.10%")}
                          />
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.hallOfFameContainer}>
                    {this.state.categoryData[
                      this.getActiveIndex()
                    ].data.hallOfFame.map((item, index) => {
                      const { image } = item
                      return (
                        <View key={index}>
                          <Image
                            style={styles.hallOfFameImage}
                            source={{
                              uri: image,
                            }}
                            resizeMode="cover"
                          />
                        </View>
                      )
                    })}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        )}
      </>
    )
  }
}
export default HomeScreen
const styles = StyleSheet.create({
  ratingInnerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  showFullAddressWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  navigationWrapperStyles: {
    position: "absolute",
    bottom: hp("2%"),
    right: hp("2%"),
  },
  formattedCuisinesText: {
    fontFamily: "ArchivoBold",
    fontSize: wp("4.8%"),
    color: colors.darkBlack,
  },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  renderLocalImagePortion2: {
    display: "flex",
    flex: 1,
    padding: wp("5%"),
  },

  localFavouriteBackgroundImage: {
    width: "100%",

    display: "flex",
    borderTopLeftRadius: wp("3.2%"),
    borderTopRightRadius: wp("3.2%"),
    aspectRatio: 3 / 2,
  },
  renderLocalFavouritesItemWrapper: {
    width: wp("55%"),
    height: wp("70%"),
    borderRadius: wp("3.2%"),
    marginRight: wp("3%"),
    padding: 0,
    overflow: "hidden",
    position: "relative",
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("5%"),
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp("2%"),
    alignItems: "center",
  },
  localFavouritesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    marginBottom: wp("6%"),
  },
  localFavouritesImageContainer: {
    paddingVertical: wp("6%"),
    width: wp("55%"),
    height: wp("60%"),
    borderRadius: wp("3%"),
    marginRight: wp("5%"),
    paddingHorizontal: wp("5%"),
    flex: 1,
  },
  image: {
    width: "50%",
    height: "50%",
    display: "flex",
    alignSelf: "center",
  },
  localFavouriteImage: {
    width: wp("30.66%"),
    height: hp("11.57%"),
    display: "flex",
    alignSelf: "center",
  },
  cuisineContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    marginTop: wp("4%"),
  },
  cuisineText: {
    fontFamily: "ArchivoBold",
    fontSize: wp("4.8%"),
    color: colors.darkBlack,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("0%"),
  },
  frappyText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6%"),
  },
  container: {
    padding: "5%",
    display: "flex",
    paddingTop: "8%",
    flex: 1,
    backgroundColor: colors.white,
  },
  hallOfFameContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: wp("15%"),
  },
  userName: {
    fontFamily: "ArchivoRegular",
    color: colors.grey,
    fontSize: wp("4.5%"),
    marginRight: wp("3%"),
    // marginVertical: wp("4%"),
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
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
    flex: 1,
  },
  smallButton: {
    borderRadius: wp("5%"),
    marginTop: wp("5.3%"),
    paddingVertical: wp("2.5%"),
    marginBottom: wp("4%"),
    borderWidth: wp("0.3%"),
    width: wp("29%"),
  },
  buttonTitle: {
    fontFamily: "AirbnbCerealBold",
    fontSize: wp("5%"),
    lineHeight: wp("5%"),
  },
  showAll: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTextStyles: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4.5%"),
  },
  sliderImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  overallRating: {
    marginLeft: wp("2%"),
  },
  renderItemContainer: {
    padding: wp("4%"),
    display: "flex",
    flexDirection: "row",
    borderRadius: wp("3%"),
    justifyContent: "space-between",
    height: wp("34%"),
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  localFavourites: { display: "flex", flexDirection: "row" },
  name: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.8%"),
    color: colors.orange,
    height: hp("7%"),
    overflow: "hidden",
  },
  showAllText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),
    lineHeight: wp("5.7%"),
    color: colors.darkBlack,
    marginRight: wp("2%"),
  },

  titleText: {
    display: "flex",
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
    color: colors.darkBlack,
  },
  sectionHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  hallOfFameImage: {
    width: wp("28%"),
    height: wp("28%"),
    marginTop: wp("5%"),
    borderRadius: wp("5%"),
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
  rating: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingView: {
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
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  restaurantTitleContainer: {
    flex: 1,
    padding: wp("5%"),
    justifyContent: "space-between",
  },
  borderLine: {
    height: 1,
    backgroundColor: colors.lightGreyTwo,
  },
  inactiveDotStyles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: colors.white,
    borderColor: colors.orange,
    borderWidth: 1,
  },
  activeDotStyles: {
    width: wp("4%"),
    height: wp("2%"),
    borderRadius: wp("1%"),
    marginHorizontal: 0,
    backgroundColor: colors.orange,
  },
  description: {
    display: "flex",
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.grey,
  },
  descriptionContainer: { display: "flex", flex: 1 },
  activity: {
    marginTop: hp("45%"),
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
    alignItems: "center",
  },
})
