import React, {useContext, useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";

type Props = StackScreenProps<HomeStackParamList, 'LeaderBoardScreen'>;

const LeaderBoardScreen = ({navigation}: Props) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.roundedButton}>
                            <Text style={styles.buttonText}>Cards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton}>
                            <Text style={styles.buttonText}>XP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton}>
                            <Text style={styles.buttonText}>Badges</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listItemContainer}>
                        <Text style={styles.listNumber}>#1</Text>
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg' }} style={styles.listImage} />
                        <Text style={styles.listText}>Item 1</Text>
                        <Text style={styles.listEndNumber}>100</Text>
                    </View>
                    <View style={styles.listSeparator} />
                    <View style={styles.listItemContainer}>
                        <Text style={styles.listNumber}>#1</Text>
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg' }} style={styles.listImage} />
                        <Text style={styles.listText}>Item 1</Text>
                        <Text style={styles.listEndNumber}>100</Text>
                    </View>
                    <View style={styles.listSeparator} />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    roundedButton: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 2,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
    },

    buttonText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
    },

    listNumber: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginRight: 15,
    },

    listImage: {
        width: 28,
        height: 28,
        borderRadius: 20,
        marginRight: 15,
    },

    listText: {
        flex: 1,
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    listEndNumber: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 15,
    },

    listSeparator: {
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
    },
});

export default LeaderBoardScreen;
