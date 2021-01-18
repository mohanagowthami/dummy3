import * as React from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import NextSvg from '../../assets/svgs/NextSvg'
import OnBoardOneSvg from '../../assets/svgs/OnBoardOneSvg'
import OnBoardTwoSvg from '../../assets/svgs/OnBoardTwoSvg'
import OnBoardThreeSvg from '../../assets/svgs/OnBoardThreeSvg'
import { colors } from '../lib/colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

// inteface of carousel layout
interface CarouselItem {
    SVG: any
    title: string
    subHeading: string
    backgroundColor: string
}

//inerface of state
interface State {
    activeIndex: number
    carouselItems: Array<CarouselItem>
}

// interface to pass navigation
interface Props {
    navigation: any
}

// Main Class
class OnboardingScreens extends React.Component<Props, State> {
    carousel: any
    constructor(props: any) {
        super(props) // getting props
        this.state = {
            activeIndex: 0,
            // data to be put up on onboarding screens
            carouselItems: [
                {
                    SVG: OnBoardOneSvg,
                    title: 'Humanize',
                    subHeading: 'Your friend on the go',
                    backgroundColor: colors.skyBlue,
                },
                {
                    SVG: OnBoardTwoSvg,
                    title: 'Personlize',
                    subHeading: 'Customized exclusively for you.',
                    backgroundColor: colors.orange,
                },
                {
                    SVG: OnBoardThreeSvg,
                    title: 'Localize',
                    subHeading: 'Explore, experience and enjoy.',
                    backgroundColor: colors.yellow,
                },
            ],
        }
    }
    _isMounted = false
    // check mounting of component
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }
    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    //navigation function
    _handleNavigation = () => {
        console.log('Navigate')
        this.props.navigation.navigate('login')
    }

    // function to render carousel
    _renderItem({ item, index }: any) {
        const styles = StyleSheet.create({
            ItemContainer: {
                display: 'flex',
                padding: '5%',
                width: wp('100%'),
                height: hp('100%'),
            },
            ItemBottomContainer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '30%', //40%
            },
            skipText: {
                fontFamily: 'AirbnbCerealBold',
                color: colors.white,
                fontSize: wp('4%'),
                lineHeight: wp('5%'),
            },
            titleContainer: {},
            line: {
                height: wp('10%'),
                width: wp('1%'),
                backgroundColor: colors.white,
                marginRight: wp('3%'),
            },
            lineContainer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            titleText: {
                fontFamily: 'AirbnbCerealBold',
                color: colors.white,
                fontSize: wp('5%'),
                lineHeight: wp('6%'),
            },
            subHeadingText: {
                fontFamily: 'AirbnbCerealBook',
                color: colors.white,
                fontSize: wp('5%'),
                lineHeight: wp('7%'),
                marginTop: wp('5%'),
                marginRight: wp('5%'),
            },
            bottomWrapper: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        })

        //carousel data as props to item
        const { SVG, title, subHeading, backgroundColor } = item
        return (
            <ScrollView
                style={[
                    styles.ItemContainer,
                    { backgroundColor: backgroundColor, paddingTop: '25%' },
                ]}
            >
                <View
                    style={{
                        /*  height: '50%', */ paddingBottom: '5%',
                        paddingLeft: '0%',
                    }}
                >
                    <SVG
                        width={wp('99.51%')}
                        height={hp('36.18%')}
                        // viewBox={`0 0 ${wp('99.51%')} ${hp('36.18%')}}`}
                        // viewBox={`0 0 ${{width}} ${hp('36.18%')}}`}
                    />
                </View>

                <View style={styles.bottomWrapper}>
                    <View>
                        <View style={styles.lineContainer}>
                            <View style={styles.line}></View>

                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <Text style={styles.subHeadingText}>{subHeading}</Text>
                    </View>
                    <View style={styles.ItemBottomContainer}>
                        <NextSvg
                            onPress={() => console.log('Next')}
                            left={wp('42.66%')}
                        />
                        <Text
                            style={styles.skipText}
                            // onPress={() => this.props.navigation('signUp')}
                        >
                            Skip
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    get pagination() {
        const { activeIndex, carouselItems } = this.state

        return (
            <ScrollView style={{ position: 'absolute', bottom: 0 }}>
                <Pagination
                    dotsLength={carouselItems.length}
                    activeDotIndex={activeIndex}
                    dotStyle={{
                        width: wp('4.16%'),
                        height: hp('1.18%'),
                        borderRadius: hp('7.23%'),
                        marginHorizontal: 0,
                        backgroundColor: 'white',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.8}
                    inactiveDotStyle={{
                        width: wp('2.4%'),
                        height: hp('1.18%'),
                        borderRadius: hp('0.59%'),
                        marginHorizontal: 0,
                    }}
                />
            </ScrollView>
        )
    }

    render() {
        // const { navigation } = this.props
        const currentObject = this

        return (
            <SafeAreaView>
                <ScrollView>
                    <Carousel
                        layout={'default'}
                        ref={(ref: any) => (this.carousel = ref)}
                        data={this.state.carouselItems}
                        sliderWidth={wp('100%')}
                        itemWidth={wp('100%')}
                        renderItem={this._renderItem}
                        onSnapToItem={(index: number) => {
                            console.log(index + 1)
                            // console.log(navigate('login'))
                            currentObject.setState({
                                ...currentObject.state,
                                activeIndex: index,
                            })
                        }}
                    />
                    {/* <Text
                        style={{
                            paddingTop: 30,
                        }}
                        onPress={this._handleNavigation}
                    >
                        Skip
                    </Text> */}
                    {this.pagination}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default OnboardingScreens
