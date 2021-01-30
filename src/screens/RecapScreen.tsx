// react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// react-native-snap-carousel
import Carousel, { Pagination } from 'react-native-snap-carousel'
//icons
import {
    NavigationIcon,
    BackIcon,
} from '../../assets/svgs/icons/icons-directions'
import { Rating, ClockIcon, RightArrow } from '../../assets/svgs/icons'
// colors
import { colors } from '../lib/colors'
// endpoints
import { FAVORITE_RESTAURANTS, FAVORITE_TRAVELPLACES } from '../lib/endpoints'
// services
import RestaurantService from '../services/restaurants.service'
import ShoppingMallService from '../services/shoppingmall.service'
import TravelService from '../services/travel.service'

interface IProps {
    navigation: any
    route: any
}
// divisioning of the screen
interface ICategoryType {
    trendsList: Array<any>
    localFavouritesList: Array<any>
    recapList: Array<any>
    hallOfFame: Array<any>
}
// state - data
interface Istate {
    category: string
    categoryData: Array<{ isDatafetched: boolean; data: ICategoryType }>
    activeIndex: number
}

const colorsList = [
    '#FFEA75',
    '#FFE8E7',
    '#C3F4FF',
    '#E2F0FF',
    '#FFE2F5',
    '#E1E2FF',
    '#FFE5B2',
]
// data
const content = {
    // first division - trends list data
    trendsList: [
        {
            title: 'restaurant1',
            description: 'dish1',
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        },
        {
            title: 'restaurant2',
            description: 'dish2',
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        },
        {
            title: 'restaurant3',
            description: 'dish3',
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        },
    ],
    // second division - local favourites data
    localFavouritesList: [
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'Burgers',
            companyName: 'King Bakers',
            rating: 4.8,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'Burgers',
            companyName: 'King Bakers',
            rating: 4.8,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'Burgers',
            companyName: 'King Bakers',
            rating: 4.8,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'Burgers',
            companyName: 'King Bakers',
            rating: 4.8,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'Burgers',
            companyName: 'King Bakers',
            rating: 4.8,
        },
    ],
    // third division - recap data
    recapList: [
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'KFC',
            location: '882 Swift Courts Apt',
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'KFC',
            location: '882 Swift Courts Apt',
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
        {
            image:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            name: 'KFC',
            location: '882 Swift Courts Apt',
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
    ],
    // fourth division - hall of fame data
    hallOfFame: [
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
    ],
}
// Main class component

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
class Recap extends Component<IProps, Istate> {
    carousel: any
    constructor(props: IProps) {
        super(props)
        this.state = {
            category: 'food',
            categoryData: [
                {
                    isDatafetched: false,
                    data: {
                        trendsList: [],
                        localFavouritesList: [],
                        recapList: [],
                        hallOfFame: [],
                    },
                },
                {
                    isDatafetched: false,
                    data: {
                        trendsList: [],
                        localFavouritesList: [],
                        recapList: [],
                        hallOfFame: [],
                    },
                },
                {
                    isDatafetched: false,
                    data: {
                        trendsList: [],
                        localFavouritesList: [],
                        recapList: [],
                        hallOfFame: [],
                    },
                },
            ],
            activeIndex: 0,
        }
    }
    async componentDidMount() {
        try {
            const response = await restaurantService.pusher(
                FAVORITE_RESTAURANTS,
                {
                    username: 'dorababu',
                }
            )
            console.log(response, 'respose')
            let data = { ...this.state }
            data.categoryData[0].isDatafetched = true
            data.categoryData[0].data.localFavouritesList = response.results
            console.log(
                data.categoryData[0].data.localFavouritesList,
                'restaurants'
            )
            this.setState({ ...data })
        } catch {
            alert('something went wrong')
        }
    }

    getActiveIndex = () => {
        const { category } = this.state
        if (category === 'food') return 0
        else if (category === 'travel') return 1
        else if (category === 'shopping') return 2
        else return 0
    }

