import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function UnfilledStar(props: SvgProps | any) {
    return (
        <Svg
            width={42}
            height={40}
            viewBox="0 0 42 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.183 1.493l5.136 10.844 10.517 1.119a2.727 2.727 0 011.418 4.754l-8.363 6.9 2.59 11.59a2.727 2.727 0 01-4.026 2.89l-9.708-5.9-9.699 5.9a2.727 2.727 0 01-4.027-2.89l2.591-11.59-8.372-6.9a2.727 2.727 0 011.427-4.754l10.517-1.119L18.32 1.493a2.727 2.727 0 014.863 0z"
                fill="#E0E8F2"
            />
        </Svg>
    )
}

export default UnfilledStar
