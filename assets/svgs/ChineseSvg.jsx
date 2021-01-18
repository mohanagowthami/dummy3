import * as React from 'react'
import Svg, { G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ChineseSvg(props) {
    return (
        <Svg
            width={224}
            height={246}
            viewBox="0 0 224 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_d)">
                <Rect
                    x={19}
                    y={41}
                    width={164}
                    height={164}
                    rx={6}
                    fill="url(#prefix__paint0_linear)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={101}
                    y1={41}
                    x2={101}
                    y2={205}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.017} stopOpacity={0} />
                    <Stop offset={1} stopOpacity={0.74} />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default ChineseSvg