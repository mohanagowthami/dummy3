import React, { Component } from 'react'

import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import NextSvg from '../../../assets/svgs/NextSvg'

interface IOnBoardComponent {
    SVG: any
    title: string
    description: string
}

export default class OnBoardComponent extends Component<IOnBoardComponent, {}> {
    render() {
        const { SVG, title, description } = this.props
        return (
            <View>
                <SVG />
                <View>
                    <Text>{title}</Text>
                    <Text>{description}</Text>
                    <View>
                        <NextSvg />
                        <Text>skip</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '5%',
    },
})
