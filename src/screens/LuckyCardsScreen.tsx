import React, { Component } from 'react'
import { Text } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

class LuckyCardsScreen extends Component<{}, {}> {
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
        return <Text>LuckyCardsScreen</Text>
    }
}
export default LuckyCardsScreen
