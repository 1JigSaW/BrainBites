import React, {useContext, useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>jigsaw</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>Текст</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text>avsddsv</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    avatarIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    otherIcon: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    iconText: {
        fontSize: 16,
        color: '#000',
    },
});

export default HomeScreen;
