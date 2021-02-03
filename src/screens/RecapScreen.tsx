// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Image } from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"

//icons
import { NavigationIcon } from "../../assets/svgs/icons/icons-directions"
import { Rating } from "../../assets/svgs/icons"
// colors
import { colors } from "../lib/colors"

interface IProps {
    navigation: any
    route: any
    recapList: any
}

interface Istate {}

const colorsList = [
    "#FFEA75",
    "#FFE8E7",
    "#C3F4FF",
    "#E2F0FF",
    "#FFE2F5",
    "#E1E2FF",
    "#FFE5B2",
]

const dummyImage =
    "https://icon2.cleanpng.com/20180202/pre/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083c57a5f5.317349121517619260359.jpg"
class Recap extends Component<IProps, Istate> {
    render() {
        const { recapList } = this.props.route.params
        console.log(recapList, "recapList")
        return (
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View style={[styles.TitleContainer]}>
                        <Text style={styles.frappyText}>Recap</Text>
                    </View>
                    <View>
                        {recapList &&
                            recapList.map((ele: any, index: number) => {
                                const {
                                    name,
                                    address,
                                    averageRatings,
                                    numberOfRatings,
                                    review_images,
                                } = ele
                                return (
                                    <View key={index}>
                                        <View
                                            style={styles.recapItemContaineer}
                                        >
                                            <Image
                                                source={{
                                                    uri: review_images[0]
                                                        ? review_images[0].image
                                                        : dummyImage,
                                                }}
                                                style={styles.recapImage}
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
                                                        fontSize: wp("4.2%"),
                                                        color: colors.darkBlack,
                                                    }}
                                                >
                                                    {name}
                                                </Text>
                                                <Text
                                                    style={styles.recapCardText}
                                                >
                                                    {address}
                                                </Text>
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Rating
                                                        width={wp("4.2")}
                                                        height={wp("4.2")}
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
                                                        {averageRatings}(
                                                        {numberOfRatings}{" "}
                                                        ratings)
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    display: "flex",
                                                    alignSelf: "flex-end",
                                                }}
                                            >
                                                <NavigationIcon
                                                    width={wp("7.8%")}
                                                    height={hp("3.68%")}
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
            </ScrollView>
        )
    }
}

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
    mainContainer: {
        display: "flex",
        padding: "4%",
        backgroundColor: colors.white,
    },
    heading: {
        display: "flex",
        paddingTop: hp("2%"),
        paddingBottom: hp("2.10%"),
        paddingLeft: wp("7.46%"),
        paddingRight: wp("5.33%"),
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "cyan",
    },
    backicon: {
        paddingTop: hp("1.2%"),
    },
    title: {
        fontFamily: "ArchivoBold",
        fontSize: wp("5%"),
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

export default Recap
