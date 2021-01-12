import * as React from "react"
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg"

function TwitterSvg(props: SvgProps|any) {
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
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M36.778 22.377a7.598 7.598 0 01-2.1.575 3.624 3.624 0 001.603-2.014 7.284 7.284 0 01-2.311.882 3.643 3.643 0 00-6.304 2.492c0 .29.024.567.084.831a10.316 10.316 0 01-7.512-3.812 3.669 3.669 0 00-.5 1.842 3.65 3.65 0 001.62 3.03 3.599 3.599 0 01-1.647-.45v.04a3.661 3.661 0 002.92 3.582c-.297.08-.62.12-.955.12-.234 0-.47-.014-.69-.063a3.68 3.68 0 003.405 2.54 7.323 7.323 0 01-4.519 1.554 6.82 6.82 0 01-.872-.05 10.26 10.26 0 005.591 1.635c6.707 0 10.373-5.555 10.373-10.37 0-.162-.005-.318-.013-.472a7.273 7.273 0 001.827-1.892z"
          fill="#66C5DA"
        />
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

export default TwitterSvg
