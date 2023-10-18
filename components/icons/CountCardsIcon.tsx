import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const CountCardsIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(160 * size) / 100} height={(160 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 160.000000 160.000000">
            <G transform="translate(0.000000,160.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M423 1522 c-306 -83 -333 -96 -333 -156 0 -46 209 -828 229 -856 10
                    -14 21 -34 25 -45 10 -34 437 -453 469 -460 15 -4 40 -2 56 4 15 7 166 151
                    334 320 371 371 353 334 220 474 -48 51 -109 115 -135 142 -26 28 -48 56 -48
                    64 0 8 9 48 21 89 23 81 20 129 -9 155 -9 9 -94 36 -187 62 -94 25 -176 49
                    -184 53 -8 5 -24 44 -36 88 -27 99 -40 122 -71 134 -39 15 -51 13 -351 -68z
                    m341 22 c9 -8 16 -17 16 -19 0 -3 155 -590 210 -792 15 -59 2 -65 -312 -148
                    -299 -79 -319 -82 -332 -38 -3 10 -53 200 -112 421 -104 395 -106 404 -88 422
                    12 12 120 46 299 94 154 41 285 75 292 75 6 1 19 -6 27 -15z m311 -279 c71
                    -19 137 -43 147 -53 17 -17 14 -34 -93 -432 -62 -228 -116 -421 -122 -427 -5
                    -7 -19 -13 -31 -13 -26 0 -517 132 -512 138 3 2 121 35 263 73 234 62 261 71
                    286 99 15 17 27 40 27 53 0 17 -131 521 -156 599 -4 14 0 15 28 8 18 -5 91
                    -25 163 -45z m395 -585 c0 -8 -138 -153 -307 -322 -236 -236 -314 -308 -332
                    -308 -19 0 -72 46 -213 187 -103 103 -186 189 -183 191 2 3 124 -28 269 -68
                    172 -47 274 -70 291 -66 49 12 60 40 139 334 42 158 79 293 82 301 6 18 254
                    -226 254 -249z"/>
            </G>
        </Svg>
    );
};

export default CountCardsIcon;
