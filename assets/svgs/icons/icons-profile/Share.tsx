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
                d="M17.445 14.266a3.864 3.864 0 00-3.11 1.571l-6.07-3.102a3.856 3.856 0 00-.126-2.54l6.362-3.823a3.86 3.86 0 002.944 1.362 3.872 3.872 0 003.867-3.867A3.872 3.872 0 0017.445 0a3.872 3.872 0 00-3.605 5.265L7.462 9.097a3.86 3.86 0 00-2.907-1.32 3.872 3.872 0 00-3.867 3.868A3.865 3.865 0 007.7 13.894l6.052 3.092A3.872 3.872 0 0017.446 22a3.872 3.872 0 003.867-3.867 3.872 3.872 0 00-3.868-3.867zm0-12.977a2.581 2.581 0 012.578 2.578 2.581 2.581 0 01-2.578 2.578 2.581 2.581 0 01-2.578-2.578 2.581 2.581 0 012.578-2.578zM4.555 14.223a2.581 2.581 0 01-2.578-2.579 2.581 2.581 0 012.578-2.578 2.581 2.581 0 012.578 2.579 2.581 2.581 0 01-2.578 2.578zm12.89 6.488a2.581 2.581 0 01-2.578-2.578 2.581 2.581 0 012.578-2.578 2.581 2.581 0 012.578 2.578 2.581 2.581 0 01-2.578 2.578z"
                fill="#888"
            />
        </Svg>
    )
}

export default SvgComponent