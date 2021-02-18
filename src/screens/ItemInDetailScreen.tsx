// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
  ImageStore,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"
// icons
import {
  BookmarkIcon,
  PhotoIcon,
  RatingIcon,
  ReadMore,
  Loading,
  Profile,
  LoveIcon,
} from "../../assets/svgs/icons"
import { BackIcon, RightArrow } from "../../assets/svgs/icons/icons-directions"
// components
import CustomButton from "../components/buttons/CustomButton"
import ReadMoreComponent from "../components/elements/ReadMore"
// colors
import { colors } from "../lib/colors"
import { Context, dishesList } from "../lib/content"
import { getMonthInDetail } from "../lib/helper"
import MapService from "../services/map.service"
// services
import RestaurantService from "../services/restaurants.service"
import ReviewService from "../services/review.service"
import UserService from "../services/user.service"

interface IProps {
  navigation: any
  route: any
}

interface Istate {
  restaurantDetails: any
  ratingAndReview: Array<any>
  isLoading: boolean
  showFullAddress: boolean
  isLoadMorePressed: boolean
  time: any
  distance: any
}

const restaurantService = new RestaurantService()
const userService = new UserService()

const reviewService = new ReviewService()
const mapService = new MapService()
const replaceImage = dishesList[Math.floor(Math.random() * dishesList.length)]
class ItemInDetailScreen extends Component<IProps, Istate> {
  subscribe: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      restaurantDetails: {
        name: "",
        address: "",
        description: "",
        overall_rating: 0,
        likes: 0,
        menu_images: [],
        gallery_images: [],
        washroom_images: [],
        user_liked: false,
        total_likes: false,
      },
      ratingAndReview: [],
      isLoading: false,
      showFullAddress: false,
      isLoadMorePressed: false,
      time: 0,
      distance: 0,
    }
  }
  onPressGetDirections = (address: string) => {
    this.props.navigation.navigate("navigation", { address: address })
  }

  fetchData = () => {
    const { id, address } = this.props.route.params
    this.setState({ ...this.state, isLoading: true })
    Promise.all([
      restaurantService.getRestaurant(id),
      reviewService.getReviews(id),
      mapService.getPath({
        latitude: this.context.latitude,
        longitude: this.context.longitude,
        destination: address,
      }),
    ])
      .then((values) => {
        console.log(values, "values")
        let mutatedObject = { ...this.state }
        mutatedObject.restaurantDetails = values[0]

        mutatedObject.ratingAndReview = values[1]
        mutatedObject.isLoading = false
        // mutatedObject.distance = values[2].routes[0].legs[0].distance.text
        // mutatedObject.time = values[2].routes[0].legs[0].duration.text

        this.setState(mutatedObject)
      })
      .catch((error) => {})
  }

  componentDidMount() {
    if (this.context.latitue !== null) {
      this.fetchData()
      this.subscribe = this.props.navigation.addListener("focus", () => {
        this.fetchData()
      })
    }
  }

  changeLikeStatusInServer = () => {
    const { restaurantDetails } = this.state
    if (restaurantDetails.user_liked) {
      userService
        .likeListing({
          listing: restaurantDetails.id,
        })
        .then((response: any) => {})
        .catch((error: any) => {
          const stateData = { ...this.state }
          stateData.restaurantDetails.user_liked = !stateData.restaurantDetails
            .user_liked
          stateData.restaurantDetails.total_likes =
            stateData.restaurantDetails.total_likes - 1
          this.setState(stateData)
        })
    } else {
      userService
        .disLikeListing({
          listing: restaurantDetails.id,
        })
        .then((response: any) => {})
        .catch((error: any) => {
          const stateData = { ...this.state }
          stateData.restaurantDetails.user_liked = !stateData.restaurantDetails
            .user_liked
          stateData.restaurantDetails.total_likes =
            stateData.restaurantDetails.total_likes + 1
          this.setState(stateData)
        })
    }
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    const { restaurantDetails } = this.state
    if (
      prevState.restaurantDetails.user_liked !== restaurantDetails.user_liked
    ) {
      this.changeLikeStatusInServer()
    }
  }

  componentWillUnmount() {
    this.subscribe()
  }
  pressReadMore = () => {
    this.setState({ ...this.state, showFullAddress: true })
  }
  onPressBackIcon = () => {
    this.props.navigation.goBack()
  }

  changeloadMoreStatus = () => {
    this.setState({ ...this.state, isLoadMorePressed: true })
  }
  flatListRenderItem = (item: any, index: number) => {
    const {
      user: { profile_pic, username },
      review,
      review_images,
      updated,
    } = item

    let updatedDate = new Date(updated)
    const presentDate = new Date()
    const diff = presentDate.getDate() - updatedDate.getDate()
    console.log("diff", diff)
    const year = updatedDate.getFullYear()
    const month = getMonthInDetail(updatedDate.getMonth())

    const reviewImagesLength = review_images.length
    const imagesAlignment =
      reviewImagesLength % 3 === 0 && reviewImagesLength !== 0
    const date = `${month} ${year}`

    return (
      <View style={styles.reviewcontainer} key={index}>
        <View
          style={[
            styles.reviewContainerDirection,
            { width: "15%", display: "flex", alignItems: "center" },
          ]}
        >
          {profile_pic !== "" && profile_pic !== null && index !== 0 ? (
            <Image
              resizeMode="cover"
              style={styles.ProfilePicStyles}
              source={{ uri: profile_pic }}
            />
          ) : (
            <Profile width={wp("9%")} height={wp("9%")} />
          )}
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.addressTwo}>{date}</Text>
            {diff < 5 && (
              <>
                <View style={styles.lineMore} />
                <Text style={styles.readmore}> New</Text>
              </>
            )}
          </View>

          <View
            style={[
              styles.reviewImages,
              {
                justifyContent: imagesAlignment
                  ? "space-between"
                  : "flex-start",
                marginRight: imagesAlignment ? 0 : wp("5%"),
              },
            ]}
          >
            {review_images.map((item: any, index: number) => {
              const { id, image } = item

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
                    resizeMode="cover"
                    style={styles.hallOfFameImageMore}
                    source={{
                      uri: image,
                    }}
                  />
                </Pressable>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  onPressLike = () => {
    const stateData = { ...this.state }
    stateData.restaurantDetails.user_liked = !stateData.restaurantDetails
      .user_liked
    if (stateData.restaurantDetails.user_liked)
      stateData.restaurantDetails.total_likes =
        stateData.restaurantDetails.total_likes + 1
    else
      stateData.restaurantDetails.total_likes =
        stateData.restaurantDetails.total_likes - 1
    this.setState(stateData)
  }

  renderFooter = () => {
    const { ratingAndReview, isLoadMorePressed, restaurantDetails } = this.state

    return (
      <>
        {!isLoadMorePressed && ratingAndReview.length > 5 && (
          <Pressable
            style={styles.loadmorecontainer}
            onPress={this.changeloadMoreStatus}
          >
            <Text style={styles.loadmoretext}>
              Load More{" "}
              <View style={styles.loadingIcon}>
                <Loading width={wp("3%")} height={wp("3%")} />
              </View>
            </Text>
          </Pressable>
        )}
        <View style={styles.searchcontainer}>
          <View style={styles.searchButton}>
            <Profile width={wp("5%")} height={wp("5%")} />
            <TextInput
              placeholder="Write a review"
              style={styles.searchInput}
              onFocus={() =>
                this.props.navigation.navigate("reviewsAndRating", {
                  id: restaurantDetails.id,
                })
              }
            />
          </View>
        </View>
      </>
    )
  }

  renderHeader = () => {
    const {
      restaurantDetails,
      showFullAddress,
      time,
      distance,
      ratingAndReview,
    } = this.state
    const allImages = [
      ...restaurantDetails.menu_images,
      ...restaurantDetails.gallery_images,
      ...restaurantDetails.washroom_images,
    ]
    const {
      name,
      address,
      description,
      overall_rating,
      user_liked,
      menu_images,
      total_likes,
    } = restaurantDetails
    return (
      <View style={styles.maincontainer}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <Pressable onPress={this.onPressBackIcon}>
                <BackIcon width={wp("2.62%")} height={hp("2.26%")} />
              </Pressable>
              {menu_images.length > 0 ? (
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: menu_images[0].image }}
                />
              ) : (
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={replaceImage}
                />
              )}
              <Pressable onPress={this.onPressLike}>
                <LoveIcon
                  width={wp("7.46%")}
                  height={hp("3.015%")}
                  color={user_liked ? colors.orange : colors.greyTwo}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.restaurantname}>{name}</Text>
          <View style={styles.addressgetdirectionbutton}>
            <View style={styles.addressWrapper}>
              {!showFullAddress ? (
                <>
                  <Text
                    style={styles.address}
                    numberOfLines={2}
                    onPress={this.pressReadMore}
                  >
                    {address}
                  </Text>
                </>
              ) : (
                <Text style={styles.address}>{address}</Text>
              )}
            </View>

            <View style={styles.getdirectionbutton}>
              <CustomButton
                title="Get Directions"
                buttonStyles={styles.getdirec}
                buttonTextStyles={styles.addressButton}
                onPressButton={() => this.onPressGetDirections(address)}
              />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {time} <View style={styles.line} /> {distance}
            </Text>
          </View>
        </View>
        {/* grey container,ratings,bookmarks,photos,Description */}
        <View style={styles.greycontainer}>
          <RatingIcon width={wp("10.13%")} height={hp("5%")} />
          <View style={styles.ratingContainer}>
            <Text style={styles.greyboxtext}>{Math.round(overall_rating)}</Text>
            <Text style={styles.greyboxtext}>Ratings</Text>
          </View>

          <View style={styles.seperationLine} />
          <BookmarkIcon width={wp("10.13%")} height={hp("5%")} />
          <View style={styles.likesContainer}>
            <Text style={styles.greyboxtext}>{total_likes}</Text>
            <Text style={styles.greyboxtext}>Likes</Text>
          </View>
          <View style={styles.seperationLine} />
          <PhotoIcon width={wp("10.13%")} height={hp("5%")} />
          <View style={styles.photoContainer}>
            <Text style={styles.greyboxtext}>{allImages.length}</Text>
            <Text style={styles.greyboxtext}>Photo</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
        {/* Photos container*/}

        {allImages.length > 0 && (
          <>
            <View style={[styles.TitleContainer]}>
              <Text style={styles.frappyText}>Photos</Text>
              <View style={styles.sectionHeaderWrapper}>
                <Text style={styles.showAllText}>Show all</Text>
                <RightArrow width={wp("1.59%")} height={hp("1.10%")} />
              </View>
            </View>
            <View style={styles.imagesContainer}>
              {allImages.map((item, index) => {
                const { image, id } = item
                return (
                  <View key={index}>
                    <Image
                      style={styles.hallOfFameImage}
                      source={{
                        uri: image,
                      }}
                    />
                  </View>
                )
              })}
            </View>
          </>
        )}

        {ratingAndReview.length > 0 && (
          <View style={styles.reviewRatingContainer}>
            <Text style={styles.frappyText}>
              Ratings and Reviews(
              {ratingAndReview.length})
            </Text>
          </View>
        )}
      </View>
    )
  }
  render() {
    const { isLoadMorePressed, ratingAndReview } = this.state

    const { isLoading } = this.state
    const length = ratingAndReview.length

    const flatListData =
      ratingAndReview.length > 5
        ? isLoadMorePressed
          ? ratingAndReview.reverse()
          : ratingAndReview.slice(length - 5, length - 0).reverse()
        : ratingAndReview.reverse()

    return (
      <>
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <View style={styles.flatListContainer}>
            <FlatList
              ListHeaderComponent={this.renderHeader}
              data={flatListData}
              renderItem={({ item, index }) =>
                this.flatListRenderItem(item, index)
              }
              keyExtractor={(item, index) => item.id.toString()}
              ListFooterComponent={this.renderFooter}
            />
          </View>
        )}
      </>
    )
  }
}

