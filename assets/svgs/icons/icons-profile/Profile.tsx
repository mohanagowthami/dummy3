import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.667 3.833a3.333 3.333 0 106.666 0 3.333 3.333 0 00-6.666 0zm3.32 5c-3.935 0-7.163 2.022-7.486 6-.018.216.396.667.605.667h13.766c.626 0 .636-.504.626-.667-.244-4.089-3.522-6-7.512-6z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
