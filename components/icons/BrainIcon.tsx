import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const BrainIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(48 * size) / 100} height={(48 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 48.000000 48.000000">
            <G transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M150 458 c-85 -43 -115 -160 -62 -235 17 -24 21 -43 19 -84 l-2 -54
                    93 -3 c75 -2 93 0 98 13 4 10 14 13 30 9 13 -4 30 -1 38 5 13 11 31 75 24 85
                    -2 3 6 12 17 20 19 14 19 16 3 44 -10 17 -18 47 -18 69 0 55 -30 104 -80 130
                    -55 29 -104 29 -160 1z m147 -9 c51 -25 89 -85 78 -126 -4 -16 1 -37 14 -58
                    17 -30 18 -34 4 -37 -11 -2 -17 -17 -20 -48 -6 -63 -21 -76 -64 -55 -19 10
                    -44 27 -56 38 -13 11 -23 16 -23 11 0 -5 14 -21 31 -35 46 -37 31 -49 -62 -49
                    l-79 0 0 59 c0 33 -4 62 -9 66 -5 3 -17 25 -26 49 -30 78 10 163 90 191 54 19
                    72 18 122 -6z"/>
                <Path d="M139 316 c-19 -40 30 -120 62 -100 15 9 10 24 -6 17 -21 -7 -44 24
                    -45 59 0 37 19 46 42 18 11 -14 18 -17 18 -8 0 40 -55 51 -71 14z"/>
            </G>
        </Svg>
    );
};

export default BrainIcon;
