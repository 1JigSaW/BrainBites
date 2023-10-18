import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const ArrowBackIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(160 * size) / 100} height={(160 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 160.000000 160.000000">
            <G transform="translate(0.000000,160.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M192 1008 c-105 -106 -192 -200 -192 -208 0 -8 87 -102 194 -209 196
                    -196 215 -209 240 -169 9 15 -12 41 -149 178 l-160 160 718 0 c476 0 725 3
                    738 10 10 6 19 19 19 30 0 11 -9 24 -19 30 -13 7 -262 10 -738 10 l-718 0 160
                    160 c137 137 158 163 149 178 -25 40 -46 26 -242 -170z"/>
            </G>
        </Svg>
    );
};

export default ArrowBackIcon;
