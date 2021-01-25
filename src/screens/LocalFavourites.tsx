// react
import React, { Component } from 'react'
// react-native
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    Pressable,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// icons
import { NavigationIcon } from '../../assets/svgs/icons/icons-directions'
import { BellIcon, SearchIcon } from '../../assets/svgs/icons'
// colors
import { colors } from '../lib/colors'

const colorsList = [
    '#FFEA75',
    'FFE8E7',
    '#C3F4FF',
    '#E2F0FF',
    '#FFE2F5',
    '#E1E2FF',
    '#FFE5B2',
]
export const localFavouritesList = [
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
]
interface IProps {
    navigation: any
    route: any
}

interface IState {}
class LocalFavourites extends Component<IProps, IState> {
    renderLocalFavouritesList = () => {
        const { localFavourites } = this.props.route.params
        return (
            <ScrollView>
                {localFavourites.map((ele: any, index: number) => {
                    const { menu_images, overall_rating, name, cuisines } = ele
                    return (
                        <Pressable
                            onPress={() =>
                                this.props.navigation.navigate('itemInDetail')
                            }
                            key={index}
                        >
                            <View
                                style={[
                                    styles.renderItemContainer,
                                    {
                                        backgroundColor: `${
                                            colorsList[
                                                Math.floor(
                                                    Math.random() *
                                                        colorsList.length
                                                )
                                            ]
                                        }`,
                                    },
                                ]}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flex: 1,
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                display: 'flex',
                                                fontFamily: 'ArchivoBold',
                                                fontSize: wp('5%'),
                                                color: colors.darkBlack,
                                                marginBottom: wp('1%'),
                                            }}
                                        >
                                            {cuisines[0]}
                                        </Text>
                                        <Text
                                            style={{
                                                display: 'flex',
                                                fontFamily: 'ArchivoRegular',
                                                fontSize: wp('5%'),
                                                color: colors.grey,
                                            }}
                                        >
                                            {name}
                                        </Text>
                                    </View>
                                    <NavigationIcon
                                        width={wp('7.8')}
                                        height={wp('7.8%')}
                                    />
                                </View>

                                <Image
                                    source={{
                                        uri: menu_images[0]
                                            ? menu_images[0].image
                                            : 'https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg',
                                    }}
                                    style={{
                                        width: wp('28%'),
                                        height: wp('28%'),
                                        display: 'flex',
                                        alignSelf: 'center',
                                    }}
                                />
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.titleText}>Local Favourites</Text>
                    <BellIcon width={wp('6%')} height={wp('6%')} />
                </View>
                <View style={styles.searchButton}>
                    <SearchIcon width={wp('5%')} height={wp('5%')} />
                    <TextInput
                        placeholder="Search Restaurants"
                        style={styles.searchInput}
                        onChange={() =>
                            this.props.navigation.navigate('searchFoodResults')
                        }
                    />
                </View>
                {this.renderLocalFavouritesList()}
            </View>
        )
    }
}
export default LocalFavourites

const styles = StyleSheet.create({
    TitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: wp('5%'),
    },
    titleText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.5%'),
    },
    container: {
        padding: '5%',
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
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
    renderItemContainer: {
        padding: wp('5%'),
        display: 'flex',
        flexDirection: 'row',
        borderRadius: wp('3%'),
        justifyContent: 'space-between',
        height: wp('34%'),
        marginTop: wp('5%'),
        paddingVertical: wp('3%'),
    },
})
