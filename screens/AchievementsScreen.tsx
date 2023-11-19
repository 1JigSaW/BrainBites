import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {useGetUserBadgeProgress} from "../queries/badge";
import MainContext from "../navigation/MainContext";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {Criteria} from "../api/badge.api";
import {calculateProgressBarWidth} from "../utils";

type Props = StackScreenProps<HomeStackParamList, 'AchievementsScreen'>;

const AchievementsScreen = ({ navigation }: Props) => {
    const { userId } = useContext(MainContext);
    const { data: badgeProgress, isLoading, error } = useGetUserBadgeProgress(userId, true, false);
    console.log('badgeProgress', badgeProgress);
    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <ActivityIndicator size="large" color={BLUE} />
            </SafeAreaView>
        );
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                {badgeProgress?.map((badge, index) => (
                    <View key={index} style={styles.roundedContainer}>
                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.mainText}>{badge.name}</Text>
                                <Text style={styles.subText}>{badge.description}</Text>
                            </View>
                            <ArrowRightIcon size={40} color={BLACK} />
                        </View>

                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: calculateProgressBarWidth(badge.progress_number, badge.criteria) as any }]} />
                        </View>
                    </View>
                ))}
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
    roundedContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mainText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '900',
    },

    subText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    progressBarBackground: {
        height: 15,
        borderRadius: 10,
        backgroundColor: '#fff', // Цвет фона
        marginTop: 10,
        borderWidth: 1,
    },

    progressBarFill: {
        height: '100%',
        width: '50%', // Положение этой строки меняется в зависимости от вашего прогресса
        borderRadius: 10,
        backgroundColor: 'blue',
    },
});

export default AchievementsScreen;
