import React, { Component } from "react";
import CustomTextField from "../components/common/CustomTextField";
import { Formik } from "formik";
import CustomButton from "../components/common/CustomButton";
import { View,StyleSheet } from "react-native";

class SignUpForm extends Component<{}, {}> {
    onPressOTPButton = () => { };
    
  render() {
    return <Formik
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
                    value={values.mobileNumber}
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
     

  }
}
export default SignUpForm;

const styles = StyleSheet.create({
    container: {
        width:"100%"
    },
    inputBox: {
        margin: "7%",
        marginHorizontal:0
        
    }
})
