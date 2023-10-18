import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const MyCardsIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(160 * size) / 100} height={(160 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 160.000000 160.000000">
            <G transform="translate(0.000000,160.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M448 1485 c-25 -14 -48 -63 -48 -102 0 -8 -12 -13 -29 -13 -39 0 -78
                    -34 -91 -78 -8 -25 -10 -213 -8 -585 l3 -549 33 -29 33 -30 400 3 401 3 24 28
                    c15 18 24 41 24 63 0 31 2 34 30 34 46 0 86 25 99 61 8 22 11 204 11 576 0
                    579 -1 597 -48 622 -14 7 -151 11 -414 11 -326 -1 -398 -3 -420 -15z m812 -45
                    c13 -8 15 -83 18 -561 2 -490 1 -554 -13 -576 -12 -18 -24 -23 -43 -21 l-27 3
                    -5 517 -5 517 -23 23 c-22 23 -24 23 -368 26 l-346 3 6 31 c3 18 12 36 19 40
                    18 11 769 10 787 -2z m-132 -132 c17 -17 17 -1129 0 -1146 -9 -9 -110 -12
                    -394 -12 l-383 0 -15 22 c-14 20 -16 90 -16 563 0 473 2 543 16 563 l15 22
                    383 0 c284 0 385 -3 394 -12z"/>
                <Path d="M372 1258 c-7 -7 -12 -20 -12 -29 0 -25 48 -79 70 -79 18 0 70 53 70
                    71 0 33 -22 49 -68 49 -27 0 -53 -5 -60 -12z"/>
                <Path d="M562 959 c-89 -44 -114 -129 -67 -226 30 -62 158 -199 213 -227 30
                    -15 31 -15 89 27 105 78 187 187 199 262 18 120 -100 213 -217 172 -42 -15
                    -50 -15 -82 -2 -49 20 -84 19 -135 -6z m132 -49 l38 -21 42 21 c23 11 50 20
                    60 20 34 0 84 -31 101 -64 24 -45 14 -90 -35 -159 -37 -52 -151 -157 -170
                    -157 -5 0 -45 35 -88 78 -82 79 -122 141 -122 187 0 40 28 85 63 100 44 19 66
                    18 111 -5z"/>
                <Path d="M991 304 c-11 -8 -21 -24 -21 -34 0 -25 48 -80 70 -80 19 0 70 53 70
                    74 0 44 -76 70 -119 40z"/>
            </G>
        </Svg>
    );
};

export default MyCardsIcon;
