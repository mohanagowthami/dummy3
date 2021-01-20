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
            <Circle cx={19} cy={19} r={19} fill="#66C5DA" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.786 12.571H12.214c-.986 0-1.786.8-1.786 1.786v9.286c0 .986.8 1.786 1.786 1.786h13.572a1.786 1.786 0 001.785-1.786v-9.286a1.785 1.785 0 00-1.785-1.786zM24 14.714a1.429 1.429 0 110 2.857 1.429 1.429 0 010-2.857zm.775 8.572h-11.49a.714.714 0 01-.489-1.236l4.286-4.018a.714.714 0 01.979 0L21.3 21.08a.714.714 0 00.993 0l.489-.49a.714.714 0 011.007 0l1.493 1.493a.714.714 0 01-.507 1.204z"
                fill="#fff"
                fillOpacity={0.92}
            />
        </Svg>
    )
}

export default SvgComponent
