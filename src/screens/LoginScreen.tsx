import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "../components/common/CustomButton";
import CustomTextField from "../components/common/CustomTextField";

class LoginScreen extends Component<{}, {}> {
  callBack = (value: string) => {
    console.log(value, "on call back value");
  };

  onPressOTPButton = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/welcome.png")}
          resizeMode={"contain"}
        />
        <Text style={styles.loginText}>Login</Text>
        <CustomTextField
          onCallBack={this.callBack}
          placeholder="Mobile Number"
        />
        <CustomButton
          title="Get OTP"
          buttonType="basic"
          onPressButton={this.onPressOTPButton}
        />
        <View style={styles.loginBottom}></View>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "10%",
    paddingBottom: 0,
  },
  tinyLogo: {
    width: "90%",
    height: "30%",
  },
  loginText: {
    color: "#010101",
    margin: "1%",

    fontSize: 36,
    fontFamily: "AirbnbCerealBold",
  },
  inputBox: {
    marginTop: "7%",
  },
  loginBottom: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    borderColor: "blue",
  },
});
