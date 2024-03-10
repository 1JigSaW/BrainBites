import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const FirstPlaceIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(14 * size) / 100} height={(24 * size) / 100} style={style}
             viewBox={`0 0 ${(14 * size) / 100} ${(24 * size) / 100}`} fill="none">
            <G clip-path="url(#clip0_414_478)">
                <Path fillRule="evenodd" clipRule="evenodd"
                      d="M8.34472 13.7891V19.8633H6.70742V15.8906C6.44248 16.0957 6.18707 16.2617 5.93737 16.3887C5.68959 16.5156 5.3789 16.6367 5.00531 16.7539V15.4023C5.55616 15.2188 5.98502 14.998 6.28999 14.7422C6.59496 14.4844 6.83513 14.168 7.00667 13.791H8.34472V13.7891ZM8.78121 9.89062C9.20055 10.0039 9.60463 10.1562 9.98965 10.3418L10.5958 0.585938H11.85L10.8302 10.8242C12.7382 12.1055 14 14.3164 14 16.8281C14 20.7891 10.8664 24 7.00095 24C3.13356 24 0 20.7891 0 16.8281C0 14.3848 1.19319 12.2266 3.01348 10.9316L2.14813 0.585938H3.40231L3.85214 10.4199C4.26385 10.207 4.69653 10.0352 5.15017 9.91016L4.65841 0H9.3435L8.78121 9.89062ZM6.99905 11.3379C9.95725 11.3379 12.3551 13.7949 12.3551 16.8262C12.3551 19.8574 9.95725 22.3145 6.99905 22.3145C4.04084 22.3145 1.64302 19.8574 1.64302 16.8262C1.64302 13.7949 4.04084 11.3379 6.99905 11.3379Z"
                      fill={color}/>
            </G>
            <Defs>
                <ClipPath id="clip0_414_478">
                    <Rect width={(14 * size) / 100} height={(24 * size) / 100} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default FirstPlaceIcon;