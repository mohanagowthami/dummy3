import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import CustomButton from '../components/buttons/CustomButton'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { colors } from '../lib/colors'

interface IOtpModal {
    navigation: any
}
// interface for modal state
interface State {
    modalVisible: any
}

class OtpModal extends React.Component<IOtpModal, State> {
    inputRef: any
    constructor(props: IOtpModal) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.inputRef = Array(4).fill(React.createRef())
    }
    onPressVerifyAndContinue = () => {
        this.setModalVisible()
        this.props.navigation.navigate('pickYourChoice')
    }
    setModalVisible = () => {
        this.setState((prevState, props) => ({
            modalVisible: !prevState.modalVisible,
        }))
    }
    onPressGetOTP = () => {
        this.setModalVisible()
    }
    onChangeOtp = (index: number) => {
        this.inputRef[index].focus()
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>OTP Verification</Text>
                <Text style={styles.modalDescription}>
                    Enter the OTP you received to{' '}
                </Text>
                <Text style={styles.phonenumber}>+91-9100950567</Text>
                {/* OTP Section*/}
                <View style={styles.otpFieldContainer}>
                    <TextInput
                        autoFocus
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(1)}
                        ref={(ref) => (this.inputRef[0] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(2)}
                        ref={(ref) => (this.inputRef[1] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        onChangeText={() => this.onChangeOtp(3)}
                        ref={(ref) => (this.inputRef[2] = ref)}
                    />
                    <TextInput
                        style={styles.customTextFieldStyles}
                        maxLength={1}
                        ref={(ref) => (this.inputRef[3] = ref)}
                    />
                </View>

                <CustomButton
                    title="Verify and Continue"
                    buttonStyles={{ width: wp('69.33%') }}
                    buttonTextStyles={{
                        fontFamily: 'ArchivoBold',
                        fontSize: wp('4%'),
                    }}
                    onPressButton={this.onPressVerifyAndContinue}
                />
                <Text style={styles.codeText}>
                    Did’t receive code?
                    <Text style={styles.resendOTP}> Resend OTP</Text>
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: '5%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: wp('90%'),
    },
    modalTitle: {
        fontSize: wp('4%'),
        fontStyle: 'normal',
        fontFamily: 'AirbnbCerealBold',
    },
    modalDescription: {
        fontSize: wp('3%'),
        fontFamily: 'AirbnbCerealBook',
        color: colors.grey,
        fontWeight: '400',
        margin: wp('3%'),
    },
    phonenumber: {
        fontSize: wp('3%'),
        fontFamily: 'AirbnbCerealBold',
        color: colors.grey,
        fontWeight: 'bold',
        margin: wp('3%'),
        textAlign: 'center',
        marginTop: 0,
    },
    codeText: {
        fontSize: wp('3%'),
        fontFamily: 'AirbnbCerealBook',
        color: colors.grey,
        fontWeight: '400',
        margin: wp('3%'),
    },
    resendOTP: {
        fontSize: wp('3%'),
        fontFamily: 'AirbnbCerealBook',
        color: colors.orange,
        fontWeight: '400',
        margin: wp('4%'),
    },
    otpFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: '3%',
        marginTop: 0,
    },
    customTextFieldStyles: {
        width: wp('13.33%'),
        borderBottomColor: colors.darkGrey,
        padding: '2%',
        borderBottomWidth: 2,
        textAlign: 'center',
        fontFamily: 'AirbnbCerealBook',
        fontSize: hp('2%'),
    },
})
export default OtpModal
