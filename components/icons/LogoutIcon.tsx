import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const LogoutIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(15 * size) / 100} height={(20 * size) / 100} style={style}
             viewBox={`0 0 ${(15 * size) / 100} ${(20 * size) / 100}`} fill="none">
            <G clipPath="url(#clip0_455_588)">
                <Path
                    d="M13.3522 10.5171H6.75612C6.47225 10.5171 6.24212 10.2855 6.24212 9.99984C6.24212 9.71403 6.47225 9.48242 6.75612 9.48242H13.3518L11.1977 7.02393C11.0105 6.81071 11.0303 6.48503 11.242 6.29655C11.4538 6.10791 11.7773 6.12777 11.9647 6.34098L14.8716 9.65853C15.0456 9.85645 15.041 10.1515 14.8698 10.3438L11.9645 13.6589C11.7773 13.8722 11.4536 13.8921 11.2418 13.7033C11.0301 13.5148 11.0104 13.189 11.1975 12.9757L13.3522 10.5171ZM11.5704 16.2157C11.5704 15.9299 11.8028 15.6982 12.0895 15.6982C12.3763 15.6982 12.6087 15.9299 12.6087 16.2157V18.5337C12.6087 18.9365 12.4426 19.3034 12.1762 19.5688C11.9095 19.8345 11.5413 19.9998 11.1374 19.9998H1.47143C1.06719 19.9998 0.698886 19.8348 0.432169 19.5692C0.165943 19.3039 0 18.9375 0 18.5337V1.46631C0 1.06266 0.165453 0.695964 0.431843 0.430339C0.698233 0.164876 1.06621 0 1.47143 0H11.1373C11.5422 0 11.91 0.165365 12.1764 0.430664C12.4431 0.696452 12.6085 1.06364 12.6085 1.46631V3.78418C12.6085 4.06982 12.3761 4.30143 12.0893 4.30143C11.8027 4.30143 11.5702 4.06982 11.5702 3.78418V1.46631C11.5702 1.3488 11.5211 1.24089 11.442 1.16211C11.3633 1.08366 11.2552 1.03467 11.1371 1.03467H1.47143C1.35286 1.03467 1.24457 1.0835 1.16601 1.16195C1.08712 1.24023 1.03828 1.34814 1.03828 1.46631V18.5337C1.03828 18.6515 1.08745 18.7591 1.16617 18.8376C1.24522 18.9163 1.35351 18.9653 1.47143 18.9653H11.1373C11.2549 18.9653 11.3628 18.9162 11.4419 18.8374C11.5211 18.7586 11.5704 18.6509 11.5704 18.5337V16.2157Z"
                    fill={BLACK}/>
            </G>
            <Defs>
                <ClipPath id="clip0_455_588">
                    <Rect width={(15 * size) / 100} height={(20 * size) / 100} fill="white"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default LogoutIcon;