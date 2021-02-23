// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Pressable } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
//icons
import { BackIcon } from "../../assets/svgs/icons/icons-directions"
// colors
import { colors } from "../lib/colors"

interface IProps {
  navigation: any
}

class Notifications extends Component<IProps, {}> {
  carousel: any
  constructor(props: IProps) {
    super(props)
  }

  heading = () => {
    return (
      <>
        <View style={styles.backicon}>
          <View style={styles.headingContainer}>
            <Pressable onPress={() => this.props.navigation.goBack()}>
              <BackIcon width={wp("3.13%")} height={hp("2.84%")} />
            </Pressable>
            <Text style={styles.title}>Notifications</Text>
          </View>
        </View>
      </>
    )
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.heading}>{this.heading()}</View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              You have one new Notification
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
  },
  container: {
    display: "flex",
    // flex: 1,
    backgroundColor: colors.greytwobackground,
    height: hp("100%"),
  },
  heading: {
    display: "flex",
    paddingTop: hp("3.5%"),
    paddingBottom: hp("3.5%"),
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
  },
  backicon: {
    // paddingLeft: wp('7.44%'),
    paddingTop: hp("2%"),
    paddingLeft: wp("3%"),
  },
  title: {
    fontFamily: "ArchivoBold",
    fontSize: wp("5%"),
    paddingLeft: wp("30%"),
  },
  notificationCard: {
    display: "flex",
    backgroundColor: colors.white,
    margin: "2%",
    marginLeft: "5%",
    borderRadius: wp("2%"),
    height: hp("9.47%"),
    width: wp("90.13%"),
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4%"),
  },
})

export default Notifications
