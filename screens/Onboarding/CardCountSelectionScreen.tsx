import React, {useContext, useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import {BACKGROUND, BLACK, BLUE, GREEN} from "../../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {EVERYDAY_CARDS, QuizState} from "../../constants";
import MainContext from "../../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold} from "../../fonts";

type Props = StackScreenProps<OnboardingStackParamList, 'CardCountSelectionScreen'>;

const CardCountSelectionScreen = ({ navigation, route }: Props) => {
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
                                selectedCardCount === count && { backgroundColor: GREEN, borderWidth: 0 }
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
        padding: 10,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
    },
    cardCountText: {
        fontSize: 24,
        fontFamily: Nunito_Regular,
        color: BLACK,
    },
    continueButton: {
        padding: 10,
        backgroundColor: BLUE,
        borderRadius: 20,
        color: BACKGROUND,
        width: '100%',
    },
    textButton: {
        color: BACKGROUND,
        fontSize: 20,
        fontFamily: Nunito_Semibold,
        textAlign: 'center',
    },
    question: {
        fontFamily: Nunito_Bold,
        color: BLACK,
        marginBottom: 20,
        fontSize: 28,
        textAlign: 'center',
    }
});

export default CardCountSelectionScreen;
