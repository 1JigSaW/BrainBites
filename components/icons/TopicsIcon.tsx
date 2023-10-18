import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const TopicsIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(140 * size) / 100} height={(140 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 160.000000 160.000000">
            <G transform="translate(0.000000,140.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M167 1393 c-4 -3 -7 -30 -7 -59 l0 -53 -37 -3 -38 -3 -3 -105 c-3
                    -96 -5 -107 -27 -130 l-25 -26 2 -505 3 -504 408 -3 c356 -2 408 0 413 13 4 8
                    18 15 34 15 38 0 60 24 60 64 0 30 4 35 48 51 26 10 53 22 60 28 9 7 20 3 40
                    -16 16 -15 35 -27 43 -27 19 0 129 111 129 130 0 8 -12 26 -27 42 -19 20 -23
                    31 -16 40 6 7 18 34 28 61 16 43 21 47 51 47 51 0 64 20 64 105 0 84 -13 105
                    -63 105 -30 0 -34 5 -60 62 l-27 62 25 26 c14 14 25 32 25 40 0 19 -110 130
                    -129 130 -8 0 -27 -11 -41 -25 l-26 -25 -62 27 c-57 26 -62 30 -62 60 0 39
                    -23 63 -60 63 -27 0 -29 3 -32 43 -2 35 -7 43 -25 45 -19 3 -22 10 -25 55 l-3
                    52 -37 3 -37 3 -3 57 -3 57 -276 3 c-151 1 -278 -1 -282 -5z m528 -68 l0 -40
                    -250 0 -250 0 -3 28 c-7 59 -15 58 255 55 l248 -3 0 -40z m85 -115 l0 -40
                    -297 0 -297 0 -33 -32 -33 -32 0 72 0 72 330 0 330 0 0 -40z m48 -622 l-3
                    -553 -380 0 -380 0 -3 477 -2 477 72 3 73 3 3 73 3 72 310 0 309 0 -2 -552z
                    m-652 446 c-3 -9 -21 -14 -48 -14 l-42 0 44 46 45 45 3 -31 c2 -18 1 -38 -2
                    -46z m744 -38 c0 -41 2 -44 31 -50 17 -3 53 -17 80 -31 l49 -24 33 29 34 29
                    47 -48 47 -48 -29 -33 -30 -32 23 -47 c13 -25 27 -59 31 -76 9 -37 20 -45 62
                    -45 l32 0 0 -69 0 -70 -42 -3 c-40 -3 -42 -5 -59 -54 -9 -29 -25 -64 -34 -78
                    -18 -27 -18 -27 13 -59 l32 -33 -50 -49 -50 -49 -31 32 c-29 29 -32 30 -54 16
                    -12 -8 -47 -23 -76 -33 -53 -19 -54 -21 -59 -63 -4 -38 -8 -43 -32 -46 l-28
                    -3 0 85 c0 85 0 86 25 86 86 0 209 89 255 185 89 184 -25 416 -224 457 l-56
                    12 0 78 0 78 30 0 c29 0 30 -2 30 -44z m57 -177 c56 -27 127 -107 147 -166 20
                    -59 20 -137 0 -196 -31 -92 -157 -197 -236 -197 l-28 0 0 296 0 296 38 -7 c20
                    -3 56 -15 79 -26z"/>
                <Path d="M283 1008 c3 -10 58 -13 232 -13 174 0 229 3 233 13 3 9 -48 12 -233
                        12 -185 0 -236 -3 -232 -12z"/>
                <Path d="M155 900 c-16 -27 16 -30 295 -30 282 0 330 5 289 31 -20 12 -576 12
                        -584 -1z"/>
                <Path d="M154 779 c-3 -6 0 -15 7 -20 8 -5 138 -9 289 -9 151 0 281 4 289 9 7
                        5 10 14 7 20 -10 16 -582 16 -592 0z"/>
                <Path d="M157 663 c-4 -3 -7 -10 -7 -15 0 -4 135 -8 301 -8 236 0 300 3 297
                        13 -4 9 -73 13 -295 15 -159 1 -292 -1 -296 -5z"/>
                <Path d="M155 540 c-3 -5 -3 -14 0 -20 8 -13 564 -13 584 -1 7 5 10 14 7 20
                        -9 15 -582 16 -591 1z"/>
                <Path d="M157 423 c-4 -3 -7 -10 -7 -15 0 -4 135 -8 301 -8 236 0 300 3 297
                        13 -4 9 -73 13 -295 15 -159 1 -292 -1 -296 -5z"/>
                <Path d="M157 303 c-4 -3 -7 -10 -7 -15 0 -4 135 -8 301 -8 236 0 300 3 297
                        13 -4 9 -73 13 -295 15 -159 1 -292 -1 -296 -5z"/>
            </G>
        </Svg>
    );
};

export default TopicsIcon;
