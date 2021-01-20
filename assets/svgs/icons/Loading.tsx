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
                d="M10.469 4.679a2.34 2.34 0 100-4.68 2.34 2.34 0 000 4.68zM10.469 20a1.403 1.403 0 100-2.807 1.403 1.403 0 000 2.807zM4.72 6.825a2.106 2.106 0 100-4.211 2.106 2.106 0 000 4.211zM16.217 17.384a1.17 1.17 0 100-2.339 1.17 1.17 0 000 2.34zM2.34 12.34a1.87 1.87 0 100-3.743 1.87 1.87 0 000 3.742zM18.597 11.403a.935.935 0 100-1.87.935.935 0 000 1.87zM3.563 15.059a1.636 1.636 0 102.315 2.315c.64-.64.64-1.675 0-2.315a1.63 1.63 0 00-2.315 0zM16.216 5.42a.701.701 0 100-1.402.701.701 0 000 1.403z"
                fill="#888"
            />
        </Svg>
    )
}

export default SvgComponent
