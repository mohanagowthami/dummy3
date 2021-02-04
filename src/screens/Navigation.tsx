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
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-maps
import MapView from "react-native-maps"
//icons
import { SearchIcon } from "../../assets/svgs/icons"
import { Notifications } from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"

interface IProps {
  navigation: any
}
// state - data
interface Istate {
  selectedDate: any
  isModalOpen: boolean
}

class Navigation extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedDate: new Date(),
      isModalOpen: false,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.mainContainer}>
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
              <TextInput placeholder="Search" style={styles.searchInput} />
            </View>
          </View>
          <View>
            <MapView
              showsCompass={true}
              showsMyLocationButton={true}
              showsBuildings={true}
              initialRegion={{
                latitude: 17.423184,
                longitude: 78.491684,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              style={styles.mapview}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
