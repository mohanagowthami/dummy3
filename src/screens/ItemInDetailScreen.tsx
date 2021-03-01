// react
import React, { Component } from "react"
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
  ImageStore,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
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
// colors
import { colors } from "../lib/colors"
// content
import { Context, dishesList } from "../lib/content"
// helper
import {
  deriveArrayFromString,
  getDistanceFromLatLon,
  getMonthInDetail,
  getRequireImage,
} from "../lib/helper"

// services
import RestaurantService from "../services/restaurants.service"
import ReviewService from "../services/review.service"
import UserService from "../services/user.service"
import MapService from "../services/map.service"

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
  showAllPhotos: boolean
}

const restaurantService = new RestaurantService()
const userService = new UserService()

const reviewService = new ReviewService()
const mapService = new MapService()

class ItemInDetailScreen extends Component<IProps, Istate> {
  subscribe: any
  replaceImage: any

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
        tag: "",
        establishment_category: "",
      },
      ratingAndReview: [],
      isLoading: false,
      showFullAddress: false,
      isLoadMorePressed: false,
      time: 0,
      distance: 0,
      showAllPhotos: false,
    }
  }
  onPressGetDirections = (address: string) => {
    this.props.navigation.navigate("navigation", { address: address })
  }
  getFormatedReviews = (reviewsList: any) => {
    const array = reviewsList.map((ele: any) => {
      return { ...ele, showFullAddress: false }
    })
    return array.reverse()
  }

  fetchData = () => {
    const { id, address } = this.props.route.params
    console.log(id, address, "id")

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
        console.log(values[0])
        let mutatedObject = { ...this.state }
        mutatedObject.restaurantDetails = values[0]

        mutatedObject.ratingAndReview = this.getFormatedReviews(values[1])
        mutatedObject.isLoading = false
        try {
          mutatedObject.distance = values[2].routes[0].legs[0].distance.text
          mutatedObject.time = values[2].routes[0].legs[0].duration.text
        } catch (error) {
          const durationData = getDistanceFromLatLon(
            values[0].latitude,
            values[0].longitude,
            this.context.latitude,
            this.context.longitude
          )
          mutatedObject.distance = durationData.distance
          mutatedObject.time = durationData.time
        }

        this.setState(mutatedObject)
      })
      .catch((error) => {
        console.log(error, "item in detail")
        this.setState({ ...this.state, isLoading: false })
      })
  }
  componentDidMount() {
    const {
      restaurantDetails: { name },
    } = this.state
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
      console.log("in servicing")
      userService
        .likeListing({
          listing: restaurantDetails.id,
        })
        .then((response: any) => {
          console.log(response, "response in like")
        })
        .catch((error: any) => {
          console.log(error, "error in like")
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

  handleFullDescription = (index: number) => {
    const stateData = { ...this.state }

    stateData.ratingAndReview[index].showFullAddress = true
    this.setState(stateData)
  }
  flatListRenderItem = (item: any, index: number) => {
    const {
      user: { profile_pic, username },
      review,
      review_images,
      updated,
      showFullAddress,
    } = item

    let updatedDate = new Date(updated)
    const presentDate = new Date()
    const diff = presentDate.getDate() - updatedDate.getDate()

    const year = updatedDate.getFullYear()
    const month = getMonthInDetail(updatedDate.getMonth())

    const reviewImagesLength = review_images.length
    const imagesAlignment =
      reviewImagesLength % 5 === 0 && reviewImagesLength !== 0
    const date = `${month} ${year}`
    console.log(profile_pic, "profile_pic")

    return (
      <View style={styles.reviewcontainer} key={index}>
        {profile_pic ? (
          <Image
            resizeMode="cover"
            style={styles.ProfilePicStyles}
            source={{ uri: profile_pic }}
          />
        ) : (
          <Profile width={wp("9%")} height={wp("9%")} />
        )}

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
          {review !== "" &&
            review &&
            (item.showFullAddress ? (
              <Text style={styles.reviewText}>{review}</Text>
            ) : (
              <Text
                style={styles.reviewText}
                numberOfLines={3}
                onPress={() => this.handleFullDescription(index)}
              >
                {review}
              </Text>
            ))}

          {review_images.length > 0 && (
            <View
              style={[
                styles.reviewImages,
                {
                  justifyContent: imagesAlignment
                    ? "space-between"
                    : "flex-start",
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
                    style={[
                      styles.reviewImagesWrapper,
                      { marginRight: imagesAlignment ? 0 : wp("2%") },
                    ]}
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
          )}
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
    this.setState(stateData, () => this.changeLikeStatusInServer())
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
      showAllPhotos,
    } = this.state
    let revewImagesList: any = []
    let allImages: any = []
    try {
      ratingAndReview.map((ele: any) => {
        const { review_images } = ele
        revewImagesList = [...review_images, ...revewImagesList]
      })

      allImages = [
        ...restaurantDetails.menu_images,
        ...restaurantDetails.gallery_images,
        ...restaurantDetails.washroom_images,
        ...revewImagesList,
      ]
    } catch (error) {}

    console.log("allImages", allImages)
    const {
      name,
      address,
      description,
      overall_rating,
      user_liked,
      menu_images,
      total_likes,
      establishment_category,
      tags,
    } = restaurantDetails
    const imagesAlignment = allImages.length % 3 === 0 && allImages.length !== 0
    const allPhotos =
      allImages.length > 6
        ? showAllPhotos
          ? allImages
          : allImages.slice(0, 6)
        : allImages

    let formatedCusines = []
    if (typeof tags === "string") formatedCusines = deriveArrayFromString(tags)
    else formatedCusines = tags

    return (
      <>
        <View style={styles.HeaderContainer}>
          <Pressable onPress={this.onPressBackIcon}>
            <BackIcon
              width={wp("2.62%")}
              height={hp("2.26%")}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          </Pressable>
          {menu_images.length > 0 ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: menu_images[0].image }}
            />
          ) : (
            formatedCusines?.length > 0 && (
              <Image
                style={styles.image}
                resizeMode="cover"
                source={getRequireImage(
                  formatedCusines[0],
                  establishment_category
                )}
              />
            )
          )}
          <Pressable onPress={this.onPressLike}>
            <LoveIcon
              width={wp("7.46%")}
              height={hp("3.015%")}
              color={user_liked ? colors.orange : colors.greyTwo}
            />
          </Pressable>
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
        <View style={{ paddingHorizontal: wp("3%") }}>
          {description !== "" && description !== null && (
            <Text style={styles.description}>{description}</Text>
          )}
          {/* Photos container*/}

          {allImages.length > 0 && (
            <>
              <View
                style={[
                  styles.TitleContainer,
                  { marginVertical: wp("2.5%"), marginTop: wp("2%") },
                ]}
              >
                <Text style={styles.frappyText}>Photos</Text>
                {allImages.length > 6 && !showAllPhotos && (
                  <Pressable
                    style={styles.sectionHeaderWrapper}
                    onPress={() =>
                      this.setState({ ...this.state, showAllPhotos: true })
                    }
                  >
                    <Text style={styles.showAllText}>Show all</Text>
                    <RightArrow
                      width={wp("2.3%")}
                      height={hp("2%")}
                      color={colors.white}
                    />
                  </Pressable>
                )}
              </View>
              <View
                style={[
                  styles.imagesContainer,
                  {
                    justifyContent: imagesAlignment
                      ? "space-between"
                      : "flex-start",
                  },
                ]}
              >
                {allPhotos.map((item: any, index: number) => {
                  const { image, id } = item
                  return (
                    <Pressable
                      key={index}
                      style={{
                        width: "30%",
                        marginBottom: wp("2%"),
                        marginRight: imagesAlignment ? 0 : wp("2.5%"),
                      }}
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
      </>
    )
  }

  render() {
    const { isLoadMorePressed, ratingAndReview, isLoading } = this.state

    const length = ratingAndReview.length

    const flatListData =
      ratingAndReview.length > 5
        ? isLoadMorePressed
          ? ratingAndReview
          : ratingAndReview.slice(0, 4)
        : ratingAndReview

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
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </>
    )
  }
}

ItemInDetailScreen.contextType = Context
const styles = StyleSheet.create({
  HeaderContainer: { paddingHorizontal: wp("3%") },

  reviewImagesWrapper: {
    width: "20%",
    height: wp("15%"),
    overflow: "hidden",
  },

  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: wp("3%"),
    paddingTop: wp("8%"),
  },

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
  userNameContainer: {
    display: "flex",
    flex: 1,
    marginLeft: wp("3%"),
  },

  details: {
    display: "flex",
    marginBottom: hp("3.55%"),
    paddingHorizontal: wp("3%"),
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
    width: "100%",
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
    paddingHorizontal: wp("3%"),
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
    justifyContent: "space-between",
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp("5%"),
  },
  reviewRatingContainer: {
    marginTop: 0,
    marginBottom: wp("6%"),
  },
  reviewText: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("3.73%"),
    color: colors.grey,
    paddingRight: wp("2%"),

    textAlign: "justify",
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
    color: colors.white,
    marginRight: wp("2%"),
  },
  sectionHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: wp("2%"),
    backgroundColor: colors.orange,
    borderRadius: wp("4%"),
  },
  hallOfFameImage: {
    width: "100%",
    height: wp("27%"),

    borderRadius: wp("5%"),
  },
  hallOfFameImageMore: {
    width: "100%",
    height: wp("15%"),
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
    alignItems: "flex-start",
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
    width: "100%",
    marginVertical: hp("1.5%"),
  },
})

export default ItemInDetailScreen
