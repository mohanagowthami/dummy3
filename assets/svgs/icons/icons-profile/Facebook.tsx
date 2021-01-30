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
                d="M6 6.111V3.89c0-.613.498-1.111 1.111-1.111h1.111V0H6a3.333 3.333 0 00-3.333 3.333v2.778H.444V8.89h2.223v8.889H6v-8.89h2.222l1.111-2.777H6z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
