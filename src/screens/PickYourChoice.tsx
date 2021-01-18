// react
import React, { Component } from 'react'
// react-native
import { View, StyleSheet, Text, Pressable, SafeAreaView } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
// common component
import CustomButton from '../components/common/CustomButton'
//colors
import { colors } from '../lib/colors'
// Svgs
import {
    WorkshipSvg,
    AdventureSvg,
    SightSvg,
    HangoutsSvg,
    MallsSvg,
    LocalMarketsSvg,
    HandicraftsSvg,
    NorthIndianSvg,
    SouthIndianSvg,
    ChineseSvg,
    ContinentalSvg,
    LocalDeliciousSvg,
    BakerySvg,
    CheckedSvg,
    UncheckedSvg,
} from '../../assets/svgs/index'
import { ScrollView } from 'react-native-gesture-handler'

interface IProps {}
interface Item {
    name: string
    checked: boolean
    Svg?: any
}

interface IState {
    category: string
    travelList: Array<Item>
    shoppingList: Array<Item>
}

export const travelList = [
    {
        name: 'Sight Seeing',
        checked: false,
        Svg: SightSvg,
    },
    {
        name: 'Hangouts',
        checked: false,
        Svg: HangoutsSvg,
    },
    {
        name: 'Adventure',
        checked: false,
        Svg: AdventureSvg,
    },
    {
        name: 'Worship',
        checked: false,
        Svg: WorkshipSvg,
    },
]

export const foodTypesList = [
    NorthIndianSvg,
    SouthIndianSvg,
    ChineseSvg,
    ContinentalSvg,
    LocalDeliciousSvg,
    BakerySvg,
]

