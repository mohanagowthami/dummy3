import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={10}
            height={18}
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1.296 0L9.85 8.682l-8.553 8.552L0 15.94l7.257-7.257L0 1.425 1.296 0z"
                fill="#000"
            />
        </Svg>
    )
}

export default SvgComponent
