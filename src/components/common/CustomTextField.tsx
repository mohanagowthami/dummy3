import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
interface ICustomTextFieldProps {
    onCallBack?: (value: any) => void
    autoFocus?: boolean
    placeholder?: string
    style?: any
    value?: string
    handleChange?: () => void
    maxLength?: number
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
        console.log(this.state.text, 'text123')
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
            },
        })
        const { style, value, handleChange } = this.props
        console.log(
            this.state.text,
            this.props.value,
            this.props.handleChange,
            'text123'
        )
        return (
            <>
                <TextInput
                    {...this.props}
                    style={[styles.textInput, style]}
                    onChangeText={
                        handleChange ? handleChange : this.handleChange
                    }
                    value={value ? value : this.state.text}
                    onBlur={this.handleBlur}
                />
            </>
        )
    }
}
export default CustomTextField
