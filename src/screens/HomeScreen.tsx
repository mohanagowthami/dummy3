import React, { Component } from "react"
import { Text, View } from "react-native"
import GetDimensions from "../components/common/GetDimensions"


class HomeScreen extends Component<{},{}>
{
    render()
    {return (
            <View>
                <Text>HomeScreen</Text>
                <GetDimensions render={(dimensions) => {
                    return <Text>{dimensions.window.width}</Text>
                }}/>
            </View>
           
        )
    }
}
export default HomeScreen