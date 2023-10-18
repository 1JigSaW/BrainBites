import React, {useContext, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";

type Props = StackScreenProps<HomeStackParamList, 'AchievementsScreen'>;

const AchievementsScreen = ({navigation}: Props) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        paddingVertical: 5,
    },
});

export default AchievementsScreen;
