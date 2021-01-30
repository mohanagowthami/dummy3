// react
import React, { Component } from "react"
// react-native
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TextInput,
} from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
// react-native-snap-carousel
import Carousel, { Pagination } from "react-native-snap-carousel"
// expo location
import * as Location from "expo-location"
import {
    BellIcon,
    NavigationIcon,
    Rating,
    RightArrow,
    SearchIcon,
} from "../../assets/svgs/icons"
// svgs

// components
import CustomButton from "../components/buttons/CustomButton"
// colors
import { colors } from "../lib/colors"
// endpoints
import {
    FAVORITE_RESTAURANTS,
    FAVORITE_SHOPPINGMALL,
    FAVORITE_TRAVELPLACES,
    HALL_OF_FAME_CATEGORY,
    RECAP_CATEGORY,
    USER_CURRENT_LOCATION,
} from "../lib/endpoints"
// services
import RestaurantService from "../services/restaurants.service"
import ShoppingMallService from "../services/shoppingmall.service"
import TravelService from "../services/travel.service"
import HallOfFame from "../services/hall-of-fame.service"
import Recap from "../services/recap.service"
import HallOfFameService from "../services/hall-of-fame.service"
import RecapService from "../services/recap.service"
import { deriveArrayFromString } from "../lib/helper"

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
    "#FFEA75",
    "#FFE8E7",
    "#C3F4FF",
    "#E2F0FF",
    "#FFE2F5",
    "#E1E2FF",
    "#FFE5B2",
]
// data
const content = {
    // first division - trends list data
    trendsList: [
        {
            title: "restaurant1",
            description: "dish1",
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        },
        {
            title: "restaurant2",
            description: "dish2",
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        },
        {
            title: "restaurant3",
            description: "dish3",
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        },
    ],
    // second division - local favourites data
    localFavouritesList: [
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "Burgers",
            companyName: "King Bakers",
            rating: 4.8,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "Burgers",
            companyName: "King Bakers",
            rating: 4.8,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "Burgers",
            companyName: "King Bakers",
            rating: 4.8,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "Burgers",
            companyName: "King Bakers",
            rating: 4.8,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "Burgers",
            companyName: "King Bakers",
            rating: 4.8,
        },
    ],
    // third division - recap data
    recapList: [
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "KFC",
            location: "882 Swift Courts Apt",
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "KFC",
            location: "882 Swift Courts Apt",
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
        {
            image:
                "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
            name: "KFC",
            location: "882 Swift Courts Apt",
            averageRatings: 4.8,
            numberOfRatings: 233,
        },
    ],
    // fourth division - hall of fame data
    hallOfFame: [
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
        "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg",
    ],
}
// Main class component

const restaurantService = new RestaurantService()
const travelService = new TravelService()
const shoppingService = new ShoppingMallService()
const hallOfFameService = new HallOfFameService()
const recapService = new RecapService()

class HomeScreen extends Component<IProps, Istate> {
    carousel: any

