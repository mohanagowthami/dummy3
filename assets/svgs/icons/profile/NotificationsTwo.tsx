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
                d="M3.652 16.533c1.383 0 2.505-1.107 2.505-2.472v-4.12c0-3.185 2.616-5.767 5.843-5.767s5.844 2.582 5.844 5.768v4.12c0 1.365 1.12 2.471 2.504 2.471H3.652zM14.087 18.184c-.432 1.017-1.227 1.642-2.087 1.642-.86 0-1.655-.625-2.087-1.642h4.174z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
