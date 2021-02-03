// react-native-gesture-handler
import { ScrollView } from "react-native-gesture-handler"
// react
import React, { Component } from "react"
// react-native
import { Text, View, StyleSheet, Image, Pressable } from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"

// colors
import { colors } from "../lib/colors"

interface IProps {
    navigation: any
    route: any
    hallOfFameList: any
}

// state - data
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

class HallOfFame extends Component<IProps, Istate> {
    render() {
        const { hallOfFameList } = this.props.route.params
        console.log(hallOfFameList, "hallofFameList")
        return (
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View style={[styles.TitleContainer]}>
                        <Text style={styles.frappyText}>Hall of Fame</Text>
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
                        {hallOfFameList &&
                            hallOfFameList.map((item: any, index: number) => {
                                return (
                                    <View key={index}>
                                        <Image
                                            style={styles.hallOfFameImage}
                                            source={{
                                                uri: item.image,
                                            }}
                                        />
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
        padding: "2%",
        // paddingTop: hp('2%'),
        // backgroundColor: colors.white,
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
        // paddingLeft: wp('7.44%'),
        paddingTop: hp("1.2%"),
        // paddingRight: wp('15.46%'),
    },
    title: {
        fontFamily: "ArchivoBold",
        fontSize: wp("5%"),
        // paddingTop: hp('2%'),
        // justifyContent: 'center',
        // paddingLeft: wp('6%'),
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
    hallOfFameImage: {
        width: wp("25%"),
        height: wp("25%"),
        marginTop: wp("5%"),
        borderRadius: wp("5%"),
    },
})

export default HallOfFame
