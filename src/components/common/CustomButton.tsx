import React, { Component, ReactNode } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
interface ICustomButtonProps {
  children?: ReactNode;
  buttonType?: string;
  title?: string;
  onPressButton: () => void;
  style?: any;
}
class CustomButton extends Component<ICustomButtonProps, {}> {
  handlePress = () => {
    this.props.onPressButton();
  };

  renderBasicButton = () => {
    return (
      <View style={styles.basicButton}>
        <Text style={styles.buttonTitle}>{this.props.title}</Text>
      </View>
    );
  };

  render() {
    const { children, buttonType } = this.props;
    return (
      <Pressable
        onPress={this.handlePress}
        style={this.props.buttonType === "basic" ? styles.pressButton : null}
      >
        {buttonType === "basic" ? this.renderBasicButton() : children}
      </Pressable>
    );
  }
}
export default CustomButton;

const styles = StyleSheet.create({
  basicButton: {
    backgroundColor: "#FF6C65",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85.33%"),
    margin: "5%",
    marginLeft: wp("0%"),
    marginRight: wp("0%"),
    borderRadius: wp("2.66%"),
    padding: "5%",
  },
  pressButton: {
    width: wp("85.33%"),
  },
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("1.576%"),
  },
});
