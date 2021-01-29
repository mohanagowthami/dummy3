// react-native-gesture-handler
import { ScrollView, TextInput } from 'react-native-gesture-handler'
// react
import React, { Component } from 'react'
// react-native
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
// react-native-responsive-screen
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
// expo-image-picker
import * as ImagePicker from 'expo-image-picker'
// icons
import { BackIcon } from '../../assets/svgs/icons/icons-directions'
import { Camera } from '../../assets/svgs/icons/icons-profile'
// colors
import { colors } from '../lib/colors'

interface IprofileOptions {
    option: string
    value: any
}
interface IProps {
    navigation: any
}
// divisioning of the screen
interface IDetailsType {
    profileDetails: Array<any>
}
// state - data
interface Istate {
    selectedImages: Array<string>
    categoryData: IDetailsType
    activeIndex: number
    notificationsCount: number
    userName: string
    emailId: string
    phoneNumber: string
    gender: string
    dob: string
    profileOptions: Array<IprofileOptions>
}
const details = {
    profileDetails: [
        {
            name: 'Rohit Sharma',
            image:
                'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            place: 'Hyderabad',
        },
    ],
}

class Profile extends Component<IProps, Istate> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedImages: [
                'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            ],
            categoryData: details,
            activeIndex: 0,
            notificationsCount: 0,
            userName: 'User Name',
            emailId: 'soul@123',
            phoneNumber: '9876543210',
            gender: 'M',
            dob: '17/10/1998',
            profileOptions: [
                { option: 'User Name', value: 'User Name' },
                { option: 'Email', value: 'emailId' },
                { option: 'Phone', value: '9876543210' },
                { option: 'Gender', value: 'M' },
                { option: 'Date of Birth', value: '17/10/1998' },
            ],
        }
    }
    handleChange = (value: string, name: any) => {
        let stateData: any = { ...this.state }
        stateData[name] = value
        this.setState(stateData)
        // console.log(stateData[name])
    }
    captureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!')
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        console.log(result, 'image')
        if (!result.cancelled) {
            const mutatedImages = [...this.state.selectedImages]
            mutatedImages.push(result.uri)
            this.setState({ selectedImages: mutatedImages })
            console.log(this.state.selectedImages)
        }
    }
    _renderinfo = () => {
        return (
            <View style={styles.profilecontainer}>
                {this.state.categoryData.profileDetails.map((item, index) => {
                    const { name, image, place } = item
                    return (
                        <View key={index}>
                            <View style={styles.container}>
                                <View
                                    style={{
                                        paddingLeft: wp('6.8%'),
                                        paddingTop: hp('3.57%'),
                                    }}
                                >
                                    <Pressable
                                        onPress={() =>
                                            this.props.navigation.navigate(
                                                'profileScreen'
                                            )
                                        }
                                    >
                                        <BackIcon
                                            width={wp('2.92%')}
                                            height={hp('2.86%')}
                                        />
                                    </Pressable>
                                </View>
                                <View style={styles.imageandbackicon}>
                                    <View style={styles.imagecontainer}>
                                        <View
                                            style={{
                                                position: 'relative',
                                            }}
                                        >
                                            <Image
                                                style={styles.profileimage}
                                                resizeMode="cover"
                                                source={{
                                                    uri: this.state
                                                        .selectedImages[
                                                        this.state
                                                            .selectedImages
                                                            .length - 1
                                                    ],
                                                }}
                                            />
                                            <View style={styles.cameraicon}>
                                                <Pressable
                                                    onPress={this.captureImage}
                                                >
                                                    <Camera />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.nameandplace}>
                                <Text style={styles.name}>
                                    {this.state.userName}
                                </Text>
                                <Text style={styles.place}>{place}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
    _renderdetails = () => {
        return (
            <View style={styles.optionscontainer}>
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Username</Text>
                    <TextInput
                        style={styles.details}
                        onChangeText={(text) => {
                            this.handleChange(text, 'userName')
                        }}
                    >
                        {this.state.userName}
                    </TextInput>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Email</Text>
                    <TextInput
                        style={styles.details}
                        onChangeText={(text) => {
                            this.handleChange(text, 'emailId')
                        }}
                    >
                        {this.state.emailId}
                    </TextInput>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Phone</Text>
                    <TextInput
                        style={styles.details}
                        onChangeText={(text) => {
                            this.handleChange(text, 'phoneNumber')
                        }}
                    >
                        {this.state.phoneNumber}
                    </TextInput>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Gender</Text>
                    <TextInput
                        style={styles.details}
                        onChangeText={(text) => {
                            this.handleChange(text, 'gender')
                        }}
                    >
                        {this.state.gender}
                    </TextInput>
                </View>
                <View style={styles.line} />
                <View style={styles.optioncontainer}>
                    <Text style={styles.heading}>Date of Birth</Text>
                    <TextInput
                        style={styles.details}
                        onChangeText={(text) => {
                            this.handleChange(text, 'dob')
                        }}
                    >
                        {this.state.dob}
                    </TextInput>
                </View>
            </View>
        )
    }
    render() {
        return (
            <ScrollView style={styles.maincontainer}>
                {this._renderinfo()}
                {this._renderdetails()}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        flex: 1,
        paddingTop: hp('2.93%'),
        backgroundColor: colors.white,
    },
    profilecontainer: {
        display: 'flex',
        paddingTop: hp('1%'),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageandbackicon: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagecontainer: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: wp('25.4%'),
    },
    profileimage: {
        display: 'flex',
        position: 'relative',
        width: wp('38.93%'),
        height: hp('19.210%'),
        alignSelf: 'center',
        marginLeft: wp('10%'),
        // paddingLeft: wp('8%'),
        borderRadius: wp('3.2%'),
    },
    cameraicon: {
        position: 'absolute',
        width: wp('8.66%'),
        height: wp('8.66%'),
        // left: wp('50%'),
        // top: hp('0%'),
        right: wp('2%'),
        bottom: hp('1%'),
        borderRadius: wp('4.33%'),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('6.4%'),
        alignSelf: 'center',
        color: colors.namecolor,
    },
    place: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('3.73%'),
        paddingTop: hp('1.052%'),
        alignSelf: 'center',
        color: colors.grey,
    },
    nameandplace: {
        paddingTop: hp('3.55%'),
        // paddingBottom: hp('6.93%'),
        lineHeight: hp('1.1%'),
    },
    backicon: {
        paddingLeft: wp('7.44%'),
        paddingTop: hp('0.1%'),
        paddingRight: wp('15.46%'),
    },
    line: {
        height: hp('0.3%'),
        width: wp('85%'),
        borderRadius: 4,
        marginTop: hp('3.42%'),
        backgroundColor: colors.lightGreyTwo,
    },
    optionscontainer: {
        display: 'flex',
        padding: wp('7%'),
    },
    optioncontainer: {
        display: 'flex',
        flexDirection: 'row',
        // borderBottomColor: 'red',
        paddingTop: hp('3%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: wp('3%'),
    },
    heading: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.53%'),
        color: '#B8BBC6',
    },
    details: {
        fontFamily: 'ArchivoRegular',
        fontSize: wp('4.53%'),
        color: '#333A4D',
    },
})
export default Profile
