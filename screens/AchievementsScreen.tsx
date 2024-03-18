import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator, Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE, MAIN_SECOND, SECONDARY_SECOND, WHITE} from "../colors";
import {useGetUserBadgeProgress} from "../queries/badge";
import MainContext from "../navigation/MainContext";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {Criteria} from "../api/badge.api";
import {calculateProgressBarWidth} from "../utils";
import {Nunito_Bold, Nunito_Regular, Quicksand_Bold, Quicksand_Regular} from "../fonts";

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
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <ScrollView style={styles.safeContainer}>
                <View style={{marginBottom: 20}}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color={BLUE} />
                        ) : (
                            badgeProgress?.map((badge, index) => (
                                <View key={index} style={styles.roundedContainer}>
                                    <View style={styles.infoContainer}>
                                        <Image source={{ uri: badge.image }} width={50} height={45}/>
                                        <View style={{width: '85%', marginLeft: 10}}>
                                            <Text style={styles.mainText}>{badge.name}</Text>
                                            <Text style={styles.subText}>{badge.description}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.progressBarBackground}>
                                        <View style={[styles.progressBarFill, { width: calculateProgressBarWidth(badge.progress_number, badge.criteria) as any }]} />
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        margin: 10,
        borderRadius: 20,
        marginTop: 10,
        padding: 10,
    },
    roundedContainer: {
        backgroundColor: WHITE,
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mainText: {
        color: BLACK,
        fontFamily: Quicksand_Bold,
        fontSize: 18,
        fontStyle: 'normal',
    },

    subText: {
        color: BLACK,
        fontFamily: Quicksand_Regular,
        fontSize: 14,
        fontStyle: 'normal',
    },

    progressBarBackground: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        borderWidth: 5,
        borderColor: MAIN_SECOND
    },

    progressBarFill: {
        height: '100%',
        width: '50%',
        borderRadius: 10,
        backgroundColor: SECONDARY_SECOND,
    },
});

export default AchievementsScreen;
