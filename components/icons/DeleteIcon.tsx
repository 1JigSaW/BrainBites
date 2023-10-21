import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const DeleteIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(120 * size) / 100} height={(120 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 120.000000 120.000000">
            <G transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M422 1187 c-32 -18 -50 -48 -58 -96 l-7 -41 -88 0 c-83 0 -91 -2
                    -119 -27 -41 -37 -48 -86 -20 -132 12 -18 30 -35 41 -38 18 -5 19 -17 19 -367
                    0 -520 -28 -486 410 -486 331 0 345 3 385 71 19 32 20 55 23 405 3 352 4 372
                    21 377 30 7 56 56 55 101 -1 31 -8 46 -33 68 -29 26 -37 28 -121 28 l-89 0 -6
                    43 c-7 47 -18 65 -55 90 -20 14 -49 17 -180 17 -105 -1 -162 -5 -178 -13z
                    m342 -63 c9 -8 16 -29 16 -45 l0 -29 -180 0 -180 0 0 26 c0 14 5 34 10 45 10
                    17 23 19 165 19 126 0 156 -3 169 -16z m251 -144 c15 -16 17 -26 9 -48 l-9
                    -27 -409 -3 c-293 -1 -413 1 -422 9 -19 16 -18 49 3 71 15 17 41 18 413 18
                    386 0 397 -1 415 -20z m-65 -495 c0 -373 -3 -403 -45 -419 -9 -3 -149 -6 -311
                    -6 l-295 0 -24 25 -25 24 0 366 0 365 350 0 350 0 0 -355z"/>
                <Path d="M412 473 c3 -280 4 -288 23 -288 19 0 20 8 23 288 l2 287 -25 0 -25
                    0 2 -287z"/>
                <Path d="M575 748 c-3 -7 -4 -137 -3 -288 l3 -275 25 0 25 0 0 285 0 285 -23
                    3 c-12 2 -24 -3 -27 -10z"/>
                <Path d="M742 473 c3 -280 4 -288 23 -288 19 0 20 8 23 288 l2 287 -25 0 -25
                    0 2 -287z"/>
            </G>
        </Svg>
    );
};

export default DeleteIcon;
