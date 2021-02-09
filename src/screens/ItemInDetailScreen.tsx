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
import { dishesList } from "../lib/content"
// services
import RestaurantService from "../services/restaurants.service"
import ReviewService from "../services/review.service"

const image1 =
  "https://pattys-cakes.com/wp-content/uploads/2020/11/colorful-rosette-cake-350x350.jpg"
const image2 =
  "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const image3 =
  "https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg"
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
}

const restaurantService = new RestaurantService()

const reviewService = new ReviewService()
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
      },
      ratingAndReview: [],
      isLoading: false,
      showFullAddress: false,
      isLoadMorePressed: false,
    }
  }
  onPressGetDirections = () => {
    this.props.navigation.navigate("navigation")
  }

  fetchData = () => {
    const { id } = this.props.route.params
    this.setState({ ...this.state, isLoading: true })
    Promise.all([
      restaurantService.getRestaurant(id),
      reviewService.getReviews(id),
    ])
      .then((values) => {
        console.log(values, "values in item in detail")
        let mutatedObject = { ...this.state }
        mutatedObject.restaurantDetails = values[0]
        mutatedObject.ratingAndReview = values[1]
        mutatedObject.isLoading = false
        this.setState(mutatedObject)
      })
      .catch((error) => console.log(error, "in item in detail"))
  }

  componentDidMount() {
    this.fetchData()
    this.subscribe = this.props.navigation.addListener("focus", () => {
      this.fetchData()
    })
  }

  componentWillUnmount() {
    this.subscribe()
  }
  pressReadMore = () => {
    console.log("in call press ")
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
    const year = updatedDate.getFullYear()
    const month = updatedDate.toLocaleString("default", {
      month: "long",
    })

    const date = `${month} ${year}`
    console.log(review_images, "review image")
    return (
      <View style={styles.reviewcontainer} key={index}>
        <View style={styles.reviewContainerDirection}>
          {/* {profile_pic !== "" && profile_pic !== null ? (
                          <Image
                            resizeMode="contain"
                            style={{
                              height: hp("6.3%"),
                              width: wp("12.8%"),
                            }}
                            source={{ uri: profile_pic }}
                          />
                        ) : ( */}
          <Profile width={wp("10%")} height={wp("10%")} />
          {/* )} */}
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.addressTwo}>
            {date}
            <View style={styles.lineMore} />
            <Text style={styles.readmore}> New</Text>
          </Text>
          <Text style={styles.reviewText}>
            {review}
            {review !== "" && (
              <Text style={styles.readmore}>
                {" "}
                Readmore <ReadMore />
              </Text>
            )}
          </Text>
          <View style={styles.reviewImages}>
            {review_images.map((item: any, index: number) => {
              const { id, image } = item
              console.log(image, " images")
              return (
                <View key={index}>
                  <Image
                    resizeMode="contain"
                    style={styles.hallOfFameImageMore}
                    source={{
                      uri: image,
                    }}
                  />
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  renderFooter = () => {
    const { ratingAndReview, isLoadMorePressed, restaurantDetails } = this.state
    const flatListData =
      ratingAndReview.length > 5
        ? isLoadMorePressed
          ? ratingAndReview
          : ratingAndReview.slice(0, 5)
        : ratingAndReview
    return (
      <>
        {!this.state.isLoadMorePressed && flatListData.length === 5 && (
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
    const { restaurantDetails, showFullAddress } = this.state
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
      likes,
      menu_images,
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
                  source={
                    dishesList[Math.floor(Math.random() * dishesList.length)]
                  }
                />
              )}
              <LoveIcon width={wp("7.46%")} height={hp("3.015%")} />
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.restaurantname}>{name}</Text>
          <View style={styles.addressgetdirectionbutton}>
            <View style={styles.addressWrapper}>
              {!showFullAddress ? (
                <>
                  <Text style={styles.address} numberOfLines={2}>
                    {address}
                  </Text>

                  <ReadMoreComponent onPressReadmore={this.pressReadMore} />
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
                onPressButton={this.onPressGetDirections}
              />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              33 min <View style={styles.line} /> 4.8 miles
            </Text>
          </View>
        </View>
        {/* grey container,ratings,bookmarks,photos,Description */}
        <View style={styles.greycontainer}>
          <RatingIcon width={wp("10.13%")} height={hp("5%")} />
          <View style={styles.ratingContainer}>
            <Text style={styles.greyboxtext}>{overall_rating}</Text>
            <Text style={styles.greyboxtext}>Ratings</Text>
          </View>

          <View style={styles.seperationLine} />
          <BookmarkIcon width={wp("10.13%")} height={hp("5%")} />
          <View style={styles.likesContainer}>
            <Text style={styles.greyboxtext}>137k</Text>
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

        {this.state.ratingAndReview.length > 0 && (
          <View style={styles.reviewRatingContainer}>
            <Text style={styles.frappyText}>
              Ratings and Reviews(
              {this.state.ratingAndReview.length})
            </Text>
          </View>
        )}
      </View>
    )
  }
  render() {
    const { isLoadMorePressed, ratingAndReview } = this.state

    const { isLoading } = this.state

    const flatListData =
      ratingAndReview.length > 5
        ? isLoadMorePressed
          ? ratingAndReview
          : ratingAndReview.slice(0, 5)
        : ratingAndReview

    return (
      <>
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <>
            {this.state.ratingAndReview.length > 0 && (
              <FlatList
                ListHeaderComponent={this.renderHeader}
                data={flatListData}
                renderItem={({ item, index }) =>
                  this.flatListRenderItem(item, index)
                }
                keyExtractor={(item, index) => item.id}
                ListFooterComponent={this.renderFooter}
              />
            )}
          </>
        )}
      </>
    )
  }
}
const styles = StyleSheet.create({
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
    minHeight: hp("100%"),
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
    paddingRight: wp("13.066%"),
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
    paddingTop: hp("1.44%"),
    color: colors.grey,
    paddingBottom: hp("1%"),
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
    marginRight: wp("3%"),
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
    width: wp("25%"),
    height: wp("25%"),
    margin: wp("1.5%"),
    borderRadius: wp("5%"),
  },
  hallOfFameImageMore: {
    width: wp("11.73%"),
    height: hp("6.78%"),
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
    paddingHorizontal: wp("5%"),
    paddingLeft: wp("3%"),
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
    marginBottom: wp("1%"),
    paddingLeft: hp("2%"),
  },
})

export default ItemInDetailScreen
