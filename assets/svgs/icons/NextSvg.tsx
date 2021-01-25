import * as React from 'react'
import Svg, { SvgProps, Path, Rect } from 'react-native-svg'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol,
} from 'react-native-responsive-screen'

function NextSvg(props: SvgProps | any) {
    return (
        <Svg
            width={wp('15%')}
            height={hp('10%')}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M32.161 19.254a.847.847 0 00-1.21 0 .853.853 0 000 1.197l6.134 6.133H16.847a.843.843 0 00-.847.848c0 .471.375.859.847.859h20.238l-6.133 6.121a.868.868 0 000 1.21.847.847 0 001.21 0l7.584-7.585a.833.833 0 000-1.198l-7.585-7.585z"
                fill="#fff"
            />
            <Rect
                x={0.5}
                y={0.5}
                width={54}
                height={54}
                rx={11.5}
                stroke="#fff"
            />
        </Svg>
    )
}

export default NextSvg
