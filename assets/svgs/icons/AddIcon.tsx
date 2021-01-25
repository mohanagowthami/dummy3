import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={49}
            height={49}
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle cx={24.5} cy={24.5} r={24.5} fill="#FF6C65" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.053 24.053H25.947V13.947a.947.947 0 00-1.894 0v10.106H13.947a.947.947 0 000 1.894h10.106v10.106a.947.947 0 001.894 0V25.947h10.106a.947.947 0 000-1.894z"
                fill="#fff"
                stroke="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
