// react
import React, { Component } from 'react'
// react-native
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// icons
import {
    BookmarkIcon,
    PhotoIcon,
    RatingIcon,
    ReadMore,
    Loading,
    Profile,
    LoveIcon,
} from '../../assets/svgs/icons'
import { BackIcon, RightArrow } from '../../assets/svgs/icons/icons-directions'
// components
import CustomButton from '../components/buttons/CustomButton'
// colors
import { colors } from '../lib/colors'
// services
import RestaurantService from '../services/restaurants.service'
import UserService from '../services/user.service'

const image1 =
    'https://pattys-cakes.com/wp-content/uploads/2020/11/colorful-rosette-cake-350x350.jpg'
const image2 =
    'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
const image3 =
    'https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg'
interface IProps {
    navigation: any
    route: any
}

interface IListType {
    photos: Array<any>
    ratingAndReview: Array<any>
}
interface Istate {
    category: string
    categoryData: IListType
    activeIndex: number
}
const ItemContent = {
    photos: [
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
        'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
    ],
    ratingAndReview: [
        {
            id: 1,
            photo:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            rating: 4.5,
            address: '03 Kukatpally 291, 4th Phase',
            review:
                'Dummy text is text that is used in the publishing industry or by web designers to occupy.',
            distance: 4.8,
            time: 33,
        },
        {
            id: 2,
            photo:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            rating: 4.5,
            address: '03 Kukatpally 291, 4th Phase',
            review:
                'Dummy text is text that is used in the publishing industry or by web designers to occupy.',
            distance: 4.8,
            time: 33,
        },
        {
            id: 3,
            photo:
                'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
            rating: 4.5,
            address: '03 Kukatpally 291, 4th Phase',
            review:
                'Dummy text is text that is used in the publishing industry or by web designers to occupy.',
            distance: 4.8,
            time: 33,
        },
    ],
}

