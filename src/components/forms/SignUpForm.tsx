// react
import React, { Component } from "react"
// react-native
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native"
// formik
import { Formik } from "formik"
// react-native-responsive-screen
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
// components
import CustomButton from "../buttons/CustomButton"
// services
import AuthService from "../../services/auth.service"
// yup
import * as yup from "yup"
// colors
import { colors } from "../../lib/colors"
// icons
import { CloseEye, OpenEye } from "../../../assets/svgs/icons"

interface ISignUpFormProps {
  onPressSignUp: (loading: boolean, username?: string, email?: string) => void
  navigation: any
}

const authService = new AuthService()

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
interface IState {
  showPassword: boolean
}
class SignUpForm extends Component<ISignUpFormProps, IState> {
  formRef: any
  constructor(props: ISignUpFormProps) {
    super(props)
    {
      this.state = {
        showPassword: false,
      }
      this.formRef = React.createRef()
    }
  }

  onSubmitValues = (values: any) => {
    const { onPressSignUp } = this.props
    onPressSignUp(true)

    authService
      .register(values)
      .then((response) => {
        authService
          .authenticateUser(response.access, response.refresh)
          .then(() => {
            this.props.navigation.navigate("pickYourChoice")
          })
      })
      .catch((error) => {
        onPressSignUp(false, error)
        console.log(error, "error in sign up form")
        this.formRef.current.resetForm()
      })
  }

  handleEyeIconPress = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }
  render() {
    const { showPassword } = this.state
    return (
      <Formik
        innerRef={this.formRef}
        validationSchema={loginValidationSchema}
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          this.onSubmitValues(values)
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
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
            <View style={styles.passwordContainer}>
              <TextInput
                onChangeText={handleChange("password")}
                placeholder="Enter Password"
                style={[styles.inputBox, styles.password]}
                secureTextEntry={showPassword ? false : true}
                value={values.password}
              />
              {values.password !== "" &&
                (showPassword ? (
                  <Pressable onPress={this.handleEyeIconPress}>
                    <OpenEye width={wp("5%")} height={wp("5%")} />
                  </Pressable>
                ) : (
                  <Pressable onPress={this.handleEyeIconPress}>
                    <CloseEye width={wp("5%")} height={wp("5%")} />
                  </Pressable>
                ))}
            </View>
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
  password: {
    borderBottomWidth: 0,
    width: "93%",
    padding: 0,
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#DFE1E6",
    alignItems: "center",
  },

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
    display: "flex",
    alignSelf: "flex-start",
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
