import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK, WHITE} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const HeartIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(31 * size) / 100} height={(27 * size) / 100} style={style}
             viewBox={`0 0 ${(31 * size) / 100} ${(27 * size) / 100}`} fill="none">
            <G clipPath="url(#clip0_402_731)">
                <Path fillRule="evenodd" clipRule="evenodd"
                      d="M15.3576 4.94221C23.2525 -8.02582 46.2309 8.81939 15.3265 27.0001C-15.8423 7.52676 9.15844 -8.4427 15.3576 4.94221ZM7.3051 2.08765C5.28071 1.89058 3.14438 2.81658 1.92514 5.21649C1.87124 5.37207 1.82218 5.52922 1.77802 5.68772C1.33954 7.08235 1.77408 7.70679 2.31343 7.74373C3.06791 7.79547 3.15431 7.13977 3.35199 6.61946C4.34024 4.01757 5.75098 2.57475 7.51241 2.13714C7.4436 2.11949 7.37449 2.10299 7.3051 2.08765Z"
                      fill={color}/>
            </G>
            <Defs>
                <ClipPath id="clip0_402_731">
                    <Rect width={(31 * size) / 100} height={(27 * size) / 100} fill={WHITE}/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default HeartIcon;