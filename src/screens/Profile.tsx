// react-native-gesture-handler
import { ScrollView, TextInput } from "react-native-gesture-handler"
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
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// expo-image-picker
import * as ImagePicker from "expo-image-picker"
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker"
// icons
import { BackIcon } from "../../assets/svgs/icons/icons-directions"
import { Camera } from "../../assets/svgs/icons/icons-profile"
import {
  CalenderSvg,
  ProfileSvg,
} from "../../assets/svgs/icons/icons-bottomTab"
// colors
import { colors } from "../lib/colors"
// services
import UserService from "../services/user.service"
import MediaService from "../services/media.service"
import { dateComparision, getFormatedDate } from "../lib/helper"

interface IprofileOptions {
  option: string
  value: any
}
interface IProps {
  navigation: any
  route: any
}
// divisioning of the screen
interface IDetailsType {
  profileDetails: Array<any>
}
// state - data
interface Istate {
  userDetails: {
    username: string
    phoneNumber: string
    email: string
    gender: string
    dob: any
    profile_pic: string | any
    place: string
    userId: number
  }
  showModal: boolean
  isLoading: boolean
}
const details = {
  profileDetails: [
    {
      username: "Rohit Sharma",
      image:
        "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      place: "Hyderabad",
    },
  ],
}

