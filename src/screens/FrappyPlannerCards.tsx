// react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import { Text, View, StyleSheet, Pressable } from 'react-native'
//icons
import { Notifications } from '../../assets/svgs/icons/icons-profile'
// colors
import { colors } from '../lib/colors'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import MapView from 'react-native-maps'

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

class FrappyPlannerCards extends Component<IProps, Istate> {
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
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.heading}>
                    <Text style={styles.title}>Frappy Planner</Text>
                    <View style={styles.notificationIcon}>
                        <Pressable
                            onPress={() =>
                                this.props.navigation.navigate('notifications')
                            }
                        >
                            <Notifications
                                width={wp('5.86%')}
                                height={hp('2.89%')}
                            />
                        </Pressable>
                    </View>
                </View>
                <MapView style={{ width: wp('100%'), height: hp('40%') }} />
                <View style={styles.bottomTab}>
                    <Text
                        style={{
                            fontFamily: 'ArchivoRegular',
                            fontSize: wp('3.73'),
                            color: colors.darkBlack,
                        }}
                    >
                        Your Visits
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            backgroundColor: '#FFE8E7',
                            borderRadius: wp('2%'),
                            marginTop: hp('2.76%'),
                            justifyContent: 'space-around',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontWeight: '500',
                                fontSize: wp('3.73%'),
                            }}
                        >
                            Breakfast in Chutney’s
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            Lorem Ipsum copy in various charsets and languages
                            for layouts.
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            08:00 - 09:00
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            backgroundColor: '#E1E2FF',
                            borderRadius: wp('2%'),
                            marginTop: hp('2.76%'),
                            justifyContent: 'space-around',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontWeight: '500',
                                fontSize: wp('3.73%'),
                            }}
                        >
                            Lunch in Paradise
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            Lorem Ipsum copy in various charsets and languages
                            for layouts.
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            13:30 - 14:30
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            backgroundColor: 'cyan',
                            borderRadius: wp('2%'),
                            marginTop: hp('2.76%'),
                            justifyContent: 'space-around',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontWeight: '500',
                                fontSize: wp('3.73%'),
                            }}
                        >
                            Snacks
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            Lorem Ipsum copy in various charsets and languages
                            for layouts.
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                padding: wp('2%'),
                                fontSize: wp('3.73%'),
                                color: colors.grey,
                            }}
                        >
                            17:30 - 18:30
                        </Text>
                    </View>
                </View>
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
    card: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: 'white',
        // backgroundColor: 'cyan',
        padding: wp('2%'),
    },
    bottomTab: {
        display: 'flex',
        padding: wp('6%'),
    },
})

export default FrappyPlannerCards
