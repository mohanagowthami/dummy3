// react-native-gesture-handler
import { ScrollView, TextInput } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { View, Text, StyleSheet, Image } from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-modal
import Modal from "react-native-modal"
// react-native-safe-area-context
import { SafeAreaView } from "react-native-safe-area-context"
// components
import CustomButton from "../components/buttons/CustomButton"
import CustomTextField from "../components/input-controllers/CustomTextField"
// colors
import { colors } from "../lib/colors"
import FeedbackService from "../services/feedback.service"
// yup
import * as yup from "yup"
// formik
import { Formik } from "formik"

import Loader from "../components/elements/Loader"

interface IProps {
  navigation: any
}
interface IState {
  showModal: boolean
  isLoading: boolean
}

const validationSchema = yup.object().shape({
  food: yup.string().required("*required"),
  travel: yup.string().required("*required"),
  shopping: yup.string().required("*required"),
})
const feedBackList = ["Food", "Travel", "Shopping"]

const feedbackService = new FeedbackService()
class FeedBackScreen extends Component<IProps, IState> {
  values: any
  constructor(props: IProps) {
    super(props)
    this.values = {
      food: "",
      travel: "",
      shopping: "",
    }
    this.state = {
      showModal: false,
      isLoading: false,
    }
  }
  onPressSubmit = (values: any) => {
    this.setState({ ...this.state, showModal: true })

    feedbackService
      .submitFeedback(values)
      .then(() => {
        this.setState({ ...this.state, showModal: false })
        this.props.navigation.navigate("home")
      })
      .catch((error) => {
        this.setState({ ...this.state, showModal: false })
      })
  }
  showModal = () => {
    this.setState({
      showModal: true,
    })
    setTimeout(() => {
      this.setState({
        showModal: false,
      })
    }, 200)
  }
  onBlur = (type: string, review: string) => {
    this.values[type.toLowerCase()] = review
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
              style={styles.thankYouImage}
            />
            <Text style={styles.thankYouText}>Thankyou!</Text>
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    const { showModal, isLoading } = this.state
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {showModal && this.renderModal()}

            <SafeAreaView style={styles.safeareaviewContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                <Formik
                  initialValues={{ food: "", travel: "", shopping: "" }}
                  onSubmit={(values) => {
                    this.onPressSubmit(values)
                  }}
                  validationSchema={validationSchema}
                >
                  {({
                    handleChange,
                    values,
                    handleSubmit,
                    touched,
                    errors,
                  }: any) => {
                    return (
                      <View style={styles.container}>
                        <Text style={styles.feedbackTitle}>Feedback</Text>
                        <Text style={styles.feedbackDescription}>
                          Your suggestions matter
                        </Text>
                        {feedBackList.map((element: string, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Text style={styles.subHeading}>{element}</Text>
                              <TextInput
                                placeholder="Wrire your review here"
                                onChangeText={handleChange(
                                  element.toLowerCase()
                                )}
                                textAlign={"left"}
                                multiline={true}
                                textAlignVertical={"top"}
                                style={styles.textInputStyles}
                                placeholderTextColor={colors.grey}
                                value={values[element.toLowerCase()]}
                              />
                              {touched[element.toLowerCase()] &&
                                errors[element.toLowerCase()] && (
                                  <Text style={styles.error}>
                                    {errors[element.toLowerCase()]}
                                  </Text>
                                )}
                            </React.Fragment>
                          )
                        })}
                        <View style={styles.submitButton}>
                          <CustomButton
                            title="Submit"
                            onPressButton={handleSubmit}
                            buttonStyles={styles.buttonStyles}
                            buttonTextStyles={styles.buttonTextStyles}
                          />
                        </View>
                      </View>
                    )
                  }}
                </Formik>
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </>
    )
  }
}
export default FeedBackScreen

const styles = StyleSheet.create({
  error: {
    color: colors.orange,
    fontSize: wp("3%"),
    fontFamily: "ArchivoRegular",
    display: "flex",
    alignSelf: "flex-start",
    marginTop: -wp("1%"),
    marginBottom: wp("2%"),
  },
  safeareaviewContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -28,
  },
  textInputStyles: {
    height: hp("17%"),
    backgroundColor: colors.lightGreyFour,
    marginBottom: wp("3%"),
    marginTop: wp("2.5%"),
    borderRadius: wp("3%"),
    borderBottomWidth: 0,
    color: colors.grey,
    fontFamily: "ArchivoRegular",
    fontWeight: "400",
    fontSize: wp("4%"),
    padding: wp("5%"),
  },
  container: {
    padding: wp("5%"),
    backgroundColor: colors.white,
  },
  subHeading: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4.2%"),
    color: colors.darkBlack,
    lineHeight: wp("6%"),
    letterSpacing: 0.3,
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
  thankYouImage: {
    width: wp("60%"),
    height: wp("50%"),
  },
  thankYouText: {
    fontFamily: "ArchivoBold",
    fontSize: wp("6%"),
    lineHeight: wp("8%"),
    color: colors.grey,
    marginTop: wp("6%"),
    marginBottom: 0,
  },
  thankYouDescription: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.5%"),
    lineHeight: wp("6.2%"),
    marginVertical: wp("2%"),
    textAlign: "center",
    color: colors.grey,
  },
  feedbackTitle: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("6.4%"),
    lineHeight: wp("9%"),
    letterSpacing: wp("0.1%"),
    color: colors.darkBlack,
    marginBottom: wp("3%"),
    fontWeight: "600",
  },
  feedbackDescription: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4.8%"),
    lineHeight: wp("9%"),
    letterSpacing: -0.3,
    color: colors.darkBlack,
    marginBottom: wp("4%"),
    fontStyle: "normal",
  },
  submitButton: {
    display: "flex",
    alignSelf: "center",
  },
  buttonStyles: {
    width: wp("90%"),
    padding: "4%",
  },
  buttonTextStyles: {
    fontFamily: "AirbnbCerealBook",
    fontSize: wp("4%"),
  },
})
