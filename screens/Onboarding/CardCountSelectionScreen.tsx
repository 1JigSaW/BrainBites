import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { BACKGROUND, BLACK, BLUE } from "../../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {EVERYDAY_CARDS, QuizState} from "../../constants";

type Props = StackScreenProps<OnboardingStackParamList, 'CardCountSelectionScreen'>;

const CardCountSelectionScreen = ({ navigation, route }: Props) => {
    const {username} = route.params;
    const [selectedCardCount, setSelectedCardCount] = useState<number | null>(null);

    const cardCounts = [10, 20, 25];

    const handleCardCountPress = (count: number) => {
        setSelectedCardCount(count);
    };

    const handleContinuePress = async () => {
        if (selectedCardCount !== null) {
            await AsyncStorage.setItem(EVERYDAY_CARDS, String(selectedCardCount));
            navigation.navigate('TopicSelectionScreen', {username: username, count_cards: selectedCardCount})
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }} contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.safeContainer}>
                <Text style={styles.question}>How many cards will you go through each day?</Text>
                <View style={styles.selectionContainer}>
                    {cardCounts.map((count) => (
                        <TouchableOpacity
                            key={count}
                            style={[
                                styles.cardCountButton,
                                selectedCardCount === count && { backgroundColor: BLUE }
                            ]}
                            onPress={() => handleCardCountPress(count)}
                        >
                            <Text style={[
                                styles.cardCountText,
                                selectedCardCount === count && { color: 'white' }
                            ]}>
                                {count} Cards
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.continueButton, selectedCardCount === null && { backgroundColor: '#ccc' }]}
                    onPress={handleContinuePress}
                    disabled={selectedCardCount === null}
                >
                    <Text style={[styles.textButton, selectedCardCount === null && { opacity: 0.5 }]}>
                        Continue
                    </Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    cardCountButton: {
        padding: 15,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
    },
    cardCountText: {
        fontSize: 17,
        fontFamily: 'Abel',
        color: BLACK,
    },
    continueButton: {
        padding: 15,
        backgroundColor: BLUE,
        borderRadius: 20,
        color: BACKGROUND,
        width: '100%',
    },
    textButton: {
        color: BACKGROUND,
        fontSize: 15,
        fontFamily: 'Abel',
        textAlign: 'center',
    },
    question: {
        fontFamily: 'Abel',
        color: BLACK,
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
    }
});

export default CardCountSelectionScreen;
