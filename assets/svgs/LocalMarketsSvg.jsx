import * as React from 'react'
import Svg, {
    SvgProps,
    Rect,
    Defs,
    Pattern,
    Use,
    Image,
} from 'react-native-svg'
function LocalMarketsSvg(props) {
    return (
        <Svg
            width={88}
            height={88}
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <Rect width={88} height={88} rx={8} fill="url(#prefix__pattern0)" />
            <Defs>
                <Pattern
                    id="prefix__pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use
                        xlinkHref="#prefix__image0"
                        transform="translate(-.25) scale(.00159)"
                    />
                </Pattern>
                <Image
                    id="prefix__image0"
                    width={942}
                    height={628}
                />
            </Defs>
        </Svg>
    )
}
export default LocalMarketsSvg