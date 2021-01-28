// react
import React, { Component } from 'react'
// react-native
import { View, StyleSheet, TextInput } from 'react-native'
// formik
import { Formik } from 'formik'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

// components
import CustomButton from '../buttons/CustomButton'
import CustomTextField from '../input-controllers/CustomTextField'
// services
import AuthService from '../../services/auth.service'

interface ISignUpFormProps {
    onPressGetOTP: () => void
}

const authService = new AuthService()
class SignUpForm extends Component<ISignUpFormProps, {}> {
    onSubmitValues = (values: any) => {
        console.log(values, 'values in sign up')
        authService
            .register(values)
            .then((response) => {
                authService.authenticateUser(response.access, response.refresh)
            })
            .then(() => {
                this.props.onPressGetOTP()
            })
            .catch((error) => {
                console.log(error, 'error in sign up')
                this.props.onPressGetOTP()
            })
    }
    render() {
        return (
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                onSubmit={(values) => {
                    this.onSubmitValues(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.container}>
                        <TextInput
                            placeholder="User Name"
                            onChangeText={handleChange('username')}
                            value={values.username}
                            style={styles.inputBox}
                        />
                        <TextInput
                            placeholder="Email ID"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            style={styles.inputBox}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            style={styles.inputBox}
                        />
                        <View style={styles.getOTPButton}>
                            <CustomButton
                                title="Get OTP"
                                onPressButton={handleSubmit}
                                buttonTextStyles={[
                                    {
                                        fontFamily: 'ArchivoBold',
                                        fontSize: wp('3%'),
                                    },
                                ]}
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    getOTPButton: {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: wp('85.33%'),
        margin: '3%',
        marginLeft: wp('0%'),
        fontSize: wp('3%'),
        marginRight: wp('0%'),
        padding: wp('2%'),
        borderBottomWidth: 2,
        paddingLeft: 0,
        borderBottomColor: '#DFE1E6',
        // borderRadius: wp("2.66%"),
    },
})
export default SignUpForm
