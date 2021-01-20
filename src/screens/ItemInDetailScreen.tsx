// react
import React, { Component } from 'react'
// react-native
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native'
import { colors } from '../lib/colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import CustomButton from '../components/common/CustomButton'
import RightArrow from '../../assets/svgs/RightArrow'
import BookmarkIcon from '../../assets/svgs/icons/BookmarkIcon'
import PhotoIcon from '../../assets/svgs/icons/PhotoIcon'
import RatingIcon from '../../assets/svgs/icons/RatingIcon'
import ReadMore from '../../assets/svgs/icons/ReadMore'
import Loading from '../../assets/svgs/icons/Loading'
import Profile from '../../assets/svgs/icons/Profile'

const image1 =
    'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg'
interface IProps {
    navigation: any
}

interface ICategoryType {
    photos: Array<any>
    RatingAndReview: Array<any>
}
interface Istate {
    category: string
    categoryData: ICategoryType
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
    RatingAndReview: [
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
        console.log('Got Directions')
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
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                {/* Item - image,name,address,time,distance */}
                <View>
                    <Image
                        style={[
                            styles.hallOfFameImage,
                            { alignSelf: 'center' },
                        ]}
                        // resizeMode="contain"
                        source={{ uri: image1 }}
                    />
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
                        <Text style={{ fontFamily: 'AirbnbCerealBook' }}>
                            33 min <View style={styles.line} /> 4.8 miles
                        </Text>
                    </View>
                </View>
                {/* grey container,ratings,bookmarks,photos,Description */}
                <View style={styles.greycontainer}>
                    <RatingIcon />
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
                    <BookmarkIcon />
                    <View
                        style={{
                            display: 'flex',
                            paddingLeft: wp('2%'),
                            paddingRight: hp('3%'),
                        }}
                    >
                        <Text style={styles.greyboxtext}>137k</Text>
                        <Text style={styles.greyboxtext}>Bookmark</Text>
                    </View>
                    <View style={[styles.line, { height: hp('4.34%') }]} />
                    <PhotoIcon />
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
                        <RightArrow />
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
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={styles.frappyText}>Ratings and Reviews</Text>
                    <View style={styles.reviewcontainer}>
                        <Image
                            source={require('../../assets/images/homescreen/itemdetails/profile.png')}
                        />
                        <View>
                            <View style={{ display: 'flex' }}>
                                <Text
                                    style={[
                                        styles.frappyText,
                                        {
                                            fontSize: wp('4.8%'),
                                            fontWeight: '500',
                                        },
                                    ]}
                                >
                                    Rohit Sharma
                                </Text>
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: 'AirbnbCerealBook',
                                            fontSize: wp('3.73%'),
                                            color: '#888888',
                                        }}
                                    >
                                        November <View style={styles.line} />{' '}
                                        <Text
                                            style={{ color: colors.darkorange }}
                                        >
                                            New
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: 'AirbnbCerealBook',
                                        fontSize: wp('3.73%'),
                                    }}
                                >
                                    Dummy text is text that is used in the
                                    publishing industry or by web designers to
                                    occupy.
                                    <Text style={{ color: colors.darkorange }}>
                                        {' '}
                                        Readmore <ReadMore />
                                    </Text>
                                </Text>
                                <View
                                    style={{
                                        height: hp('0.5%'),
                                        width: wp('85%'),
                                        borderRadius: 4,
                                        marginTop: hp('2%'),
                                        backgroundColor: colors.lightGreyTwo,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    height: hp('4.73%'),
                                    width: wp('32.53%'),
                                    borderRadius: 5,
                                    backgroundColor: '#F3F4F6',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.frappyText,
                                        {
                                            fontSize: wp('3.2%'),
                                        },
                                    ]}
                                >
                                    Load More{' '}
                                </Text>
                                <Loading />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: hp('2%'),
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
        lineHeight: hp('2.76%'),
        paddingBottom: hp('1.10%'),
    },
    line: {
        height: hp('1.315%'),
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
    reviewcontainer: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        paddingBottom: hp('3%'),
    },
})

export default ItemInDetailScreen
