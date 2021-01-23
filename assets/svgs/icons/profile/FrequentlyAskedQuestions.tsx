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
                d="M18.666 17h-10a.833.833 0 100 1.667h10v.833c0 .522-.298.833-.833.833h-10c-1.455 0-2.5-1.088-2.5-2.5V6.167c0-1.412 1.045-2.5 2.5-2.5h10c.535 0 .833.31.833.833V17z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SvgComponent
