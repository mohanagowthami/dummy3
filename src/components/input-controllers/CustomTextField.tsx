// react
import React, { Component } from "react"
// react-native
import { TextInput, StyleSheet } from "react-native"
// react-native-responsive
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
// colors
import { colors } from "../../lib/colors"

interface ICustomTextFieldProps {
  onChange: (value: any) => void
  autoFocus?: boolean
  placeholder?: string
  style?: any
  value?: string
  handleChange?: () => void
  onCallBack?: (value: any) => void
  maxLength?: number
  textAlign?: any
  multiline?: boolean
  textAlignVertical?: any
  placeholderTextColor?: any
  secureText?: boolean
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
    this.state = { text: "" }
  }
  handleChange = (text: string) => {
    this.props.onChange(text)
    this.setState({
      text: text,
    })
  }
  render() {
    const { style, value, handleChange, secureText } = this.props
    return (
      <TextInput
        {...this.props}
        style={[styles.textInput, style]}
        onChangeText={handleChange ? handleChange : this.handleChange}
        value={value ? value : this.state.text}
        secureTextEntry={secureText ? true : false}
      />
    )
  }
}
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: "2%",
    borderBottomWidth: 2,
    borderBottomColor: "#DFE1E6",
    fontFamily: "AirbnbCerealBook",
    fontSize: hp("2%"),
    color: colors.greyTwo,
  },
})
export default CustomTextField
