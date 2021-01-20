import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={11}
            height={6}
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11 .746c0 .24-.073.45-.245.6l-4.89 4.497a.506.506 0 01-.733 0L.242 1.345c-.27-.24-.319-.72-.123-1.05.196-.329.587-.389.856-.15l4.523 4.168L10.022.146c.269-.24.66-.18.856.15.073.12.122.3.122.45z"
                fill="#F53838"
            />
        </Svg>
    )
}

export default SvgComponent
