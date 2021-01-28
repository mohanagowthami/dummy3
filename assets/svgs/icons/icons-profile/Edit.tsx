import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M2 11.074L11.83 2 15 4.926 5.17 14 2 11.074zM0 16l4-.831L1.108 13 0 16zM15.828.45a1.54 1.54 0 00-2.175 0L13 1.102 15.898 4l.652-.653c.6-.6.6-1.574 0-2.175L15.828.45z"
                fill="#352C2D"
            />
        </Svg>
    )
}

export default SvgComponent
