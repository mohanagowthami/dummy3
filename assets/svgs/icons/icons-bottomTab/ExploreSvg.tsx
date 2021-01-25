import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
function ExploreSvg(props: any) {
    return (
        <Svg
            width="1em"
            height="1em"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11 0C4.935 0 0 4.935 0 11s4.935 11 11 11 11-4.935 11-11S17.066 0 11 0zm0 20.73c-5.365 0-9.73-4.365-9.73-9.73S5.636 1.27 11 1.27s9.73 4.365 9.73 9.73-4.365 9.73-9.73 9.73z"
                fill={props.color}
            />
            <Path
                d="M17.056 5.203a.635.635 0 00-.86-.259l-7.15 3.845a.635.635 0 00-.259.258l-3.843 7.149a.636.636 0 00.85.865h.002l.008-.005 7.153-3.842c.11-.059.2-.149.26-.258l3.827-7.131a.634.634 0 00.023-.044l.006-.01h-.001a.634.634 0 00-.016-.568zm-9.996 9.74L9.502 10.4l2.1 2.1-4.542 2.443zm5.441-3.34l-2.1-2.1 4.542-2.443"
                fill={props.color}
            />
        </Svg>
    )
}

export default ExploreSvg
