// react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    SafeAreaView,
    Image,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// icons
import { CheckedSvg, UncheckedSvg } from '../../assets/svgs/icons/index'
// components
import CustomButton from '../components/buttons/CustomButton'
// colors
import { colors } from '../lib/colors'
// service
import FavoriteService from '../services/favorites.service'
// endpoints
import { FAVORITES } from '../lib/endpoints'

// food images
const southindian = require('../../assets/images/pickyourchoice/food/southindian.png')
const northindian = require('../../assets/images/pickyourchoice/food/northindian.png')
const chinese = require('../../assets/images/pickyourchoice/food/chinese.png')
const continental = require('../../assets/images/pickyourchoice/food/continental.png')
const bakery = require('../../assets/images/pickyourchoice/food/bakery.png')
const localdelicacies = require('../../assets/images/pickyourchoice/food/localdelicacies.png')

//travel images
const sightseeing = require('../../assets/images/pickyourchoice/travel/sightseeing.png')
const hangouts = require('../../assets/images/pickyourchoice/travel/hangouts.png')
const adventure = require('../../assets/images/pickyourchoice/travel/adventure.png')
const worship = require('../../assets/images/pickyourchoice/travel/worship.png')

//shopping images
const malls = require('../../assets/images/pickyourchoice/shopping/malls.png')
const localmarkets = require('../../assets/images/pickyourchoice/shopping/localmarkets.png')
const handicrafts = require('../../assets/images/pickyourchoice/shopping/handicraft.png')

interface IProps {
    navigation: any
}
interface Item {
    name: string
    checked: boolean
    Svg?: any
}

interface IState {
    category: string
    travelList: Array<Item>
    shoppingList: Array<Item>
    foodTypesList: Array<Item>
    isLoading: boolean
}

export const travelList = [
    {
        name: 'Sight Seeing',
        checked: false,
        Svg: sightseeing,
    },
    {
        name: 'Hangouts',
        checked: false,
        Svg: hangouts,
    },
    {
        name: 'Adventure',
        checked: false,
        Svg: adventure,
    },
    {
        name: 'Worship',
        checked: false,
        Svg: worship,
    },
]

export const foodTypesList = [
    {
        Svg: southindian,
        name: 'South Indian',
        checked: false,
    },
    {
        Svg: northindian,
        name: 'North Indian',
        checked: false,
    },
    {
        Svg: chinese,
        name: 'Chinese',
        checked: false,
    },
    {
        Svg: continental,
        name: 'Continental',
        checked: false,
    },
    {
        Svg: bakery,
        name: 'Bakery',
        checked: false,
    },
    {
        Svg: localdelicacies,
        name: 'Local Delicacies',
        checked: false,
    },
]

export const shoppingList = [
    { Svg: malls, name: 'Malls', checked: false },
    { Svg: localmarkets, name: 'Local Markets', checked: false },
    { Svg: handicrafts, name: 'Handicrafts', checked: false },
]

