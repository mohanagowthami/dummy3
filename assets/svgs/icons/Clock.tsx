import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={23}
            height={23}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11.5 0C5.159 0 0 5.159 0 11.5S5.159 23 11.5 23 23 17.841 23 11.5 17.841 0 11.5 0zm0 21.563c-5.549 0-10.062-4.514-10.062-10.063S5.95 1.438 11.5 1.438c5.549 0 10.063 4.513 10.063 10.062 0 5.549-4.514 10.063-10.063 10.063z"
                fill="#77838F"
            />
            <Path
                d="M12.219 4.313H10.78v7.485l4.523 4.523 1.017-1.017-4.102-4.102v-6.89z"
                fill="#77838F"
            />
        </Svg>
    )
}

export default SvgComponent
