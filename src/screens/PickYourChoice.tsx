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
    Image,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
//
import Modal from 'react-native-modal'
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

const thankYou = require('../../assets/images/pickyourchoice/thankyou.png')

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
    modalVisible: any
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
            modalVisible: false,
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
        if (category === 'food') {
            // this.setModalVisible()
            this.setState({ ...this.state, category: 'travel' })
        } else if (category === 'travel')
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
            favoriteService
                .pusher(FAVORITES, {
                    food_category: selectedFoodList,
                    travel_category: selectedTravelist,
                    shopping_category: selectedShoppingList,
                })
                .then((response) => {
                    console.log(response, 'response in pick your choice')
                    this.props.navigation.navigate('bottomTab')
                })
                .catch((error) => {
                    console.log(error, 'error in pick your choice ')
                    this.setState({
                        ...this.state,
                        isLoading: false,
                    })
                })
        }
    }
    setModalVisible = () => {
        this.setState((prevState, props) => ({
            modalVisible: !prevState.modalVisible,
        }))
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
    renderModalContent = () => {
        return (
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: wp('10%'),
                    borderRadius: wp('3.2%'),
                    backgroundColor: colors.white,
                }}
            >
                <Image source={thankYou} />
                <Text
                    style={{
                        fontFamily: 'AirbnbCerealBook',
                        fontSize: wp('6.4%'),
                        fontWeight: 'bold',
                        color: colors.namecolor,
                    }}
                >
                    {' '}
                    Thank You
                </Text>
                <Text
                    style={{
                        fontFamily: 'AirbnbCerealBook',
                        fontSize: wp('4.33%'),
                        color: colors.lightBlack,
                        paddingTop: hp('1.84%'),
                    }}
                >
                    You have successfully {'\n'} picked your choices.
                </Text>
            </View>
        )
    }
    render() {
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
                            // paddingTop: hp('3.15%'),
                            backgroundColor: colors.white,
                        }}
                    >
                        {this.state.modalVisible && (
                            <View>
                                <Modal
                                    isVisible={this.state.modalVisible}
                                    backdropColor={colors.white}
                                    backdropOpacity={0.9}
                                >
                                    <View style={styles.modalView}>
                                        {/* This call renders the modal*/}
                                        {this.renderModalContent()}
                                    </View>
                                </Modal>
                            </View>
                        )}
                        <View style={styles.container}>
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
                                    <View style={styles.typeContainer}>
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
                                                            style={[
                                                                styles.typeImageConatiner,
                                                                {
                                                                    borderColor: this
                                                                        .state
                                                                        .foodTypesList[
                                                                        index
                                                                    ].checked
                                                                        ? colors.darkyellow
                                                                        : colors.white,
                                                                },
                                                            ]}
                                                        >
                                                            <ImageBackground
                                                                style={{
                                                                    // borderRadius: wp('50%'),
                                                                    width: wp(
                                                                        '44%'
                                                                    ),
                                                                    height: wp(
                                                                        '44%'
                                                                    ),
                                                                }}
                                                                source={Svg}
                                                                resizeMode="cover"
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.imageOverleaf
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.typeText
                                                                        }
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
                                            (element: Item, index: number) => {
                                                const { Svg } = element

                                                return (
                                                    <View
                                                        style={styles.Item}
                                                        key={index}
                                                    >
                                                        <Pressable
                                                            onPress={() =>
                                                                this.onPressCheckItem(
                                                                    'travel',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <View
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{
                                                                        width: wp(
                                                                            '23.46%'
                                                                        ),
                                                                        height: hp(
                                                                            '11.57%'
                                                                        ),
                                                                        borderRadius: wp(
                                                                            '1%'
                                                                        ),
                                                                    }}
                                                                    resizeMode="cover"
                                                                    source={Svg}
                                                                />
                                                                <Text
                                                                    style={
                                                                        styles.ItemText
                                                                    }
                                                                >
                                                                    {
                                                                        element.name
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                        <Pressable
                                                            onPress={() =>
                                                                this.onPressCheckItem(
                                                                    'travel',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {element.checked ? (
                                                                <CheckedSvg
                                                                    width={wp(
                                                                        '6.4%'
                                                                    )}
                                                                    height={hp(
                                                                        '3.15%'
                                                                    )}
                                                                />
                                                            ) : (
                                                                <UncheckedSvg
                                                                    width={wp(
                                                                        '6.4%'
                                                                    )}
                                                                    height={hp(
                                                                        '3.15%'
                                                                    )}
                                                                />
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
                                            (element: Item, index: number) => {
                                                const { Svg } = element
                                                return (
                                                    <View
                                                        style={styles.Item}
                                                        key={index}
                                                    >
                                                        <Pressable
                                                            onPress={() =>
                                                                this.onPressCheckItem(
                                                                    'shopping',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <View
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{
                                                                        width: wp(
                                                                            '23.46%'
                                                                        ),
                                                                        height: hp(
                                                                            '11.57%'
                                                                        ),
                                                                        borderRadius: wp(
                                                                            '1%'
                                                                        ),
                                                                    }}
                                                                    resizeMode="cover"
                                                                    source={Svg}
                                                                />
                                                                <Text
                                                                    style={
                                                                        styles.ItemText
                                                                    }
                                                                >
                                                                    {
                                                                        element.name
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                        <Pressable
                                                            onPress={() =>
                                                                this.onPressCheckItem(
                                                                    'shopping',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {element.checked ? (
                                                                <CheckedSvg
                                                                    width={wp(
                                                                        '6.4%'
                                                                    )}
                                                                    height={hp(
                                                                        '3.15%'
                                                                    )}
                                                                />
                                                            ) : (
                                                                <UncheckedSvg
                                                                    width={wp(
                                                                        '6.4%'
                                                                    )}
                                                                    height={hp(
                                                                        '3.15%'
                                                                    )}
                                                                />
                                                            )}
                                                        </Pressable>
                                                    </View>
                                                )
                                            }
                                        )}
                                    </View>
                                )}
                            </ScrollView>
                            <View style={{ paddingBottom: hp('0.2%') }}>
                                <CustomButton
                                    onPressButton={this.onPressNext}
                                    title="Next"
                                    buttonStyles={{
                                        // display: 'flex',
                                        width: '100%',
                                        padding: wp('5%'),
                                        margin: '2%',
                                    }}
                                    buttonTextStyles={[
                                        {
                                            fontFamily: 'ArchivoBold',
                                            fontSize: wp('4%'),
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: wp('3%'),
        // paddingVertical: hp('2%'),
        alignContent: 'center',
        paddingTop: hp('5%'),
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
        // alignItems: 'center',
    },
    smallButton: {
        width: wp('30%'),
        borderRadius: wp('5.6%'), //3.3%
        // marginTop: wp('5.3%'),
        // paddingVertical: wp('3.5%'),
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
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageOverleaf: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    typeText: {
        color: colors.white,
        marginBottom: wp('5%'),
        fontFamily: 'ArchivoRegular',
        fontWeight: '500',
        fontSize: wp('4.5%'),
    },
    typeContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    typeImageConatiner: {
        borderWidth: wp('1%'),
        marginBottom: hp('1%'),
        borderRadius: wp('2%'),
    },
})
export default PickYourChoice
