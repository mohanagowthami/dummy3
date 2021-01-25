import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.066 18.119C4.067 18.119 0 14.055 0 9.059 0 4.064 4.067 0 9.066 0c5 0 9.067 4.064 9.067 9.06 0 4.995-4.067 9.059-9.067 9.059zm0-16.402c-4.051 0-7.347 3.294-7.347 7.342 0 4.049 3.296 7.342 7.347 7.342 4.052 0 7.348-3.293 7.348-7.342 0-4.048-3.296-7.342-7.348-7.342zM21.748 21.75a.858.858 0 000-1.215l-3.845-3.843a.86.86 0 00-1.216 1.215l3.846 3.843a.857.857 0 001.215 0z"
                fill="#888"
            />
        </Svg>
    )
}

export default SvgComponent
