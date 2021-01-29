import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={13}
            height={16}
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.167 6.75C.167 3 2.667.5 6.417.5s6.25 3.125 6.25 6.25c0 1.944-1.814 4.613-5.441 8.008a1.25 1.25 0 01-1.662.042C1.966 11.757.167 9.073.167 6.75zM6.417 8a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
