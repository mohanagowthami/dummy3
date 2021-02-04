// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Pressable } from "react-native"
//icons
import { Notifications } from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-maps
import MapView from "react-native-maps"

interface IProps {
  navigation: any
}

class FrappyPlannerCards extends Component<IProps, {}> {
  carousel: any
  constructor(props: IProps) {
    super(props)
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>Frappy Planner</Text>
          <View style={styles.notificationIcon}>
            <Pressable
              onPress={() => this.props.navigation.navigate("notifications")}
            >
              <Notifications width={wp("5.86%")} height={hp("2.89%")} />
            </Pressable>
          </View>
        </View>
        <MapView style={styles.mapview} />
        <View style={styles.bottomTab}>
          <Text style={styles.yourVisits}>Your Visits</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Breakfast in Chutney’s</Text>
            <Text style={styles.cardDescription}>
              Lorem Ipsum copy in various charsets and languages for layouts.
            </Text>
            <Text style={styles.cardTimings}>08:00 - 09:00</Text>
          </View>
          <View style={[styles.cardContainer, { backgroundColor: "#E1E2FF" }]}>
            <Text style={styles.cardTitle}>Lunch in Paradise</Text>
            <Text style={styles.cardDescription}>
              Lorem Ipsum copy in various charsets and languages for layouts.
            </Text>
            <Text style={styles.cardTimings}>13:30 - 14:30</Text>
          </View>
          <View style={[styles.cardContainer, { backgroundColor: "cyan" }]}>
            <Text style={styles.cardTitle}>Snacks</Text>
            <Text style={styles.cardDescription}>
              Lorem Ipsum copy in various charsets and languages for layouts.
            </Text>
            <Text style={styles.cardTimings}>17:30 - 18:30</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
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
  mapview: { width: wp("100%"), height: hp("40%") },
  card: {
    display: "flex",
    position: "absolute",
    backgroundColor: "white",
    // backgroundColor: 'cyan',
    padding: wp("2%"),
  },
  bottomTab: {
    display: "flex",
    padding: wp("6%"),
  },
  yourVisits: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.5%"),
    color: colors.darkBlack,
  },
  cardContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FFE8E7",
    borderRadius: wp("2%"),
    marginTop: hp("2.76%"),
    justifyContent: "space-around",
  },
  cardTitle: {
    fontFamily: "ArchivoRegular",
    padding: wp("2%"),
    fontWeight: "500",
    fontSize: wp("3.73%"),
  },
  cardDescription: {
    fontFamily: "ArchivoRegular",
    padding: wp("2%"),
    fontSize: wp("3.73%"),
    color: colors.grey,
  },
  cardTimings: {
    fontFamily: "ArchivoRegular",
    padding: wp("2%"),
    fontSize: wp("3.73%"),
    color: colors.grey,
  },
})

export default FrappyPlannerCards
