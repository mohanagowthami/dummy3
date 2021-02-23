import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

function OpenEye(props: SvgProps | any) {
  return (
    <Svg
      width={96}
      height={96}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)" fill="#7F7F7F">
        <Path d="M48 34.91c-7.222 0-13.09 5.868-13.09 13.09 0 7.222 5.868 13.091 13.09 13.091 7.222 0 13.091-5.869 13.091-13.09 0-7.223-5.87-13.092-13.09-13.092z" />
        <Path d="M48 15.273C26.182 15.273 7.55 28.843 0 48c7.55 19.156 26.182 32.727 48 32.727 21.84 0 40.451-13.57 48-32.727-7.549-19.156-26.16-32.727-48-32.727zm0 54.545c-12.044 0-21.818-9.774-21.818-21.818 0-12.044 9.774-21.818 21.818-21.818 12.044 0 21.818 9.774 21.818 21.818 0 12.044-9.774 21.818-21.818 21.818z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h96v96H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default OpenEye
