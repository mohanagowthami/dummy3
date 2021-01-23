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
                d="M8.552 17.234L0 8.552 8.552 0l1.296 1.296-7.256 7.256 7.256 7.257-1.296 1.425z"
                fill="#000"
            />
        </Svg>
    )
}

export default SvgComponent
