import React, {useContext, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK} from "../colors";
import ArrowRightIcon from "../components/icons/ArrowRight";

type Props = StackScreenProps<HomeStackParamList, 'AchievementsScreen'>;

const AchievementsScreen = ({navigation}: Props) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.roundedContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.mainText}>Card Master</Text>
                            <Text style={styles.subText}>Collect 50 cards</Text>
                        </View>
                        <ArrowRightIcon size={40} color={BLACK} />
                    </View>

                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>
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
