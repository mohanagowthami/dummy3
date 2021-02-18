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
} from "../lib/helper"
// service
import PlannerService from "../services/planner.service"

// props
interface IProps {
  navigation: any
}
// state
interface IState {
  date: any
  mode: any
  show: boolean
  description: string
  switchArray: Array<{
    name: string
    on: boolean
  }>
  fromTime: string
  toTime: string
  dateArray: any

  isLoading: boolean
}

const plannerService = new PlannerService()

class AddDateToCalender extends Component<IProps, IState> {
  date: any = new Date()
  ref: any
  fromLocationRef: any
  toLocationRef: any
  flatListRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoading: false,
      date: new Date(),
      mode: "date",
      show: false,
      description: "",
      dateArray: getCurrentMonthArray(),

      switchArray: [
        {
          name: "Food",
          on: false,
        },
        {
          name: "Travel",
          on: false,
        },
        {
          name: "Shopping",
          on: false,
        },
      ],
      fromTime: "From",
      toTime: "To",
    }
    this.ref = React.createRef()
    this.flatListRef = React.createRef()
    this.fromLocationRef = React.createRef()
    this.toLocationRef = React.createRef()
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
          let minutes = selectedDate.getMinutes()
          if (minutes.toString().length === 1) minutes = "0" + minutes

          stateData.fromTime = convertToTweleveHoursFormat(
            selectedDate.getHours(),
            minutes
          )
        } else {
          let minutes = selectedDate.getMinutes()
          if (minutes.toString().length === 1) minutes = "0" + minutes
          stateData.toTime = convertToTweleveHoursFormat(
            selectedDate.getHours(),
            minutes
          )
        }
      }

      this.setState(stateData)
    }
  }

  toggleSwitch = (index: number) => {
    let stateData = { ...this.state }

    stateData.switchArray[index].on = !stateData.switchArray[index].on
    this.setState(stateData)
  }

  renderSelectCategorySwitches = () => {
    const { switchArray } = this.state
    return (
      <>
        {switchArray.map((element, index) => {
          const { name, on } = element
          return (
            <View style={styles.categoryContainer} key={index}>
              <Text style={styles.timeText}>{name}</Text>
              <Switch
                trackColor={{
                  false: colors.lightGreyThree,
                  true: "green",
                }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.grey}
                onValueChange={() => this.toggleSwitch(index)}
                value={on}
                style={styles.switch}
              />
            </View>
          )
        })}
      </>
    )
  }

  handlePressableDate = (ind: number): any => {
    const { dateArray } = this.state
    const mutatedArray = dateArray.map((ele: boolean, index: number) => {
      if (index === ind) {
        return !ele
      }
      return 0
    })
    this.setState({
      ...this.state,
      dateArray: mutatedArray,
      date: new Date(this.date.getFullYear(), this.date.getMonth(), ind + 1),
    })
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
            {
              backgroundColor: item ? colors.orange : colors.white,
              color: item ? colors.white : colors.darkBlack,
              width: wp("10%"),
              height: wp("10%"),
              borderRadius: wp("5%"),
              textAlign: "center",
              textAlignVertical: "center",
            },
          ]}
          onPress={() => this.handlePressableDate(index)}
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

  pressPlan = () => {
    const { date, fromTime, toTime, description, switchArray } = this.state
    const category = switchArray.filter((ele) => {
      if (ele) return ele.name
    })
    const data = {
      from_time: fromTime !== "From" ? fromTime.replace(/\s/g, "") : "",
      to_time: toTime !== "From" ? toTime.replace(/\s/g, "") : "",
      date: getFormatedDate(date),
      start_location: this.fromLocationRef.current.getAddressText(),
      end_location: this.toLocationRef.current.getAddressText(),
      category: category,
      description: description,
    }
    console.log(data, "before submitting")
    this.setState({ ...this.state, isLoading: true })
    plannerService
      .updateUserPlannerData(data)
      .then((response) => {
        this.props.navigation.navigate("frappyCalender")
      })
      .catch((error) => {})
  }

  onChangeDescription = (text: string) => {
    this.setState({ ...this.state, description: text })
  }
  onPressDate = () => {
    this.showPicker("date")
  }

  onPressCancel = () => {
    const stateData = { ...this.state }
    stateData.date = new Date()
    stateData.description = ""
    stateData.dateArray = getCurrentMonthArray()
    stateData.switchArray = [
      {
        name: "Food",
        on: false,
      },
      {
        name: "Travel",
        on: false,
      },
      {
        name: "Shopping",
        on: false,
      },
    ]
    stateData.fromTime = "From"
    stateData.toTime = "To"
    this.fromLocationRef.current.setAddressText("")
    this.toLocationRef.current.setAddressText("")
    this.setState(stateData)
  }
  render() {
    const {
      isLoading,
      date,
      fromTime,
      toTime,
      show,
      mode,
      description,
    } = this.state
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.darkBlack} size="large" />
            </View>
          ) : (
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

              <Text style={styles.formattedDate}>{getFormatedDate(date)}</Text>
              {this.renderDays()}

              <Text
                style={styles.selectDate}
                onPress={() => this.showPicker("Date")}
              >
                Set Time
              </Text>
              <View style={styles.setTimeContainer}>
                <View style={styles.timeBox}>
                  <Pressable
                    style={styles.timeBoxItem}
                    onPress={() => {
                      this.ref.current = "from"
                      this.showPicker("time")
                    }}
                  >
                    <Text style={styles.timeText}>{fromTime}</Text>
                    <Clock width={wp("6.13%")} height={hp("3.02%")} />
                  </Pressable>
                </View>
                <View style={styles.timeBox}>
                  <Pressable
                    style={styles.timeBoxItem}
                    onPress={() => {
                      this.ref.current = "to"
                      this.showPicker("time")
                    }}
                  >
                    <Text style={styles.timeText}>{toTime}</Text>
                    <Clock width={wp("6.13%")} height={hp("3.02%")} />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.selectDate}>Location</Text>

              <GooglePlacesAutocomplete
                ref={this.fromLocationRef}
                placeholder="From Address"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
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
              <GooglePlacesAutocomplete
                ref={this.toLocationRef}
                placeholder="To Address"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details)
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

              <Text style={styles.selectDate}>Select Category</Text>
              {this.renderSelectCategorySwitches()}
              <TextInput
                onChangeText={this.onChangeDescription}
                textAlignVertical="top"
                placeholderTextColor={colors.greyTwo}
                placeholder={"Description"}
                style={styles.customTextField}
                value={description}
              />
              <View style={styles.bottomContainer}>
                <CustomButton
                  onPressButton={this.onPressCancel}
                  buttonStyles={styles.buttonStyles}
                  title="Cancel"
                  buttonTextStyles={styles.buttonTextStyles}
                ></CustomButton>
                <CustomButton
                  onPressButton={this.pressPlan}
                  buttonStyles={styles.buttonStylesPlan}
                  title="Plan"
                  buttonTextStyles={[styles.buttonTextStylesPlan]}
                />
              </View>
            </View>
          )}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={this.onChangePicker}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default AddDateToCalender

const styles = StyleSheet.create({
  locationBox: {
    backgroundColor: "red",
  },
  timeBoxItem: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingVertical: wp("2.8%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.greyTwo,
    borderWidth: wp("0.3%"),
    borderRadius: wp("2%"),
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
