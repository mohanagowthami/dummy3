import React, { Component, ReactNode } from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import { colors } from '../../lib/colors'
interface ICustomButtonProps {
    title?: string
    onPressButton: () => void
    buttonStyles?: any
    buttonTextStyles?: any
    buttonType?: any // added
    style?: any //added
}
class CustomButton extends Component<ICustomButtonProps, {}> {
    handlePress = () => {
        this.props.onPressButton()
    }

    renderBasicButton = () => {
        const { buttonStyles, buttonTextStyles, title } = this.props
        return (
            <View style={[styles.basicButton, buttonStyles]}>
                <Text style={[styles.buttonTitle, buttonTextStyles]}>
                    {title}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <Pressable onPress={this.handlePress}>
                {this.renderBasicButton()}
            </Pressable>
        )
    }
}
export default CustomButton

const styles = StyleSheet.create({
    basicButton: {
        backgroundColor: colors.orange,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('85.33%'),
        margin: '5%',
        marginLeft: wp('0%'),
        marginRight: wp('0%'),
        borderRadius: wp('2.66%'),
        padding: '5%',
    },

    buttonTitle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('1.576%'),
    },
})
