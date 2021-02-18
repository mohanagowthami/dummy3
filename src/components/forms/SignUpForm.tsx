// react
import React, { Component } from "react"
// react-native
import { View, StyleSheet, TextInput, Text } from "react-native"
// formik
import { Formik } from "formik"
// react-native-responsive-screen
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

// components
import CustomButton from "../buttons/CustomButton"
// services
import AuthService from "../../services/auth.service"

interface ISignUpFormProps {
  onPressGetOTP: () => void
}

const authService = new AuthService()

import * as yup from "yup"
import { colors } from "../../lib/colors"

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  username: yup.string().required("username is required"),
})
class SignUpForm extends Component<ISignUpFormProps, {}> {
  onSubmitValues = (values: any) => {
    authService
      .register(values)
      .then((response) => {
        authService.authenticateUser(response.access, response.refresh)
      })
      .then(() => {
        this.props.onPressGetOTP()
      })
      .catch((error) => {
        this.props.onPressGetOTP()
      })
  }
  render() {
    return (
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          this.onSubmitValues(values)
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <TextInput
              placeholder="Enter User Name"
              onChangeText={handleChange("username")}
              value={values.username}
              style={styles.inputBox}
            />
            {touched.username && errors.username ? (
              <Text style={styles.error}>{errors.username}</Text>
            ) : null}
            <TextInput
              placeholder="Enter Email ID"
              onChangeText={handleChange("email")}
              value={values.email}
              style={styles.inputBox}
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <TextInput
              placeholder="Enter Password"
              onChangeText={handleChange("password")}
              value={values.password}
              style={styles.inputBox}
            />
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <View style={styles.getOTPButton}>
              <CustomButton
                title="Register"
                onPressButton={handleSubmit}
                buttonTextStyles={styles.buttonTextStyles}
              />
            </View>
          </View>
        )}
      </Formik>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  getOTPButton: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  error: {
    color: colors.orange,
    fontSize: wp("3%"),
    fontFamily: "ArchivoRegular",
  },
  inputBox: {
    width: wp("85.33%"),
    margin: "3%",
    marginLeft: wp("0%"),
    fontSize: wp("4.26%"),
    marginRight: wp("0%"),
    padding: wp("2%"),
    borderBottomWidth: 2,
    paddingLeft: 0,
    borderBottomColor: "#DFE1E6",
    // borderRadius: wp("2.66%"),
  },
  buttonTextStyles: {
    fontFamily: "ArchivoBold",
    fontSize: wp("4%"),
  },
})
export default SignUpForm
