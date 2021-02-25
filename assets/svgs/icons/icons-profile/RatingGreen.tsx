import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Rating(props: SvgProps | any) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.552.83l1.403 2.964 2.875.305a.745.745 0 01.387 1.3L8.932 7.284l.708 3.168a.745.745 0 01-1.1.79L5.885 9.63l-2.651 1.612a.745.745 0 01-1.1-.79l.707-3.168L.554 5.4a.745.745 0 01.39-1.3l2.875-.305L5.222.83a.745.745 0 011.33 0z"
        fill={props.color ? props.color : "#FC0"}
        // fill="#22A45D"
      />
    </Svg>
  )
}

export default Rating