    getSelectedCategoryData = async (type: string) => {
        let url
        let service: any
        let index = 0
        let stateData = { ...this.state }
        if (type === 'travel') {
            url = FAVORITE_TRAVELPLACES
            service = travelService
            index = 1
            stateData.category = 'travel'
        } else if (type === 'shopping') {
            url = FAVORITE_TRAVELPLACES
            service = shoppingService
            index = 2
            stateData.category = 'shopping'
        }
        if (type !== 'food' && !this.state.categoryData[index].isDatafetched) {
            console.log('getSelectedCategory function calling')
            try {
                const response = await service!.pusher(url, {
                    username: 'dorababu',
                })
                console.log(response, 'in outside function')
                stateData.categoryData[index].isDatafetched = true

                if (response.results.length > 0) {
                    stateData.categoryData[
                        this.getActiveIndex()
                    ].data = response
                }

                this.setState(stateData)
            } catch (error) {
                alert('something wrong')
            }
        }
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View style={[styles.TitleContainer]}>
                        <Text style={styles.frappyText}>Recap</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginBottom: wp('15%'),
                        }}
                    >
                        {this.state.categoryData[this.getActiveIndex()].data &&
                            this.state.categoryData[
                                this.getActiveIndex()
                            ].data.recapList.map((ele, index) => {
                                const {
                                    name,
                                    location,
                                    averageRatings,
                                    numberOfRatings,
                                } = ele
                                return (
                                    <View key={index}>
                                        <View
                                            style={styles.recapItemContaineer}
                                        >
                                            <Image
                                                source={{
                                                    uri: ele.image,
                                                }}
                                                style={styles.recapImage}
                                            />
                                            <View
                                                style={{
                                                    flex: 1,
                                                    padding: wp('5%'),
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            'ArchivoRegular',
                                                        fontSize: wp('4.2%'),
                                                        color: colors.darkBlack,
                                                    }}
                                                >
                                                    {name}
                                                </Text>
                                                <Text
                                                    style={styles.recapCardText}
                                                >
                                                    {location}
                                                </Text>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <Rating
                                                        width={wp('4.2')}
                                                        height={wp('4.2')}
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.recapCardText,
                                                            {
                                                                marginLeft: wp(
                                                                    '2%'
                                                                ),
                                                            },
                                                        ]}
                                                    >
                                                        {averageRatings}(
                                                        {numberOfRatings}{' '}
                                                        ratings)
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    alignSelf: 'flex-end',
                                                }}
                                            >
                                                <NavigationIcon
                                                    width={wp('7.8%')}
                                                    height={hp('3.68%')}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor:
                                                    colors.lightGreyTwo,
                                            }}
                                        ></View>
                                    </View>
                                )
                            })}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    TitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: wp('5%'),
    },
    frappyText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.5%'),
    },
    mainContainer: {
        display: 'flex',
        padding: '2%',
        // paddingTop: hp('2%'),
        // backgroundColor: colors.white,
    },
    heading: {
        display: 'flex',
        paddingTop: hp('2%'),
        paddingBottom: hp('2.10%'),
        paddingLeft: wp('7.46%'),
        paddingRight: wp('5.33%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'cyan',
    },
    backicon: {
        // paddingLeft: wp('7.44%'),
        paddingTop: hp('1.2%'),
        // paddingRight: wp('15.46%'),
    },
    title: {
        fontFamily: 'ArchivoBold',
        fontSize: wp('5%'),
        // paddingTop: hp('2%'),
        // justifyContent: 'center',
        // paddingLeft: wp('6%'),
    },
    recapImage: {
        width: wp('30%'),
        height: wp('30%'),
    },
    recapItemContaineer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: wp('5%'),
    },
    recapCardText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('3.8%'),
        color: colors.lightGreyThree,
    },
})

export default Recap
