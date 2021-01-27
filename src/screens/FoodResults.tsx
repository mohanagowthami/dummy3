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
import { Rating, ClockIcon } from '../../assets/svgs/icons'
// colors
import { colors } from '../lib/colors'

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
    keyWord: string
    categoryData: IDetailsType
    activeIndex: number
    resultsCount: number
}
// data
const details = {
    profileDetails: [
        {
            name: 'Rohit Sharma',
            image:
                'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            place: 'Hyderabad',
        },
    ],
    results: [
        {
            name: 'Saleem',
            type: 'Biryani',
            address: 'Opposite VIT',
            place: 'Vellore',
            time: 25,
            rating: 4.3,
            noOfratings: '200+',
            photo1:
                'https://media.istockphoto.com/photos/indian-chicken-biryani-served-in-a-terracotta-bowl-with-yogurt-over-picture-id979891994?k=6&m=979891994&s=612x612&w=0&h=AZUYF4BdDzWeZ6q2puAzcqD0miXvAct42o7Hgump6ZA=',
            photo2: '',
            photp3: '',
            photo4: '',
        },
        {
            name: "McDonald's",
            type: 'Chinese',
            place: 'Hyderabad',
            time: 25,
            rating: 4.3,
            noOfratings: '200+',
            photo1:
                'https://media.istockphoto.com/photos/authentic-chicken-biryani-with-onion-raita-picture-id516401834?k=6&m=516401834&s=612x612&w=0&h=GUFCrtpi_MEWzt5RUvBh6v2jsG127n8LG2FyU9IYbbs=',
            photo2: '',
            photp3: '',
            photo4: '',
        },
        {
            name: "McDonald's",
            type: 'Chinese',
            place: 'Hyderabad',
            time: 25,
            rating: 4.3,
            noOfratings: '200+',
            photo1:
                'https://media.istockphoto.com/photos/fish-biryani-with-basmati-rice-indian-food-picture-id488481490?k=6&m=488481490&s=612x612&w=0&h=J8lIVq-5pPU-ta0BRZPaHY3WVXf6nbSJqAW9E2J-qDs=',
            photo2: '',
            photp3: '',
            photo4: '',
        },
        {
            name: "McDonald's",
            type: 'Chinese',
            place: 'Hyderabad',
            time: 25,
            rating: 4.3,
            noOfratings: '200+',
            photo1:
                'https://media.istockphoto.com/photos/mutton-gosht-biryani-picture-id469866881?k=6&m=469866881&s=612x612&w=0&h=XjVN6-kyp9WLgEJaRqqLyvP5ve-kS5e6Y5Bfl-jaSXs=',
            photo2: '',
            photp3: '',
            photo4: '',
        },
    ],
}

class FoodSearchResults extends Component<IProps, Istate> {
    carousel: any
    constructor(props: IProps) {
        super(props)
        this.state = {
            keyWord: 'Biryani',
            categoryData: details,
            activeIndex: 0,
            resultsCount: 80,
        }
    }

