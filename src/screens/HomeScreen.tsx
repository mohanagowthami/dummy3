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
  FlatList,
  SafeAreaView,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-snap-carousel
import Carousel, { Pagination } from "react-native-snap-carousel"
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
import { deriveArrayFromString, getRequireImage } from "../lib/helper"
// content
import {
  Context,
  dishesList,
  rectangleImageList,
  shoppingMallList,
  travellingList,
  trendsContent,
} from "../lib/content"
import MarketingService from "../services/marketing.service"

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

// Main class component

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
const userService = new UserService()
const marketingService = new MarketingService()

class HomeScreen extends Component<IProps, Istate> {
  carousel: any
  scrollRef: any
  subscribe: any
  mounted: boolean

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
    this.mounted = false
  }

  fetchRecapList = () => {
    if (this.mounted) {
      let service: any
      let index = 0
      let stateData = { ...this.state }
      if (stateData.category === "food") {
        service = restaurantService
        index = 0
      } else if (stateData.category === "travel") {
        service = travelService
        index = 1
      } else if (stateData.category === "shopping") {
        service = shoppingService
        index = 2
      }

      Promise.all([service.getRecap(), service.getHallOfFame()])
        .then((response: any) => {
          stateData.categoryData[index].data.recapList = response[0].results
          stateData.categoryData[index].data.hallOfFame = response[1].results

          this.setState(stateData)
        })
        .catch((error: any) => {
          alert("something went wrong")
        })
    }
  }

  getFormatedRecapList = (recapList: any): Array<any> => {
    if (recapList.length > 0) {
      const mutatedArray = recapList.map((ele: any) => {
        return { ...ele, showFullAddress: false }
      })
      return mutatedArray.reverse()
    } else {
      return []
    }
  }

  async componentDidMount() {
    if (this.context.latitude !== null) {
      this.setState({ ...this.state, isLoading: true })
      userService
        .updateUserCurrentLocation({
          ...this.context,
        })
        .then(() => {
          restaurantService
            .getCurrentUserLocationBasedData()
            .then((response) => {
              const stateData = { ...this.state }
              if (response["results"])
                stateData.categoryData[0].data.localFavouritesList =
                  response.results

              stateData.isLoading = false
              this.setState(stateData)
            })
            .catch(() => {
              alert("something went wrong in local")
            })
          restaurantService
            .getRecap()
            .then((response) => {
              const stateData = { ...this.state }
              stateData.categoryData[0].data.recapList = response.results
              stateData.isLoading = false
              this.setState(stateData)
            })
            .catch(() => {
              alert("something went wrong in recap")
            })
          restaurantService
            .getHallOfFame()
            .then((response) => {
              const stateData = { ...this.state }
              stateData.categoryData[0].data.hallOfFame = response.results
              stateData.isLoading = false
              this.setState(stateData)
            })
            .catch(() => {
              alert("something went wrong in hall of fame")
            })

          marketingService
            .getTrendingList()
            .then((response) => {
              const stateData = { ...this.state }
              if (response.length !== 0)
                stateData.categoryData[0].data.trendsList = response
              else
                stateData.categoryData[0].data.trendsList =
                  trendsContent.trendsList
              stateData.isLoading = false
              this.setState(stateData)
            })
            .catch((error) => {
              alert("something went wrong")
            })

          userService
            .getUser()
            .then((response) => {
              const stateData = { ...this.state }
              stateData.username = response.username
              stateData.isLoading = false
              this.setState(stateData)
            })
            .catch((error) => {
              alert("something went wrong")
            })
        })
        .catch(() => alert("something went wrong"))
    }

    this.subscribe = this.props.navigation.addListener("focus", () => {
      this.scrollRef.scrollTo({ x: 0, y: 0, animated: true })
      this.fetchRecapList()
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
    if (!stateData.categoryData[index].isDatafetched && service) {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      service
        .getDataFromServer()
        .then((values: any) => {
          let stateData = { ...this.state }
          if (values[0]["results"])
            stateData.categoryData[index].data.localFavouritesList =
              values[0].results
          stateData.categoryData[index].data.hallOfFame = values[1].results
          stateData.categoryData[
            index
          ].data.recapList = this.getFormatedRecapList(values[2].results)
          stateData.categoryData[index].isDatafetched = true
          stateData.categoryData[index].data.trendsList =
            trendsContent.trendsList
          stateData.isLoading = false
          this.setState(stateData)
        })
        .catch((error: any) => {
          alert("something went wrong")
        })
    }
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    this.mounted = true
    const { category } = this.state
    if (prevState.category !== category) this.getSelectedCategoryData()
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
        containerStyle={styles.paginationContainerStyle}
      />
    )
  }
  // trends slider function
  renderTrendsSlider = () => {
    const { categoryData } = this.state

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
        />
        {categoryData[this.getActiveIndex()].data.trendsList && this.pagination}
      </>
    )
  }

  renderLocalFavourities = () => {
    const { categoryData, category } = this.state

    const recapLength =
      categoryData[this.getActiveIndex()].data.recapList.length
    const hallOfFameLength =
      categoryData[this.getActiveIndex()].data.hallOfFame.length

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[
            styles.localFavouriteOuterContainer,
            {
              marginBottom:
                recapLength == 0 && hallOfFameLength == 0 ? hp("8%") : 0,
            },
          ]}
        >
          {categoryData[this.getActiveIndex()].data.localFavouritesList.map(
            (item, index) => {
              const { id, menu_images, name, rating, tags, address } = item
              let formatedCusines
              if (typeof tags === "string")
                formatedCusines = deriveArrayFromString(tags)
              else formatedCusines = tags

              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate("itemInDetail", {
                      id: id,
                      address: address,
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
                        uri:
                          menu_images[
                            Math.floor(Math.random() * menu_images.length)
                          ].image,
                      }}
                      style={styles.localFavouriteBackgroundImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <ImageBackground
                      source={getRequireImage(
                        tags[Math.floor(Math.random() * tags.length)],
                        category
                      )}
                      style={styles.localFavouriteBackgroundImage}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.renderLocalImagePortion2}>
                    <Text style={styles.formattedCuisinesText}>
                      {formatedCusines[0]}
                    </Text>
                    <Text style={styles.name} numberOfLines={1}>
                      {name}
                    </Text>

                    <View style={styles.ratingWrapper}>
                      <View style={styles.ratingBox}>
                        <Rating width={wp("4.2%")} height={hp("4.2%")} />
                        <Text
                          style={{
                            marginLeft: wp("2%"),
                          }}
                        >
                          {Math.round(rating)}
                        </Text>
                      </View>

                      <Pressable onPress={() => this.handleNavigation(address)}>
                        <NavigationIcon
                          width={wp("7.8%")}
                          height={hp("3.68%")}
                        />
                      </Pressable>
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

    stateData.categoryData[this.getActiveIndex()].data.recapList[
      index
    ].showFullAddress = true
    this.setState(stateData)
  }

  onPressLocalFavorites = () => {
    const { category } = this.state
    this.props.navigation.navigate("localFavourites", {
      category: category,
    })
  }
  handleRecapItem = (id: number, address: string) => {
    this.props.navigation.navigate("itemInDetail", {
      id: id,
      address,
    })
  }

  handleNavigation = (address: string) => {
    this.props.navigation.navigate("navigation", { address: address })
  }

  flatListRecapItem = (item: any, index: number) => {
    const { categoryData, category } = this.state
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

  getHallOfFameImages = () => {
    let list: any = []
    const { categoryData } = this.state
    categoryData[this.getActiveIndex()].data.hallOfFame.map(
      (ele: any, index: number) => {
        const { review_images } = ele
        review_images.map((item: any, index: any) => {
          const { image } = item
          list = [...list, image]
        })
      }
    )
    return list
  }

  render() {
    // Main return function
    const { isLoading, username, category, categoryData } = this.state

    const HallOfFameImagesList = this.getHallOfFameImages()

    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <SafeAreaView style={styles.safeAreaViewStyles}>
            <ScrollView
              style={styles.container}
              ref={(ref) => (this.scrollRef = ref)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
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
                          category !== "food"
                            ? "rgba(255,108,101,0.2)"
                            : colors.orange,
                        borderColor: colors.orange,
                      },
                    ]}
                    buttonTextStyles={[
                      styles.buttonTextStyles,
                      {
                        color:
                          category !== "food" ? colors.orange : colors.white,
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
                          category !== "travel"
                            ? "rgba(253,210,106,0.2)"
                            : colors.yellow,
                        borderColor: colors.yellow,
                      },
                    ]}
                    buttonTextStyles={[
                      {
                        color:
                          category !== "travel" ? colors.yellow : colors.white,
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
                          category !== "shopping"
                            ? "rgba(102,197,218,0.3)"
                            : colors.skyBlue,
                        borderColor: colors.skyBlue,
                      },
                    ]}
                    buttonTextStyles={[
                      {
                        color:
                          category !== "shopping"
                            ? colors.skyBlue
                            : colors.white,
                      },
                      styles.buttonTextStyles,
                    ]}
                  />
                </View>
                {/* calling trend slider function*/}
                {categoryData[this.getActiveIndex()].data &&
                  this.renderTrendsSlider()}
                {categoryData[this.getActiveIndex()].data.localFavouritesList
                  .length > 0 && (
                  <>
                    <View style={styles.localFavouritesContainer}>
                      <Text style={styles.frappyText}>Local Favourites</Text>

                      <Pressable
                        style={styles.sectionHeaderWrapper}
                        onPress={this.onPressLocalFavorites}
                      >
                        <Text style={styles.showAllText}>Show all</Text>
                        <RightArrow
                          width={wp("2.3%")}
                          height={hp("2%")}
                          color={colors.white}
                        />
                      </Pressable>
                    </View>
                    {this.renderLocalFavourities()}
                  </>
                )}

                {categoryData[this.getActiveIndex()].data.recapList.length >
                  0 && (
                  <>
                    <View style={[styles.TitleContainer]}>
                      <Text style={styles.frappyText}>Recap</Text>
                      <Pressable
                        onPress={() =>
                          this.props.navigation.navigate("recap", {
                            category: category,
                          })
                        }
                      >
                        <View style={styles.sectionHeaderWrapper}>
                          <Text style={styles.showAllText}>Show all</Text>
                          <RightArrow
                            width={wp("2.3%")}
                            height={hp("2%")}
                            color={colors.white}
                          />
                        </View>
                      </Pressable>
                    </View>
                    <View>
                      <FlatList
                        data={categoryData[
                          this.getActiveIndex()
                        ].data.recapList.slice(0, 4)}
                        renderItem={({ item, index }) =>
                          this.flatListRecapItem(item, index)
                        }
                        keyExtractor={(item: any) => item.id.toString()}
                        extraData={category}
                        style={{
                          marginBottom:
                            HallOfFameImagesList.length === 0 ? hp("4.1%") : 0,
                        }}
                      />
                    </View>
                  </>
                )}

                {HallOfFameImagesList.length > 0 && (
                  <>
                    <View style={[styles.TitleContainer]}>
                      <Text style={styles.frappyText}>Hall of Fame</Text>
                      {HallOfFameImagesList.length > 6 && (
                        <View style={styles.sectionHeaderWrapper}>
                          <Pressable
                            onPress={() =>
                              this.props.navigation.navigate("hallOfFame", {
                                category: category,
                              })
                            }
                          >
                            <View style={styles.showAll}>
                              <Text style={styles.showAllText}>Show all</Text>
                              <RightArrow
                                width={wp("2.3%")}
                                height={hp("2%")}
                                color={colors.white}
                              />
                            </View>
                          </Pressable>
                        </View>
                      )}
                    </View>
                    <View
                      style={[
                        styles.hallOfFameContainer,
                        {
                          justifyContent:
                            HallOfFameImagesList.slice(0, 6).length % 3 === 0
                              ? "space-between"
                              : "flex-start",
                        },
                      ]}
                    >
                      {HallOfFameImagesList.slice(0, 6).map(
                        (image: string, index: number) => {
                          return (
                            <Pressable
                              key={index}
                              onPress={() =>
                                this.props.navigation.navigate("fullImage", {
                                  imageUrl: image,
                                })
                              }
                              style={[
                                styles.hallOfFameImageWrapper,
                                {
                                  marginRight:
                                    HallOfFameImagesList.slice(0, 6).length %
                                      3 ===
                                    0
                                      ? 0
                                      : wp("5%"),
                                },
                              ]}
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
                        }
                      )}
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    )
  }
}
export default HomeScreen

HomeScreen.contextType = Context

const styles = StyleSheet.create({
  safeAreaViewStyles: { flex: 1, backgroundColor: colors.white },

  localFavouriteOuterContainer: {
    display: "flex",
    flexDirection: "row",
  },
  paginationContainerStyle: {
    marginTop: -hp("2%"),
    marginBottom: -hp("2.8%"),
  },
  imageWrapper: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
  },

  ratingBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
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
    fontSize: wp("5.3%"),
    color: colors.darkBlack,
  },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: wp("2%"),
  },
  renderLocalImagePortion2: {
    display: "flex",
    flex: 1,
    padding: wp("5%"),
    paddingTop: wp("3%"),
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
    height: wp("65%"),
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
    marginTop: hp("1%"),
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
    marginBottom: wp("4%"),
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
    width: "100%",
    flex: 1,
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
    width: "100%",
  },
  smallButton: {
    borderRadius: wp("5%"),
    marginTop: wp("5.3%"),
    paddingVertical: wp("2.5%"),
    marginBottom: wp("4%"),
    borderWidth: wp("0.3%"),
    width: "100%",
    minWidth: wp("26%"),
    flex: 0.3,
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

    overflow: "hidden",
  },
  showAllText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),
    lineHeight: wp("5.7%"),
    color: colors.white,
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
    padding: wp("2%"),
    backgroundColor: colors.orange,
    borderRadius: wp("4%"),
  },
  hallOfFameImageWrapper: {
    width: "28%",
    height: wp("26%"),
    marginBottom: wp("5%"),
  },

  hallOfFameImage: {
    width: "100%",
    height: "100%",
    marginTop: wp("5%"),
    borderRadius: wp("5%"),
  },
  recapImage: {
    width: "100%",
    height: wp("30%"),
  },
  recapItemContaineer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: wp("3.5%"),
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
