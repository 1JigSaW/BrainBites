import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK, CORRECT_ANSWER, INCORRECT_ANSWER, RED} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const FireIcon = ({size, style, color}: Props) => {
    return (
        <Svg viewBox={`0 0 ${(2024 * size) / 100} ${(2024 * size) / 100}`} width={(102 * size) / 100} height={(102 * size) / 100} style={style} fill={INCORRECT_ANSWER}>
            <Path d="M336 972.8c-60.8-128-28.8-201.6 19.2-268.8 51.2-76.8 64-150.4 64-150.4s41.6 51.2 25.6 134.4c70.4-80 83.2-208 73.6-256 160 112 230.4 358.4 137.6 537.6 492.8-281.6 121.6-700.8 57.6-745.6 22.4 48 25.6 128-19.2 166.4-73.6-281.6-256-336-256-336 22.4 144-76.8 300.8-172.8 419.2-3.2-57.6-6.4-96-38.4-153.6-6.4 105.6-86.4 188.8-108.8 294.4C89.6 758.4 140.8 860.8 336 972.8L336 972.8z" />
        </Svg>
    );
};

export default FireIcon;