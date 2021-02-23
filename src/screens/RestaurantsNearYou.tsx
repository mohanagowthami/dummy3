// react
import React, { Component, createRef } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native"
import { add } from "react-native-reanimated"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// icons
import { LocationIcon, NavigationIcon } from "../../assets/svgs/icons"
import { CurrentLocation } from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"
import RestaurantService from "../services/restaurants.service"
import UserService from "../services/user.service"

interface IProps {
  navigation: any
}
// state - data
interface Istate {
  userName: string
  searchText: string
  isLoading: boolean
  searchResponse: any
  totalpages: number
  currentPage: number
  flatListLoading: boolean
}

const userService = new UserService()
const restaurantService = new RestaurantService()
class RestaurantsNearYou extends Component<IProps, Istate> {
  initialSearch: boolean
  constructor(props: IProps) {
    super(props)
    this.state = {
      userName: "",
      searchText: "",
      isLoading: false,
      searchResponse: [],
      totalpages: 1,
      currentPage: 1,
      flatListLoading: false,
    }
    this.initialSearch = true
  }

  componentDidMount = () => {
    this.setState({ ...this.state, isLoading: true })

    userService
      .getUser()
      .then((response) => {
        this.setState({
          ...this.state,
          userName: response.username,
          isLoading: false,
        })
      })
      .catch((e) => {})
  }

  getSearchResponse = () => {
    const { searchText } = this.state
    if (searchText !== "") {
      const { searchText, searchResponse, currentPage } = this.state

      const stateData = { ...this.state }

      restaurantService
        .getUniversalSearchData(searchText, currentPage)
        .then((response: any) => {
          stateData.totalpages = response.info.pages
          if (currentPage > 1)
            stateData.searchResponse = [
              ...stateData.searchResponse,
              ...response.results,
            ]
          else stateData.searchResponse = response.results
        })
        .catch((error) => {})
        .finally(() => {
          stateData.isLoading = false
          stateData.flatListLoading = false
          stateData.searchText = this.state.searchText
          this.setState(stateData)
        })
    } else {
      this.setState({ ...this.state, searchResponse: [] })
    }
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    const { searchText, searchResponse } = this.state

    if (prevState.searchText !== searchText && searchText !== "") {
      this.setState({ ...this.state, currentPage: 1 })
      const timeout = searchResponse.length === 0 ? 0 : 200
      if (searchResponse.length == 0)
        this.setState({ ...this.state, flatListLoading: true })
      setTimeout(this.getSearchResponse, timeout)
    } else if (searchText === "" && searchResponse.length !== 0) {
      this.setState({ ...this.state, searchResponse: [] })
    }
  }