const userService = new UserService()
const mediaService = new MediaService()
class Profile extends Component<IProps, Istate> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userDetails: {
        username: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dob: new Date(),
        profile_pic: "",
        place: "",
        userId: 0,
      },
      showModal: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, isLoading: true })
    userService
      .getUser()
      .then((response) => {
        let stateData = { ...this.state }
        stateData.userDetails.username = response.username
        stateData.userDetails.phoneNumber = response.PhoneNumbe
          ? response.PhoneNumber
          : ""
        stateData.userDetails.email = response.email
        stateData.userDetails.gender = response.gender ? response.gender : ""
        stateData.userDetails.dob = response.dob ? response.dob : new Date()
        stateData.userDetails.userId = response.id
        stateData.userDetails.profile_pic = response.profile_pic

        stateData.isLoading = false
        this.setState(stateData)
      })
      .catch((error) => {})
  }
  handleChange = (value: string, name: any) => {
    let stateData: any = { ...this.state }
    stateData.userDetails[name] = value

    this.setState(stateData)
  }
  captureImage = async () => {
    const stateData = { ...this.state }
    const { isEditable } = this.props.route.params
    if (isEditable) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.cancelled) {
        stateData.userDetails.profile_pic = result
        this.setState(stateData)
      }
    }
  }

  updateUserDetails = (imageUrl?: string) => {
    const { userDetails } = this.state
    const data = { ...userDetails }
    if (data.dob === "------") data.dob = ""
    else data.dob = getFormatedDate(data.dob)

    if (imageUrl) data.profile_pic = imageUrl
    userService
      .updateUser(data)
      .then((response) => {
        console.log(response, "response in update user details")
        this.props.navigation.goBack()
      })
      .catch((error) => {
        console.log(error, "error in user details")
      })
      .finally(() => {
        this.setState({ ...this.state, isLoading: false })
      })
  }

  pressSave = () => {
    const { userDetails } = this.state
    const data = { ...userDetails }
    this.setState({ ...this.state, isLoading: true })

    if (data.profile_pic.uri) {
      const uri = "file:///" + data.profile_pic.uri.split("file:/").join("")
      const imageData = {
        uri: uri,
        name: uri.split("/").pop(),
        type: "image/jpeg",
      }
      const formData: any = new FormData()
      formData.append("name[]", uri.split("/").pop())
      formData.append("asset[]", imageData)

      mediaService
        .uploadMedia(formData)
        .then((response) => {
          const imageUrls = response.map((item: any) => {
            return item.asset
          })

          this.updateUserDetails(imageUrls[0])
        })

        .catch((error) => {})
        .finally(() => {
          this.setState({ ...this.state, isLoading: false })
        })
    } else {
      this.updateUserDetails()
    }
  }
  onPressCalenderSvg = () => {
    const stateData = { ...this.state }
    stateData.showModal = true
    this.setState(stateData)
  }

  onChangePicker = (event: any, selectedDate: any) => {
    console.log(selectedDate, "selectedDate")
    const stateData = { ...this.state }
    stateData.userDetails.dob = selectedDate
    stateData.showModal = false
    this.setState(stateData)
  }
  _renderinfo = () => {
    const {
      userDetails: { username, place, profile_pic },
    } = this.state
    const { isEditable } = this.props.route.params
    const mutatedprofile_pic =
      profile_pic !== "" && profile_pic !== null
        ? profile_pic["uri"]
          ? profile_pic.uri
          : profile_pic
        : profile_pic

    return (
      <View style={styles.renderInfoContainer}>
        <Pressable
          onPress={() => this.props.navigation.navigate("profileScreen")}
        >
          <BackIcon width={wp("2.92%")} height={hp("2.86%")} />
        </Pressable>
        <View style={styles.profileWrapper}>
          <View style={{ position: "relative" }}>
            {profile_pic !== "" && profile_pic !== null ? (
              <Image
                style={styles.profileimage}
                resizeMode="cover"
                source={{
                  uri: mutatedprofile_pic,
                }}
              />
            ) : (
              <ProfileSvg
                width={wp("20%")}
                height={wp("20%")}
                color={colors.greyTwo}
              />
            )}
          </View>

          <Pressable onPress={this.captureImage} style={styles.cameraicon}>
            <Camera width={wp("6%")} height={wp("6%")} />
          </Pressable>

          <Text style={styles.name}>{username}</Text>
          <Text style={styles.place}>{place}</Text>
        </View>
        {isEditable && (
          <View>
            <Text onPress={this.pressSave} style={styles.saveText}>
              Save
            </Text>
          </View>
        )}
      </View>
    )
  }
  _renderdetails = () => {
    const {
      userDetails: { username, phoneNumber, dob, email, gender },
      showModal,
    } = this.state
    console.log(dob, "date of birth")
    const { isEditable } = this.props.route.params
    return (
      <View style={styles.optionscontainer}>
        <View style={styles.optioncontainer}>
          <Text style={styles.heading}>username</Text>
          <TextInput
            style={styles.details}
            onChangeText={(text) => {
              this.handleChange(text, "username")
            }}
            value={username}
            editable={false}
            placeholder="------"
          />
        </View>
        <View style={styles.line} />
        <View style={styles.optioncontainer}>
          <Text style={styles.heading}>Email</Text>
          <TextInput
            style={styles.details}
            onChangeText={(text) => {
              this.handleChange(text, "email")
            }}
            placeholder="------"
            value={email}
            editable={false}
          ></TextInput>
        </View>
        <View style={styles.line} />
        <View style={styles.optioncontainer}>
          <Text style={styles.heading}>Phone</Text>
          <TextInput
            style={styles.details}
            onChangeText={(text) => {
              this.handleChange(text, "phoneNumber")
            }}
            value={phoneNumber}
            placeholder="------"
            editable={isEditable}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.optioncontainer}>
          <Text style={styles.heading}>Gender</Text>
          <TextInput
            style={styles.details}
            onChangeText={(text) => {
              this.handleChange(text, "gender")
            }}
            value={gender}
            placeholder="------"
            editable={isEditable}
          ></TextInput>
        </View>
        <View style={styles.line} />
        <View style={styles.optioncontainer}>
          <Text style={styles.heading}>Date of Birth</Text>
          <View style={styles.calenderContainer}>
            <TextInput
              style={styles.details}
              value={dateComparision(dob) ? "------" : getFormatedDate(dob)}
              placeholder="------"
              editable={isEditable}
            />
            <Pressable
              onPress={this.onPressCalenderSvg}
              style={styles.calenderSvg}
            >
              <CalenderSvg
                color={colors.darkGrey}
                width={wp("5%")}
                height={wp("5%")}
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const {
      isLoading,
      showModal,
      userDetails: { dob },
    } = this.state
    const dateOfBirth = typeof dob === "string" ? new Date(dob) : dob
    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.darkBlack} size="large" />
          </View>
        ) : (
          <ScrollView
            style={styles.maincontainer}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {this._renderinfo()}
            {this._renderdetails()}
            {showModal && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={this.onChangePicker}
                maximumDate={new Date()}
              />
            )}
          </ScrollView>
        )}
      </>
    )
  }
}
const styles = StyleSheet.create({
  calenderSvg: {
    marginLeft: wp("2%"),
  },
  calenderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
  },
  renderInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: wp("4.2%"),
    paddingTop: wp("5%"),
  },
  saveText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.5%"),
    color: colors.orange,
  },
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maincontainer: {
    display: "flex",
    flex: 1,
    paddingTop: hp("2.93%"),
    backgroundColor: colors.white,
  },
  profilecontainer: {
    display: "flex",
    paddingTop: hp("1%"),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backiconContainer: {
    paddingLeft: wp("6.8%"),
    paddingTop: hp("3.57%"),
  },

  imageandbackicon: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  imagecontainer: {
    display: "flex",

    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: wp("25.4%"),
  },
  profileimage: {
    display: "flex",

    width: wp("38.93%"),
    height: hp("19.210%"),
    alignSelf: "center",

    borderRadius: wp("3.2%"),
  },
  cameraicon: {
    width: wp("8.66%"),
    height: wp("8.66%"),

    borderRadius: wp("4.33%"),
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignSelf: "flex-end",
    marginTop: -wp("8%"),
  },
  name: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.4%"),

    color: colors.namecolor,
  },
  place: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.73%"),
    paddingTop: hp("1.052%"),

    color: colors.grey,
  },
  nameandplace: {
    paddingTop: hp("3.55%"),
    // paddingBottom: hp('6.93%'),
    lineHeight: hp("1.1%"),
  },
  backicon: {
    paddingLeft: wp("7.44%"),
    paddingTop: hp("0.1%"),
    paddingRight: wp("15.46%"),
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
    padding: wp("7%"),
  },
  optioncontainer: {
    display: "flex",
    flexDirection: "row",
    // borderBottomColor: 'red',
    paddingTop: hp("3%"),
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: wp('3%'),
  },
  heading: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.53%"),
    color: "#B8BBC6",
  },
  details: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.53%"),
    color: "#333A4D",
  },
})
export default Profile
