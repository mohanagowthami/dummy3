// react
import React, { Component } from "react"
// react-native
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Platform,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// expo-image-picker
import * as ImagePicker from "expo-image-picker"
// react-native-modal
import Modal from "react-native-modal"
// components
import CustomButton from "../components/buttons/CustomButton"
import CustomStarRating from "../components/star-rating/CustomStarRating"
// colors
import { colors } from "../lib/colors"
import RestaurantService from "../services/restaurants.service"
import CustomTextField from "../components/input-controllers/CustomTextField"
import ReviewService from "../services/review.service"
import MediaService from "../services/media.service"

interface IProps {
  navigation: any
  route: any
}

interface IState {
  selectedImages: Array<any>
  showModal: boolean
}

const restaurantService = new RestaurantService()
const reviewService = new ReviewService()
const mediaService = new MediaService()
class ReviewsAndRating extends Component<IProps, IState> {
  data: any = {}
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedImages: [],
      showModal: false,
    }
  }

  onPressSubmit = () => {
    const { showModal, selectedImages } = this.state

    this.setState({
      ...this.state,
      showModal: !showModal,
    })

    let data: any = {}
    data["listing"] = this.props.route.params.id
    data["review"] = this.data.review
    data["user_rating"] = this.data.user_rating
    if (selectedImages.length > 0) {
      const formData: any = new FormData()
      selectedImages.map((img, index) => {
        const uri = "file:///" + img.uri.split("file:/").join("")
        const imageData = {
          uri: uri,
          name: uri.split("/").pop(),
          type: "image/jpeg",
        }
        formData.append("name[]", uri.split("/").pop())
        formData.append("asset[]", imageData)
      })
      mediaService
        .uploadMedia(formData)
        .then((response) => {
          data["images"] = response.map((item: any) => {
            return item.asset
          })

          reviewService.updateReviews(data).then((response) => {
            this.setState({
              ...this.state,
              showModal: !showModal,
            })
          })
        })

        .catch((error) => {
          this.setState({
            ...this.state,
            showModal: !showModal,
          })
        })
        .finally(() => {
          this.props.navigation.navigate("itemInDetail", {
            id: this.props.route.params.id,
          })
        })
    } else {
      reviewService
        .updateReviews(data)
        .then((response) => {
          this.setState({
            ...this.state,
            showModal: !showModal,
          })
        })
        .catch((error) => {
          this.setState({
            ...this.state,
            showModal: !showModal,
          })
        })
        .finally(() => {
          this.props.navigation.navigate("itemInDetail", {
            id: this.props.route.params.id,
          })
        })
    }
  }
  showModal = () => {
    this.setState({
      showModal: true,
    })
    setTimeout(() => {
      this.setState({
        showModal: false,
      })
    }, 3000)
  }

  async componentDidMount(): Promise<void> {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        alert("Sorry, we need files access permissions to make this work!")
      }
    }
  }
  captureImage = async () => {
    const { selectedImages } = this.state
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const mutatedImages = [...selectedImages]
      mutatedImages.push(result)
      this.setState({ selectedImages: mutatedImages })
    }
  }

  galleryImage = async () => {
    const { selectedImages } = this.state
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const mutatedImages = [...selectedImages]
      mutatedImages.push(result)
      this.setState({ selectedImages: mutatedImages })
    }
  }

  removeImage = (index: number) => {
    const { selectedImages } = this.state
    let mutatedImages = [...selectedImages]
    mutatedImages.splice(index, 1)
    this.setState({ selectedImages: mutatedImages })
  }

  renderModal = () => {
    const { showModal } = this.state
    return (
      <View>
        <Modal
          isVisible={showModal}
          backdropColor={colors.white}
          backdropOpacity={0.9}
        >
          <View style={styles.modalContainer}>
            <Image
              source={require("../../assets/images/thankYou.png")}
              style={styles.modalImage}
            />
            <Text style={styles.thankYouTextStyles}>Thankyou!</Text>
            <Text style={styles.descriptionModalStyles}>
              Dummy text is text that is used in the publishing industry
            </Text>
          </View>
        </Modal>
      </View>
    )
  }

  onChange = (name: string, value: any) => {
    this.data[name] = value
  }
  render() {
    const { showModal, selectedImages } = this.state
    const lengthOfSelectedImages = selectedImages.length
    const imagesAlignment =
      lengthOfSelectedImages % 3 === 0 && lengthOfSelectedImages !== 0
    return (
      <SafeAreaView style={styles.container}>
        {showModal && this.renderModal()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View>
            <Text style={styles.titleText}>Reviews and ratings</Text>
            <CustomStarRating
              width={wp("10.4%")}
              height={wp("10.4%")}
              style={{ marginVertical: wp("7%") }}
              elementStyle={{ marginRight: wp("2%") }}
              onChange={(value) => this.onChange("user_rating", value)}
            />
            <View style={styles.descriptionModalStyles} />

            <CustomTextField
              style={styles.commentStyles}
              placeholder="Wrire your review here"
              textAlign="left"
              multiline={true}
              textAlignVertical={"top"}
              onChange={(value) => this.onChange("review", value)}
            />

            <View style={styles.captureImageStyles}>
              <Pressable onPress={this.galleryImage}>
                <View style={styles.plusButton}>
                  <Text style={styles.plus}>+</Text>
                </View>
              </Pressable>
              <Text style={styles.uploadPictureStyle}>Upload Pictures</Text>
            </View>
            <View
              style={[
                styles.selectedImagesWrapper,
                {
                  justifyContent: imagesAlignment
                    ? "space-between"
                    : "flex-start",
                  marginRight: imagesAlignment ? 0 : wp("5%"),
                },
              ]}
            >
              {selectedImages.map((image, index) => {
                return (
                  <View key={index}>
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.selectedImageStyles}
                    />

                    <Pressable
                      style={styles.removeIcon}
                      onPress={() => this.removeImage(index)}
                    >
                      <Text style={styles.crossX}>X</Text>
                    </Pressable>
                  </View>
                )
              })}
            </View>
            <CustomButton
              title="Submit"
              onPressButton={this.onPressSubmit}
              buttonStyles={{
                display: "flex",
                alignSelf: "center",
                width: "100%",
                // margin: '0%',
              }}
              buttonTextStyles={{
                fontFamily: "AirbnbCerealBold",
                fontSize: wp("4.2%"),
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default ReviewsAndRating
const styles = StyleSheet.create({
  selectedImagesWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: wp("7%"),
  },
  crossX: {
    color: colors.white,
    fontSize: wp("3.5%"),
    fontWeight: "900",
  },
  selectedImageStyles: {
    width: wp("30%"),
    height: wp("30%"),
    position: "relative",
    marginBottom: wp("2.5%"),
  },
  uploadPictureStyle: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4.2%"),
    letterSpacing: 0.5,
    color: colors.grey,
  },
  captureImageStyles: {
    display: "flex",
    flexDirection: "row",
    marginVertical: wp("8%"),
    alignItems: "center",
    marginBottom: 0,
  },
  descriptionModalStyles: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.5%"),
    lineHeight: wp("6.2%"),
    marginVertical: wp("2%"),
    textAlign: "center",
    color: colors.grey,
  },
  thankYouTextStyles: {
    fontFamily: "ArchivoBold",
    fontSize: wp("6%"),
    lineHeight: wp("8%"),
    color: colors.grey,
    marginTop: wp("6%"),
    marginBottom: 0,
  },
  modalImage: {
    width: wp("60%"),
    height: wp("50%"),
  },
  titleText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: hp("6%"),
    paddingBottom: hp("0%"),
    color: colors.darkBlack,
    paddingHorizontal: wp("3%"),
  },
  commentStyles: {
    backgroundColor: colors.lightGreyFour,
    borderRadius: wp("2.5%"),
    color: colors.grey,
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.1%"),
    padding: wp("6%"),
    height: hp("40%"),
  },
  plusButton: {
    width: wp("15%"),
    height: wp("15%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreyFour,
    borderRadius: wp("2%"),
    marginRight: wp("4%"),
  },
  plus: {
    color: colors.grey,
    fontSize: wp("9%"),
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: wp("8%"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp("90%"),
  },
  removeIcon: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
