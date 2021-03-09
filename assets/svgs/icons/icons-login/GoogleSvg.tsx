import * as React from "react"
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg"

function GoogleSvg(props: SvgProps | any) {
  return (
    <Svg
      width={55}
      height={55}
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={54} height={54} rx={11.5} stroke="#DFE1E6" />
      <G clipPath="url(#prefix__clip0)" fill="#F75F4B">
        <Path d="M34.556 26.778v-2.222h-1.111v2.222h-2.223v1.111h2.222v2.222h1.112V27.89h2.222v-1.111h-2.222zM24.556 26.778V29h3.143a3.34 3.34 0 01-3.143 2.222 3.337 3.337 0 01-3.334-3.333 3.337 3.337 0 013.334-3.334c.796 0 1.563.286 2.158.805l1.46-1.676a5.506 5.506 0 00-3.618-1.35A5.562 5.562 0 0019 27.888a5.562 5.562 0 005.556 5.555 5.562 5.562 0 005.555-5.555v-1.111h-5.555z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="translate(19 19)"
            d="M0 0h17.778v17.778H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default GoogleSvg
