// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component, createRef } from "react"
// react-native
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native"
// react-native-responsive-screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker"
// icons
import { Notifications } from "../../assets/svgs/icons/icons-profile"
import { AddIcon } from "../../assets/svgs/icons"
import CalenderSvg from "../../assets/svgs/icons/icons-bottomTab/CalenderSvg"
// colors
import { colors } from "../lib/colors"
// date
import {
  getFormatedDate,
  getCurrentMonthArray,
  convertToTweleveHoursFormat,
} from "../lib/helper"
// service
import PlannerService from "../services/planner.service"

interface IProps {
  navigation: any
}
// state - data
interface Istate {
  selectedDate: any
  isModalOpen: boolean
  dateArray: any
  plannerData: any
  isLoading: boolean
}

const plannerService = new PlannerService()

class FrappyPlannerCalendar extends Component<IProps, Istate> {
  date: any
  subscribe: any
  flatListRef: any
  constructor(props: IProps) {
    super(props)
    this.date = new Date()
    this.state = {
      selectedDate: new Date(),
      isModalOpen: false,
      dateArray: getCurrentMonthArray(),
      plannerData: [],
      isLoading: false,
    }
    this.flatListRef = createRef()
  }

  onChangePicker = (event: any, selectedDate: any) => {
    if (selectedDate) {
      const stateData = { ...this.state }
      stateData.selectedDate = selectedDate
      stateData.isModalOpen = false
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
      this.setState(stateData)
    }
  }

  fetchData = () => {
    this.setState({ ...this.state, isLoading: true })
    const { selectedDate } = this.state
    plannerService
      .searchCurrentUserPlannerData(getFormatedDate(selectedDate))
      .then((response) => {
        this.setState({
          ...this.state,
          plannerData: response,
          isLoading: false,
        })
      })
      .catch((error) => {})
  }
  async componentDidMount() {
    const { navigation } = this.props
    this.fetchData()
    this.subscribe = navigation.addListener("focus", () => {
      this.fetchData()
    })
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    const { selectedDate } = this.state
    if (prevState.selectedDate !== selectedDate) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    this.subscribe()
  }
  setModalStatus = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }))
  }

  handlePressableDate = (ind: number): any => {
    const { dateArray } = this.state
    const mutatedArray = dateArray.map((ele: boolean, index: number) => {
      if (index === ind) {
        return 1
      }
      return 0
    })
    this.setState({
      ...this.state,
      dateArray: mutatedArray,
      selectedDate: new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        ind + 1
      ),
    })
  }

  flatListRenderItem = (item: any, index: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let day = new Date(this.date.getFullYear(), this.date.getMonth(), index + 1)
    const dayName = days[day.getDay()]
    return (
      <View style={styles.renderItemWrapper}>
        <Text style={[styles.dateTextStyle, { color: colors.greyTwo }]}>
          {dayName}
        </Text>

        <Text
          style={[
            styles.dateTextStyle,
            styles.dateText,
            {
              backgroundColor: item == 1 ? colors.orange : colors.white,
              color: item === 1 ? colors.white : colors.darkBlack,
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
    const { dateArray, selectedDate } = this.state
    return (
      <FlatList
        data={dateArray}
        renderItem={({ item, index }) => this.flatListRenderItem(item, index)}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        getItemLayout={this.getItemLayout.bind(this)}
        ref={(ref) => (this.flatListRef = ref)}
        initialScrollIndex={selectedDate.getDate() - 1}
      />
    )
  }

  render() {
    const { selectedDate, isLoading, plannerData, isModalOpen } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
          <View style={styles.dateWrapper}>
            <Text style={styles.dateTextStyle2}>Select Date</Text>
            <Pressable onPress={this.setModalStatus}>
              <CalenderSvg
                color={colors.darkGrey}
                width={wp("5%")}
                height={wp("5%")}
              />
            </Pressable>
          </View>
          <Text style={styles.formattedDate}>
            {getFormatedDate(selectedDate)}
          </Text>
          {this.renderDays()}
          <View style={styles.bottomTab}>
            <Text style={styles.yourVisits}>Your Visits</Text>

            {isLoading ? (
              <ActivityIndicator color={colors.darkBlack} size="large" />
            ) : (
              <>
                {plannerData.map((ele: any, index: number) => {
                  const { from_time, to_time, description } = ele

                  return (
                    <View style={styles.cardContainer} key={index}>
                      <Text style={styles.cardDescription}>{description}</Text>
                      <Text style={styles.cardTimings}>
                        {`${convertToTweleveHoursFormat(
                          from_time
                        )} - ${convertToTweleveHoursFormat(to_time)}`}
                      </Text>
                    </View>
                  )
                })}
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.plusButton}>
          <Pressable
            onPress={() => this.props.navigation.navigate("addDateToCalender")}
          >
            <AddIcon width={wp("13.06%")} height={hp("6.44%")} />
          </Pressable>
        </View>
        {isModalOpen && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={this.onChangePicker}
          />
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  dateText: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    textAlign: "center",
    textAlignVertical: "center",
  },
  dateTextStyle2: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("3.73"),
    color: colors.darkBlack,
    marginRight: wp("4%"),
  },
  dateWrapper: {
    paddingLeft: wp("6%"),
    display: "flex",
    flexDirection: "row",
  },
  renderItemWrapper: {
    marginHorizontal: wp("3%"),
    alignItems: "center",
  },
  container: { display: "flex", flex: 1, backgroundColor: "white" },
  mainContainer: {
    display: "flex",
    paddingTop: hp("2%"),
    backgroundColor: colors.white,
  },
  heading: {
    display: "flex",
    paddingTop: hp("2%"),
    paddingBottom: hp("2.10%"),
    paddingLeft: wp("6%"),
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
  selectDate: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.darkBlack,
    paddingHorizontal: wp("6%"),
  },
  formattedDate: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("5%"),
    color: colors.darkBlack,
    paddingTop: hp("0.5%"),
    paddingHorizontal: wp("6%"),
  },
  yourVisits: {
    fontFamily: "ArchivoRegular",
    fontSize: wp("4.5%"),
    color: colors.darkBlack,
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
  plusButton: {
    position: "absolute",
    right: wp("6%"),
    bottom: hp("3%"),
  },
  dateTextStyle: {
    fontSize: wp("4%"),
    fontFamily: "ArchivoRegular",
    lineHeight: wp("5%"),
    letterSpacing: wp("0.05%"),
    marginVertical: wp("1%"),
    color: colors.darkBlack,
  },
})

export default FrappyPlannerCalendar
