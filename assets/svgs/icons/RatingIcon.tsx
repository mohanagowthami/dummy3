import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle cx={19} cy={19} r={19} fill="#E8BA62" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.827 11.245l2.106 4.446 4.312.458a1.118 1.118 0 01.581 1.95l-3.429 2.828 1.063 4.751a1.118 1.118 0 01-1.651 1.185l-3.98-2.418-3.977 2.418a1.118 1.118 0 01-1.65-1.185l1.061-4.751-3.432-2.829a1.118 1.118 0 01.585-1.949l4.312-.458 2.106-4.446a1.118 1.118 0 011.993 0z"
                fill="#fff"
                fillOpacity={0.92}
            />
        </Svg>
    )
}

export default SvgComponent
