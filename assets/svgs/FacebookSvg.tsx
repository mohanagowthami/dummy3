import * as React from "react";
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from "react-native-svg";

function FacebookSvg(props: SvgProps | any) {
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
          d="M29 25.111V22.89c0-.613.498-1.111 1.111-1.111h1.111V19H29a3.333 3.333 0 00-3.333 3.333v2.778h-2.223v2.778h2.223v8.889H29v-8.89h2.222l1.111-2.777H29z"
          fill="#2F5DDD"
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
  );
}

export default FacebookSvg;