    heading = () => {
        return (
            <>
                <View style={styles.backicon}>
                    <Pressable
                        onPress={() => this.props.navigation.navigate('home')}
                    >
                        <BackIcon width={wp('3.13%')} height={hp('2.84%')} />
                    </Pressable>
                </View>
                <Text style={styles.title}>{this.state.keyWord}</Text>
                <Text style={[styles.filter, { paddingTop: hp('0.4%') }]}>
                    Filter
                </Text>
            </>
        )
    }
    _renderItem({ item, index }: any) {
        return (
            <View style={styles.renderItemsContainer}>
                <Image
                    style={styles.sliderImage}
                    source={{
                        uri: item.photo1,
                    }}
                />
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        position: 'absolute',
                        marginTop: wp('37%'),
                        marginLeft: wp('62%'),
                    }}
                >
                    {this.pagination}
                </View>
            </View>
        )
    }
    get pagination() {
        const { activeIndex, categoryData } = this.state
        // const index = this.getActiveIndex()
        return (
            <Pagination
                dotsLength={categoryData.results.length}
                activeDotIndex={activeIndex}
                inactiveDotStyle={{
                    width: wp('2.13%'),
                    height: wp('1.33%'),
                    borderRadius: wp('0.6667%'),
                    marginHorizontal: -1,
                    backgroundColor: colors.white,
                    borderColor: colors.white,
                    // borderWidth: 1,
                }}
                inactiveDotOpacity={0.3}
                inactiveDotScale={1}
                dotStyle={{
                    width: wp('2.13%'),
                    height: wp('1.33%'),
                    borderRadius: wp('0.6667%'),
                    marginHorizontal: -1,
                    backgroundColor: colors.white,
                }}
            />
        )
    }
    renderResults = () => {
        return (
            <>
                <Carousel
                    layout={'default'}
                    ref={(ref: any) => (this.carousel = ref)}
                    data={this.state.categoryData.results}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('100%')}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={(index: number) => {
                        this.setState({
                            ...this.state,
                            activeIndex: index,
                        })
                    }}
                />
                <View style={{ paddingLeft: wp('6.67%') }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                fontSize: wp('5.33%'),
                                color: colors.namecolor,
                            }}
                        >
                            {/* {item.name} */}Saleem
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingTop: hp('0.789%'),
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                fontSize: wp('4.26%'),
                                color: colors.grey,
                            }}
                        >
                            {/* {item.type} */} Biryani
                        </Text>
                        <View
                            style={{
                                width: wp('1.066%'),
                                height: wp('1.066%'),
                                marginLeft: wp('2.66%'),
                                marginRight: hp('1.31%'),
                                alignSelf: 'center',
                                borderRadius: wp('0.503%'),
                                backgroundColor: colors.grey,
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                fontSize: wp('4.26%'),
                                color: colors.grey,
                            }}
                        >
                            {/* {item.address} */} Opposite VIT
                        </Text>
                        <View
                            style={{
                                width: wp('1.066%'),
                                height: wp('1.066%'),
                                marginLeft: wp('2.66%'),
                                marginRight: hp('1.31%'),
                                alignSelf: 'center',
                                borderRadius: wp('0.503%'),
                                backgroundColor: colors.grey,
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                fontSize: wp('4.26%'),
                                color: colors.grey,
                            }}
                        >
                            {/* {item.place} */} Vellore
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'row-reverse',
                                paddingLeft: wp('7.2%'),
                            }}
                        >
                            <NavigationIcon
                                width={wp('7.46%')}
                                height={hp('3.68%')}
                            />
                        </View>
                    </View>
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingTop: hp('0.789%'),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'ArchivoRegular',
                                    fontSize: wp('3.2%'),
                                    color: colors.namecolor,
                                    paddingLeft: wp('1.33%'),
                                    paddingRight: wp('2.984%'),
                                }}
                            >
                                {/* {item.rating} */} 4.3
                            </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    alignSelf: 'center',
                                    paddingRight: wp('2.184%'),
                                }}
                            >
                                <Rating
                                    width={wp('3.096%')}
                                    height={hp('1.461%')}
                                />
                            </View>
                            <Text
                                style={{
                                    fontFamily: 'ArchivoRegular',
                                    fontSize: wp('3.2%'),
                                    color: colors.namecolor,
                                    paddingRight: wp('7.808%'),
                                }}
                            >
                                {/* {item.noOfratings} Ratings */} 200+ Ratings
                            </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    alignSelf: 'center',
                                    paddingRight: wp('2.184%'),
                                }}
                            >
                                <ClockIcon
                                    width={wp('3.096%')}
                                    height={hp('1.461%')}
                                />
                            </View>
                            <Text
                                style={{
                                    fontFamily: 'ArchivoRegular',
                                    fontSize: wp('3.2%'),
                                    color: colors.namecolor,
                                }}
                            >
                                {/* {item.time} min */}25 min
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.heading}>{this.heading()}</View>
                <View>
                    <Text style={styles.searchCount}>
                        {this.state.resultsCount} Results found
                    </Text>
                </View>
                <View>{this.renderResults()}</View>
                <View>{this.renderResults()}</View>
                <View>{this.renderResults()}</View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        paddingTop: hp('2%'),
        backgroundColor: colors.white,
    },
    heading: {
        display: 'flex',
        paddingTop: hp('2%'),
        paddingBottom: hp('2.10%'),
        paddingLeft: wp('7.46%'),
        paddingRight: wp('5.33%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: wp('0.150%'),
        borderBottomColor: colors.borderbottomcolor,
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
    filter: {
        fontFamily: 'AirbnbCerealBook',
        fontSize: wp('4.26%'),
        color: colors.namecolor,
    },
    searchCount: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('5.33%'),
        paddingTop: wp('3.15%'),
        paddingLeft: wp('5.33%'),
        paddingBottom: hp('2.63%'),
        color: colors.greyishBlack,
    },
    renderItemsContainer: {
        // padding: wp('5%'),
        display: 'flex',
        // flex: 1,
        flexDirection: 'column',
        paddingTop: hp('2.5%'),
        paddingLeft: wp('5.33%'),
        paddingRight: wp('5.33%'),
        // justifyContent: 'space-between',
        // height: wp('34%'),
        // alignItems: 'center',
    },
    sliderImage: {
        width: wp('89.33%'),
        height: wp('44.34%'),
        borderRadius: wp('3%'),
    },
})

export default FoodSearchResults
