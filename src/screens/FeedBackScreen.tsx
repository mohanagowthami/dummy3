// react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import { View, Text, StyleSheet, Image } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// react-native-modal
import Modal from 'react-native-modal'
// react-native-safe-area-context
import { SafeAreaView } from 'react-native-safe-area-context'
// components
import CustomButton from '../components/buttons/CustomButton'
import CustomTextField from '../components/input-controllers/CustomTextField'
// colors
import { colors } from '../lib/colors'

interface IProps {}
interface IState {
    showModal: boolean
}

const feedBackList = ['Food', 'Travel', 'Shopping']
class FeedBackScreen extends Component<IProps, IState> {
    values: any
    constructor(props: IProps) {
        super(props)
        this.values = {
            food: '',
            travel: '',
            shopping: '',
        }
        this.state = {
            showModal: false,
        }
    }
    onPressSubmit = () => {
        console.log('values', this.values)
        this.setState({
            showModal: !this.state.showModal,
        })
    }
    onBlur = (type: string, review: string) => {
        this.values[type.toLowerCase()] = review
    }

    renderModal = () => {
        return (
            <View>
                <Modal
                    isVisible={this.state.showModal}
                    backdropColor={colors.white}
                    backdropOpacity={0.9}
                >
                    <View style={styles.modalContainer}>
                        <Image
                            source={require('../../assets/images/thankYou.png')}
                            style={{
                                width: wp('60%'),
                                height: wp('50%'),
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: 'ArchivoBold',
                                fontSize: wp('6%'),
                                lineHeight: wp('8%'),
                                color: colors.grey,
                                marginTop: wp('6%'),
                                marginBottom: 0,
                            }}
                        >
                            Thankyou!
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'ArchivoRegular',
                                fontSize: wp('4.5%'),
                                lineHeight: wp('6.2%'),
                                marginVertical: wp('2%'),
                                textAlign: 'center',
                                color: colors.grey,
                            }}
                        >
                            Dummy text is text that is used in the publishing
                            industry
                        </Text>
                    </View>
                </Modal>
            </View>
        )
    }

    render() {
        return (
            <>
                {this.state.showModal && this.renderModal()}
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.container}>
                            <Text
                                style={{
                                    fontFamily: 'AirbnbCerealBook',
                                    fontSize: wp('6.4%'),
                                    lineHeight: wp('9%'),
                                    letterSpacing: wp('0.1%'),
                                    color: colors.darkBlack,
                                    marginBottom: wp('3%'),
                                    fontWeight: '600',
                                }}
                            >
                                Feedback
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'AirbnbCerealBook',
                                    fontSize: wp('4.8%'),
                                    lineHeight: wp('9%'),
                                    letterSpacing: -0.3,

                                    color: colors.darkBlack,
                                    marginBottom: wp('4%'),
                                    fontStyle: 'normal',
                                }}
                            >
                                Your suggestions matter
                            </Text>
                            {feedBackList.map((element, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.subHeading}>
                                            {element}
                                        </Text>
                                        <CustomTextField
                                            placeholder="Wrire your review here"
                                            onCallBack={(review) =>
                                                this.onBlur(element, review)
                                            }
                                            textAlign={'left'}
                                            multiline={true}
                                            textAlignVertical={'top'}
                                            style={styles.textInputStyles}
                                            placeholderTextColor={colors.grey}
                                        />
                                    </View>
                                )
                            })}
                            <View
                                style={{
                                    display: 'flex',
                                    alignSelf: 'center',
                                }}
                            >
                                <CustomButton
                                    title="Submit"
                                    onPressButton={this.onPressSubmit}
                                    buttonStyles={{ width: wp('90%') }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}
export default FeedBackScreen

const styles = StyleSheet.create({
    textInputStyles: {
        height: hp('17%'),
        backgroundColor: colors.lightGreyFour,
        marginBottom: wp('5%'),
        marginTop: wp('2.5%'),
        borderRadius: wp('3%'),
        borderBottomWidth: 0,
        color: colors.grey,
        fontFamily: 'ArchivoRegular',
        fontWeight: '400',
        fontSize: wp('4%'),
        padding: wp('5%'),
    },
    container: {
        padding: wp('5%'),
        backgroundColor: colors.white,
    },
    subHeading: {
        fontFamily: 'AirbnbCerealBook',
        fontSize: wp('4.2%'),
        color: colors.darkBlack,
        lineHeight: wp('6%'),
        letterSpacing: 0.3,
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: wp('8%'),
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
})
