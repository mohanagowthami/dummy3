import * as React from 'react'
import Svg, { SvgProps, G, Rect, Path, Defs } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={64}
            height={64}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_d)">
                <Rect x={10} y={5} width={44} height={44} rx={22} fill="#fff" />
            </G>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.94 26A8.994 8.994 0 0033 18.06V16h-2v2.06A8.994 8.994 0 0023.06 26H21v2h2.06A8.994 8.994 0 0031 35.94V38h2v-2.06A8.994 8.994 0 0040.94 28H43v-2h-2.06zM32 23c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 4c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7-7 3.13-7 7z"
                fill="#010101"
            />
            <Defs></Defs>
        </Svg>
    )
}

export default SvgComponent
