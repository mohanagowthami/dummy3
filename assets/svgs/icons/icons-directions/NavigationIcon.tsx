import * as React from 'react'
import Svg, { SvgProps, Rect, Path } from 'react-native-svg'

function NavigationIcon(props: SvgProps | any) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Rect width={28} height={28} rx={14} fill="#FF6C65" />
            <Path
                d="M20.518 11.815a.81.81 0 00-.195-.497L16.47 7.225c-.26-.234-.756-.334-1.053-.06-.287.267-.279.785.007 1.053l2.709 2.874H8.722a.75.75 0 00-.722.723v7.482c0 .4.323.703.722.703a.706.706 0 00.722-.703v-6.76h8.69l-2.709 2.874c-.246.247-.292.783-.007 1.053.284.27.803.184 1.053-.06l3.852-4.093a.694.694 0 00.195-.496z"
                fill="#fff"
            />
        </Svg>
    )
}

export default NavigationIcon
