import React, {useContext, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import {BACKGROUND, BLACK, BLOCK_BUTTON, BLUE, GREEN, MAIN_SECOND, SECONDARY_SECOND, WHITE} from "../../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {EVERYDAY_CARDS, QuizState} from "../../constants";
import MainContext from "../../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../../fonts";

type Props = StackScreenProps<OnboardingStackParamList, 'CardCountSelectionScreen'>;

const CardCountSelectionScreen = ({ navigation, route }: Props) => {
    const { completeOnboarding } = useContext(MainContext);
    const {username} = route.params;
    const {setEveryDayCards} = useContext(MainContext);
    const [selectedCardCount, setSelectedCardCount] = useState<number | null>(null);

    const cardCounts = [10, 20, 25];

    const handleCardCountPress = (count: number) => {
        setSelectedCardCount(count);
    };

    const handleContinuePress = async () => {
        if (selectedCardCount !== null) {
            await AsyncStorage.setItem(EVERYDAY_CARDS, String(selectedCardCount));
            setEveryDayCards(Number(selectedCardCount));
            completeOnboarding();
        }
    };

    return (
    <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20,}}
            >
                <Text style={styles.question}>How many cards will you go through in a single session?</Text>
                <View style={styles.selectionContainer}>
                    {cardCounts.map((count) => (
                        <TouchableOpacity
                            key={count}
                            style={[
                                styles.cardCountButton,
                                selectedCardCount === count && {backgroundColor: '#FAD1C5', borderWidth: 0},
                            ]}
                            onPress={() => handleCardCountPress(count)}
                        >
                            <Text style={[
                                styles.cardCountText,
                            ]}>
                                {count} Cards
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.continueButton, selectedCardCount === null && {backgroundColor: BLOCK_BUTTON}]}
                onPress={handleContinuePress}
                disabled={selectedCardCount === null}
            >
                <Text style={[styles.textButton, selectedCardCount === null && {opacity: 0.9}]}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    container: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        margin: 15,
        borderRadius: 20,
    },
    selectionContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    cardCountButton: {
        padding: 10,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
    },
    cardCountText: {
        fontSize: 18,
        fontFamily: Quicksand_Regular,
        color: BLACK,
    },
    continueButton: {
        margin: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    textButton: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        color: BLACK,
        fontSize: 24,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        marginBottom: 15,
    }
});

export default CardCountSelectionScreen;
