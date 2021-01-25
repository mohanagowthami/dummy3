import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function RightArrow(props: SvgProps | any) {
    return (
        <Svg
            width={6}
            height={10}
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.967.836L5.75 4.424a.598.598 0 010 .957L.967 8.969a.598.598 0 01-.957-.48V1.311A.598.598 0 01.967.836z"
                fill="#000"
            />
        </Svg>
    )
}

export default RightArrow
