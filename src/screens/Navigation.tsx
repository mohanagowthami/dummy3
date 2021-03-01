// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-maps
import MapView, { Marker, Polyline } from "react-native-maps"
//icons
import {
  CircleIcon,
  FrappyIcon,
  Logo,
  NavigationIcon,
  SearchIcon,
} from "../../assets/svgs/icons"
import { Notifications } from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"
import { decode } from "../lib/helper"
import Loader from "../components/elements/Loader"
import MapService from "../services/map.service"
import { Context } from "../lib/content"

interface IProps {
  navigation: any
  route: any
}
// state - data
interface Istate {
  latitude: number | null
  longitude: number | null
  finalLatitude: number | null
  finalLongitude: number | null
  coords: any
  isLoading: boolean
  searchText: string
}

const mapService = new MapService()
class Navigation extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      coords: null,
      finalLatitude: null,
      finalLongitude: null,
      isLoading: true,
      searchText: "",
    }
  }

  fetchData = (address: string) => {
    this.setState({ ...this.state, isLoading: true })
    mapService
      .getPath({
        latitude: this.context.latitude,
        longitude: this.context.longitude,
        destination: address,
      })
      .then((response) => {
        if (response.routes.length) {
          this.setState({
            ...this.state,
            coords: decode(response.routes[0].overview_polyline.points),
            finalLatitude: response.routes[0].legs[0].end_location.lat,
            finalLongitude: response.routes[0].legs[0].end_location.lng,
            latitude: this.context.latitude,
            longitude: this.context.longitude,
            isLoading: false,
            searchText: "",
          })
        }
      })
      .catch((e) => {
        console.warn(e)
        this.setState({ ...this.state, isLoading: false, searchText: "" })
        alert("something went wrong, please try again")
      })
  }

  async componentDidMount() {
    const { address } = this.props.route.params

    if (this.context.latitude) {
      this.fetchData(address)
    }
  }

  handleChange = (text: string) => {
    this.setState({ ...this.state, searchText: text })
  }
  onPressNavigation = () => {
    const { searchText } = this.state
    this.fetchData(searchText)
  }
  render() {
    const {
      latitude,
      finalLatitude,
      finalLongitude,
      longitude,
      isLoading,
      coords,
      searchText,
    } = this.state

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <ScrollView
              style={styles.mainContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <View style={styles.borders}>
                <View style={styles.heading}>
                  <Text style={styles.title}>Navigation</Text>
                  <View style={styles.notificationIcon}>
                    <Pressable
                      onPress={() =>
                        this.props.navigation.navigate("notifications")
                      }
                    >
                      <Notifications width={wp("5.86%")} height={hp("2.89%")} />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.searchButton}>
                  <SearchIcon width={wp("5%")} height={wp("5%")} />
                  <View style={styles.searchAndNavigation}>
                    <TextInput
                      placeholder="Search"
                      style={styles.searchInput}
                      onChangeText={this.handleChange}
                      value={searchText}
                    />
                    <Pressable onPress={this.onPressNavigation}>
                      <NavigationIcon width={wp("5%")} height={wp("5%")} />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View>
                {latitude !== null &&
                  longitude !== null &&
                  finalLatitude !== null &&
                  finalLongitude !== null && (
                    <MapView
                      showsCompass={true}
                      showsMyLocationButton={true}
                      showsBuildings={true}
                      initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      }}
                      style={styles.mapview}
                    >
                      <Marker
                        coordinate={{
                          latitude: latitude,
                          longitude: longitude,
                        }}
                        title={"Your Location"}
                      >
                        <CircleIcon width={wp("6%")} height={wp("6%")} />
                      </Marker>
                      <Marker
                        coordinate={{
                          latitude: finalLatitude,
                          longitude: finalLongitude,
                        }}
                        title={"Your Location"}
                      >
                        <FrappyIcon width={wp("10%")} height={wp("10%")} />
                      </Marker>
                      <Polyline
                        coordinates={[...coords]}
                        strokeWidth={4}
                        strokeColor={colors.orange}
                      />
                    </MapView>
                  )}
              </View>
            </ScrollView>
          </View>
        )}
      </>
    )
  }
}
Navigation.contextType = Context
const styles = StyleSheet.create({
  searchAndNavigation: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("1%"),
  },
  mainContainer: {
    display: "flex",
    paddingTop: hp("2%"),
    backgroundColor: colors.white,
  },
  heading: {
    display: "flex",
    paddingTop: hp("2%"),
    paddingBottom: hp("2.10%"),
    paddingLeft: wp("7.46%"),
    paddingRight: wp("5.33%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borders: {
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  title: {
    fontFamily: "ArchivoBold",
    fontSize: wp("6.4%"),
  },
  notificationIcon: {
    display: "flex",
    paddingTop: hp("1.2%"),
    alignSelf: "center",
    // paddingRight: wp('15.46%'),
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: "2%",
    backgroundColor: colors.lightGrey,
    marginLeft: wp("7.73%"),
    marginRight: wp("7.73%"),
    borderRadius: wp("3%"),
    marginBottom: hp("3.68%"),
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    color: colors.grey,
  },
  map: {
    display: "flex",
    flex: 1,
  },
  mapview: {
    width: wp("100%"),
    height: hp("77.63%"),
  },
})
export default Navigation
