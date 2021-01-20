import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {
    BellIcon,
    NavigationIcon,
    Rating,
    RightArrow,
    SearchIcon,
} from '../../assets/svgs'
import CustomButton from '../components/common/CustomButton'
import CustomTextField from '../components/common/CustomTextField'
import { colors } from '../lib/colors'

interface IProps {}

interface ICategoryType {
    trendsList: Array<any>
    localFavouritesList: Array<any>
    recapList: Array<any>
    hallOfFame: Array<any>
}
interface Istate {
    category: string
    categoryData: ICategoryType
    activeIndex: number
}

const foodContent = {
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
    hallOfFame: [
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
    ],
}
class HomeScreen extends Component<IProps, Istate> {
    carousel: any
    constructor(props: IProps) {
        super(props)
        this.state = {
            category: 'food',
            categoryData: foodContent,
            activeIndex: 0,
        }
    }

    onPressButton = (type: string) => {
        this.setState({
            category: type,
        })
    }

    _renderItem({ item, index }: any) {
        return (
            <View style={styles.renderItemContainer}>
                <View
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Text
                        style={{
                            display: 'flex',
                            fontFamily: 'ArchivoBold',
                            fontSize: wp('5%'),
                            color: colors.darkBlack,
                        }}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            display: 'flex',
                            fontFamily: 'ArchivoRegular',
                            fontSize: wp('5%'),
                            color: colors.grey,
                        }}
                    >
                        {item.description}
                    </Text>
                    <NavigationIcon width={wp('7.8')} height={wp('7.8%')} />
                </View>

