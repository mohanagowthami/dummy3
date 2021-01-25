import React, { Component } from 'react'

import { Formik } from 'formik'
import CustomButton from '../buttons/CustomButton'
import { View, StyleSheet } from 'react-native'
import CustomTextField from '../input-controllers/CustomTextField'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'
interface ISignUpFormProps {
    onPressGetOTP: () => void
}

class SignUpForm extends Component<ISignUpFormProps, {}> {
    _isMounted = false
    // check mounting of component
    componentDidMount() {
        this._isMounted = true
        loc(this)
    }
    componentWillUnMount() {
        this._isMounted = false
        rol()
    }
    render() {
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
                margin: '7%',
                marginLeft: wp('0%'),
                // fontSize: hp("1.576%"),
                marginRight: wp('0%'),
                // borderRadius: wp("2.66%"),
            },
        })

        return (
            <Formik
                initialValues={{ mobileNumber: '', fullName: '', email: '' }}
                onSubmit={(values) => {
                    this.props.onPressGetOTP()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.container}>
                        <CustomTextField
                            placeholder="Mobile Number"
                            onCallBack={handleChange('mobileNumber')}
                            value={values.mobileNumber}
                            style={styles.inputBox}
                        />
                        <CustomTextField
                            placeholder="Full Name"
                            onCallBack={handleChange('fullName')}
                            value={values.mobileNumber}
                            style={styles.inputBox}
                        />
                        <CustomTextField
                            placeholder="Email ID"
                            onCallBack={handleChange('email')}
                            value={values.email}
                            style={styles.inputBox}
                        />
                        <View style={styles.getOTPButton}>
                            <CustomButton
                                title="Get OTP"
                                onPressButton={handleSubmit}
                                buttonTextStyles={[
                                    {
                                        fontFamily: 'ArchivoBold',
                                        fontSize: wp('4%'),
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
export default SignUpForm