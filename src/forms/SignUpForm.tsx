import React, { Component } from "react";
import CustomTextField from "../components/common/CustomTextField";
import { Formik } from "formik";
import CustomButton from "../components/common/CustomButton";
import { View,StyleSheet } from "react-native";


interface ISignUpFormProps
{
  onPressGetOTP :()=>void
  
  }

class SignUpForm extends Component<ISignUpFormProps, {}> {
    
    
  render() {
    return <Formik
          initialValues={{ mobileNumber: "", fullName: "", email: "" }}
      onSubmit={(values) => {
        console.log(values)
        this.props.onPressGetOTP()
          }}
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
                      style={styles.getOTPButton}
              />
            </View>
          )}
        </Formik>
     

  }
}
export default SignUpForm;

const styles = StyleSheet.create({
    container: {
    width: "100%",
    display: "flex",
      alignItems:"center"
    },
    inputBox: {
        margin: "7%",
      marginHorizontal: 0,
  },
  getOTPButton: {
    width: "100%",
    margin: "7%",
   

    
    }
})
