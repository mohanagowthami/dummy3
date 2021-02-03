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
import { getFormatedDate } from "../lib/helper"
import { TextInput } from "react-native-gesture-handler"
import PlannerService from "../services/planner.service"

interface IProps {
    navigation: any
}

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
class AddDateToCalender extends Component<IProps, IState> {
    date: any = new Date()
    ref: any
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
            fromTime: "",
            toTime: "",
            initialLocation: "",
            destinationLocation: "",
        }
        this.ref = React.createRef()
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
        if (this.state.mode === "date") stateData.date = selectedDate
        else {
            if (this.ref.current === "from")
                stateData.fromTime = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`
            else
                stateData.toTime = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`
        }

        this.setState(stateData)
    }

    toggleSwitch = (index: number) => {
        let stateData = { ...this.state }
        stateData.switchArray[index].on = !stateData.switchArray[index].on
        this.setState(stateData)
    }

    renderSelectCategorySwitches = () => {
        return (
            <>
                {this.state.switchArray.map((element, index) => {
                    const { name, on } = element
                    return (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: wp("3%"),
                                paddingLeft: 0,
                            }}
                            key={index}
                        >
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
                                style={{
                                    transform: [
                                        { scaleX: wp("0.4%") },
                                        { scaleY: wp("0.4%") },
                                    ],
                                }}
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
            date: new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                ind + 1
            ),
        })
    }

    onBlurDescription = () => {}

    onPressButton = (name: string) => {}

    setModalStatus = () => {}

    renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        return (
            <ScrollView
                style={{
                    display: "flex",
                    flexDirection: "row",
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
                                marginHorizontal: wp("3%"),

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

    pressPlan = () => {
        const {
            date,
            fromTime,
            toTime,
            initialLocation,
            destinationLocation,
            description,
        } = this.state
        const data = {
            from_time: fromTime,
            to_time: toTime,
            date: getFormatedDate(date),
            start_location: initialLocation,
            end_location: destinationLocation,
            category: "Travel",
            description: description,
        }
        console.log(data, "data in add to date")
        this.setState({ ...this.state, isLoading: true })
        plannerService
            .updateUserPlannerData(data)
            .then((response) => {
                console.log(response, "response")
                this.props.navigation.navigate("frappyCalender")
            })
            .catch((error) => console.log(error, "error"))
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: hp("2%") }}>
                <ScrollView>
                    {this.state.isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color={colors.darkBlack}
                                size="large"
                            />
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.TitleContainer}>
                                <Text style={styles.titleText}>
                                    Frappy planner
                                </Text>
                                <Pressable
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "notifications"
                                        )
                                    }
                                >
                                    <BellIcon
                                        width={wp("5.9%")}
                                        height={wp("5.9%")}
                                    />
                                </Pressable>
                            </View>
                            <View
                                style={{
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
                                <Pressable
                                    onPress={() => this.showPicker("date")}
                                >
                                    <CalenderSvg
                                        color={colors.darkGrey}
                                        width={wp("5%")}
                                        height={wp("5%")}
                                    />
                                </Pressable>
                            </View>

                            {this.renderDays()}
                            <Text
                                style={[
                                    styles.timeText,
                                    { marginVertical: hp("2%") },
                                ]}
                            >
                                {this.state.date &&
                                    getFormatedDate(this.state.date)}
                            </Text>
                            <Text
                                style={styles.selectDate}
                                onPress={() => this.showPicker("Date")}
                            >
                                Set Time
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: wp("4%"),
                                }}
                            >
                                <View style={styles.timeBox}>
                                    <Text style={styles.timeText}>
                                        {this.state.fromTime}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            this.ref.current = "from"
                                            this.showPicker("time")
                                        }}
                                    >
                                        <Clock
                                            width={wp("6.13%")}
                                            height={hp("3.02%")}
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.timeBox}>
                                    <Text style={styles.timeText}>
                                        {this.state.toTime}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            this.ref.current = "to"
                                            this.showPicker("time")
                                        }}
                                    >
                                        <Clock
                                            width={wp("6.13%")}
                                            height={hp("3.02%")}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={styles.selectDate}>Location</Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: wp("4%"),
                                }}
                            >
                                <View style={styles.timeBox}>
                                    <TextInput
                                        placeholder="Start"
                                        style={styles.timeText}
                                        onChangeText={(text) => {
                                            this.setState({
                                                ...this.state,
                                                initialLocation: text,
                                            })
                                        }}
                                    />

                                    <Pressable>
                                        <LocationIcon
                                            width={wp("6.13%")}
                                            height={hp("3.02%")}
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.timeBox}>
                                    <TextInput
                                        placeholder="End"
                                        style={styles.timeText}
                                        onChangeText={(text) => {
                                            this.setState({
                                                ...this.state,
                                                destinationLocation: text,
                                            })
                                        }}
                                    />

                                    <Pressable>
                                        <LocationIcon
                                            width={wp("6.13%")}
                                            height={hp("3.02%")}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={styles.selectDate}>
                                Select Category
                            </Text>
                            {this.renderSelectCategorySwitches()}
                            <CustomTextField
                                onChange={this.onBlurDescription}
                                textAlignVertical="top"
                                placeholderTextColor={colors.greyTwo}
                                placeholder={"Description"}
                                style={{
                                    height: wp("40%"),
                                    borderRadius: wp("2%"),
                                    backgroundColor: colors.lightGreyFour,
                                    borderBottomWidth: 0,
                                    padding: wp("4%"),
                                    marginTop: wp("4%"),
                                }}
                            />
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginVertical: wp("7%"),
                                    marginBottom: wp("0%"),
                                }}
                            >
                                <CustomButton
                                    onPressButton={() =>
                                        this.props.navigation.navigate(
                                            "frappyCalender"
                                        )
                                    }
                                    buttonStyles={styles.buttonStyles}
                                    title="Cancel"
                                    buttonTextStyles={styles.buttonTextStyles}
                                ></CustomButton>
                                <CustomButton
                                    onPressButton={this.pressPlan}
                                    buttonStyles={[
                                        styles.buttonStyles,
                                        {
                                            backgroundColor: colors.orange,
                                            borderWidth: 0,
                                        },
                                    ]}
                                    title="Plan"
                                    buttonTextStyles={[
                                        styles.buttonTextStyles,
                                        { color: colors.white },
                                    ]}
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
    buttonStyles: {
        width: wp("43%"),
        backgroundColor: colors.white,
        borderColor: colors.greyTwo,
        borderWidth: wp("0.3%"),
        borderRadius: wp("2%"),
        paddingVertical: wp("5%"),
    },
    buttonTextStyles: {
        fontFamily: "ArchivoRegular",
        fontWeight: "500",
        fontSize: wp("4.8%"),
        letterSpacing: -wp("0.03%"),
        lineHeight: wp("5.3%"),
        color: colors.greyTwo,
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
