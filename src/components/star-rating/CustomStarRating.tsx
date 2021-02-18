// react
import React, { Component } from "react"
// react-native
import { Pressable, View, StyleSheet } from "react-native"
// icons
import { Rating, UnfilledStar } from "../../../assets/svgs/icons"

interface IProps {
  width: number
  height: number
  style?: any
  elementStyle?: any
  onChange: (value: number) => void
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
  getRating = (): any => {
    const { starArray } = this.state
    let rating = 0
    starArray.forEach((ele) => {
      if (ele) rating = rating + 1
    })
    this.props.onChange(rating)
  }

  changeStarStaus = (index: number) => {
    const { starArray } = this.state
    let mutatedArray = [...starArray]

    if (mutatedArray[index]) {
      for (let i = index; i < mutatedArray.length; i++) {
        mutatedArray[i] = false
      }
    } else {
      for (let i = 0; i <= index; i++) {
        mutatedArray[i] = true
      }
    }

    this.setState({ starArray: mutatedArray }, () => this.getRating())
  }

  render() {
    const { width, height, style, elementStyle } = this.props
    const { starArray } = this.state
    return (
      <View style={[styles.container, style]}>
        {starArray.map((item, index) => (
          <View style={elementStyle} key={index}>
            {item ? (
              <Pressable onPress={() => this.changeStarStaus(index)}>
                <Rating width={width} height={height} />
              </Pressable>
            ) : (
              <Pressable onPress={() => this.changeStarStaus(index)}>
                <UnfilledStar width={width} height={height} />
              </Pressable>
            )}
          </View>
        ))}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
})
export default CustomStarRating
