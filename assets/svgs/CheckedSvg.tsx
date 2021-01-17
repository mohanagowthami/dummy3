import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function CheckedSvg(props: SvgProps | any) {
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
                d="M18.5 0h-13A5.5 5.5 0 000 5.5v13A5.5 5.5 0 005.5 24h13a5.5 5.5 0 005.5-5.5v-13A5.5 5.5 0 0018.5 0zm1.398 8.16l-9.92 9.92a.499.499 0 01-.708 0l-5.167-5.165a.5.5 0 010-.707l1.535-1.536a.499.499 0 01.707 0l3.278 3.28 8.032-8.032a.5.5 0 01.707 0l1.536 1.532a.499.499 0 010 .708z"
                fill="#22A45D"
            />
        </Svg>
    )
}

export default CheckedSvg
