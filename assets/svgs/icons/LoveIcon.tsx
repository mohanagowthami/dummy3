import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={28}
            height={24}
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20.384.539A7.653 7.653 0 0128 8.155c0 7.69-14 15.306-14 15.306S0 15.733 0 8.155A7.616 7.616 0 017.616.539 7.541 7.541 0 0114 3.973 7.616 7.616 0 0120.384.54z"
                fill="#F53838"
            />
        </Svg>
    )
}

export default SvgComponent
