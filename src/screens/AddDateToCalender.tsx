// react
import React, { Component } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Pressable,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native"
// react-native-responsive-screen
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
// google places auto complete
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker"
// icons
import { BellIcon, CalenderSvg, Clock } from "../../assets/svgs/icons"
// components
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
// helper
import {
  getFormatedDate,
  getCurrentMonthArray,
  convertToTweleveHoursFormat,
  convertToTwentyFourHoursFormat,
} from "../lib/helper"
// service
import PlannerService from "../services/planner.service"
// Formik
import { Formik, FieldArray, validateYupSchema } from "formik"
// yup
import * as yup from "yup"

export const switchList = [
  {
    name: "Food",
  },
  {
    name: "Travel",
  },
  {
    name: "Shopping",
  },
]

// props
interface IProps {
  navigation: any
}
// state
interface IState {
  date: any
  mode: any
  show: boolean
  startLocationError: string
  endLocationError: string
  dateArray: any

  isLoading: boolean
}
const validationSchema = yup.object().shape({
  description: yup.string().required("*required"),
  from_time: yup.string().required("*required"),
  to_time: yup.string().required("*required"),
  category: yup.array().compact().min(1, "atleast one category shoould select"),
  start_location: yup.string().required("*required1"),
  end_location: yup.string().required("*required1"),
})

const plannerService = new PlannerService()

