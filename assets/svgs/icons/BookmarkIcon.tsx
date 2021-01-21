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
            <Circle cx={19} cy={19} r={19} fill="#FF6C65" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.886 27.257l-3.129-3.128a1.071 1.071 0 00-1.514 0l-3.129 3.128a1.071 1.071 0 01-1.828-.757V12.214c0-.986.8-1.785 1.785-1.785h7.857c.987 0 1.786.8 1.786 1.785V26.5a1.071 1.071 0 01-1.828.757z"
                fill="#fff"
                fillOpacity={0.92}
            />
        </Svg>
    )
}

export default SvgComponent
