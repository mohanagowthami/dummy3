import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import GetDimensions from '../components/common/GetDimensions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

class HomeScreen extends Component<{}, {}> {
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
        return (
            <View>
                <StatusBar barStyle="default" hidden />
                <Text>HomeScreen</Text>
                {/* <GetDimensions
          render={(dimensions) => {
            return <Text>{dimensions.window.width}</Text>;
          }}
        /> */}
            </View>
        )
    }
}
export default HomeScreen