class AddDateToCalender extends Component<IProps, IState> {
  date: any = new Date()
  ref: any
  fromLocationRef: any
  toLocationRef: any
  flatListRef: any
  formRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: false,
      date: new Date(),
      mode: "date",
      show: false,
      startLocationError: "",
      endLocationError: "",
      dateArray: getCurrentMonthArray(0),
    }
    this.ref = React.createRef()
    this.flatListRef = React.createRef()
    this.fromLocationRef = React.createRef()
    this.toLocationRef = React.createRef()
    this.formRef = React.createRef()
  }

  showPicker = (mode: string) => {
    this.setState({
      ...this.state,
      mode: mode,
      show: true,
    })
  }

  onChangePicker = (event: any, selectedDate: any) => {
    const { mode } = this.state
    console.log(mode, "mode")
    if (selectedDate) {
      let stateData = { ...this.state }
      stateData.show = false
      if (mode === "date") {
        stateData.date = selectedDate
        if (
          selectedDate.getMonth() === this.date.getMonth() &&
          selectedDate.getFullYear() === this.date.getFullYear()
        ) {
          stateData.dateArray = getCurrentMonthArray(selectedDate.getDate())
          let index
          if (selectedDate.getDate() + 2 <= stateData.dateArray.length - 1)
            index = selectedDate.getDate() + 2
          else index = stateData.dateArray.length - 1

          this.flatListRef.scrollToIndex({
            animated: true,
            index: index,
          })
        } else {
          stateData.dateArray = new Array(
            new Date(
              this.date.getFullYear(),
              this.date.getMonth() + 1,
              0
            ).getDate()
          ).fill(0)
        }
      } else {
        if (this.ref.current === "from") {
          console.log("from", 123)
          let minutes = selectedDate.getMinutes()
          if (minutes.toString().length === 1) minutes = "0" + minutes

          console.log(this.formRef, "in getting field")
          this.formRef.current.setFieldValue(
            "from_time",
            convertToTweleveHoursFormat(selectedDate.getHours(), minutes)
          )
        } else {
          console.log(
            this.formRef.current.values.start_time,
            "start_time1234566"
          )
          const fromTimeSting = convertToTwentyFourHoursFormat(
            this.formRef.current.values.from_time
          )
          const fromTime = fromTimeSting.split(":")

          if (parseInt(fromTime[0]) > selectedDate.getHours())
            alert("Please select correct time range")
          else if (parseInt(fromTime[0]) === selectedDate.getHours()) {
            if (parseInt(fromTime[1]) > selectedDate.getMinutes()) {
              alert("Please select correct time range")
            }
          } else {
            let minutes = selectedDate.getMinutes()
            if (minutes.toString().length === 1) minutes = "0" + minutes
            this.formRef.current.setFieldValue(
              "to_time",
              convertToTweleveHoursFormat(selectedDate.getHours(), minutes)
            )
          }
        }

        console.log(this.formRef, "in getting field  after")

        this.setState(stateData)
      }
    }
  }
  toggleSwitch = (index: number) => {
    const list = this.formRef.current.values.category

    this.formRef.current.setFieldValue(`category[${index}]`, !list[index])
  }

  handlePressableDate = (ele: number, ind: number): any => {
    console.log(ele, "element123")
    if (ele !== -1) {
      const { dateArray } = this.state
      const mutatedArray = dateArray.map((ele: boolean, index: number) => {
        if (index === ind) {
          return 1
        } else if (index < this.date.getDate() - 1) return -1
        else return 0
      })
      this.setState({
        ...this.state,
        dateArray: mutatedArray,
        date: new Date(this.date.getFullYear(), this.date.getMonth(), ind + 1),
      })
    }
  }

  flatListRenderItem = (item: any, index: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let day = new Date(this.date.getFullYear(), this.date.getMonth(), index + 1)
    const dayName = days[day.getDay()]
    return (
      <View style={styles.flatListRenderItemContainer}>
        <Text style={[styles.dateTextStyle, { color: colors.greyTwo }]}>
          {dayName}
        </Text>

        <Text
          style={[
            styles.dateTextStyle,
            styles.dateArrayItem,
            {
              backgroundColor: item === 1 ? colors.orange : colors.white,
              color:
                item === 1
                  ? colors.white
                  : item === -1
                  ? colors.lightGreyThree
                  : colors.darkBlack,
            },
          ]}
          onPress={() => this.handlePressableDate(item, index)}
        >
          {index + 1}
        </Text>
      </View>
    )
  }
  getItemLayout(data: any, index: number) {
    return {
      length: wp("10%"),
      offset: wp("15%") * index,
      index,
    }
  }

  renderDays = () => {
    const { dateArray, date } = this.state

    return (
      <FlatList
        data={dateArray}
        renderItem={({ item, index }) => this.flatListRenderItem(item, index)}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        initialScrollIndex={date.getDate() - 1}
        getItemLayout={this.getItemLayout.bind(this)}
        ref={(ref) => (this.flatListRef = ref)}
      />
    )
  }

  validatingAutoFillValues() {
    if (
      !this.fromLocationRef.current.getAddressText() &&
      !this.toLocationRef.current.getAddressText()
    ) {
      this.setState({
        ...this.state,
        startLocationError: "*required",
        endLocationError: "*required",
      })
    } else if (!this.fromLocationRef.current.getAddressText()) {
      this.setState({
        ...this.state,
        startLocationError: "*required",
        endLocationError: "",
      })
    } else if (!this.toLocationRef.current.getAddressText()) {
      this.setState({
        ...this.state,
        startLocationError: "",
        endLocationError: "*required",
      })
    }
  }

  formResetValues = () => {
    this.formRef.current.resetForm()
    this.fromLocationRef.current.setAddressText("")
    this.toLocationRef.current.setAddressText("")
    // this.formRef.current.setFieldValue("category[0].on", false)
    // this.formRef.current.setFieldValue("category[1].on", false)
    // this.formRef.current.setFieldValue("category[2].on", false)
  }

  pressPlan = (values: any) => {
    let category = values.category.map((ele: any) => {
      if (ele.on) return ele.name
    })
    category = category.filter((ele: any) => {
      if (ele) return ele
    })
    const data = {
      from_time: convertToTwentyFourHoursFormat(values.from_time),
      to_time: convertToTwentyFourHoursFormat(values.to_time),
      date: getFormatedDate(this.state.date),
      start_location: this.fromLocationRef.current.getAddressText(),
      end_location: this.toLocationRef.current.getAddressText(),
      category: category,
      description: values.description,
    }
    console.log(data, "before submitting")
    this.setState({ ...this.state, isLoading: true })

    plannerService
      .updateUserPlannerData(data)
      .then((response) => {
        console.log(response, "response in add date to calender")
        this.props.navigation.navigate("frappyCalender")
      })
      .catch((error) => {
        console.log(error, "error in add date to calender")
        this.setState({ ...this.state, isLoading: false })
      })
  }
  onPressDate = () => {
    this.showPicker("date")
  }

  onPressCancel = () => {
    this.formResetValues()
  }
  render() {
    const { isLoading, date, show, mode } = this.state
    console.log(this.formRef.current, "formRef")
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.darkBlack} size="large" />
            </View>
          ) : (
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                from_time: "",
                to_time: "",
                date: "",
                start_location: "",
                end_location: "",
                category: [false, false, false],
                description: "",
              }}
              enableReinitialize
              onSubmit={(values) => {
                this.pressPlan(values)
              }}
              innerRef={this.formRef}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                setFieldError,
                setFieldValue,
              }) => {
                if (this.fromLocationRef.current)
                  console.log(
                    this.fromLocationRef.current.getAddressText(),
                    "getAddresss"
                  )
                return (
                  <View style={styles.container}>
                    <View style={styles.TitleContainer}>
                      <Text style={styles.titleText}>Frappy planner</Text>
                      <Pressable
                        onPress={() =>
                          this.props.navigation.navigate("notifications")
                        }
                      >
                        <BellIcon width={wp("5.9%")} height={wp("5.9%")} />
                      </Pressable>
                    </View>

                    <Pressable onPress={this.onPressDate}>
                      <View style={styles.dateWrapper}>
                        <Text style={styles.dateTextStyle}>Select Date</Text>
                        <CalenderSvg
                          color={colors.darkGrey}
                          width={wp("5%")}
                          height={wp("5%")}
                        />
                      </View>
                    </Pressable>

                    <Text style={styles.formattedDate}>
                      {getFormatedDate(date)}
                    </Text>
                    {this.renderDays()}

                    <Text
                      style={styles.selectDate}
                      onPress={() => this.showPicker("Date")}
                    >
                      Set Time
                    </Text>
                    <View style={styles.setTimeContainer}>
                      <View>
                        <View style={styles.timeBox}>
                          <Pressable
                            style={styles.timeBoxItem}
                            onPress={() => {
                              this.ref.current = "from"
                              this.showPicker("time")
                            }}
                          >
                            <TextInput
                              placeholder="From"
                              style={[styles.timeText, { paddingBottom: 0 }]}
                              value={values.from_time}
                            />
                            <Clock width={wp("6.13%")} height={hp("3.02%")} />
                          </Pressable>
                        </View>
                        {touched.from_time && errors.from_time && (
                          <Text style={styles.error}>{errors.from_time}</Text>
                        )}
                      </View>
                      <View>
                        <View style={styles.timeBox}>
                          <Pressable
                            style={styles.timeBoxItem}
                            onPress={() => {
                              this.ref.current = "to"
                              this.showPicker("time")
                            }}
                          >
                            <TextInput
                              style={[styles.timeText, { paddingBottom: 0 }]}
                              placeholder="To"
                              value={values.to_time}
                            ></TextInput>
                            <Clock width={wp("6.13%")} height={hp("3.02%")} />
                          </Pressable>
                        </View>
                        {touched.to_time && errors.to_time && (
                          <Text style={styles.error}>{errors.to_time}</Text>
                        )}
                      </View>
                    </View>
                    <Text style={styles.selectDate}>Location</Text>

                    <GooglePlacesAutocomplete
                      ref={this.fromLocationRef}
                      placeholder="From Address"
                      onPress={(data, details = null) => {
                        console.log(data, details)
                        setFieldValue("start_location", data.description)
                      }}
                      query={{
                        key: "AIzaSyCSbkKGUl_KI56DZi_aBGr5SIF7Q56utJk",
                        language: "en",
                      }}
                      autoFillOnNotFound={true}
                      enablePoweredByContainer={false}
                      styles={{
                        container: {
                          width: "100%",
                          padding: wp("1%"),
                          marginVertical: wp("1%"),
                          borderColor: colors.greyTwo,
                          borderWidth: wp("0.3%"),
                          borderRadius: wp("2%"),
                        },
                        textInput: styles.timeText,
                      }}
                    />
                    {errors.start_location && (
                      <Text style={styles.error}>{errors.start_location}</Text>
                    )}
                    <GooglePlacesAutocomplete
                      ref={this.toLocationRef}
                      placeholder="To Address"
                      onPress={(data, details = null) => {
                        setFieldValue("end_location", data.description)
                      }}
                      query={{
                        key: "AIzaSyCSbkKGUl_KI56DZi_aBGr5SIF7Q56utJk",
                        language: "en",
                      }}
                      enablePoweredByContainer={false}
                      styles={{
                        container: {
                          width: "100%",
                          padding: wp("1%"),
                          marginVertical: wp("1%"),
                          borderColor: colors.greyTwo,
                          borderWidth: wp("0.3%"),
                          borderRadius: wp("2%"),
                        },
                        textInput: styles.timeText,
                      }}
                    />
                    {errors.end_location && (
                      <Text style={styles.error}>{errors.end_location}</Text>
                    )}
                    <Text style={styles.selectDate}>Select Category</Text>
                    {switchList.map((element: any, index: number) => {
                      return (
                        <View style={styles.categoryContainer} key={index}>
                          <Text style={styles.timeText}>{element.name}</Text>
                          <Switch
                            trackColor={{
                              false: colors.lightGreyThree,
                              true: "green",
                            }}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.grey}
                            onValueChange={() => this.toggleSwitch(index)}
                            value={values.category[index]}
                            style={styles.switch}
                          />
                        </View>
                      )
                    })}
                    {errors.category && (
                      <Text style={styles.error}>{errors.category}</Text>
                    )}

                    <TextInput
                      onChangeText={handleChange("description")}
                      textAlignVertical="top"
                      placeholderTextColor={colors.greyTwo}
                      placeholder={"Description"}
                      style={styles.customTextField}
                      value={values.description}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.error}>{errors.description}</Text>
                    )}
                    <View style={styles.bottomContainer}>
                      <CustomButton
                        onPressButton={this.onPressCancel}
                        buttonStyles={styles.buttonStyles}
                        title="Cancel"
                        buttonTextStyles={styles.buttonTextStyles}
                      ></CustomButton>
                      <CustomButton
                        onPressButton={handleSubmit}
                        buttonStyles={styles.buttonStylesPlan}
                        title="Plan"
                        buttonTextStyles={[styles.buttonTextStylesPlan]}
                      />
                    </View>
                  </View>
                )
              }}
            </Formik>
          )}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={this.onChangePicker}
              minimumDate={this.date}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default AddDateToCalender

