// react
import React, { Component } from 'react'
// react-native
import {
    Text,
    View,
    StyleSheet,
    Switch,
    Pressable,
    SafeAreaView,
    ScrollView,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
// DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker'
// colors
import { colors } from '../lib/colors'
// icons
import { BellIcon } from '../../assets/svgs'
import Clock from '../../assets/svgs/Clock'
import CustomTextField from '../components/common/CustomTextField'
// custom Button
import CustomButton from '../components/common/CustomButton'

interface IProps {}

interface IState {
    date: any
    mode: any
    show: boolean
    description: string
    switchArray: Array<{
        name: string
        on: boolean
    }>
    fromText: string
    toText: string
}

class AddDateToCalender extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            date: new Date(),
            mode: 'date',
            show: false,
            description: '',

            switchArray: [
                {
                    name: 'Food',
                    on: false,
                },
                {
                    name: 'Travel',
                    on: false,
                },
                {
                    name: 'Shopping',
                    on: false,
                },
            ],
            fromText: 'From',
            toText: 'To',
        }
    }

    showPicker = (mode: string) => {
        this.setState({
            ...this.state,
            mode: mode,
            show: true,
        })
    }

    onChangePicker = (event: any, selectedDate: any) => {
        console.log(selectedDate, 'selectedDate')
        this.setState({
            ...this.state,
            date: selectedDate,
        })
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
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: wp('3%'),
                                paddingLeft: 0,
                            }}
                            key={index}
                        >
                            <Text style={styles.timeText}>{name}</Text>
                            <Switch
                                trackColor={{
                                    false: colors.lightGreyThree,
                                    true: 'green',
                                }}
                                thumbColor={colors.white}
                                ios_backgroundColor={colors.grey}
                                onValueChange={() => this.toggleSwitch(index)}
                                value={on}
                                style={{
                                    transform: [
                                        { scaleX: wp('0.4%') },
                                        { scaleY: wp('0.4%') },
                                    ],
                                }}
                            />
                        </View>
                    )
                })}
            </>
        )
    }

    onBlurDescription = () => {}

    onPressButton = (name: string) => {}

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.titleText}>Frappy planner</Text>

                            <BellIcon width={wp('5.9%')} height={wp('5.9%')} />
                        </View>
                        <Text
                            style={styles.selectDate}
                            onPress={() => this.showPicker('Date')}
                        >
                            Select Date
                        </Text>
                        <Text
                            style={styles.selectDate}
                            onPress={() => this.showPicker('Date')}
                        >
                            Set Time
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: wp('4%'),
                            }}
                        >
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>
                                    {this.state.fromText}
                                </Text>
                                <Pressable
                                    onPress={() => this.showPicker('time')}
                                >
                                    <Clock />
                                </Pressable>
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>
                                    {this.state.toText}
                                </Text>
                                <Pressable
                                    onPress={() => this.showPicker('time')}
                                >
                                    <Clock />
                                </Pressable>
                            </View>
                        </View>
                        <Text style={styles.selectDate}>Select Category</Text>
                        {this.renderSelectCategorySwitches()}
                        <CustomTextField
                            onCallBack={this.onBlurDescription}
                            textAlignVertical="top"
                            placeholderTextColor={colors.greyTwo}
                            placeholder={'Discription'}
                            style={{
                                height: wp('40%'),
                                borderRadius: wp('2%'),
                                backgroundColor: colors.lightGreyFour,
                                borderBottomWidth: 0,
                                padding: wp('4%'),
                                marginTop: wp('4%'),
                            }}
                        />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: wp('7%'),
                                marginBottom: wp('0%'),
                            }}
                        >
                            <CustomButton
                                onPressButton={() =>
                                    this.onPressButton('cancel')
                                }
                                buttonStyles={styles.buttonStyles}
                                title="Cancel"
                                buttonTextStyles={styles.buttonTextStyles}
                            ></CustomButton>
                            <CustomButton
                                onPressButton={() => this.onPressButton('save')}
                                buttonStyles={[
                                    styles.buttonStyles,
                                    {
                                        backgroundColor: colors.orange,
                                        borderWidth: 0,
                                    },
                                ]}
                                title="Save"
                                buttonTextStyles={[
                                    styles.buttonTextStyles,
                                    { color: colors.white },
                                ]}
                            />
                        </View>
                    </View>
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: wp('5%'),
    },
    titleText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.5%'),
        color: colors.darkBlack,
    },
    container: {
        padding: '5%',
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: wp('3%'),
    },
    selectDate: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.2%'),
        color: colors.darkBlack,
        lineHeight: wp('4.5%'),
        marginBottom: wp('4%'),
    },
    timeBox: {
        width: wp('41%'),
        padding: wp('2%'),
        paddingVertical: wp('2.8%'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.greyTwo,
        borderWidth: wp('0.3%'),
        borderRadius: wp('2%'),
    },
    timeText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('5%'),
        color: colors.greyTwo,
        lineHeight: wp('5.3%'),
    },
    buttonStyles: {
        width: wp('43%'),
        backgroundColor: colors.white,
        borderColor: colors.greyTwo,
        borderWidth: wp('0.3%'),
        borderRadius: wp('2%'),
        paddingVertical: wp('5%'),
    },
    buttonTextStyles: {
        fontFamily: 'ArchivoRegular',
        fontWeight: '500',
        fontSize: wp('4.8%'),
        letterSpacing: -wp('0.03%'),
        lineHeight: wp('5.3%'),
        color: colors.greyTwo,
    },
})
