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
  ActivityIndicator,
  Share as RNShare,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
//icons
import {
  Notifications,
  Share,
  Social,
  Settings,
  Logout,
  Edit,
} from "../../assets/svgs/icons/icons-profile"
// colors
import { colors } from "../lib/colors"
// icons
import { Profile } from "../../assets/svgs/icons"
// service
import UserService from "../services/user.service"
// loader
import Loader from "../components/elements/Loader"
// commonActions
import { CommonActions } from "@react-navigation/native"

interface IProps {
  navigation: any
  rootNavigation: any
}
// divisioning of the screen

// state - data
interface Istate {
  name: string
  address: string
  profilePic: string
  isLoading: boolean
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
}

const userService = new UserService()
class ProfileScreen extends Component<IProps, Istate> {
  subscribe: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      name: "",

      address: "",
      profilePic: "",
      isLoading: false,
    }
  }

  onShare = async () => {
    try {
      const result = await RNShare.share({
        message: `Frappy https://frappy-cms.vercel.app/auth/signin`,
      })

      if (result.action === RNShare.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === RNShare.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  }

  handleLogout = () => {
    this.setState({ ...this.state, isLoading: true })
    userService
      .removeAccessToken()
      .then((response) => {
        if (response) {
          this.setState({ ...this.state, isLoading: false })

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          })
        } else alert("Logout is unsuccessful, please try again")
      })
      .catch((e) => {
        this.setState({ ...this.state, isLoading: false })
      })
  }
  fetchData = () => {
    let stateData = { ...this.state }
    this.setState({ ...this.state, isLoading: true })
    userService
      .getUser()
      .then((response) => {
        stateData.name = response.username
        stateData.address = response.address
        stateData.profilePic = response.profile_pic
      })
      .catch((error) => {})
      .finally(() => {
        stateData.isLoading = false
        this.setState(stateData)
      })
  }
  componentDidMount() {
    this.subscribe = this.props.navigation.addListener("focus", () => {
      this.fetchData()
    })
  }

  componentWillUnmount() {
    this.subscribe()
  }
  render() {
    const { name, address, profilePic, isLoading } = this.state

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <ScrollView
            style={styles.maincontainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.profilecontainer}>
              <View style={styles.container}>
                <View style={styles.imageandbackicon}>
                  {profilePic !== "" && profilePic !== null ? (
                    <Image
                      style={styles.profileimage}
                      resizeMode="cover"
                      source={{
                        uri: profilePic,
                      }}
                    />
                  ) : (
                    <View
                      style={[
                        styles.profileimage,
                        {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: colors.white,
                          borderColor: colors.greyThree,
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Profile
                        color={colors.greyTwo}
                        width={wp("20%")}
                        height={wp("20%")}
                      />
                    </View>
                  )}
                  <View style={styles.imageAndEdit}>
                    <Pressable
                      onPress={() =>
                        this.props.navigation.navigate("profile", {
                          isEditable: true,
                        })
                      }
                    >
                      <View style={styles.editContainer}>
                        <Text style={styles.editText}>Edit</Text>
                        <View style={styles.editIcon}>
                          <Edit width={wp("4.53%")} height={hp("2.10%")} />
                        </View>
                      </View>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.nameandplace}>
                  <Text style={styles.name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Text>
                  <Text style={styles.place}>{address}</Text>
                  <View style={styles.line} />
                </View>
              </View>
              <View style={styles.optionscontainer}>
                <Pressable style={styles.optioncontainer}>
                  <Notifications width={wp("5.86%")} height={hp("2.89%")} />

                  <Text style={styles.optionstext}>Notifications</Text>
                </Pressable>
                <Pressable
                  style={styles.optioncontainer}
                  onPress={this.onShare}
                >
                  <Share width={wp("5.86%")} height={hp("2.89%")} />
                  <Text style={styles.optionstext}>
                    Share with your friends
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("accountSettings")
                  }
                >
                  <View style={styles.optioncontainer}>
                    <Settings width={wp("5.86%")} height={hp("2.89%")} />
                    <Text style={styles.optionstext}>Settings</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.optioncontainer}
                  onPress={this.handleLogout}
                >
                  <Logout width={wp("5.86%")} height={hp("2.89%")} />
                  <Text style={styles.optionstext}>Logout</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    display: "flex",
    paddingTop: hp("6.02%"),
    paddingLeft: wp("4%"),
    paddingRight: wp("4%"),
    paddingBottom: hp("1%"),
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    display: "flex",
    flex: 1,
  },
  profilecontainer: {
    display: "flex",
    // flex: 1,
    paddingTop: hp("0.5%"),
  },
  imageAndEdit: { alignSelf: "center" },
  imageandbackicon: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",
  },
  profileimage: {
    width: wp("28.006%"),
    height: wp("28.368%"),
    borderRadius: wp("2%"),
  },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "center",
    padding: "5%",
    borderColor: "#77838F",
    borderRadius: 7,
  },
  editText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.8%"),
    color: "#000000",
  },
  editIcon: {
    display: "flex",
    alignSelf: "center",
    marginLeft: wp("1%"),
  },
  name: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.4%"),
    color: colors.namecolor,
    marginTop: -hp("1.5%"),
  },
  place: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.73%"),
    paddingTop: hp("1.052%"),
    color: colors.grey,
  },
  nameandplace: {
    paddingTop: hp("3.55%"),
    paddingBottom: hp("6.93%"),
    lineHeight: hp("1.1%"),
  },
  line: {
    height: hp("0.3%"),
    width: wp("85%"),
    borderRadius: 4,
    marginTop: hp("3.42%"),
    backgroundColor: colors.lightGreyTwo,
  },
  optionscontainer: {
    display: "flex",
    flex: 1,
  },
  optioncontainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingLeft: wp("5.86%"),
    paddingBottom: hp("5.92%"),
  },
  optionstext: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.8%"),
    color: colors.optionsblack,
    paddingLeft: wp("13.33%"),
  },
  notificationcountContainer: {
    alignSelf: "center",
    alignItems: "center",
    color: colors.white,
    fontSize: wp("3%"),
  },
  notificationcount: {
    width: wp("6.2%"),
    height: wp("6.2%"),
    marginLeft: wp("25.33%"),
    backgroundColor: colors.orange,
    borderRadius: wp("3.1%"),
    justifyContent: "center",
  },
})
export default ProfileScreen
