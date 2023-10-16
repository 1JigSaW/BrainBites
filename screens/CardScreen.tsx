import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";
import {CardsStackParamList} from "../navigation/CardsStack";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({navigation}: Props) => {

    return (
        <View>
            <Text>avsddsv</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
});

export default CardsScreen;