const favoriteService = new FavoriteService()
class PickYourChoice extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            category: 'food',
            travelList: travelList,
            shoppingList: shoppingList,
            foodTypesList: foodTypesList,
            isLoading: false,
        }
    }

    onPressButton = (type: string) => {
        this.setState({ ...this.state, category: type })
    }

    filterByChecked = (list: any) => {
        let filteredList: any = []
        list.forEach((element: any) => {
            if (element.checked) filteredList.push(element.name)
        })
        return filteredList
    }

    onPressNext = async () => {
        const { category } = this.state
        if (category === 'food')
            this.setState({ ...this.state, category: 'travel' })
        else if (category === 'travel')
            this.setState({ ...this.state, category: 'shopping' })
        else {
            this.setState({
                ...this.state,
                isLoading: true,
            })
            const selectedTravelist = this.filterByChecked(
                this.state.travelList
            )
            const selectedFoodList = this.filterByChecked(
                this.state.foodTypesList
            )
            const selectedShoppingList = this.filterByChecked(
                this.state.shoppingList
            )
            const response = await favoriteService.pusher(FAVORITES, {
                username: 'dorababu',
                food_category: selectedFoodList,
                travel_category: selectedTravelist,
                shopping_category: selectedShoppingList,
            })
            console.log(response, 'response')
            if (response)
                this.props.navigation.navigate('bottomTab', {
                    screen: 'home',
                    params: {
                        food_category: selectedFoodList,
                        travel_category: selectedTravelist,
                        shopping_category: selectedShoppingList,
                    },
                })
        }
    }
    onPressCheckItem = (type: string, index: number) => {
        let mutatedState = { ...this.state }
        if (type === 'travel') {
            mutatedState.travelList[index].checked = !mutatedState.travelList[
                index
            ].checked
        } else if (type === 'food') {
            mutatedState.foodTypesList[index].checked = !mutatedState
                .foodTypesList[index].checked
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
                fontFamily: 'ArchivoRegular',
                // fontWeight: '400',
                fontWeight: 'normal',
                fontSize: wp('6%'),
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
                borderRadius: wp('5.6%'), //3.3%
                marginTop: wp('5.3%'),
                paddingVertical: wp('3.5%'),
                borderWidth: wp('0.3%'),
            },
            buttonTitle: {
                fontFamily: 'AirbnbCerealBold',
                fontSize: wp('4%'),
                lineHeight: wp('5%'),
            },
            TravelListContainer: {
                display: 'flex',
                flex: 1,
                backgroundColor: colors.white,
            },
            Item: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: wp('3%'),
            },
            ItemText: {
                color: colors.grey,
                fontSize: wp('4.8%'),
                lineHeight: hp('3.2%'),
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
            overlay: {
                flex: 1,
            },
        })
        const { category, travelList, shoppingList, isLoading } = this.state

        return (
            <>
                {isLoading ? (
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <ActivityIndicator size="large" color={colors.grey} />
                    </View>
                ) : (
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            paddingTop: hp('3.15%'),
                            backgroundColor: colors.white,
                        }}
                    >
                        <SafeAreaView style={styles.container}>
                            {/* Title for pick your choice */}
                            <Text style={styles.titleText}>
                                {this.state.category === 'food'
                                    ? 'Gourmet'
                                    : this.state.category === 'travel'
                                    ? 'Explore'
                                    : 'Memories'}
                            </Text>
                            {/* Choice */}
                            <View style={styles.buttonsContainer}>
                                <CustomButton
                                    onPressButton={() =>
                                        this.onPressButton('food')
                                    }
                                    title="Food"
                                    buttonStyles={[
                                        styles.smallButton,
                                        {
                                            backgroundColor:
                                                this.state.category !== 'food'
                                                    ? 'rgba(255,108,101,0.2)'
                                                    : colors.orange,

                                            borderColor: colors.orange,
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
                                    onPressButton={() =>
                                        this.onPressButton('travel')
                                    }
                                    title="Travel"
                                    buttonStyles={[
                                        styles.smallButton,
                                        {
                                            backgroundColor:
                                                this.state.category !== 'travel'
                                                    ? 'rgba(253,210,106,0.2)'
                                                    : colors.yellow,

                                            borderColor: colors.yellow,
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
                                    onPressButton={() =>
                                        this.onPressButton('shopping')
                                    }
                                    title="Shopping"
                                    buttonStyles={[
                                        styles.smallButton,
                                        {
                                            backgroundColor:
                                                this.state.category !==
                                                'shopping'
                                                    ? 'rgba(102,197,218,0.3)'
                                                    : colors.skyBlue,

                                            borderColor: colors.skyBlue,
                                        },
                                    ]}
                                    buttonTextStyles={[
                                        {
                                            color:
                                                this.state.category !==
                                                'shopping'
                                                    ? colors.skyBlue
                                                    : colors.white,
                                        },
                                        styles.buttonTextStyles,
                                    ]}
                                />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {category === 'food' ? (
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        {this.state.foodTypesList.map(
                                            (element: any, index: number) => {
                                                const { Svg, name } = element
                                                return (
                                                    <Pressable
                                                        key={index}
                                                        onPress={() =>
                                                            this.onPressCheckItem(
                                                                'food',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <View
                                                            style={{
                                                                borderWidth: wp(
                                                                    '1%'
                                                                ),
                                                                borderColor: this
                                                                    .state
                                                                    .foodTypesList[
                                                                    index
                                                                ].checked
                                                                    ? colors.darkyellow
                                                                    : colors.white,
                                                                marginBottom: hp(
                                                                    '2%'
                                                                ),
                                                                borderRadius: wp(
                                                                    '2%'
                                                                ),
                                                            }}
                                                        >
                                                            <ImageBackground
                                                                style={{
                                                                    // borderRadius: wp('50%'),
                                                                    width: wp(
                                                                        '44%'
                                                                    ),
                                                                    height: hp(
                                                                        '23%'
                                                                    ),
                                                                }}
                                                                source={Svg}
                                                                resizeMode="cover"
                                                            >
                                                                <View
                                                                    style={{
                                                                        flex: 1,
                                                                        display:
                                                                            'flex',
                                                                        flexDirection:
                                                                            'row',
                                                                        alignItems:
                                                                            'flex-end',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            color:
                                                                                colors.white,
                                                                            marginBottom: wp(
                                                                                '5%'
                                                                            ),
                                                                            fontFamily:
                                                                                'ArchivoRegular',
                                                                            fontWeight:
                                                                                '500',
                                                                            fontSize: wp(
                                                                                '4.5%'
                                                                            ),
                                                                        }}
                                                                    >
                                                                        {name}
                                                                    </Text>
                                                                </View>
                                                            </ImageBackground>
                                                        </View>
                                                    </Pressable>
                                                )
                                            }
                                        )}
                                    </View>
                                ) : category === 'travel' ? (
                                    <View style={styles.TravelListContainer}>
                                        {travelList.map(
                                            (ele: Item, index: number) => {
                                                const { Svg } = ele

                                                return (
                                                    <View
                                                        style={styles.Item}
                                                        key={index}
                                                    >
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'row',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <Image
                                                                source={Svg}
                                                            />
                                                            {/* <Svg
                                                    width={wp('24%')}
                                                    height={wp('24%')}
                                                /> */}
                                                            <Text
                                                                style={
                                                                    styles.ItemText
                                                                }
                                                            >
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
                                                                <CheckedSvg />
                                                            ) : (
                                                                <UncheckedSvg />
                                                            )}
                                                        </Pressable>
                                                    </View>
                                                )
                                            }
                                        )}
                                    </View>
                                ) : (
                                    <View style={styles.TravelListContainer}>
                                        {shoppingList.map(
                                            (ele: Item, index: number) => {
                                                const { Svg } = ele
                                                return (
                                                    <View
                                                        style={styles.Item}
                                                        key={index}
                                                    >
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'row',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <Image
                                                                source={Svg}
                                                            />
                                                            {/* <Svg
                                                        width={wp('24%')}
                                                        height={wp('24%')}
                                                    /> */}
                                                            <Text
                                                                style={
                                                                    styles.ItemText
                                                                }
                                                            >
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
                                                                <CheckedSvg />
                                                            ) : (
                                                                <UncheckedSvg />
                                                            )}
                                                        </Pressable>
                                                    </View>
                                                )
                                            }
                                        )}
                                    </View>
                                )}
                            </ScrollView>

                            <CustomButton
                                onPressButton={this.onPressNext}
                                title="Next"
                                buttonStyles={{
                                    display: 'flex',
                                    width: '100%',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                }}
                                buttonTextStyles={[
                                    {
                                        fontFamily: 'ArchivoBold',
                                        fontSize: wp('4%'),
                                    },
                                ]}
                            />
                        </SafeAreaView>
                    </View>
                )}
            </>
        )
    }
}
export default PickYourChoice
