// react
import * as React from 'react'
// react-native
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
// react-native-snap-carousel
import Carousel, { Pagination } from 'react-native-snap-carousel'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// icons
import { NextSvg } from '../../assets/svgs/icons'
// colors
import { colors } from '../lib/colors'
import { content } from '../lib/content'
import Animated from 'react-native-reanimated'

// onboarding images
const onboarding1 = require('../../assets/images/onboarding/onboardingone.png')
const onboarding2 = require('../../assets/images/onboarding/onboardingtwo.png')
const onboarding3 = require('../../assets/images/onboarding/onboardingthree.png')

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
                    SVG: onboarding1,
                    title: content.onBoarding.onBoardingTitleOne,
                    subHeading: content.onBoarding.onBoardingSubHeadingOne,
                    backgroundColor: colors.skyBlue,
                },
                {
                    SVG: onboarding2,
                    title: content.onBoarding.onBoardingTitleThree,
                    subHeading: content.onBoarding.onBoardingSubHeadingTwo,
                    backgroundColor: colors.orange,
                },
                {
                    SVG: onboarding3,
                    title: content.onBoarding.onBoardingTitleThree,
                    subHeading: content.onBoarding.onBoardingSubHeadingThree,
                    backgroundColor: colors.darkyellow,
                },
            ],
        }
    }
    get pagination() {
        const { activeIndex, carouselItems } = this.state
        return (
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeIndex}
                dotStyle={styles.activeDot}
                inactiveDotScale={1}
                inactiveDotStyle={[
                    styles.inactiveDot,
                    {
                        backgroundColor:
                            activeIndex < carouselItems.length
                                ? this.state.carouselItems[activeIndex]
                                      .backgroundColor
                                : colors.white,
                    },
                ]}
            />
        )
    }
    // function to render carousel
    _renderItem({ item, index }: any) {
        //carousel data as props to item
        const { SVG, title, subHeading, backgroundColor } = item
        const { navigation } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: backgroundColor,
                }}
            >
                {/* OnBoarding Image */}
                <View
                    style={{
                        paddingTop: hp('11.84%'),
                        paddingBottom: hp('12.89%'),
                    }}
                >
                    <Image
                        style={{ width: wp('100%'), height: hp('36%') }}
                        resizeMode="contain"
                        source={SVG}
                    />
                </View>
                {/* OnBoarding Text */}
                <View>
                    <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <Text style={styles.subHeadingText}>{subHeading}</Text>
                </View>
                {/* OnBoarding Bottom Buttons */}
                <View style={styles.bottomContainer}>
                    <View style={styles.wrapper}>
                        {this.pagination}
                        {/* Next Button*/}
                        <View style={{ paddingLeft: wp('2%') }}>
                            <NextSvg
                                width={wp('14.66%')}
                                height={hp('8.23%')}
                                onPress={() => {
                                    const temp = { ...this.state }
                                    temp.activeIndex = temp.activeIndex + 1
                                    temp.activeIndex <
                                    this.state.carouselItems.length
                                        ? this.carousel.snapToNext()
                                        : navigation.navigate('signUp')
                                    this.setState(temp)
                                }}
                            />
                        </View>
                        {/* Skip */}
                        <Pressable
                            onPress={() => navigation.navigate('signUp')}
                        >
                            <Text style={styles.skipText}>Skip</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const currentObject = this
        return (
            <Carousel
                scrollEnabled={true}
                layout={'default'}
                ref={(ref: any) => (this.carousel = ref)}
                data={this.state.carouselItems}
                sliderWidth={wp('100%')}
                itemWidth={wp('100%')}
                renderItem={this._renderItem.bind(this)}
                onSnapToItem={(index: number) => {
                    currentObject.setState({
                        ...currentObject.state,
                        activeIndex: index,
                    })
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    ItemBottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '3%',
    },
    skipText: {
        fontFamily: 'AirbnbCerealBold',
        color: colors.white,
        fontSize: wp('4.8%'),
        paddingLeft: wp('10%'),
        lineHeight: wp('5%'),
    },
    titleContainer: {},
    line: {
        height: hp('6.18%'),
        width: wp('1.33%'),
        borderRadius: 4,
        backgroundColor: colors.white,
        marginRight: wp('3%'),
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    titleText: {
        fontFamily: 'AirbnbCerealBold',
        color: colors.white,
        fontSize: wp('8%'),
        fontWeight: 'bold',
        lineHeight: hp('7%'),
    },
    subHeadingText: {
        fontFamily: 'AirbnbCerealBook',
        color: colors.white,
        paddingHorizontal: '9%',
        // paddingTop: '5%',
        fontSize: wp('6%'),
        // lineHeight: wp('7%'),
        // marginTop: wp('5%'),
        marginTop: wp('3%'),
        marginRight: wp('5%'),
    },
    bottomWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: wp('9.75%'),
        paddingBottom: hp('2%'),
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activeDot: {
        width: wp('4.16%'),
        height: wp('2.08%'),
        borderRadius: wp('1.04%'),
        marginHorizontal: 0,
        backgroundColor: colors.white,
    },
    inactiveDot: {
        width: wp('2.4%'),
        height: wp('2.4%'),
        borderRadius: wp('1.2%'),
        marginHorizontal: 0,
        borderColor: colors.white,
        borderWidth: wp('0.26667%'),
    },
})
export default OnboardingScreens
