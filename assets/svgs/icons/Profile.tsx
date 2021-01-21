import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={36}
            height={36}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M18 0C8.06 0 0 8.058 0 18c0 9.94 8.06 17.998 18 17.998 9.942 0 18-8.058 18-17.999C36 8.06 27.942 0 18 0zm0 5.382a5.954 5.954 0 110 11.908 5.954 5.954 0 010-11.908zm-.004 25.91a13.21 13.21 0 01-8.602-3.172 2.537 2.537 0 01-.89-1.928c0-3.334 2.698-6.003 6.033-6.003h6.928a5.996 5.996 0 016.024 6.003 2.53 2.53 0 01-.89 1.928 13.205 13.205 0 01-8.603 3.172z"
                fill="#D5D5D5"
            />
        </Svg>
    )
}

export default SvgComponent
