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
                d="M.769 5.423L14.327.903a.609.609 0 01.77.77l-4.52 13.558a.608.608 0 01-1.125.072l-2.846-5.91L.697 6.549A.609.609 0 01.77 5.423z"
                fill="#FF6C65"
            />
        </Svg>
    )
}

export default SvgComponent
