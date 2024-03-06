import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK, WHITE} from '../../colors';

interface Props {
    size: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const PlusIcon = ({size, style, color}: Props) => {
    return (
        <Svg width={(13 * size) / 100} height={(13 * size) / 100} style={style}
             viewBox={`0 0 ${(13 * size) / 100} ${(13 * size) / 100}`} fill="none">
            <G clipPath="url(#clip0_418_517)">
                <Path
                    d="M6.02879 1.02305C6.02879 0.959637 6.04157 0.898837 6.06461 0.843072C6.08872 0.784984 6.12367 0.732994 6.16685 0.689815C6.25205 0.604522 6.36997 0.551758 6.49999 0.551758C6.56369 0.551758 6.62458 0.564537 6.68035 0.587676C6.68151 0.58816 6.68258 0.588741 6.68393 0.589322C6.74047 0.613332 6.7911 0.647701 6.83332 0.689912C6.91861 0.775109 6.97137 0.893029 6.97137 1.02315C6.97137 1.02605 6.97118 1.02896 6.97079 1.03176V6.02932H11.9682C11.971 6.02903 11.9741 6.02874 11.9769 6.02874C12.0404 6.02874 12.1013 6.04152 12.1571 6.06466C12.1585 6.06514 12.1595 6.06572 12.1607 6.06631C12.2172 6.09032 12.2678 6.12468 12.3101 6.1669C12.3954 6.25209 12.4483 6.37001 12.4483 6.50003C12.4483 6.56335 12.4354 6.62425 12.4124 6.68001C12.3884 6.7381 12.3534 6.79009 12.3101 6.83327C12.267 6.87635 12.2152 6.9113 12.1571 6.93541V6.93551C12.1013 6.95855 12.0404 6.97133 11.9769 6.97133C11.9741 6.97133 11.971 6.97113 11.9682 6.97075L6.97079 6.97084V11.9683C6.97118 11.9711 6.97137 11.9741 6.97137 11.977C6.97137 12.0405 6.9585 12.1015 6.93545 12.1572C6.93487 12.1585 6.93429 12.1596 6.93371 12.1608C6.9097 12.2173 6.87543 12.2679 6.83332 12.3102C6.74783 12.3955 6.63001 12.4483 6.49999 12.4483C6.43667 12.4483 6.37577 12.4355 6.32001 12.4124C6.26192 12.3884 6.20993 12.3534 6.16675 12.3102C6.12367 12.2672 6.08872 12.2153 6.06461 12.1572C6.04148 12.1015 6.0286 12.0405 6.0286 11.977C6.0286 11.9741 6.02879 11.9711 6.02918 11.9683V6.97084H1.03176C1.02895 6.97123 1.02605 6.97142 1.02305 6.97142C0.95973 6.97142 0.898835 6.95864 0.84307 6.93551C0.784982 6.9115 0.732993 6.87655 0.689814 6.83327C0.646732 6.79019 0.611782 6.73839 0.587676 6.6803C0.564537 6.62454 0.551758 6.56364 0.551758 6.50003C0.551758 6.43662 0.564537 6.37582 0.587676 6.32006C0.611782 6.26197 0.646732 6.20998 0.689911 6.1668C0.775204 6.08151 0.893026 6.02874 1.02314 6.02874C1.02614 6.02874 1.02905 6.02894 1.03186 6.02932H6.02937V1.03176C6.02899 1.02886 6.02879 1.02595 6.02879 1.02305Z"
                    fill={color}/>
            </G>
            <Defs>
                <ClipPath id="clip0_418_517">
                    <Rect width={(12 * size) / 100} height={(12 * size) / 100} fill={WHITE} transform="translate(0.551758 0.551758)"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default PlusIcon;