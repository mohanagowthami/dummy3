import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SearchIcon(props: SvgProps | any) {
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
                opacity={0.5}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.53 0c5.254 0 9.529 4.275 9.529 9.53 0 2.099-.69 4.035-1.845 5.611l5.207 5.206a1.466 1.466 0 11-2.073 2.073l-5.207-5.206A9.466 9.466 0 019.53 19.06C4.275 19.059 0 14.784 0 9.529 0 4.275 4.275 0 9.53 0zM2.931 9.53a6.604 6.604 0 006.597 6.597 6.605 6.605 0 006.598-6.598 6.604 6.604 0 00-6.598-6.597A6.604 6.604 0 002.932 9.53z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default SearchIcon
