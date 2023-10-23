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
import ErrorIcon from "../components/icons/ErrorIcon";
import SuccessIcon from "../components/icons/Success";

type Props = {
    setShowTestScreen: (show: boolean) => void;
};

const QuizScreen = ({setShowTestScreen}: Props) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>([null, null, null]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const questions = [
        {
            question: "Вопрос 1",
            answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
            correctAnswer: 0 // добавьте индекс правильного ответа
        },
        {
            question: "Вопрос 2",
            answers: ["Ответ A", "Ответ B", "Ответ C", "Ответ D"],
            correctAnswer: 2
        },
        {
            question: "Вопрос 3",
            answers: ["Ответ X", "Ответ Y", "Ответ Z", "Ответ W"],
            correctAnswer: 1
        },
    ];

    const allQuestionsAnswered = selectedAnswers.every(answer => answer !== null);
    const correctAnswers = questions.map(q => q.correctAnswer);
    const allCorrect = selectedAnswers.every((answer, index) => answer === correctAnswers[index]);

    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleConfirmation = () => {
        setIsConfirmed(true);
    };

    const renderQuizContent = () => (
        <>
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
        </>
    );

    const renderResultContent = () => (
        <View style={styles.horizontalCenteredContainer}>
            <View style={styles.resultContainer}>
                {!allCorrect ? <ErrorIcon size={100} /> : <SuccessIcon size={100} />}
                <Text style={styles.resultText}>
                    {allCorrect ?
                        "All answers are correct!" :
                        "You made some mistakes. We'll show this test again in the future"}
                </Text>
                <TouchableOpacity style={styles.continueButton} onPress={() => {
                    setShowTestScreen(false)
                }}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeContainer}>
                {isConfirmed ? renderResultContent() : renderQuizContent()}
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    safeContainer: {
        margin: 10,
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },
    questionBlock: {
        paddingHorizontal: 23,
        marginTop: 10,
    },
    questionText: {
        fontSize: 20,
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
        borderColor: 'blue',
        borderWidth: 2,
    },
    answerText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    },
    confirmButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'blue',
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
      opacity: 0.5
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultText: {
        color: BLACK,
        fontFamily: 'Abel',
        fontSize: 32,
        fontWeight: '400',
        marginVertical: 10,
        textAlign: 'center',
    },
    continueButton: {
        fontFamily: 'Abel',
        marginTop: 20,
        padding: 15,
        backgroundColor: BLUE,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    continueButtonText: {
        color: BACKGROUND,
        fontSize: 18,
    },
    horizontalCenteredContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
});


export default QuizScreen;