    // destructuring props and state
    constructor(props: IProps) {
        super(props)

        this.state = {
            category: "food",
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
        let { status } = await Location.requestPermissionsAsync()
        if (status !== "granted") {
            alert("please grant permission to access current location")
        } else {
            let location = await Location.getCurrentPositionAsync({})
            console.log("user location", location)
            const locationCoordinates = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
            restaurantService
                .pusher(USER_CURRENT_LOCATION, locationCoordinates)
                .then((response) => {
                    console.log(response, "rensponse in location")
                    Promise.all([
                        restaurantService.fetcher(FAVORITE_RESTAURANTS),
                        hallOfFameService.fetcher(
                            HALL_OF_FAME_CATEGORY("food")
                        ),
                        recapService.fetcher(RECAP_CATEGORY("food")),
                    ])
                        .then((values) => {
                            let stateData = { ...this.state }
                            stateData.categoryData[0].data.localFavouritesList =
                                values[0].results
                            stateData.categoryData[0].data.hallOfFame =
                                values[1]
                            stateData.categoryData[0].data.recapList = values[2]
                            stateData.categoryData[0].isDatafetched = true

                            this.setState(stateData)
                        })
                        .catch((error) =>
                            console.log(error, "error in home screen")
                        )
                })
                .catch((error) =>
                    console.log(error, "error in user current location saving")
                )
        }
    }

    getActiveIndex = () => {
        const { category } = this.state
        if (category === "food") return 0
        else if (category === "travel") return 1
        else if (category === "shopping") return 2
        else return 0
    }

    getSelectedCategoryData = async (type: string) => {
        this.setState({
            ...this.state,
            category: type,
        })
        let url
        let service: any
        let index = 0
        let stateData = { ...this.state }
        if (type === "travel") {
            url = FAVORITE_TRAVELPLACES
            service = travelService
            index = 1
            stateData.category = "travel"
        } else if (type === "shopping") {
            url = FAVORITE_TRAVELPLACES
            service = shoppingService
            index = 2
            stateData.category = "shopping"
        }
        if (!stateData.categoryData[index].isDatafetched) {
            Promise.all([
                service.fetcher(url),
                hallOfFameService.fetcher(HALL_OF_FAME_CATEGORY(type)),
                recapService.fetcher(RECAP_CATEGORY(type)),
            ])
                .then((values) => {
                    console.log(values)
                    let stateData = { ...this.state }
                    stateData.categoryData[index].data.localFavouritesList =
                        values[0].results
                    stateData.categoryData[index].data.hallOfFame = values[1]
                    stateData.categoryData[index].data.recapList = values[2]
                    stateData.categoryData[index].isDatafetched = true

                    this.setState(stateData)
                })
                .catch((error) => console.log(error, "error in home screen"))
        }
    }

    // category selection
    onPressButton = async (type: string) => {
        this.setState({ ...this.state, category: type }, () =>
            this.getSelectedCategoryData(type)
        )
    }
    // rendering an item for carousel
    _renderItem({ item, index }: any) {
        return (
            <View
                style={[
                    styles.renderItemContainer,
                    {
                        backgroundColor: `${
                            colorsList[
                                Math.floor(Math.random() * colorsList.length)
                            ]
                        }`,
                    },
                ]}
            >
                <View
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Text
                        style={{
                            display: "flex",
                            fontFamily: "ArchivoBold",
                            fontSize: wp("5%"),
                            color: colors.darkBlack,
                        }}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            display: "flex",
                            fontFamily: "ArchivoRegular",
                            fontSize: wp("5%"),
                            color: colors.grey,
                        }}
                    >
                        {item.description}
                    </Text>
                    <NavigationIcon width={wp("7.8")} height={wp("7.8%")} />
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
    // pagination function
    get pagination() {
        const { categoryData, activeIndex } = this.state
        const index = this.getActiveIndex()
        return (
            <Pagination
                dotsLength={categoryData[index].data.trendsList.length}
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
                    width: wp("4%"),
                    height: wp("2%"),
                    borderRadius: wp("1%"),
                    marginHorizontal: 0,
                    backgroundColor: colors.orange,
                }}
            />
        )
    }
    // trends slider function
    renderTrendsSlider = () => {
        const { categoryData } = this.state
        console.log(
            categoryData[this.getActiveIndex()].data.trendsList,
            "trensdsList"
        )

        return (
            <>
                <Carousel
                    layout={"default"}
                    ref={(ref: any) => (this.carousel = ref)}
                    data={categoryData[this.getActiveIndex()].data.trendsList}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("100%")}
                    renderItem={this._renderItem}
                    loop={true}
                    onSnapToItem={(index: number) => {
                        this.setState({
                            ...this.state,
                            activeIndex: index,
                        })
                    }}
                />
                {categoryData[this.getActiveIndex()].data.trendsList &&
                    this.pagination}
            </>
        )
    }

    //  commonElement = (food_category:Array<string>,cuisines:Array<string>) =>
    //     {
    //      if (food_category.some((item: any) => cuisines.includes(item)))

    //     }
    // local favourites slider function
    renderLocalFavourities = () => {
        const { categoryData } = this.state
        console.log(categoryData[0].data, "data from network")

        return (
            <ScrollView horizontal={true}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    {categoryData[
                        this.getActiveIndex()
                    ].data.localFavouritesList.map((item, index) => {
                        const {
                            menu_images,
                            name,
                            overall_rating,
                            cuisines,
                        } = item
                        const image =
                            menu_images.length > 0
                                ? menu_images[0].image
                                : "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg"
                        console.log(image, "image")
                        const formatedCusines = deriveArrayFromString(cuisines)

                        return (
                            <View
                                style={{
                                    paddingVertical: wp("6%"),
                                    width: wp("55%"),
                                    height: wp("60%"),
                                    backgroundColor: `${
                                        colorsList[
                                            Math.floor(
                                                Math.random() *
                                                    colorsList.length
                                            )
                                        ]
                                    }`,
                                    borderRadius: wp("3%"),
                                    marginRight: wp("5%"),
                                    paddingHorizontal: wp("5%"),
                                    flex: 1,
                                }}
                                key={index}
                            >
                                <Image
                                    source={{
                                        uri: image,
                                    }}
                                    style={{
                                        width: "50%",
                                        height: "50%",
                                        display: "flex",
                                        alignSelf: "center",
                                    }}
                                />
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flex: 1,
                                        marginTop: wp("4%"),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "ArchivoBold",
                                            fontSize: wp("4.8%"),
                                            color: colors.darkBlack,
                                        }}
                                    >
                                        {formatedCusines[0]}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "ArchivoRegular",
                                            fontSize: wp("3.8%"),
                                            color: colors.orange,
                                        }}
                                    >
                                        {name}
                                    </Text>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Rating />
                                            <Text
                                                style={{
                                                    marginLeft: wp("2%"),
                                                }}
                                            >
                                                {overall_rating}
                                            </Text>
                                        </View>
                                        <NavigationIcon
                                            width={wp("7.8%")}
                                            height={wp("7.8%")}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }

    render() {
        // Main return function
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.frappyText}>Frappy morning</Text>
                        <BellIcon width={wp("6%")} height={wp("6%")} />
                    </View>
                    <Text style={styles.userName}>User name</Text>
                    <View style={styles.searchButton}>
                        <SearchIcon width={wp("5%")} height={wp("5%")} />
                        <TextInput
                            placeholder="Explore spots near you"
                            style={styles.searchInput}
                            onChange={() =>
                                this.props.navigation.navigate(
                                    "searchFoodResults"
                                )
                            }
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <CustomButton
                            onPressButton={() =>
                                this.getSelectedCategoryData("food")
                            }
                            title="Food"
                            buttonStyles={[
                                styles.smallButton,
                                {
                                    backgroundColor:
                                        this.state.category !== "food"
                                            ? "rgba(255,108,101,0.2)"
                                            : colors.orange,
                                    borderColor: colors.orange,
                                },
                            ]}
                            buttonTextStyles={[
                                styles.buttonTextStyles,
                                {
                                    color:
                                        this.state.category !== "food"
                                            ? colors.orange
                                            : colors.white,
                                },
                            ]}
                        />
                        <CustomButton
                            onPressButton={() =>
                                this.getSelectedCategoryData("travel")
                            }
                            title="Travel"
                            buttonStyles={[
                                styles.smallButton,
                                {
                                    backgroundColor:
                                        this.state.category !== "travel"
                                            ? "rgba(253,210,106,0.2)"
                                            : colors.yellow,
                                    borderColor: colors.yellow,
                                },
                            ]}
                            buttonTextStyles={[
                                {
                                    color:
                                        this.state.category !== "travel"
                                            ? colors.yellow
                                            : colors.white,
                                },
                                styles.buttonTextStyles,
                            ]}
                        />
                        <CustomButton
                            onPressButton={() =>
                                this.getSelectedCategoryData("shopping")
                            }
                            title="Shopping"
                            buttonStyles={[
                                styles.smallButton,
                                {
                                    backgroundColor:
                                        this.state.category !== "shopping"
                                            ? "rgba(102,197,218,0.3)"
                                            : colors.skyBlue,
                                    borderColor: colors.skyBlue,
                                },
                            ]}
                            buttonTextStyles={[
                                {
                                    color:
                                        this.state.category !== "shopping"
                                            ? colors.skyBlue
                                            : colors.white,
                                },
                                styles.buttonTextStyles,
                            ]}
                        />
                    </View>
                    {/* calling trend slider function*/}
                    {this.state.categoryData[this.getActiveIndex()].data &&
                        this.renderTrendsSlider()}
                    {this.state.categoryData[this.getActiveIndex()].data
                        .localFavouritesList.length > 1 && (
                        <>
                            <View
                                style={[
                                    styles.TitleContainer,
                                    { marginTop: 0, marginBottom: wp("6%") },
                                ]}
                            >
                                <Text style={styles.frappyText}>
                                    Local Favourites
                                </Text>
                                <Pressable
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "localFavourites",
                                            {
                                                localFavourites: this.state
                                                    .categoryData[
                                                    this.getActiveIndex()
                                                ].data.localFavouritesList,
                                            }
                                        )
                                    }
                                >
                                    <View style={styles.sectionHeaderWrapper}>
                                        <Text style={styles.showAllText}>
                                            Show all
                                        </Text>
                                        <RightArrow />
                                    </View>
                                </Pressable>
                            </View>
                            {this.renderLocalFavourities()}
                        </>
                    )}

                    {this.state.categoryData[this.getActiveIndex()].data
                        .recapList.length > 1 && (
                        <>
                            <View style={[styles.TitleContainer]}>
                                <Text style={styles.frappyText}>Recap</Text>
                                <View style={styles.sectionHeaderWrapper}>
                                    <Text style={styles.showAllText}>
                                        Show all
                                    </Text>
                                    <RightArrow />
                                </View>
                            </View>
                            <View>
                                <View>
                                    {this.state.categoryData[
                                        this.getActiveIndex()
                                    ].data.recapList.map((ele, index) => {
                                        const {
                                            restaurant,

                                            user_rating,

                                            review_images,
                                        } = ele
                                        const numberOfRatings = "511"
                                        const location = "882 Swift Courts Apt"
                                        return (
                                            <View key={index}>
                                                <View
                                                    style={
                                                        styles.recapItemContaineer
                                                    }
                                                >
                                                    <Image
                                                        source={{
                                                            uri:
                                                                review_images[0]
                                                                    .image,
                                                        }}
                                                        style={
                                                            styles.recapImage
                                                        }
                                                    />
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            padding: wp("5%"),
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontFamily:
                                                                    "ArchivoRegular",
                                                                fontSize: wp(
                                                                    "4.2%"
                                                                ),
                                                                color:
                                                                    colors.darkBlack,
                                                            }}
                                                        >
                                                            {restaurant}
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
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <Rating
                                                                width={wp(
                                                                    "4.2"
                                                                )}
                                                                height={wp(
                                                                    "4.2"
                                                                )}
                                                            />
                                                            <Text
                                                                style={[
                                                                    styles.recapCardText,
                                                                    {
                                                                        marginLeft: wp(
                                                                            "2%"
                                                                        ),
                                                                    },
                                                                ]}
                                                            >
                                                                {user_rating}(
                                                                {
                                                                    numberOfRatings
                                                                }{" "}
                                                                ratings)
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            alignSelf:
                                                                "flex-end",
                                                        }}
                                                    >
                                                        <NavigationIcon
                                                            width={wp("7.8%")}
                                                            height={wp("7.8%")}
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
                        </>
                    )}

                    {this.state.categoryData[this.getActiveIndex()].data
                        .hallOfFame.length > 1 && (
                        <>
                            <View style={[styles.TitleContainer]}>
                                <Text style={styles.frappyText}>
                                    Hall of Fame
                                </Text>
                                <View style={styles.sectionHeaderWrapper}>
                                    <Text style={styles.showAllText}>
                                        Show all
                                    </Text>
                                    <RightArrow />
                                </View>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    marginBottom: wp("15%"),
                                }}
                            >
                                {this.state.categoryData[
                                    this.getActiveIndex()
                                ].data.hallOfFame.map((item, index) => {
                                    const { image } = item
                                    return (
                                        <View key={index}>
                                            <Image
                                                style={styles.hallOfFameImage}
                                                source={{
                                                    uri: image,
                                                }}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        )
    }
}
export default HomeScreen
const styles = StyleSheet.create({
    TitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: wp("5%"),
    },
    frappyText: {
        fontFamily: "ArchivoRegular",
        fontSize: wp("6.5%"),
    },
    container: {
        padding: "5%",
        display: "flex",
        flex: 1,
        backgroundColor: colors.white,
    },
    userName: {
        fontFamily: "ArchivoRegular",
        color: colors.grey,
        fontSize: wp("4%"),
        marginVertical: wp("4%"),
    },
    searchButton: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        padding: "2%",
        backgroundColor: colors.lightGrey,
        borderRadius: wp("3%"),
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        marginLeft: wp("3%"),
        fontSize: wp("4%"),
        fontFamily: "ArchivoRegular",
        color: colors.grey,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    smallButton: {
        width: wp("27%"),
        borderRadius: wp("5%"),
        marginTop: wp("5.3%"),
        paddingVertical: wp("3%"),
        marginBottom: wp("4%"),
        borderWidth: wp("0.3%"),
    },
    buttonTitle: {
        fontFamily: "AirbnbCerealBold",
        fontSize: wp("4%"),
        lineHeight: wp("5%"),
    },
    buttonTextStyles: {
        fontFamily: "AirbnbCerealBook",
        fontSize: wp("4%"),
        lineHeight: wp("5%"),
    },
    sliderImage: {
        marginRight: wp("9%"),
        width: wp("25%"),
        height: wp("25%"),
    },
    renderItemContainer: {
        padding: wp("5%"),
        display: "flex",
        flexDirection: "row",
        borderRadius: wp("3%"),

        justifyContent: "space-between",
        height: wp("34%"),
        alignItems: "center",
    },
    showAllText: {
        fontFamily: "ArchivoRegular",
        fontSize: wp("4%"),
        lineHeight: wp("5.7%"),
        color: colors.darkBlack,
        marginRight: wp("2%"),
    },
    sectionHeaderWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    hallOfFameImage: {
        width: wp("25%"),
        height: wp("25%"),
        marginTop: wp("5%"),
        borderRadius: wp("5%"),
    },
    recapImage: {
        width: wp("30%"),
        height: wp("30%"),
    },
    recapItemContaineer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        paddingVertical: wp("5%"),
    },
    recapCardText: {
        fontFamily: "ArchivoRegular",
        fontSize: wp("3.8%"),
        color: colors.lightGreyThree,
    },
})
