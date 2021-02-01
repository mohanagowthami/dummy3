// react
import React, { Component } from "react"
// react-native
import { Text, StyleSheet } from "react-native"
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../lib/colors"

class LuckyCardsScreen extends Component<{}, {}> {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text
                    style={{ fontFamily: "ArchivoRegular", fontSize: wp("6%") }}
                >
                    Lucky Cards Screen
                </Text>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        paddingTop: hp("0.5%"),
        padding: wp("1%"),
        backgroundColor: colors.white,
    },
})
export default LuckyCardsScreen
