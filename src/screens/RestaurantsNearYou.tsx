// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// icons
import { LocationIcon } from "../../assets/svgs/icons"
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
}

const userService = new UserService()
const restaurantService = new RestaurantService()
class RestaurantsNearYou extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userName: "",
      searchText: "",
      isLoading: false,
      searchResponse: [],
    }
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
    restaurantService
      .getUniversalSearchData(searchText)
      .then((response: any) => {
        console.log(response, "response from universal Search")
      })
      .catch((error) => {
        console.log(error, "error in universal")
      })
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { searchText } = this.state

    if (prevState.searchText !== searchText) {
      console.log("compo")
      setTimeout(() => this.getSearchResponse(), 0)
    }
  }

  changeSearchText = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }

  render() {
    const { userName, isLoading } = this.state
    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <>
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

              <View style={styles.container}>
                <CurrentLocation width={wp("4.23%")} height={hp("2.34%")} />
                <Text style={styles.currentLocationText}>
                  {" "}
                  Use current Location
                </Text>
              </View>
              <View style={styles.searchButton}>
                <LocationIcon width={wp("5%")} height={wp("5%")} />
                <TextInput
                  placeholder="Enter a new address"
                  style={styles.searchInput}
                  onChangeText={this.changeSearchText}
                />
              </View>
            </View>
          </>
        )}
      </>
    )
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    padding: wp("3%"),
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
