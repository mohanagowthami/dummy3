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

class Notifications extends Component<IProps, Istate> {
    carousel: any
    constructor(props: IProps) {
        super(props)
        this.state = {
            categoryData: details,
            activeIndex: 0,
            resultsCount: 80,
        }
    }

    heading = () => {
        return (
            <>
                <View style={styles.backicon}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Pressable
                            onPress={() =>
                                this.props.navigation.navigate('home')
                            }
                        >
                            <BackIcon
                                width={wp('3.13%')}
                                height={hp('2.84%')}
                            />
                        </Pressable>
                        <Text style={styles.title}>Notifications</Text>
                    </View>
                </View>
            </>
        )
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.heading}>{this.heading()}</View>
                <ScrollView
                    style={{
                        display: 'flex',
                        // flex: 1,
                        backgroundColor: colors.greytwobackground,
                        height: hp('100%'),
                    }}
                >
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationText}>
                            You have one new Notification
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        // paddingTop: hp('2%'),
        // backgroundColor: colors.white,
    },
    heading: {
        display: 'flex',
        paddingTop: hp('3.5%'),
        paddingBottom: hp('3.5%'),
        // paddingBottom: hp('2.10%'),
        // paddingLeft: wp('7.46%'),
        // paddingRight: wp('5.33%'),
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    backicon: {
        // paddingLeft: wp('7.44%'),
        paddingTop: hp('2%'),
        paddingLeft: wp('3%'),
        // paddingBottom: hp('1.2%'),
        // paddingRight: wp('15.46%'),
    },
    title: {
        fontFamily: 'ArchivoBold',
        fontSize: wp('5%'),
        // paddingTop: hp('2%'),
        // justifyContent: 'center',
        paddingLeft: wp('30%'),
    },
    notificationCard: {
        display: 'flex',
        // flex: 1,
        // position: 'absolute',
        backgroundColor: colors.white,
        margin: '2%',
        marginLeft: '5%',
        borderRadius: wp('2%'),
        height: hp('9.47%'),
        width: wp('90.13%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4%'),
    },
})

export default Notifications
