import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

function SvgComponent(props: SvgProps | any) {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)" fill="#888">
                <Path d="M20.012 10.343l-1.825-1.826a.929.929 0 00-1.313 1.313l1.826 1.826c1.928 1.93 1.926 5.09 0 7.043-1.929 1.929-5.09 1.927-7.044 0L9.83 16.875a.928.928 0 10-1.313 1.313l1.83 1.83a6.875 6.875 0 004.84 1.982 6.808 6.808 0 004.83-1.991c2.646-2.682 2.644-7.017-.005-9.665zM13.482 3.813l-1.83-1.83C8.97-.662 4.635-.66 1.982 1.992c-2.645 2.681-2.643 7.016.005 9.664l1.826 1.826a.924.924 0 001.313 0 .928.928 0 000-1.313L3.3 10.343c-1.929-1.929-1.927-5.09 0-7.043 1.93-1.928 5.09-1.926 7.043 0l1.826 1.826a.928.928 0 101.313-1.313z" />
                <Path d="M14.008 12.696L9.304 7.992A.928.928 0 107.99 9.305l4.704 4.704a.925.925 0 001.313 0 .928.928 0 000-1.313z" />
            </G>
            <Defs>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h22v22H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent
