// react
import React, { Component } from 'react'
// react-native
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Platform,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
} from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// expo image picker
import * as ImagePicker from 'expo-image-picker'
// react native modal
import Modal from 'react-native-modal'
// common components
import CustomButton from '../components/common/CustomButton'
import CustomStarRating from '../components/common/CustomStarRating'
// colors
import { colors } from '../lib/colors'

interface IProps {}

interface IState {
    selectedImages: Array<string>
    showModal: boolean
}
class ReviewsAndRating extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedImages: [],
            showModal: false,
        }
    }

    onPressSubmit = () => {
        this.setState({
            ...this.state,
            showModal: !this.state.showModal,
        })
    }

    async componentDidMount(): Promise<void> {
        if (Platform.OS !== 'web') {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                alert(
                    'Sorry, we need files access permissions to make this work!'
                )
            }
        }
    }
    captureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!')
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result, 'image')
        if (!result.cancelled) {
            const mutatedImages = [...this.state.selectedImages]
            mutatedImages.push(result.uri)
            this.setState({ selectedImages: mutatedImages })
        }
    }

    galleryImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result, 'image')
        if (!result.cancelled) {
            const mutatedImages = [...this.state.selectedImages]
            mutatedImages.push(result.uri)
            this.setState({ selectedImages: mutatedImages })
        }
    }

    removeImage = (index: number) => {
        let mutatedImages = [...this.state.selectedImages]
        mutatedImages.splice(index, 1)
        this.setState({ selectedImages: mutatedImages })
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
            <SafeAreaView style={styles.container}>
                {this.state.showModal && this.renderModal()}

                <ScrollView>
                    <View>
                        <Text style={styles.titleText}>
                            Reviews and ratings
                        </Text>
                        <CustomStarRating
                            width={wp('10.4%')}
                            height={wp('10.4%')}
                            style={{ marginVertical: wp('7%') }}
                            elementStyle={{ marginRight: wp('2%') }}
                        />
                        <View
                            style={{
                                height: 1,
                                backgroundColor: colors.lightGreyTwo,
                            }}
                        />

                        <TextInput
                            style={styles.commentStyles}
                            placeholder="Wrire your review here"
                            textAlign="left"
                            multiline={true}
                            textAlignVertical={'top'}
                        />

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginVertical: wp('8%'),
                                alignItems: 'center',
                                marginBottom: 0,
                            }}
                        >
                            <Pressable onPress={this.captureImage}>
                                <View style={styles.plusButton}>
                                    <Text style={styles.plus}>+</Text>
                                </View>
                            </Pressable>
                            <Text
                                style={{
                                    fontFamily: 'AirbnbCerealBook',
                                    fontSize: wp('4.2%'),
                                    letterSpacing: 0.5,
                                    color: colors.grey,
                                }}
                            >
                                Upload Pictures
                            </Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                marginTop: wp('7%'),
                            }}
                        >
                            {this.state.selectedImages.map((image, index) => {
                                return (
                                    <View key={index}>
                                        <Image
                                            source={{ uri: image }}
                                            style={{
                                                width: wp('30%'),
                                                height: wp('30%'),
                                                position: 'relative',
                                                marginBottom: wp('2.5%'),
                                            }}
                                        />

                                        <Pressable
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                backgroundColor: 'red',
                                                width: wp('4%'),
                                                height: wp('4%'),
                                                borderRadius: wp('2%'),
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={() =>
                                                this.removeImage(index)
                                            }
                                        >
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontSize: wp('2.5%'),
                                                    fontWeight: '900',
                                                }}
                                            >
                                                X
                                            </Text>
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </View>
                        <CustomButton
                            title="Submit"
                            onPressButton={this.onPressSubmit}
                            buttonStyles={{
                                display: 'flex',
                                alignSelf: 'center',
                                width: '100%',
                            }}
                            buttonTextStyles={{
                                fontFamily: 'AirbnbCerealBold',
                                fontSize: wp('4.2%'),
                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default ReviewsAndRating
const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.5%'),
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: wp('6%'),
        color: colors.darkBlack,
        paddingHorizontal: wp('3%'),
    },
    commentStyles: {
        backgroundColor: colors.lightGreyFour,
        borderRadius: wp('2.5%'),
        color: colors.grey,
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.1%'),
        padding: wp('6%'),
        height: hp('40%'),
    },
    plusButton: {
        width: wp('15%'),
        height: wp('15%'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightGreyFour,
        borderRadius: wp('2%'),
        marginRight: wp('4%'),
    },
    plus: {
        color: colors.grey,
        fontSize: wp('9%'),
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
