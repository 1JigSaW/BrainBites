import React, {useContext, useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK} from "../colors";
import DeleteIcon from "../components/icons/DeleteIcon";

type Props = StackScreenProps<HomeStackParamList, 'MyCardsScreen'>;

const MyCardsScreen = ({navigation}: Props) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.cardBlock}>
                    <View style={{width: '90%'}}>
                        <Text style={styles.cardText}>
                            Black Holes: The Mysterious Giants of the Cosmos
                        </Text>
                    </View>
                    <DeleteIcon size={25} color={BLACK}/>
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
    cardBlock: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default MyCardsScreen;
