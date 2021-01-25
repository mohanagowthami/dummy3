import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
import { colors } from '../../lib/colors'
interface ICustomTextFieldProps {
    onCallBack?: (value: any) => void
    autoFocus?: boolean
    placeholder?: string
    style?: any
    value?: string
    handleChange?: () => void
    maxLength?: number
    textAlign?: any
    multiline?: boolean
    textAlignVertical?: any
    placeholderTextColor?: any
}

interface ICustomTextFieldState {
    text: string
}

class CustomTextField extends Component<
    ICustomTextFieldProps,
    ICustomTextFieldState
> {
    constructor(props: any) {
        super(props)
        this.state = { text: '' }
    }
    _isMounted = false
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }

    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    handleChange = (text: string) => {
        console
        this.setState({
            text: text,
        })
    }

    handleBlur = () => {
        this.props.onCallBack && this.props.onCallBack(this.state.text)
    }
    render() {
        const styles = StyleSheet.create({
            textInput: {
                width: '100%',
                padding: '2%',
                borderBottomWidth: 2,
                borderBottomColor: '#DFE1E6',
                fontFamily: 'AirbnbCerealBook',
                fontSize: hp('2%'),
                color: colors.greyTwo,
            },
        })
        const { style, value, handleChange } = this.props

        return (
            <TextInput
                {...this.props}
                style={[styles.textInput, style]}
                onChangeText={handleChange ? handleChange : this.handleChange}
                value={value ? value : this.state.text}
                onBlur={this.handleBlur}
            />
        )
    }
}
export default CustomTextField
