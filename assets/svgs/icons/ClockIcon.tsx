import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.333 10a6.667 6.667 0 1013.334 0 6.667 6.667 0 00-13.334 0zm6.702-4.074h-.062a.37.37 0 00-.37.342l-.32 4.168a.37.37 0 00.272.385l3.421.933a.283.283 0 00.357-.272v-.156a.37.37 0 00-.186-.322L10.74 9.63l-.337-3.37a.37.37 0 00-.369-.334z"
                fill="#010101"
            />
        </Svg>
    )
}

export default SvgComponent
