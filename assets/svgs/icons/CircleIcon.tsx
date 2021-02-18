import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"

function CircleIcon(props: SvgProps | any) {
  return (
    <Svg
      width={81}
      height={81}
      viewBox="0 0 81 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={40.5} cy={40.5} r={40.5} fill="#F52D56" fillOpacity={0.1} />
      <Circle cx={41} cy={41} r={17} fill="#FF6C65" />
      <Circle cx={41} cy={41} r={6} fill="#fff" />
    </Svg>
  )
}

export default CircleIcon
