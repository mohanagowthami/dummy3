// react
import React, { Component } from 'react'
// react-native
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

// react-native-maps
import MapView from 'react-native-maps'
// svgs
import { MyLocation, SearchIcon } from '../../assets/svgs/icons'
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

class Navigation extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            isModalOpen: false,
        }
    }
    render() {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    paddingTop: hp('1%'),
                }}
            >
                <ScrollView style={styles.mainContainer}>
                    <View
                        style={{
                            borderBottomEndRadius: 20,
                            borderBottomStartRadius: 20,
                        }}
                    >
                        <View style={styles.heading}>
                            <Text style={styles.title}>Navigation</Text>
                            <View style={styles.notificationIcon}>
                                <Notifications
                                    width={wp('5.86%')}
                                    height={hp('2.89%')}
                                />
                            </View>
                        </View>
                        <View style={styles.searchButton}>
                            <SearchIcon width={wp('5%')} height={wp('5%')} />
                            <TextInput
                                placeholder="Search"
                                style={styles.searchInput}
                            />
                        </View>
                    </View>
                    <View>
                        <MapView
                            showsCompass={true}
                            showsMyLocationButton={true}
                            showsBuildings={true}
                            initialRegion={{
                                latitude: 17.423184,
                                longitude: 78.491684,
                                // latitudeDelta: 0.0922,
                                // longitudeDelta: 0.0421,
                                latitudeDelta: 0.5,
                                longitudeDelta: 0.5,
                            }}
                            style={{
                                width: wp('100%'),
                                height: hp('77.63%'),
                            }}
                        />
                        <View
                            style={{
                                display: 'flex',
                                position: 'absolute',
                                marginTop: hp('65%'),
                                marginLeft: wp('82%'),
                            }}
                        >
                            {/* <MyLocation /> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
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
    },
    title: {
        fontFamily: 'ArchivoBold',
        fontSize: wp('6.4%'),
    },
    notificationIcon: {
        display: 'flex',
        paddingTop: hp('1.2%'),
        alignSelf: 'center',
        // paddingRight: wp('15.46%'),
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: '2%',
        backgroundColor: colors.lightGrey,
        marginLeft: wp('7.73%'),
        marginRight: wp('7.73%'),
        borderRadius: wp('3%'),
        marginBottom: hp('3.68%'),
    },
    searchInput: {
        flex: 1,
        marginLeft: wp('3%'),
        fontSize: wp('4%'),
        fontFamily: 'ArchivoRegular',
        color: colors.grey,
    },
    map: {
        display: 'flex',
        flex: 1,
    },
})
export default Navigation
