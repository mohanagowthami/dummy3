// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable,
    ActivityIndicator,
} from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker"
// icons
import Notifications from "../../assets/svgs/icons/icons-profile/Notifications"
import { AddIcon } from "../../assets/svgs/icons"

import CalenderSvg from "../../assets/svgs/icons/icons-bottomTab/CalenderSvg"
// colors
import { colors } from "../lib/colors"

import { getFormatedDate } from "../lib/helper"
import PlannerService from "../services/planner.service"

interface IProps {
    navigation: any
}
// divisioning of the screen
interface IDetailsType {
    profileDetails: Array<any>
    results: Array<any>
}
// state - data
interface Istate {
    selectedDate: any
    isModalOpen: boolean
    dateArray: any
    plannerData: any
    isLoading: boolean
}

function getCurrentMonthArray() {
    const date = new Date()
    let calculatedArray = new Array(
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    ).fill(0)

    return calculatedArray.map((ele, index) => {
        if (index + 1 === date.getDate()) return 1
        else return 0
    })
}

const plannerService = new PlannerService()

class FrappyPlannerCalendar extends Component<IProps, Istate> {
    date: any
    constructor(props: IProps) {
        super(props)
        this.date = new Date()
        this.state = {
            selectedDate: this.date,
            isModalOpen: false,
            dateArray: getCurrentMonthArray(),
            plannerData: [],
            isLoading: false,
        }
    }

    onChangePicker = (event: any, selectedDate: any) => {
        console.log(selectedDate, "selectedDate")
        this.setState({
            ...this.state,
            isModalOpen: false,
            selectedDate: selectedDate,
            dateArray: new Array(
                new Date(
                    this.date.getFullYear(),
                    this.date.getMonth() + 1,
                    0
                ).getDate()
            ).fill(0),
        })
    }

    fetchData = () => {
        this.setState({ ...this.state, isLoading: true })
        plannerService
            .searchCurrentUserPlannerData(
                getFormatedDate(this.state.selectedDate)
            )
            .then((response) => {
                this.setState({
                    ...this.state,
                    plannerData: response,
                    isLoading: false,
                })
            })
            .catch((error) => console.log(error, "error"))
    }
    async componentDidMount() {
        this.fetchData()
    }

    async componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.selectedDate !== this.state.selectedDate) {
            this.fetchData()
        }
    }

    setModalStatus = () => {
        this.setState((prevState) => ({
            ...this.state,
            isModalOpen: !prevState.isModalOpen,
        }))
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
            selectedDate: new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                ind + 1
            ),
        })
    }

    renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        return (
            <ScrollView
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: wp("4%"),
                }}
                horizontal
            >
                {this.state.dateArray.map((ele: any, index: number) => {
                    let day = new Date(
                        this.date.getFullYear(),
                        this.date.getMonth(),
                        index + 1
                    )
                    const dayName = days[day.getDay()]
                    return (
                        <View
                            style={{
                                marginHorizontal: wp("4%"),

                                alignItems: "center",
                            }}
                            key={index}
                        >
                            <Text
                                style={[
                                    styles.dateTextStyle,
                                    { color: colors.greyTwo },
                                ]}
                            >
                                {dayName}
                            </Text>

                            <Text
                                style={[
                                    styles.dateTextStyle,
                                    {
                                        backgroundColor: ele
                                            ? colors.orange
                                            : colors.white,
                                        color: ele
                                            ? colors.white
                                            : colors.darkBlack,
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
                })}
            </ScrollView>
        )
    }

    render() {
        return (
            <View
                style={{ display: "flex", flex: 1, backgroundColor: "white" }}
            >
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>Frappy Planner</Text>

                        <View style={styles.notificationIcon}>
                            <Pressable
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        "notifications"
                                    )
                                }
                            >
                                <Notifications
                                    width={wp("5.86%")}
                                    height={hp("2.89%")}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingLeft: wp("6%"),
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "ArchivoRegular",
                                fontSize: wp("3.73"),
                                color: colors.darkBlack,
                                marginRight: wp("4%"),
                            }}
                        >
                            Select Date
                        </Text>
                        <Pressable onPress={this.setModalStatus}>
                            <CalenderSvg
                                color={colors.darkGrey}
                                width={wp("5%")}
                                height={wp("5%")}
                            />
                        </Pressable>
                    </View>
                    <Text
                        style={{
                            fontSize: wp("3.73%"),
                            paddingLeft: wp("6%"),
                            paddingTop: wp("2%"),
                            color: colors.darkBlack,
                        }}
                    >
                        {getFormatedDate(this.state.selectedDate)}
                    </Text>
                    {this.renderDays()}
                    <View style={styles.bottomTab}>
                        <Text
                            style={{
                                fontFamily: "ArchivoRegular",
                                fontSize: wp("3.73"),
                                color: colors.darkBlack,
                            }}
                        >
                            Your Visits
                        </Text>
                        {this.state.isLoading ? (
                            <ActivityIndicator
                                color={colors.darkBlack}
                                size="large"
                            />
                        ) : (
                            <>
                                {this.state.plannerData.map(
                                    (ele: any, index: number) => {
                                        const {
                                            from_time,
                                            to_time,
                                            description,
                                        } = ele
                                        return (
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flex: 1,
                                                    backgroundColor: "#FFE8E7",
                                                    borderRadius: wp("2%"),
                                                    marginTop: hp("2.76%"),
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                                key={index}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "ArchivoRegular",
                                                        padding: wp("2%"),
                                                        fontWeight: "500",
                                                        fontSize: wp("3.73%"),
                                                    }}
                                                >
                                                    Breakfast in Chutney’s
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "ArchivoRegular",
                                                        padding: wp("2%"),
                                                        fontSize: wp("3.73%"),
                                                        color: colors.grey,
                                                    }}
                                                >
                                                    {description}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "ArchivoRegular",
                                                        padding: wp("2%"),
                                                        fontSize: wp("3.73%"),
                                                        color: colors.grey,
                                                    }}
                                                >
                                                    {from_time} - {to_time}
                                                </Text>
                                            </View>
                                        )
                                    }
                                )}
                            </>
                        )}
                    </View>
                </ScrollView>

                <View
                    style={{
                        position: "absolute",
                        right: wp("6%"),
                        bottom: hp("3%"),
                    }}
                >
                    <Pressable
                        onPress={() =>
                            this.props.navigation.navigate("addDateToCalender")
                        }
                    >
                        <AddIcon width={wp("13.06%")} height={hp("6.44%")} />
                    </Pressable>
                </View>
                {this.state.isModalOpen && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.selectedDate}
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
    selectDate: {
        fontFamily: "ArchivoRegular",
        fontSize: wp("5%"),
        color: colors.darkBlack,
        // lineHeight: wp("4.5%"),
        // marginBottom: wp("4%"),
        paddingHorizontal: wp("6%"),
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
