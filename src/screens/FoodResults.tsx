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
  TextInput,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-snap-carousel
import Carousel, { Pagination } from "react-native-snap-carousel"
//icons
import {
  NavigationIcon,
  BackIcon,
} from "../../assets/svgs/icons/icons-directions"
import { Rating, ClockIcon, SearchIcon } from "../../assets/svgs/icons"
// colors
import { colors } from "../lib/colors"
import CustomButton from "../components/buttons/CustomButton"
import RestaurantService from "../services/restaurants.service"
import TravelService from "../services/travel.service"
import ShoppingMallService from "../services/shoppingmall.service"
import { SafeAreaView } from "react-native-safe-area-context"
import { deriveArrayFromString } from "../lib/helper"
import { add } from "react-native-reanimated"

interface IProps {
  navigation: any
}
// divisioning of the screen

// state - data
interface Istate {
  category: string
  categorySearchResults: []
  searchText: string
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

const imagesList = [
  "https://media.istockphoto.com/photos/mutton-gosht-biryani-picture-id469866881?k=6&m=469866881&s=612x612&w=0&h=XjVN6-kyp9WLgEJaRqqLyvP5ve-kS5e6Y5Bfl-jaSXs=",
  "https://media.istockphoto.com/photos/fish-biryani-with-basmati-rice-indian-food-picture-id488481490?k=6&m=488481490&s=612x612&w=0&h=J8lIVq-5pPU-ta0BRZPaHY3WVXf6nbSJqAW9E2J-qDs=",
  "https://media.istockphoto.com/photos/indian-chicken-biryani-served-in-a-terracotta-bowl-with-yogurt-over-picture-id979891994?k=6&m=979891994&s=612x612&w=0&h=AZUYF4BdDzWeZ6q2puAzcqD0miXvAct42o7Hgump6ZA=",
]
const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class FoodSearchResults extends Component<IProps, Istate> {
  carousel: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      category: "food",
      categorySearchResults: [],
      searchText: "",
    }
  }

  heading = () => {
    return (
      <>
        <View style={styles.backicon}>
          <Pressable onPress={() => this.props.navigation.navigate("home")}>
            <BackIcon width={wp("3.13%")} height={hp("2.84%")} />
          </Pressable>
        </View>
        {/* <Text style={styles.title}>{this.state.keyWord}</Text> */}
        <Text style={[styles.filter, { paddingTop: hp("0.4%") }]}>Filter</Text>
      </>
    )
  }

  getShuffleImagesList = () => {
    return imagesList.map((image) => {
      return imagesList[Math.floor(Math.random() * imagesList.length)]
    })
  }
  _renderItem({ item, index }: any) {
    console.log(item, "item")
    const image = item.image ? item.image : item
    return (
      <View style={styles.renderItemsContainer}>
        <Image
          style={styles.sliderImage}
          source={{
            uri: image,
          }}
        />
        {/* <View style={styles.paginationContainer}>{this.pagination}</View> */}
      </View>
    )
  }
  // get pagination() {
  //   // const { activeIndex, categoryData } = this.state
  //   // const index = this.getActiveIndex()
  //   return (
  //     <Pagination
  //       dotsLength={categoryData.results.length}
  //       activeDotIndex={activeIndex}
  //       inactiveDotStyle={styles.inactiveDotStyles}
  //       inactiveDotOpacity={0.3}
  //       inactiveDotScale={1}
  //       dotStyle={styles.activeDotStyles}
  //     />
  //   )
  // }

  getDataFromSearchAPI = () => {
    const { category, searchText } = this.state
    let service
    if (category === "food") service = restaurantService
    else if (category === "travel") service = travelService
    else service = shoppingService

    service
      .search(searchText)
      .then((response: any) => {
        console.log(response.results, "results")
        this.setState({
          ...this.state,
          categorySearchResults: response.results,
        })
      })
      .catch((error: any) => console.log(error, "in search API"))
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.searchText !== this.state.searchText) {
      setTimeout(this.getDataFromSearchAPI, 300)
    }
  }

  renderResults = () => {
    const { categorySearchResults } = this.state
    const number_of_ratings = categorySearchResults.length
    return (
      <>
        {categorySearchResults.map((ele: any, index) => {
          const { menu_images, name, tags, dining_rating, address } = ele
          const images =
            menu_images.length > 0 ? menu_images : this.getShuffleImagesList()
          const place = address.split(",")
          const formattedTags = deriveArrayFromString(tags)

          return (
            <View key={index}>
              <Carousel
                layout={"default"}
                ref={(ref: any) => (this.carousel = ref)}
                data={images}
                sliderWidth={wp("100%")}
                itemWidth={wp("100%")}
                renderItem={this._renderItem.bind(this)}
                onSnapToItem={(index: number) => {}}
              />
              <View style={styles.carouselContainer}>
                <View>
                  <Text style={styles.restaurantName}>{name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  {formattedTags.map((tag: string) => {
                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-end",
                        }}
                      >
                        <View style={styles.dotStyle}></View>
                        <Text style={styles.restaurantType}>
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </Text>
                      </View>
                    )
                  })}

                  <View style={styles.navigationIcon}>
                    <NavigationIcon width={wp("7.46%")} height={hp("3.68%")} />
                  </View>
                </View>
                <View>
                  <View style={styles.rating}>
                    <Text style={styles.ratingNumber}>{dining_rating}</Text>
                    <View style={styles.ratingIcon}>
                      <Rating width={wp("3.096%")} height={hp("1.461%")} />
                    </View>
                    <Text style={styles.ratingText}>
                      {`${number_of_ratings} Ratings`}
                    </Text>
                    <View style={styles.time}>
                      <ClockIcon width={wp("3.096%")} height={hp("1.461%")} />
                    </View>
                    <Text style={styles.timeText}>
                      {/* {item.time} min */}25 min
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </>
    )
  }

  onChangeText = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }

  updateCategory = (category: string) => {
    this.setState({ ...this.state, category: category, searchText: "" })
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewStyles}>
        <ScrollView
          style={styles.mainContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.searchButton}>
            <SearchIcon width={wp("5%")} height={wp("5%")} />
            <TextInput
              placeholder="Explore spots near you"
              style={styles.searchInput}
              onChangeText={this.onChangeText}
              autoFocus={true}
              value={this.state.searchText}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              onPressButton={() => this.updateCategory("food")}
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
              onPressButton={() => this.updateCategory("travel")}
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
              onPressButton={() => this.updateCategory("shopping")}
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

          {this.renderResults()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  dotStyle: {
    width: hp("2%"),
    height: hp("2%"),
    borderRadius: hp("1%"),
    backgroundColor: colors.greyTwo,
    marginRight: wp("2%"),
  },
  safeAreaViewStyles: {
    flex: 1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    padding: wp("4%"),
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
    width: wp("89.33%"),
    height: wp("44.34%"),
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
  },
  carouselContainer: { paddingLeft: wp("6.67%") },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: hp("0.789%"),
    flexWrap: "wrap",
  },
  restaurantType: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.26%"),
    color: colors.grey,
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
    paddingTop: hp("0.789%"),
  },
  ratingText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
    paddingRight: wp("7.808%"),
  },
  ratingNumber: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
    paddingLeft: wp("1.33%"),
    paddingRight: wp("2.984%"),
  },
  ratingIcon: {
    display: "flex",
    alignSelf: "center",
    paddingRight: wp("2.184%"),
  },
  time: {
    display: "flex",
    alignSelf: "center",
    paddingRight: wp("2.184%"),
  },
  timeText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.2%"),
    color: colors.namecolor,
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
