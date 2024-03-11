import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const BackIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(17 * size) / 100} height={(32 * size) / 100} style={style}
             viewBox={`0 0 ${(17 * size) / 100} ${(32 * size) / 100}`} fill="none">
            <G clipPath="url(#clip0_436_442)">
                <Path
                    d="M16.5048 28.9585C17.1781 29.6694 17.1628 30.8022 16.4717 31.4923C15.7781 32.1824 14.6729 32.1668 13.9996 31.4559L0.500742 17.1902L1.75332 15.9402L0.49566 17.1902C-0.177632 16.4767 -0.162388 15.3413 0.533771 14.6486C0.554097 14.6277 0.574423 14.6095 0.594749 14.5913L13.9996 0.544412C14.6729 -0.166526 15.7781 -0.182151 16.4717 0.507953C17.1654 1.19806 17.1781 2.33347 16.5048 3.04181L4.19242 15.9455L16.5048 28.9585Z"
                    fill={color}/>
            </G>
            <Defs>
                <ClipPath id="clip0_436_442">
                    <Rect width={(17 * size) / 100} height={(32 * size) / 100} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default BackIcon;