const styles = StyleSheet.create({
  error: {
    color: colors.orange,
    fontSize: wp("3%"),
    fontFamily: "ArchivoRegular",
    display: "flex",
    alignSelf: "flex-start",
  },
  dateArrayItem: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    textAlign: "center",
    textAlignVertical: "center",
  },
  locationBox: {
    backgroundColor: "red",
  },
  timeBoxItem: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateTextStyle2: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.darkBlack,
    marginRight: wp("4%"),
  },

  dateWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -hp("0.5%"),
  },
  formattedDate: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.greyTwo,
    paddingVertical: hp("1%"),
  },
  flatListRenderItemContainer: {
    marginHorizontal: wp("3%"),
    alignItems: "center",
  },
  containerDirection: {
    display: "flex",
    flexDirection: "row",
  },
  safeAreaContainer: {
    flex: 1,
    paddingTop: hp("2%"),
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: wp("5%"),
  },
  titleText: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("6.5%"),
    color: colors.darkBlack,
  },
  container: {
    padding: "5%",
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: wp("5%"),
  },
  selectDate: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.darkBlack,
    // lineHeight: wp("4.5%"),
    marginBottom: wp("4%"),
  },
  timeBox: {
    width: wp("41%"),
    padding: wp("2%"),

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.greyTwo,
    borderWidth: wp("0.3%"),
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  timeText: {
    display: "flex",
    flex: 1,
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.greyTwo,
    lineHeight: wp("5.3%"),
    paddingBottom: wp("2%"),
  },
  timeTextMargin: {
    display: "flex",
    flex: 1,
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.greyTwo,
    lineHeight: wp("5.3%"),
    paddingBottom: wp("2%"),
    marginBottom: hp("2%"),
  },
  buttonStyles: {
    width: wp("43%"),
    backgroundColor: colors.white,
    borderColor: colors.greyTwo,
    borderWidth: wp("0.3%"),
    borderRadius: wp("2%"),
    paddingVertical: wp("5%"),
  },
  buttonStylesPlan: {
    width: wp("43%"),
    borderColor: colors.greyTwo,
    borderRadius: wp("2%"),
    paddingVertical: wp("5%"),
    backgroundColor: colors.orange,
    borderWidth: 0,
  },
  buttonTextStyles: {
    fontFamily: "ArchivoRegular",
    fontWeight: "500",
    fontSize: wp("4.8%"),
    letterSpacing: -wp("0.03%"),
    lineHeight: wp("5.3%"),
    color: colors.greyTwo,
  },
  buttonTextStylesPlan: {
    fontFamily: "ArchivoRegular",
    fontWeight: "500",
    fontSize: wp("4.8%"),
    letterSpacing: -wp("0.03%"),
    lineHeight: wp("5.3%"),
    color: colors.white,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
    paddingLeft: 0,
  },
  switch: {
    transform: [{ scaleX: wp("0.4%") }, { scaleY: wp("0.4%") }],
  },
  setTimeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp("4%"),
  },
  setLocationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp("4%"),
  },
  customTextField: {
    height: wp("40%"),
    borderRadius: wp("2%"),
    backgroundColor: colors.lightGreyFour,
    borderBottomWidth: 0,
    padding: wp("4%"),
    marginTop: wp("4%"),
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: wp("7%"),
    marginBottom: wp("0%"),
  },
  dateTextStyle: {
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    lineHeight: wp("5%"),
    letterSpacing: wp("0.05%"),
    marginVertical: wp("1%"),
    color: colors.darkBlack,
    marginRight: wp("3%"),
  },
  loadingContainer: {
    height: hp("90%"),
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignContent: "center",
    backgroundColor: colors.white,
  },
})