ItemInDetailScreen.contextType = Context
const styles = StyleSheet.create({
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flatListContainer: { flex: 1, backgroundColor: colors.white },

  ProfilePicStyles: {
    height: wp("9%"),
    width: wp("9%"),
    borderRadius: wp("4.5%"),
  },
  loadingWrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContainerDirection: {
    display: "flex",
    flexDirection: "column",
  },
  maincontainer: {
    display: "flex",
    backgroundColor: colors.white,
  },
  mainimage: {
    // alignSelf: 'center',
    // width: wp('77.06%'),
    // height: hp('38.36%'),
    // marginBottom: hp('4%'),
    paddingLeft: "0%",
  },
  userNameContainer: {
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    paddingLeft: wp("2%"),
  },
  container1: { display: "flex" },
  container2: {
    // display: 'flex',
    position: "relative",
    flexDirection: "column",
  },
  container3: {
    paddingLeft: wp("5.6%"),
    paddingTop: hp("6.07%"),
    paddingBottom: hp("2%"),
  },
  details: {
    display: "flex",
    paddingLeft: hp("2%"),
    paddingBottom: hp("3.55%"),
  },
  restaurantname: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("8%"),
  },
  address: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),

    color: colors.grey,

    textAlign: "justify",
  },
  addressWrapper: {
    width: wp("60%"),

    marginBottom: hp("4%"),
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  addressTwo: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),

    color: colors.grey,
    paddingVertical: wp("1%"),
    marginRight: wp("2%"),
  },
  getdirectionbutton: {
    display: "flex",
    paddingRight: wp("4%"),
  },
  getdirec: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.lightGreen,
    width: wp("24%"),
    height: hp("4.8%"),
  },
  addressButton: { fontFamily: "AirbnbCerealBook", fontSize: wp("3%") },
  addressgetdirectionbutton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  time: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("3.466%"),
    color: "#333A4D",
  },
  timeContainer: { display: "flex" },
  ratingContainer: {
    display: "flex",
    paddingLeft: wp("2%"),
    paddingRight: hp("3%"),
  },
  description: {
    display: "flex",
    fontFamily: "ArchivoRegular",
    color: colors.lightBlack,
    fontSize: wp("4.53%"),
    paddingTop: hp("1.10"),
    paddingLeft: wp("2.4%"),
    paddingRight: wp("1%"),
    // lineHeight: hp('2.76%'),
    paddingBottom: hp("1.10%"),
  },
  line: {
    height: hp("1.515%"),
    width: wp("0.666%"),
    borderRadius: 4,
    backgroundColor: colors.lightGreyTwo,
    marginRight: wp("3%"),
  },
  seperationLine: {
    // height: hp("1.515%"),
    height: hp("4.34%"),
    width: wp("0.666%"),
    borderRadius: 4,
    backgroundColor: colors.lightGreyTwo,
    marginRight: wp("3%"),
  },
  lineMore: {
    // height: hp("1.515%"),
    width: wp("0.666%"),
    borderRadius: 4,
    backgroundColor: colors.lightGreyTwo,
    marginRight: wp("1%"),
    height: hp("3%"),
  },
  greycontainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.greyBackground,
    width: wp("100%"),
    height: hp("8.28%"),
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: wp("1%"),
    paddingRight: hp("1%"),
  },
  greyboxtext: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4%"),
    color: colors.grey,
  },
  photoContainer: {
    display: "flex",
    paddingLeft: wp("2%"),
    paddingRight: hp("3%"),
  },
  likesContainer: {
    display: "flex",
    paddingLeft: wp("2%"),
    paddingRight: hp("3%"),
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: wp("1%"),
    paddingLeft: hp("2%"),
    width: "100%",
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("5%"),
    paddingLeft: hp("2%"),
  },
  reviewRatingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: hp("2%"),
    marginTop: 0,
    marginBottom: wp("6%"),
  },
  reviewText: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("3.73%"),
    color: colors.grey,
    paddingRight: wp("2%"),
    // paddingBottom: hp('2.5%'),
  },
  readmore: {
    color: colors.darkorange,
  },
  frappyText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
    // lineHeight: hp('3.42%'),
  },
  userName: {
    fontFamily: "ArchivoRegular",
    // fontSize: wp("6.5%"),
    // lineHeight: hp('3.42%'),
    fontSize: wp("4.8%"),
    fontWeight: "500",
  },
  showAllText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),
    lineHeight: wp("5.7%"),
    color: colors.darkBlack,
    marginRight: wp("2%"),
  },
  sectionHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: wp("9%"),
  },
  hallOfFameImage: {
    width: wp("27%"),
    height: wp("27%"),
    margin: wp("1.5%"),
    borderRadius: wp("5%"),
  },
  hallOfFameImageMore: {
    width: wp("22%"),
    height: wp("22%"),
  },
  loadmorecontainer: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: wp("1.33%"),
    backgroundColor: "#F3F4F6",
    width: wp("32.53%"),
    height: hp("4.73%"),
  },
  loadmoretext: {
    textAlign: "center",
    fontSize: wp("3.2%"),
    fontFamily: "AirbnbCerealBook",
    color: "#888888",
    fontWeight: "500",
  },
  reviewcontainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: 'center',
    paddingHorizontal: wp("3%"),
  },
  searchcontainer: {
    paddingTop: hp("2.76%"),
    paddingLeft: wp("4.533%"),
    paddingRight: wp("5.33%"),
    paddingBottom: hp("5.55%"),
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: "2%",
    backgroundColor: "#F3F4F6",
    // backgroundColor: 'cyan',
    borderRadius: wp("3%"),
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    color: colors.grey,
  },
  image: {
    width: wp("40.03%"),
    height: wp("40.03%"),
    alignSelf: "center",
    borderRadius: wp("17.5%"),
  },
  loadingIcon: { alignSelf: "center" },
  reviewImages: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: hp("1.5%"),
    paddingLeft: hp("2%"),
    width: "100%",
    paddingRight: wp("2%"),
    marginLeft: -wp("5%"),
  },
})

export default ItemInDetailScreen
