import React, {useContext, useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet, Text, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";
import {Regular} from "../fonts";

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.avatarIcon}></View>
                    <Text style={styles.iconText}>My topics</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg' }} style={styles.avatar} />
                    <Text style={styles.nameText}>jigsaw</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>My cards</Text>
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
        paddingVertical: 20,
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
        fontFamily: Regular,
        fontSize: 16,
        color: '#000',
    },
    nameText: {
        fontFamily: Regular,
        fontSize: 24,
        color: '#000',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5,
    },
});

export default HomeScreen;
