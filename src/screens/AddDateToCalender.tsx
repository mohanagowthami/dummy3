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
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker"
// icons
import {
  BellIcon,
  CalenderSvg,
  Clock,
  LocationIcon,
} from "../../assets/svgs/icons"
// components
import CustomTextField from "../components/input-controllers/CustomTextField"
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
import { getFormatedDate, getCurrentMonthArray } from "../lib/helper"
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
  initialLocation: string
  destinationLocation: string
  isLoading: boolean
}

const plannerService = new PlannerService()

class AddDateToCalender extends Component<IProps, IState> {
  date: any = new Date()
  ref: any
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
          on: true,
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
      initialLocation: "",
      destinationLocation: "",
    }
    this.ref = React.createRef()
    this.flatListRef = React.createRef()
  }

  showPicker = (mode: string) => {
    this.setState({
      ...this.state,
      mode: mode,
      show: true,
    })
  }

  onChangePicker = (event: any, selectedDate: any) => {
    let stateData = { ...this.state }
    stateData.show = false
    if (this.state.mode === "date") {
      stateData.date = selectedDate
      if (
        selectedDate.getMonth() === this.date.getMonth() &&
        selectedDate.getFullYear() === this.date.getFullYear()
      ) {
        stateData.dateArray = getCurrentMonthArray(selectedDate.getDate())
        this.flatListRef.scrollToIndex({
          animated: true,
          index: selectedDate.getDate() - 1,
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
      if (this.ref.current === "from")
        stateData.fromTime = `${selectedDate.getHours()} : ${selectedDate.getMinutes()}`
      else
        stateData.toTime = `${selectedDate.getHours()} : ${selectedDate.getMinutes()}`
    }

    this.setState(stateData)
  }

  toggleSwitch = (index: number) => {
    let stateData = { ...this.state }
    stateData.switchArray[0].on = false
    stateData.switchArray[1].on = false
    stateData.switchArray[2].on = false
    stateData.switchArray[index].on = !stateData.switchArray[index].on
    this.setState(stateData)
  }

  renderSelectCategorySwitches = () => {
    return (
      <>
        {this.state.switchArray.map((element, index) => {
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
    const mutatedArray = this.state.dateArray.map(
      (ele: boolean, index: number) => {
        if (index === ind) {
          return !ele
        }
        return 0
      }
    )
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
      offset: wp("13%") * index,
      index,
    }
  }

  renderDays = () => {
    const { dateArray } = this.state
    console.log(this.state.date.getDate(), "dategow")
    return (
      <FlatList
        data={dateArray}
        renderItem={({ item, index }) => this.flatListRenderItem(item, index)}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        initialScrollIndex={this.state.date.getDate() - 1}
        getItemLayout={this.getItemLayout.bind(this)}
        ref={(ref) => (this.flatListRef = ref)}
      />
    )
  }

  pressPlan = () => {
    const {
      date,
      fromTime,
      toTime,
      initialLocation,
      destinationLocation,
      description,
      switchArray,
    } = this.state
    const category = switchArray.find((ele) => {
      if (ele) return ele.name
    })
    const data = {
      from_time: fromTime.replace(/\s/g, ""),
      to_time: toTime.replace(/\s/g, ""),
      date: getFormatedDate(date),
      start_location: initialLocation,
      end_location: destinationLocation,
      category: category!.name,
      description: description,
    }

    console.log(data, "data")
    this.setState({ ...this.state, isLoading: true })
    plannerService
      .updateUserPlannerData(data)
      .then((response) => {
        console.log(response, "response")
        this.props.navigation.navigate("frappyCalender")
      })
      .catch((error) => console.log(error, "error"))
  }

  onChangeDescription = (text: string) => {
    this.setState({ ...this.setState, description: text })
  }
  onPressDate = () => {
    this.showPicker("date")
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {this.state.isLoading ? (
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
              <View style={styles.containerDirection}>
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
              </View>
              <Text style={styles.formattedDate}>
                {getFormatedDate(this.state.date)}
              </Text>
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
                    <Text style={styles.timeText}>{this.state.fromTime}</Text>
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
                    <Text style={styles.timeText}>{this.state.toTime}</Text>
                    <Clock width={wp("6.13%")} height={hp("3.02%")} />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.selectDate}>Location</Text>
              <View style={styles.setLocationContainer}>
                <View style={styles.timeBox}>
                  <TextInput
                    placeholder="Start"
                    style={[styles.timeText, { paddingBottom: wp("0%") }]}
                    onChangeText={(text) => {
                      this.setState({
                        ...this.state,
                        initialLocation: text,
                      })
                    }}
                  />

                  <Pressable>
                    <LocationIcon width={wp("6.13%")} height={hp("3.02%")} />
                  </Pressable>
                </View>
                <View style={styles.timeBox}>
                  <TextInput
                    placeholder="End"
                    style={[styles.timeText, { paddingBottom: wp("0%") }]}
                    onChangeText={(text) => {
                      this.setState({
                        ...this.state,
                        destinationLocation: text,
                      })
                    }}
                  />
                  <Pressable>
                    <LocationIcon width={wp("6.13%")} height={hp("3.02%")} />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.selectDate}>Select Category</Text>
              {this.renderSelectCategorySwitches()}
              <CustomTextField
                onChange={this.onChangeDescription}
                textAlignVertical="top"
                placeholderTextColor={colors.greyTwo}
                placeholder={"Description"}
                style={styles.customTextField}
              />
              <View style={styles.bottomContainer}>
                <CustomButton
                  onPressButton={() =>
                    this.props.navigation.navigate("frappyCalender")
                  }
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
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
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
    marginBottom: hp("1%"),
  },
  formattedDate: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.greyTwo,
    paddingVertical: hp("1%"),
    paddingTop: 0,
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
