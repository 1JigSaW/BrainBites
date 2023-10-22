import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import { CardsStackParamList } from "../navigation/CardsStack";

type Props = StackScreenProps<CardsStackParamList, 'QuizScreen'>;

const QuizScreen = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>([null, null, null]);
    const allQuestionsAnswered = selectedAnswers.every(answer => answer !== null);

    const handleConfirmation = () => {
        console.log('1111');
    };

    const questions = [
        {
            question: "Вопрос 1",
            answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        },
        {
            question: "Вопрос 2",
            answers: ["Ответ A", "Ответ B", "Ответ C", "Ответ D"],
        },
        {
            question: "Вопрос 3",
            answers: ["Ответ X", "Ответ Y", "Ответ Z", "Ответ W"],
        },
    ];

    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeContainer}>
                {questions.map((q, qIndex) => (
                    <View key={qIndex} style={styles.questionBlock}>
                        <Text style={styles.questionText}>{q.question}</Text>
                        {q.answers.map((a, aIndex) => (
                            <TouchableOpacity
                                key={aIndex}
                                style={[
                                    styles.answerButton,
                                    selectedAnswers[qIndex] === aIndex && styles.selectedAnswer,
                                ]}
                                onPress={() => handleAnswerSelect(qIndex, aIndex)}
                            >
                                <Text style={styles.answerText}>{a}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !allQuestionsAnswered && styles.confirmButtonDisabled
                    ]}
                    onPress={handleConfirmation}
                    disabled={!allQuestionsAnswered}
                >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: BLUE,
    },
    safeContainer: {
        margin: 10,
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingVertical: 5,
        borderRadius: 20,
    },
    questionBlock: {
        paddingHorizontal: 23,
        marginTop: 10,
    },
    questionText: {
        fontSize: 20,
        fontFamily: 'Abel',
        fontWeight: '700',
        color: BLACK,
        alignSelf: 'flex-start',
    },
    answerButton: {
        padding: 5,
        backgroundColor: BACKGROUND,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    selectedAnswer: {
        borderColor: BLUE,
        borderWidth: 2,
    },
    answerText: {
        fontSize: 16,
        fontFamily: 'Abel',
        fontWeight: '400',
        color: BLACK,
    },
    confirmButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: BLUE,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    confirmButtonText: {
        color: BACKGROUND,
        fontSize: 18,
    },
    confirmButtonDisabled: {
        backgroundColor: 'gray',
    },
});

export default QuizScreen;