                <Image
                    style={styles.sliderImage}
                    source={{
                        uri: item.image,
                    }}
                />
            </View>
        )
    }

    get pagination() {
        const { activeIndex, categoryData } = this.state

        return (
            <Pagination
                dotsLength={categoryData.trendsList.length}
                activeDotIndex={activeIndex}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: colors.white,
                    borderColor: colors.orange,
                    borderWidth: 1,
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                dotStyle={{
                    width: wp('4%'),
                    height: wp('2%'),
                    borderRadius: wp('1%'),
                    marginHorizontal: 0,
                    backgroundColor: colors.orange,
                }}
            />
        )
    }

    renderTrendsSlider = () => {
        return (
            <>
                <Carousel
                    layout={'default'}
                    ref={(ref: any) => (this.carousel = ref)}
                    data={this.state.categoryData.trendsList}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('100%')}
                    renderItem={this._renderItem}
                    loop={true}
                    onSnapToItem={(index: number) => {
                        this.setState({
                            ...this.state,
                            activeIndex: index,
                        })
                    }}
                />
                {this.pagination}
            </>
        )
    }

    renderLocalFavourities = () => {
        return (
            <ScrollView horizontal={true}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.state.categoryData.localFavouritesList.map(
                        (item, index) => {
                            const { image, name, companyName, rating } = item
                            return (
                                <View
                                    style={{
                                        paddingVertical: wp('6%'),
                                        width: wp('55%'),
                                        height: wp('60%'),
                                        backgroundColor: colors.lightPink,
                                        borderRadius: wp('3%'),
                                        marginRight: wp('5%'),
                                        paddingHorizontal: wp('5%'),
                                        flex: 1,
                                    }}
                                    key={index}
                                >
                                    <Image
                                        source={{
                                            uri: image,
                                        }}
                                        style={{
                                            width: '50%',
                                            height: '50%',
                                            display: 'flex',
                                            alignSelf: 'center',
                                        }}
                                    />
                                    <View
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            flex: 1,
                                            marginTop: wp('4%'),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'ArchivoBold',
                                                fontSize: wp('4.8%'),
                                                color: colors.darkBlack,
                                            }}
                                        >
                                            {name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'ArchivoRegular',
                                                fontSize: wp('3.8%'),
                                                color: colors.orange,
                                            }}
                                        >
                                            {companyName}
                                        </Text>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Rating />
                                                <Text
                                                    style={{
                                                        marginLeft: wp('2%'),
                                                    }}
                                                >
                                                    {rating}
                                                </Text>
                                            </View>
                                            <NavigationIcon
                                                width={wp('7.8%')}
                                                height={wp('7.8%')}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    )}
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.frappyText}>Frappy morning</Text>
                        <BellIcon width={wp('6%')} height={wp('6%')} />
                    </View>
                    <Text style={styles.userName}>User name</Text>
                    <View style={styles.searchButton}>
                        <SearchIcon width={wp('5%')} height={wp('5%')} />
                        <TextInput
                            placeholder="Explore spots near you"
                            style={styles.searchInput}
                        />
                    </View>
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
                    {this.renderTrendsSlider()}
                    <View
                        style={[
                            styles.TitleContainer,
                            { marginTop: 0, marginBottom: wp('6%') },
                        ]}
                    >
                        <Text style={styles.frappyText}>Local Favourites</Text>
                        <View style={styles.sectionHeaderWrapper}>
                            <Text style={styles.showAllText}>Show all</Text>
                            <RightArrow />
                        </View>
                    </View>
                    {this.renderLocalFavourities()}
                    <View style={[styles.TitleContainer]}>
                        <Text style={styles.frappyText}>Recap</Text>
                        <View style={styles.sectionHeaderWrapper}>
                            <Text style={styles.showAllText}>Show all</Text>
                            <RightArrow />
                        </View>
                    </View>
                    <View>
                        <View>
                            {this.state.categoryData.recapList.map(
                                (ele, index) => {
                                    const {
                                        name,
                                        location,
                                        averageRatings,
                                        numberOfRatings,
                                    } = ele
                                    return (
                                        <>
                                            <View
                                                key={index}
                                                style={
                                                    styles.recapItemContaineer
                                                }
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
                                                            fontSize: wp(
                                                                '4.2%'
                                                            ),
                                                            color:
                                                                colors.darkBlack,
                                                        }}
                                                    >
                                                        {name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.recapCardText
                                                        }
                                                    >
                                                        {location}
                                                    </Text>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
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
                                                        height={wp('7.8%')}
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
                                        </>
                                    )
                                }
                            )}
                        </View>
                    </View>

                    <View style={[styles.TitleContainer]}>
                        <Text style={styles.frappyText}>Hall of Fame</Text>
                        <View style={styles.sectionHeaderWrapper}>
                            <Text style={styles.showAllText}>Show all</Text>
                            <RightArrow />
                        </View>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: wp('15%'),
                        }}
                    >
                        {this.state.categoryData.hallOfFame.map(
                            (item, index) => {
                                return (
                                    <View key={index}>
                                        <Image
                                            style={styles.hallOfFameImage}
                                            source={{
                                                uri: item,
                                            }}
                                        />
                                    </View>
                                )
                            }
                        )}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default HomeScreen
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
    container: {
        padding: '5%',
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
    },
    userName: {
        fontFamily: 'ArchivoRegular',
        color: colors.grey,
        fontSize: wp('4%'),
        marginVertical: wp('4%'),
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: '2%',
        backgroundColor: colors.lightGrey,
        borderRadius: wp('3%'),
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: wp('3%'),
        fontSize: wp('4%'),
        fontFamily: 'ArchivoRegular',
        color: colors.grey,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallButton: {
        width: wp('27%'),
        borderRadius: wp('3.3%'),
        marginTop: wp('5.3%'),
        paddingVertical: wp('2.5%'),
    },
    buttonTitle: {
        fontFamily: 'AirbnbCerealBold',
        fontSize: wp('4%'),
        lineHeight: wp('5%'),
    },
    buttonTextStyles: {
        fontFamily: 'AirbnbCerealBook',
        fontSize: wp('4%'),
        lineHeight: wp('5%'),
    },
    sliderImage: {
        marginRight: wp('9%'),
        width: wp('25%'),
        height: wp('25%'),
    },
    renderItemContainer: {
        padding: wp('5%'),
        display: 'flex',
        flexDirection: 'row',
        borderRadius: wp('3%'),
        backgroundColor: colors.lightPink,
        justifyContent: 'space-between',
        height: wp('34%'),
        alignItems: 'center',
    },
    showAllText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4%'),
        lineHeight: wp('5.7%'),
        color: colors.darkBlack,
        marginRight: wp('2%'),
    },
    sectionHeaderWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hallOfFameImage: {
        width: wp('25%'),
        height: wp('25%'),
        marginRight: wp('5%'),
        marginTop: wp('5%'),
        borderRadius: wp('5%'),
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
