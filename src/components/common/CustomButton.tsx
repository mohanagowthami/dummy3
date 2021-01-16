import React, { Component, ReactNode } from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
interface ICustomButtonProps {
    children?: ReactNode
    buttonType?: string
    title?: string
    onPressButton: () => void
    style?: any
}
class CustomButton extends Component<ICustomButtonProps, {}> {
    _isMounted = false
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }

    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    handlePress = () => {
        this.props.onPressButton()
    }

    renderBasicButton = () => {
        const styles = StyleSheet.create({
            basicButton: {
                backgroundColor: '#FF6C65',
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: hp('1.576%'),
            },
        })
        return (
            <View style={[styles.basicButton, this.props.style]}>
                <Text style={styles.buttonTitle}>{this.props.title}</Text>
            </View>
        )
    }

    render() {
        const { children, buttonType } = this.props
        return (
            <Pressable
                onPress={this.handlePress}
                style={buttonType === 'basic' && { width: '100%' }}
            >
                {buttonType === 'basic' ? this.renderBasicButton() : children}
            </Pressable>
        )
    }
}
export default CustomButton
