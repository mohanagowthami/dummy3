import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

interface ICustomTextFieldProps {
  onCallBack: (value: any) => void;
  autoFocus?: boolean;
  placeholder?: string;
  style?: any;
}

interface ICustomTextFieldState {
  text: string;
}

class CustomTextField extends Component<
  ICustomTextFieldProps,
  ICustomTextFieldState
> {
  constructor(props: any) {
    super(props);
    this.state = { text: "" };
  }

  handleChange = (text: string) => {
    console;
    this.setState({
      text: text,
    });
  };

  handleBlur = () => {
    console.log(this.state.text, "text123");
    this.props.onCallBack(this.state.text);
  };
  render() {
    const { style } = this.props;
    return (
      <>
        <TextInput
          {...this.props}
          style={styles.textInput}
          onChangeText={this.handleChange}
          value={this.state.text}
          onBlur={this.handleBlur}
        />
      </>
    );
  }
}
export default CustomTextField;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: "2%",
    borderBottomWidth: 2,
    borderBottomColor: "#DFE1E6",
    fontFamily: "AirbnbCerealBook",
  },
});