  changeSearchText = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }

  pressCrossIcon = () => {
    this.setState({ ...this.state, searchText: "" })
  }

  renderHeader = () => {
    const { userName, searchText } = this.state
    return (
      <View style={styles.mainContainer}>
        <Text
          style={styles.x}
          onPress={() => this.props.navigation.navigate("home")}
        >
          x
        </Text>
        <Text style={styles.title}>
          What are you looking for,{"\n"}
          {userName.charAt(0).toUpperCase() + userName.slice(1)}?
        </Text>

        {/* <View style={styles.container}>
          <CurrentLocation width={wp("4.23%")} height={hp("2.34%")} />
          <Text style={styles.currentLocationText}> Use current Location</Text>
        </View> */}
        <View style={styles.searchButton}>
          <LocationIcon width={wp("5%")} height={wp("5%")} />
          <TextInput
            placeholder="Enter a new address"
            style={styles.searchInput}
            onChangeText={this.changeSearchText}
            value={searchText}
          />
          {searchText !== "" && (
            <Text style={styles.crossIcon} onPress={this.pressCrossIcon}>
              X
            </Text>
          )}
        </View>
      </View>
    )
  }

  handleNavigation = (address: string) => {
    this.props.navigation.navigate("navigation", { address })
  }

  loadMore = () => {
    let stateData = { ...this.state }
    stateData.currentPage = stateData.currentPage + 1

    this.setState(stateData, () => this.getSearchResponse())
  }

  flatListRenderItem = (item: any, index: number) => {
    const { name, address } = item
    let place: any = []
    if (address !== "No address") {
      place = address.split(",")
      place = place[place.length - 1]
    } else place = "No address"

    return (
      <View style={styles.flatListRenderItemContainer}>
        <LocationIcon width={wp("5%")} height={wp("5%")} />
        <View style={{ flex: 1, marginLeft: wp("10%") }}>
          <View style={styles.wrapper}>
            <View style={{ width: "75%" }}>
              <Text style={styles.nameStyles}>{name}</Text>
              <Text style={styles.addressText}>
                {(place.charAt(0).toUpperCase() + place.slice(1)).trim()}
              </Text>
            </View>
            <Pressable onPress={() => this.handleNavigation(address)}>
              <NavigationIcon width={wp("7%")} height={wp("7%")} />
            </Pressable>
          </View>
          <View style={styles.underlineStyles} />
        </View>
      </View>
    )
  }

  renderFooter = () => {
    const {
      searchText,
      searchResponse,
      isLoading,
      flatListLoading,
      currentPage,
      totalpages,
    } = this.state
    if (flatListLoading)
      return <ActivityIndicator size="large" color={colors.darkBlack} />
    else if (
      searchResponse === "no objects" ||
      (searchText !== "" && searchResponse.length == 0)
    )
      return <Text style={styles.noResultFoundText}>No Results Found</Text>
    else if (currentPage < totalpages && searchText !== "")
      return (
        <Text onPress={this.loadMore} style={styles.loadMoreStyles}>
          Load more...
        </Text>
      )
    else return null
  }
  render() {
    const { searchResponse, isLoading } = this.state
    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
            }}
          >
            <FlatList
              data={searchResponse === "no objects" ? [] : searchResponse}
              renderItem={({ item, index }) =>
                this.flatListRenderItem(item, index)
              }
              keyExtractor={(item, index) => "key" + index}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              keyboardShouldPersistTaps="always"
            />
          </View>
        )}
      </>
    )
  }
}
const styles = StyleSheet.create({
  crossIcon: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
    color: colors.darkBlack,
    display: "flex",
    alignSelf: "flex-end",
  },
  noResultFoundText: { paddingHorizontal: wp("7%") },
  loadMoreStyles: {
    marginVertical: hp("3%"),
    fontSize: hp("3%"),
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: wp("7%"),
  },
  underlineStyles: {
    display: "flex",
    height: 0.5,
    backgroundColor: colors.greytwobackground,
    width: wp("100%"),
    marginTop: hp("1%"),
  },
  addressText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2%"),
    color: colors.greyTwo,
    fontWeight: "400",
    lineHeight: wp("3.5%"),

    paddingTop: hp("2%"),
    paddingLeft: 0,
  },
  nameStyles: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.2%"),
    color: colors.darkBlack,
    fontWeight: "400",
    lineHeight: wp("5.4%"),
    letterSpacing: wp("0.05%"),
  },
  wrapper: {
    flex: 1,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: hp("2%"),
  },
  flatListRenderItemContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",

    paddingHorizontal: wp("7%"),
    paddingTop: hp("1.5%"),
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    padding: wp("7%"),
  },
  title: {
    fontFamily: "AirbnbCerealBook",
    fontWeight: "400",
    fontSize: wp("6.4%"),
    color: colors.darkBlack,
    paddingVertical: hp("2%"),
    marginBottom: hp("2%"),
  },
  description: {
    fontFamily: "AirbnbCerealBook",
    fontWeight: "400",
    fontSize: wp("4.26%"),
    paddingBottom: hp("2%"),
    color: colors.darkGrey,
  },
  container: {
    display: "flex",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FF6C65",
    padding: "4%",
    marginBottom: hp("2%"),
  },
  currentLocationText: {
    fontFamily: "AirbnbCerealBook",
    fontWeight: "400",
    fontSize: wp("4.26%"),
    color: colors.orange,
    paddingLeft: wp("3%"),
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    marginVertical: "3%",
    padding: "3%",
    backgroundColor: "#FBFBFB",
    borderWidth: 0.1,
    borderRadius: wp("0.5%"),
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    color: colors.grey,
  },
  x: {
    paddingTop: hp("2%"),
    fontSize: wp("7%"),
  },
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default RestaurantsNearYou
