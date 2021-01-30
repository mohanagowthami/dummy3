// react
import React, { Component } from 'react'
// react-native
import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TextInput,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

// react-native-maps
import MapView from 'react-native-maps'
// svgs
import { LocationIcon, MyLocation, SearchIcon } from '../../assets/svgs/icons'
import { CurrentLocation } from '../../assets/svgs/icons/icons-profile'
//icons
import Notifications from '../../assets/svgs/icons/icons-profile/Notifications'
// components
import CustomButton from '../components/buttons/CustomButton'
// colors
import { colors } from '../lib/colors'

interface IProps {
    navigation: any
}
// divisioning of the screen
interface INavigationType {
    profileDetails: Array<any>
    results: Array<any>
}
// state - data
interface Istate {
    selectedDate: any
    isModalOpen: boolean
}
// data
const details = {
    profileDetails: [
        {
            name: 'Rohit',
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

class RestaurantsNearYou extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            isModalOpen: false,
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text
                    style={{
                        paddingTop: hp('0.94%'),
                        fontSize: wp('9%'),
                    }}
                    onPress={() => this.props.navigation.navigate('home')}
                >
                    x
                </Text>
                <Text
                    style={{
                        fontFamily: 'AirbnbCerealBook',
                        fontWeight: '400',
                        fontSize: wp('6.4%'),
                        color: colors.darkBlack,
                        paddingVertical: hp('2%'),
                    }}
                >
                    Find restaurants near you{' '}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AirbnbCerealBook',
                        fontWeight: '400',
                        fontSize: wp('4.26%'),
                        paddingBottom: hp('2%'),
                        color: colors.darkGrey,
                    }}
                >
                    Please enter your location or allow access to{'\n'} your
                    location to find restaurants near you.
                </Text>
                <View
                    style={{
                        display: 'flex',
                        borderWidth: 1,
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#FF6C65',
                        padding: '3%',
                    }}
                >
                    <CurrentLocation width={wp('4.23%')} height={hp('2.34%')} />
                    <Text
                        style={{
                            fontFamily: 'AirbnbCerealBook',
                            fontWeight: '400',
                            fontSize: wp('4.26%'),
                            color: colors.orange,
                            paddingLeft: wp('3%'),
                        }}
                    >
                        {' '}
                        Use current Location
                    </Text>
                </View>
                <View style={styles.searchButton}>
                    <LocationIcon width={wp('5%')} height={wp('5%')} />
                    <TextInput
                        placeholder="   Enter a new address"
                        style={styles.searchInput}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        padding: wp('3%'),
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: '3%',
        padding: '2%',
        backgroundColor: '#FBFBFB',
        borderWidth: 0.1,
        borderRadius: 4,
        alignItems: 'center',
        // marginLeft: wp('7.73%'),
        // marginRight: wp('7.73%'),
        // borderRadius: wp('3%'),
        // marginBottom: hp('3.68%'),
    },
    searchInput: {
        flex: 1,
        marginLeft: wp('3%'),
        fontSize: wp('4%'),
        fontFamily: 'ArchivoRegular',
        color: colors.grey,
    },
})
export default RestaurantsNearYou
