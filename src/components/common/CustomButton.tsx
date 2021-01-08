import React, { Component, ReactNode } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";

interface ICustomButtonProps {
  children?: ReactNode;
  buttonType?: string;
  title?: string;
  onPressButton: () => void;
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
        <Pressable onPress={this.handlePress} style={this.props.buttonType === "basic" ? styles.pressButton : null}  >
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
        width: "100%",
        margin: "5%",
        marginLeft: 0,
        marginRight: 0,
        borderRadius:10,
    padding:"5%",
    },
    pressButton:
    {
        width: "100%"
    },
    buttonTitle: {
        color: "white",
    fontWeight: "bold",
    fontSize: 14,
    }
});
