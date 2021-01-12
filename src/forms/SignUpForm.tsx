import React, { Component } from "react";
import CustomTextField from "../components/common/CustomTextField";
import { Formik } from "formik";
import CustomButton from "../components/common/CustomButton";
import { View, StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
class SignUpForm extends Component<{}, {}> {
  onPressOTPButton = () => {};

  render() {
    return (
      <Formik
        initialValues={{ mobileNumber: "", fullName: "", email: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <CustomTextField
              placeholder="Mobile Number"
              onCallBack={handleChange("mobileNumber")}
              value={values.mobileNumber}
              style={styles.inputBox}
            />
            <CustomTextField
              placeholder="Full Name"
              onCallBack={handleChange("fullName")}
              value={values.fullName}
              style={styles.inputBox}
            />
            <CustomTextField
              placeholder="Email ID"
              onCallBack={handleChange("email")}
              value={values.email}
              style={styles.inputBox}
            />
            <CustomButton
              title="Get OTP"
              buttonType="basic"
              onPressButton={handleSubmit}
              style={styles.inputBox}
            />
          </View>
        )}
      </Formik>
    );
  }
}
export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    width: wp("80.33%"),
  },
  inputBox: {
    width: wp("85.33%"),
    marginLeft: wp("0%"),
    fontSize: hp("1.576%"),
    marginRight: wp("0%"),
    borderRadius: wp("2.66%"),
    margin: "7%",
    marginHorizontal: 0,
  },
});
