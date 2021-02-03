import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function CalenderSvg(props: SvgProps | any) {
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
                d="M19.25 2.75h-.917V.917A.917.917 0 0017.417 0H16.5a.917.917 0 00-.917.917V2.75H6.417V.917A.917.917 0 005.5 0h-.917a.917.917 0 00-.916.917V2.75H2.75A2.753 2.753 0 000 5.5v13.75A2.753 2.753 0 002.75 22h16.5A2.753 2.753 0 0022 19.25V5.5a2.753 2.753 0 00-2.75-2.75zm.917 16.5a.918.918 0 01-.917.917H2.75a.918.918 0 01-.917-.917V9.203h18.334V19.25z"
                fill={props.color}
            />
        </Svg>
    )
}

export default CalenderSvg