export const shoppingList = [
    { Svg: MallsSvg, name: 'Malls', checked: false },
    { Svg: LocalMarketsSvg, name: 'Local Markets', checked: false },
    { Svg: HandicraftsSvg, name: 'Handicrafts', checked: false },
]
class PickYourChoice extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            category: 'food',
            travelList: travelList,
            shoppingList: shoppingList,
        }
    }

    componentDidMount() {
        loc(this)
    }

    componentWillUnMount() {
        rol()
    }

    onPressButton = (type: string) => {
        this.setState({
            category: type,
        })
    }

    onPressNext = () => {}
    onPressCheckItem = (type: string, index: number) => {
        let mutatedState = { ...this.state }
        if (type === 'travel') {
            mutatedState.travelList[index].checked = !mutatedState.travelList[
                index
            ].checked
        } else {
            mutatedState.shoppingList[index].checked = !mutatedState
                .shoppingList[index].checked
        }
        this.setState({ ...mutatedState })
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                display: 'flex',
                flex: 1,
                backgroundColor: colors.white,
                paddingHorizontal: wp('3%'),
                paddingVertical: wp('3%'),
                alignContent: 'center',
                paddingTop: wp('7%'),
            },
            titleText: {
                fontFamily: 'AirbnbCerealBook',
                fontWeight: '400',
                fontSize: wp('5%'),
                lineHeight: wp('6%'),
            },
            buttonsContainer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            smallButton: {
                width: wp('30%'),
                borderRadius: wp('3.3%'),
                marginTop: wp('5.3%'),
                paddingVertical: wp('2.5%'),
            },
            buttonTitle: {
                fontFamily: 'AirbnbCerealBold',
                fontSize: wp('4%'),
                lineHeight: wp('5%'),
            },
            TravelListContainer: {},
            Item: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: wp('3%'),
            },
            ItemText: {
                color: colors.grey,
                fontSize: hp('2.8%'),
                lineHeight: hp('3%'),
                fontFamily: 'ArchivoRegular',
                marginLeft: hp('4%'),
            },
            EvenItem: {
                marginVertical: wp('1%'),
            },
            oddItem: {
                marginVertical: wp('1%'),
                marginRight: wp('1%'),
            },
            buttonTextStyles: {
                fontFamily: 'AirbnbCerealBook',
                fontSize: wp('4%'),
                lineHeight: wp('5%'),
            },
        })
        const { category, travelList, shoppingList } = this.state
        console.log('auto rotating')

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.titleText}>
                    {this.state.category === 'food'
                        ? 'Gourmet'
                        : this.state.category === 'travel'
                        ? 'Explore'
                        : 'Memories'}
                </Text>

                <View style={styles.buttonsContainer}>
                    <CustomButton
                        onPressButton={() => this.onPressButton('food')}
                        title="Food"
                        buttonStyles={[
                            styles.smallButton,
                            {
                                backgroundColor:
                                    this.state.category !== 'food'
                                        ? 'rgba(255,108,101,0.2)'
                                        : colors.orange,
                            },
                        ]}
                        buttonTextStyles={[
                            styles.buttonTextStyles,
                            {
                                color:
                                    this.state.category !== 'food'
                                        ? colors.orange
                                        : colors.white,
                            },
                        ]}
                    />
                    <CustomButton
                        onPressButton={() => this.onPressButton('travel')}
                        title="Travel"
                        buttonStyles={[
                            styles.smallButton,
                            {
                                backgroundColor:
                                    this.state.category !== 'travel'
                                        ? 'rgba(253,210,106,0.2)'
                                        : colors.yellow,
                            },
                        ]}
                        buttonTextStyles={[
                            {
                                color:
                                    this.state.category !== 'travel'
                                        ? colors.yellow
                                        : colors.white,
                            },
                            styles.buttonTextStyles,
                        ]}
                    />
                    <CustomButton
                        onPressButton={() => this.onPressButton('shopping')}
                        title="Shopping"
                        buttonStyles={[
                            styles.smallButton,
                            {
                                backgroundColor:
                                    this.state.category !== 'shopping'
                                        ? 'rgba(102,197,218,0.3)'
                                        : colors.skyBlue,
                            },
                        ]}
                        buttonTextStyles={[
                            {
                                color:
                                    this.state.category !== 'shopping'
                                        ? colors.skyBlue
                                        : colors.white,
                            },
                            styles.buttonTextStyles,
                        ]}
                    />
                </View>
                <ScrollView>
                    {category === 'food' ? (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {foodTypesList.map((Svg: any, index: number) => {
                                const Item = Svg
                                return (
                                    <View
                                        key={index}
                                        style={
                                            index % 2 === 0
                                                ? styles.EvenItem
                                                : styles.oddItem
                                        }
                                    >
                                        <Svg width={375} height={hp('30%')} />
                                    </View>
                                )
                            })}
                        </View>
                    ) : category === 'travel' ? (
                        <>
                            {travelList.map((ele: Item, index: number) => {
                                const { Svg } = ele

                                return (
                                    <View style={styles.Item} key={index}>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Svg
                                                width={wp('24%')}
                                                height={wp('24%')}
                                            />
                                            <Text style={styles.ItemText}>
                                                {ele.name}
                                            </Text>
                                        </View>

                                        <Pressable
                                            onPress={() =>
                                                this.onPressCheckItem(
                                                    'travel',
                                                    index
                                                )
                                            }
                                        >
                                            {ele.checked ? (
                                                <CheckedSvg
                                                    width={wp('6.5%')}
                                                    height={wp('6.5%')}
                                                />
                                            ) : (
                                                <UncheckedSvg
                                                    width={wp('6.5%')}
                                                    height={wp('6.5%')}
                                                />
                                            )}
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            {shoppingList.map((ele: Item, index: number) => {
                                const { Svg } = ele
                                return (
                                    <View style={styles.Item} key={index}>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Svg
                                                width={wp('24%')}
                                                height={wp('24%')}
                                            />
                                            <Text style={styles.ItemText}>
                                                {ele.name}
                                            </Text>
                                        </View>
                                        <Pressable
                                            onPress={() =>
                                                this.onPressCheckItem(
                                                    'shopping',
                                                    index
                                                )
                                            }
                                        >
                                            {ele.checked ? (
                                                <CheckedSvg
                                                    width={wp('6.5%')}
                                                    height={wp('6.5%')}
                                                />
                                            ) : (
                                                <UncheckedSvg
                                                    width={wp('6.5%')}
                                                    height={wp('6.5%')}
                                                />
                                            )}
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </>
                    )}
                </ScrollView>

                <CustomButton
                    onPressButton={this.onPressNext}
                    title="Next"
                    buttonStyles={{
                        display: 'flex',
                        width: '100%',
                    }}
                    buttonTextStyles={[
                        { fontFamily: 'ArchivoBold', fontSize: hp('2%') },
                    ]}
                />
            </SafeAreaView>
        )
    }
}
export default PickYourChoice
