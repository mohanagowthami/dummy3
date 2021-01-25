// react
import React, { Component } from 'react'
// react-native
import { Pressable, View } from 'react-native'
// icons
import { Rating, UnfilledStar } from '../../../assets/svgs/icons'

interface IProps {
    width: number
    height: number
    style?: any
    elementStyle?: any
}

interface IState {
    starArray: Array<boolean>
}
class CustomStarRating extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            starArray: [false, false, false, false, false],
        }
    }
    changeStarStaus = (index: number) => {
        let mutatedArray = this.state.starArray
        mutatedArray[index] = !mutatedArray[index]
        this.setState({ starArray: mutatedArray })
    }

    render() {
        const { width, height, style, elementStyle } = this.props
        return (
            <View style={[{ display: 'flex', flexDirection: 'row' }, style]}>
                {this.state.starArray.map((item, index) => (
                    <View style={elementStyle} key={index}>
                        {item ? (
                            <Pressable
                                onPress={() => this.changeStarStaus(index)}
                            >
                                <Rating width={width} height={height} />
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => this.changeStarStaus(index)}
                            >
                                <UnfilledStar width={width} height={height} />
                            </Pressable>
                        )}
                    </View>
                ))}
            </View>
        )
    }
}
export default CustomStarRating