const restaurantService = new RestaurantService()
const userService = new UserService()
class ItemInDetailScreen extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            category: 'food',
            categoryData: ItemContent,
            activeIndex: 0,
        }
    }
    onPressGetDirections = () => {
        this.props.navigation.navigate('navigation')
    }
    _renderItem({ item, index }: any) {
        return <View></View>
    }
    _renderPhotos({ item, index }: any) {
        return <View></View>
    }
    _renderRatingsAndReviews({ item, index }: any) {
        return <View></View>
    }

    async componentDidMount() {
        // const { id } = this.props.route.params
        let stateData = { ...this.state }
        let accessToken = await userService.getAccessToken()
        let refreshToken = await userService.getRefreshToken()
        console.log(accessToken, refreshToken, 'access,refresh')

        // try {
        //     const response: any = await restaurantService.fetcher(
        //         `${BACKEND_API}api/restaurant/reviews/?restaurant=12`
        //     )
        //     console.log(response, 'response in item in detail')
        //     stateData.categoryData.ratingAndReview = response
        // } catch (error) {
        //     console.log(error, 'error in rating and review in item in detail')
        // }
    }
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.maincontainer}
            >
                {/* Item - back button,image,name,address,time,distance */}
                <View style={{ display: 'flex' }}>
                    <View
                        style={{
                            // display: 'flex',
                            position: 'relative',
                            flexDirection: 'column',
                        }}
                    >
                        <View
                            style={{
                                paddingLeft: wp('5.6%'),
                                paddingTop: hp('6.07%'),
                            }}
                        >
                            <Pressable
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'localFavourites'
                                    )
                                }
                            >
                                <BackIcon
                                    width={wp('2.62%')}
                                    height={hp('2.26%')}
                                />
                            </Pressable>
                            <Image
                                style={[
                                    {
                                        width: wp('35.03%'),
                                        height: wp('35.03%'),
                                        alignSelf: 'center',
                                        borderRadius: wp('17.5%'),
                                    },
                                ]}
                                resizeMode="cover"
                                source={{ uri: image1 }}
                            />
                            <LoveIcon
                                width={wp('7.46%')}
                                height={hp('3.015%')}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={styles.restaurantname}>Baker's King</Text>
                    <View style={styles.addressgetdirectionbutton}>
                        <Text style={styles.address}>
                            03 Kukatpally 291, 4th Phase
                        </Text>
                        <View style={styles.getdirectionbutton}>
                            <CustomButton
                                title="Get Directions"
                                buttonStyles={styles.getdirec}
                                buttonTextStyles={[
                                    {
                                        fontFamily: 'AirbnbCerealBook',
                                        fontSize: wp('3%'),
                                    },
                                ]}
                                onPressButton={this.onPressGetDirections}
                            />
                        </View>
                    </View>
                    <View style={{ display: 'flex' }}>
                        <Text
                            style={{
                                fontFamily: 'AirbnbCerealBook',
                                fontSize: wp('3.466%'),
                                color: '#333A4D',
                            }}
                        >
                            33 min <View style={styles.line} /> 4.8 miles
                        </Text>
                    </View>
                </View>
                {/* grey container,ratings,bookmarks,photos,Description */}
                <View style={styles.greycontainer}>
                    <RatingIcon width={wp('10.13%')} height={hp('5%')} />
                    <View
                        style={{
                            display: 'flex',
                            paddingLeft: wp('2%'),
                            paddingRight: hp('3%'),
                        }}
                    >
                        <Text style={styles.greyboxtext}>4.5</Text>
                        <Text style={styles.greyboxtext}>Ratings</Text>
                    </View>

                    <View style={[styles.line, { height: hp('4.34%') }]} />
                    <BookmarkIcon width={wp('10.13%')} height={hp('5%')} />
                    <View
                        style={{
                            display: 'flex',
                            paddingLeft: wp('2%'),
                            paddingRight: hp('3%'),
                        }}
                    >
                        <Text style={styles.greyboxtext}>137k</Text>
                        <Text style={styles.greyboxtext}>Likes</Text>
                    </View>
                    <View style={[styles.line, { height: hp('4.34%') }]} />
                    <PhotoIcon width={wp('10.13%')} height={hp('5%')} />
                    <View
                        style={{
                            display: 'flex',
                            paddingLeft: wp('2%'),
                            paddingRight: hp('3%'),
                        }}
                    >
                        <Text style={styles.greyboxtext}>346</Text>
                        <Text style={styles.greyboxtext}>Photo</Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    Dummy text is text that is used in the publishing industry
                    or by web designers to occupy the space which will later be
                    filled with 'real' content.{' '}
                </Text>
                {/* Photos container*/}
                <View style={[styles.TitleContainer]}>
                    <Text style={styles.frappyText}>Photos</Text>
                    <View style={styles.sectionHeaderWrapper}>
                        <Text style={styles.showAllText}>Show all</Text>
                        <RightArrow width={wp('1.59%')} height={hp('1.10%')} />
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: wp('1%'),
                        paddingLeft: hp('2%'),
                    }}
                >
                    {this.state.categoryData.photos.map((item, index) => {
                        return (
                            <View key={index}>
                                <Image
                                    resizeMode="cover"
                                    style={styles.hallOfFameImage}
                                    source={{
                                        uri: item,
                                    }}
                                />
                            </View>
                        )
                    })}
                </View>

                {/* Reviews and Ratings Section*/}
                <View
                    style={[
                        styles.TitleContainer,
                        { marginTop: 0, marginBottom: wp('6%') },
                    ]}
                >
                    <Text style={styles.frappyText}>
                        Ratings and Reviews(98)
                    </Text>
                </View>
                <View style={styles.reviewcontainer}>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Image
                            resizeMode="cover"
                            style={{
                                height: hp('6.6%'),
                                width: wp('12.8%'),
                                // borderRadius: wp('50%'),
                            }}
                            source={{ uri: image3 }}
                        />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            // flex: 1,
                            flexDirection: 'column',
                            paddingLeft: wp('2%'),
                            paddingRight: wp('13.066%'),
                        }}
                    >
                        <Text
                            style={[
                                styles.frappyText,
                                { fontSize: wp('4.8%'), fontWeight: '500' },
                            ]}
                        >
                            User Name
                        </Text>
                        <Text
                            style={[
                                styles.address,
                                { paddingBottom: hp('1%') },
                            ]}
                        >
                            November 2020{' '}
                            <View style={[styles.line, { height: hp('3%') }]} />
                            <Text
                                style={{
                                    color: colors.darkorange,
                                }}
                            >
                                {' '}
                                New
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'AirbnbCerealBook',
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                                paddingRight: wp('2%'),
                                // paddingBottom: hp('2.5%'),
                            }}
                        >
                            Dummy text is text that is used in the publishing
                            industry or by web designers to occupy.
                            <Text style={{ color: colors.darkorange }}>
                                {' '}
                                Readmore <ReadMore />
                            </Text>
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.line,
                        {
                            width: wp('89.33%'),
                            height: hp('0.263%'),
                            paddingLeft: wp('5%'),
                            paddingRight: wp('2%'),
                            marginBottom: hp('2%'),
                            marginRight: wp('0%'),
                            alignSelf: 'center',
                        },
                    ]}
                />
                <View style={styles.reviewcontainer}>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Image
                            resizeMode="cover"
                            style={{
                                height: hp('6.6%'),
                                width: wp('12.8%'),
                                // borderRadius: 100,
                            }}
                            source={{ uri: image3 }}
                        />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            // flex: 1,
                            flexDirection: 'column',
                            paddingLeft: wp('2%'),
                            paddingRight: wp('13.066%'),
                        }}
                    >
                        <Text
                            style={[
                                styles.frappyText,
                                { fontSize: wp('4.8%'), fontWeight: '500' },
                            ]}
                        >
                            User Name
                        </Text>
                        <Text
                            style={[
                                styles.address,
                                { paddingBottom: hp('1%') },
                            ]}
                        >
                            November 2020{' '}
                            <View style={[styles.line, { height: hp('3%') }]} />
                            <Text
                                style={{
                                    color: colors.darkorange,
                                }}
                            >
                                {' '}
                                New
                            </Text>
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'AirbnbCerealBook',
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                                paddingRight: wp('2%'),
                                // paddingBottom: hp('2.5%'),
                            }}
                        >
                            Dummy text is text that is used in the publishing
                            industry or by web designers to occupy.
                            <Text style={{ color: colors.darkorange }}>
                                {' '}
                                Readmore <ReadMore />
                            </Text>
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginBottom: wp('1%'),
                                paddingLeft: hp('2%'),
                            }}
                        >
                            {this.state.categoryData.ratingAndReview.map(
                                (item, index) => {
                                    const { id, photo } = item
                                    return (
                                        <View key={index}>
                                            <Image
                                                resizeMode="contain"
                                                style={[
                                                    styles.hallOfFameImage,
                                                    {
                                                        width: wp('11.73%'),
                                                        height: hp('6.78%'),
                                                    },
                                                ]}
                                                source={{
                                                    uri: photo,
                                                }}
                                            />
                                        </View>
                                    )
                                }
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.loadmorecontainer}>
                    <Text style={styles.loadmoretext}>
                        Load More{' '}
                        <View style={{ alignSelf: 'center' }}>
                            <Loading width={wp('3%')} height={wp('3%')} />
                        </View>
                    </Text>
                </View>
                <View style={styles.searchcontainer}>
                    <View style={styles.searchButton}>
                        <Profile width={wp('5%')} height={wp('5%')} />
                        <TextInput
                            placeholder="Write a review"
                            style={styles.searchInput}
                            onFocus={() =>
                                this.props.navigation.navigate(
                                    'reviewsAndRating'
                                )
                            }
                        />
                    </View>
                    <View style={styles.searchButton}>
                        <Profile width={wp('5%')} height={wp('5%')} />
                        <TextInput
                            placeholder="Write feedback"
                            style={styles.searchInput}
                            onFocus={() =>
                                this.props.navigation.navigate('feedBack')
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
    },
    mainimage: {
        // alignSelf: 'center',
        // width: wp('77.06%'),
        // height: hp('38.36%'),
        // marginBottom: hp('4%'),
        paddingLeft: '0%',
    },
    details: {
        display: 'flex',
        paddingLeft: hp('2%'),
        paddingBottom: hp('3.55%'),
    },
    restaurantname: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('8%'),
    },
    address: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4%'),
        paddingTop: hp('1.44%'),
        color: colors.grey,
    },
    getdirectionbutton: {
        display: 'flex',
        paddingRight: wp('4%'),
    },
    getdirec: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.lightGreen,
        width: wp('24%'),
        height: hp('4.8%'),
    },
    addressgetdirectionbutton: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        display: 'flex',
        fontFamily: 'ArchivoRegular',
        color: colors.lightBlack,
        fontSize: wp('4.53%'),
        paddingTop: hp('1.10'),
        paddingLeft: wp('2.4%'),
        paddingRight: wp('1%'),
        // lineHeight: hp('2.76%'),
        paddingBottom: hp('1.10%'),
    },
    line: {
        height: hp('1.515%'),
        width: wp('0.666%'),
        borderRadius: 4,
        backgroundColor: colors.lightGreyTwo,
        marginRight: wp('3%'),
    },
    greycontainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.greyBackground,
        width: wp('100%'),
        height: hp('8.28%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: wp('1%'),
        paddingRight: hp('1%'),
    },
    greyboxtext: {
        fontFamily: 'AirbnbCerealBook',
        fontSize: wp('4%'),
        color: colors.grey,
    },
    TitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: wp('5%'),
        paddingLeft: hp('2%'),
    },
    frappyText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.5%'),
        // lineHeight: hp('3.42%'),
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
        paddingRight: wp('9%'),
    },
    hallOfFameImage: {
        width: wp('25%'),
        height: wp('25%'),
        margin: wp('1.5%'),
        // marginRight: wp('5%'),
        // marginTop: hp('5%'),
        borderRadius: wp('5%'),
    },
    loadmorecontainer: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: wp('1.33%'),
        backgroundColor: '#F3F4F6',
        width: wp('32.53%'),
        height: hp('4.73%'),
    },
    loadmoretext: {
        textAlign: 'center',
        fontSize: wp('3.2%'),
        fontFamily: 'AirbnbCerealBook',
        color: '#888888',
        fontWeight: '500',
    },
    reviewcontainer: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        paddingBottom: hp('3%'),
    },
    searchcontainer: {
        paddingTop: hp('2.76%'),
        paddingLeft: wp('4.533%'),
        paddingRight: wp('5.33%'),
        paddingBottom: hp('5.55%'),
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: '2%',
        backgroundColor: '#F3F4F6',
        // backgroundColor: 'cyan',
        borderRadius: wp('3%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    searchInput: {
        flex: 1,
        marginLeft: wp('3%'),
        fontSize: wp('4%'),
        fontFamily: 'ArchivoRegular',
        color: colors.grey,
    },
})

export default ItemInDetailScreen
