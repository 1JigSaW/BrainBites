import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const SaveEmptyIcon = ({ size, style, color }: Props) => {
    const fillColor = color ? color : '#000';

    return (
        <Svg
            width={(120 * size) / 100}
            height={(120 * size) / 100}
            style={style}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 120.000000 120.000000"
        >
            <G
                transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
                stroke="none"
            >
                <Path d="M208 1184 c-59 -31 -58 -25 -58 -599 l0 -527 29 -29 c21 -20 39 -29 62 -29 29 0 51 18 184 150 111 110 157 150 175 150 18 0 64 -40 175 -150 133 -132 155 -150 184 -150 23 0 41 9 62 29 l29 29 0 527 c0 577 1 569 -60 600 -43 22 -741 22 -782 -1z" />
                <Path d="m760 -66 c17 -17 17 -1033 1 -1044 -7 -4 -71 52 -153 134 -77 77 -151 145 -163 151 -28 14 -78 14 -106 0 -12 -6 -86 -74 -163 -151 -82 -82 -146 -138 -153 -134 -16 11 -16 1027 1 1044 17 17 719 17 736 0z" />
            </G>
        </Svg>
    );
};

export default SaveEmptyIcon;
