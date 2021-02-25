// react
import React, { Component } from "react"
// react-native
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// icons
import { NavigationIcon } from "../../assets/svgs/icons/icons-directions"
import { BellIcon, SearchIcon } from "../../assets/svgs/icons"
// colors
import { colors } from "../lib/colors"
import { deriveArrayFromString } from "../lib/helper"
import { dishesList } from "../lib/content"
import RestaurantService from "../services/restaurants.service"
import TravelService from "../services/travel.service"
import ShoppingMallService from "../services/shoppingmall.service"

const colorsList = [
  "#FFEA75",
  "#FFE8E7",
  "#C3F4FF",
  "#E2F0FF",
  "#FFE2F5",
  "#E1E2FF",
  "#FFE5B2",
]
export const localFavouritesList = [
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
]
interface IProps {
  navigation: any
  route: any
}

interface IState {
  localFavourites: any
  isLoading: boolean
  currentPage: number
  totalPages: number
  flatListLoading: boolean
}

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class LocalFavourites extends Component<IProps, IState> {
  refCategory: any
  constructor(props: IProps) {
    super(props)
    {
      this.state = {
        localFavourites: [],
        isLoading: false,
        currentPage: 1,
        totalPages: 1,
        flatListLoading: false,
      }
      this.refCategory = React.createRef()
    }
  }

  getDataFromServer = () => {
    const category = this.props.route.params
      ? this.props.route.params.category
      : this.refCategory.current

    this.setState({ ...this.state, isLoading: true })
    const { currentPage } = this.state
    let service
    if (category === "food") {
      this.refCategory.current = "food"
      service = restaurantService
    } else if (category === "travel") {
      this.refCategory.current = "travel"
      service = travelService
    } else {
      service = shoppingService
      this.refCategory.current = "shopping"
    }
    service
      .getCurrentUserLocationBasedData(currentPage)
      .then((response) => {
        this.setState({
          localFavourites: response.results,
          totalPages: response.info.pages,
        })
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ ...this.state, isLoading: false })
      })
  }
  componentDidMount() {
    this.getDataFromServer()
  }

  handleNavigation = (address: string) => {
    this.props.navigation.navigate("navigation", { address: address })
  }

  flatListRenderItem = ({ item }: any) => {
    const { menu_images, overall_rating, name, tags, id, address } = item
    let formatedCusines
    if (typeof tags === "string") formatedCusines = deriveArrayFromString(tags)
    else formatedCusines = tags

    return (
      <Pressable
        onPress={() =>
          this.props.navigation.navigate("itemInDetail", {
            id: id,
            address: address,
          })
        }
        style={[
          styles.backgroundcolorContainer,
          {
            backgroundColor: `${
              colorsList[Math.floor(Math.random() * colorsList.length)]
            }`,
          },
        ]}
      >
        <View style={styles.pressableInnerWrapper}>
          <View style={styles.fullHeight}>
            <Text style={styles.cusine}>{formatedCusines[0]}</Text>
            <Text style={styles.restaurantName} numberOfLines={2}>
              {name}
            </Text>
          </View>
          <Pressable onPress={() => this.handleNavigation(address)}>
            <NavigationIcon width={wp("7.8")} height={wp("7.8%")} />
          </Pressable>
        </View>

        {menu_images.length > 0 ? (
          <ImageBackground
            source={{
              uri: menu_images[0].image,
            }}
            style={styles.image}
          />
        ) : (
          <ImageBackground
            source={dishesList[Math.floor(Math.random() * dishesList.length)]}
            style={styles.image}
          />
        )}
      </Pressable>
    )
  }

  onPressLoadMore = () => {
    let stateData = { ...this.state }
    stateData.currentPage = stateData.currentPage + 1
    this.setState(stateData, () => this.getDataFromServer)
  }
  renderFooter = () => {
    const { currentPage, totalPages } = this.state
    if (currentPage < totalPages) {
      return (
        <View style={styles.loadmore}>
          <Text style={styles.loadMoreText} onPress={this.onPressLoadMore}>
            Load More...
          </Text>
        </View>
      )
    } else return null
  }

  renderLocalFavouritesList = () => {
    const category = this.props.route.params
      ? this.props.route.params.category
      : this.refCategory.current
    const { localFavourites } = this.state
    return (
      <FlatList
        data={localFavourites}
        renderItem={this.flatListRenderItem}
        keyExtractor={(item: any) => item.id.toString()}
        extraData={category}
        ListFooterComponent={this.renderFooter}
        showsVerticalScrollIndicator={false}
      />
    )
  }
  render() {
    const { isLoading } = this.state
    return (
      <>
        {isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Local Favourites</Text>
              <Pressable
                onPress={() => this.props.navigation.navigate("notifications")}
              >
                <BellIcon width={wp("6%")} height={wp("6%")} />
              </Pressable>
            </View>
            <View style={styles.searchButton}>
              <SearchIcon width={wp("5%")} height={wp("5%")} />
              <TextInput
                placeholder="Search Restaurants"
                style={styles.searchInput}
                onFocus={() =>
                  this.props.navigation.navigate("searchFoodResults")
                }
              />
            </View>
            {this.renderLocalFavouritesList()}
          </View>
        )}
      </>
    )
  }
}
export default LocalFavourites

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  pressableInnerWrapper: { width: "65%", justifyContent: "flex-start" },
  activityIndicator: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: wp("5%"),
  },
  titleText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
  },
  container: {
    padding: "5%",
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
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
  renderItemContainer: {
    padding: wp("5%"),
    display: "flex",
    flexDirection: "row",
    borderRadius: wp("3%"),
    justifyContent: "space-between",
    height: wp("34%"),
    marginTop: wp("5%"),
    paddingVertical: wp("3%"),
  },
  backgroundcolorContainer: {
    padding: wp("5%"),
    display: "flex",
    flexDirection: "row",
    borderRadius: wp("3%"),
    justifyContent: "space-between",
    height: wp("34%"),
    marginTop: wp("5%"),
    paddingVertical: wp("3%"),
  },
  cusine: {
    display: "flex",
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
    color: colors.darkBlack,
    marginBottom: wp("1%"),
  },
  restaurantName: {
    display: "flex",
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.grey,
  },
  image: {
    width: wp("28%"),
    height: wp("28%"),
    display: "flex",
    alignSelf: "center",
  },
  loadmore: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  loadMoreText: {
    fontSize: wp("4.5%"),
    fontFamily: "ArchivoRegular",
    color: colors.darkBlack,
  },
})
