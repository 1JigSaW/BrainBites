import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const BrainXPIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(160 * size) / 100} height={(160 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 160.000000 160.000000">
            <G transform="translate(0.000000,160.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M620 1542 c-123 -41 -248 -122 -275 -177 -9 -21 -15 -53 -13 -78 3
                    -41 2 -42 -43 -63 -78 -37 -127 -125 -116 -209 5 -34 2 -46 -13 -60 -50 -46
                    -62 -153 -24 -226 14 -28 14 -34 0 -70 -30 -74 -15 -149 43 -209 32 -34 39
                    -49 44 -97 7 -71 45 -128 108 -163 24 -14 65 -46 91 -72 85 -86 202 -97 302
                    -29 23 16 48 41 55 55 18 33 23 33 43 -2 25 -41 85 -79 145 -92 79 -17 151 7
                    213 70 25 26 65 57 88 69 67 34 112 111 112 191 0 29 6 41 26 55 30 19 74 107
                    74 147 0 15 -7 49 -16 75 -15 42 -15 49 0 73 37 63 28 162 -19 218 -20 23 -23
                    36 -18 65 13 83 -42 180 -120 213 -44 18 -44 19 -39 60 3 27 -2 54 -13 78 -39
                    81 -290 210 -375 191 -16 -3 -40 -15 -54 -26 -25 -20 -25 -20 -54 1 -39 29
                    -88 33 -152 12z m115 -38 c37 -15 45 -56 45 -234 l0 -171 -30 16 c-37 19 -76
                    19 -84 0 -6 -16 -1 -19 47 -29 16 -4 36 -20 47 -39 19 -30 20 -51 20 -331 l0
                    -300 -27 27 c-29 27 -91 57 -118 57 -27 0 -17 -37 13 -45 67 -17 131 -99 132
                    -171 0 -72 -51 -152 -117 -180 -81 -35 -185 -4 -232 68 -15 24 -34 39 -53 43
                    -67 15 -124 109 -112 185 5 31 2 37 -24 53 -46 26 -74 79 -74 138 0 64 10 76
                    51 55 47 -25 114 -31 129 -13 16 19 3 29 -45 33 -82 7 -143 75 -143 156 0 54
                    10 80 46 118 21 23 23 30 14 60 -28 97 54 200 157 200 77 0 144 -60 158 -140
                    5 -30 11 -40 26 -40 38 0 15 106 -34 158 -27 29 -89 62 -116 62 -21 0 -41 27
                    -41 55 0 9 7 32 16 50 36 77 143 82 186 9 20 -33 47 -42 55 -18 6 18 -41 78
                    -75 95 -38 20 -32 27 48 57 56 21 105 27 135 16z m290 -28 l59 -27 -34 -17
                    c-36 -18 -83 -77 -77 -96 8 -23 33 -15 49 14 21 37 80 64 117 55 38 -9 80 -53
                    87 -91 7 -39 -10 -74 -37 -74 -27 0 -89 -33 -116 -62 -49 -52 -72 -158 -34
                    -158 14 0 20 10 25 38 23 148 212 194 293 71 21 -33 24 -47 22 -103 -3 -55 -1
                    -68 17 -88 34 -37 44 -63 44 -116 0 -81 -59 -146 -140 -155 -45 -4 -61 -14
                    -53 -32 9 -25 67 -18 155 19 13 6 19 0 27 -28 17 -62 -18 -146 -73 -176 -24
                    -12 -26 -19 -26 -74 0 -79 -28 -124 -97 -154 -30 -13 -55 -32 -66 -51 -10 -17
                    -38 -43 -63 -57 -38 -22 -54 -26 -103 -22 -76 5 -123 36 -156 102 l-25 50 0
                    439 c0 399 2 442 17 468 10 17 29 32 43 35 46 10 52 14 48 31 -4 24 -32 28
                    -70 9 -17 -9 -33 -16 -35 -16 -3 0 -3 59 -1 131 3 125 4 132 28 151 33 26 95
                    21 175 -16z"/>
                <Path d="M353 1044 c-9 -25 14 -104 43 -141 27 -36 91 -73 124 -73 11 0 20 -5
                    20 -11 0 -21 -58 -68 -93 -74 -28 -6 -37 -12 -37 -27 0 -18 5 -20 40 -15 50 6
                    99 42 125 90 12 24 29 38 46 42 15 3 44 21 65 40 32 27 37 36 26 46 -8 9 -17
                    10 -26 4 -54 -40 -73 -49 -115 -53 -90 -8 -160 48 -171 138 -5 48 -34 68 -47
                    34z"/>
                <Path d="M571 628 c-82 -23 -161 -110 -161 -176 0 -15 -6 -22 -20 -22 -20 0
                    -38 -25 -27 -37 3 -3 28 -9 54 -14 59 -11 107 -58 123 -121 17 -65 19 -70 33
                    -66 17 6 20 40 7 90 -12 41 -69 109 -114 133 -16 9 -17 15 -6 54 15 57 58 97
                    126 117 56 16 62 22 42 42 -14 14 -11 14 -57 0z"/>
                <Path d="M1256 1040 c-5 -39 -15 -60 -42 -90 -63 -69 -151 -75 -222 -15 -34
                    28 -48 31 -55 11 -7 -18 38 -61 85 -81 21 -8 44 -27 52 -44 32 -61 131 -116
                    163 -89 19 15 -2 38 -34 38 -15 0 -39 14 -61 36 l-36 36 51 20 c61 23 107 66
                    129 123 19 50 16 99 -7 103 -13 2 -18 -9 -23 -48z"/>
                <Path d="M890 670 c0 -13 7 -20 18 -20 10 0 42 -12 70 -26 38 -19 58 -37 72
                    -65 30 -58 26 -80 -20 -108 -46 -28 -89 -103 -93 -158 -2 -32 1 -38 18 -38 15
                    0 21 9 27 45 4 25 16 56 26 69 29 39 64 61 112 69 50 8 61 32 20 42 -19 5 -26
                    14 -31 42 -9 59 -51 112 -110 142 -65 32 -109 35 -109 6z"/>
            </G>
        </Svg>
    );
};

export default BrainXPIcon;
