import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.155 19v-7h2.07l.275-2.413h-2.345l.003-1.208c0-.63.064-.966 1.033-.966h1.294V5h-2.07c-2.489 0-3.364 1.17-3.364 3.138v1.449H8.5v2.412h1.55V19h3.105z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
