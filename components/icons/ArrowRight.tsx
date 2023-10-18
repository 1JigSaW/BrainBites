import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const ArrowRightIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(80 * size) / 100} height={(80 * size) / 100} style={style} preserveAspectRatio="xMidYMid meet"  viewBox="0 0 80.000000 80.000000">
            <G transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
               fill={color} stroke="none">
                <Path d="M584 589 c-4 -6 28 -45 72 -90 l78 -79 -364 -2 c-317 -3 -365 -5
                    -365 -18 0 -13 48 -15 365 -18 l364 -2 -79 -80 c-63 -63 -77 -82 -67 -92 10
                    -10 34 9 115 90 l102 102 -100 100 c-55 55 -103 100 -107 100 -4 0 -10 -5 -14
                    -11z"/>
            </G>
        </Svg>
    );
};

export default ArrowRightIcon;
