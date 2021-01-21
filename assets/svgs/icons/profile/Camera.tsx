import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.917 8.583h-3.334l-.52-1.296a1.25 1.25 0 00-1.146-.787h-5.834a1.25 1.25 0 00-1.158.787l-.508 1.296H6.083C4.933 8.583 4 9.516 4 10.667v8.75c0 1.15.933 2.083 2.083 2.083h15.834A2.083 2.083 0 0024 19.417v-8.75a2.083 2.083 0 00-2.083-2.084zM14 19.417a4.375 4.375 0 110-8.75 4.375 4.375 0 010 8.75zm0-1.667a2.708 2.708 0 100-5.417 2.708 2.708 0 000 5.417z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
