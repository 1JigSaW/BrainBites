import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Modal, StyleSheet, Button, Animated, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizState} from "../constants";
import {Quiz} from "../api/quiz.api";
import {useUpdateUserXp} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {BLACK} from "../colors";

interface QuizOverlayProps {
    isVisible: boolean;
    onContinue: () => void;
    quizzes: Quiz[]; // Replace 'Quiz[]' with the appropriate type for your quizzes
}

const QuizOverlay = ({ isVisible, onContinue, quizzes }: QuizOverlayProps) => {
    const [slideAnim] = useState(new Animated.Value(0));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const { userId } = useContext(MainContext);
    const { mutate: updateUserXp } = useUpdateUserXp();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : -300,
            duration: 500,
            useNativeDriver: true,
        }).start();
        const loadQuizState = async () => {
            const savedState = await AsyncStorage.getItem(QuizState);
            if (savedState) {
                const { index, correctCount } = JSON.parse(savedState);
                setCurrentQuestionIndex(index);
                setCorrectAnswersCount(correctCount);
            }
        };

        if (isVisible) {
            loadQuizState();
        }
    }, [isVisible, slideAnim]);

    useEffect(() => {
        const saveQuizState = async () => {
            const state = JSON.stringify({ index: currentQuestionIndex, correctCount: correctAnswersCount });
            await AsyncStorage.setItem(QuizState, state);
        };

        saveQuizState();
    }, [currentQuestionIndex, correctAnswersCount]);

    const handleAnswer = (isCorrect: any) => {
        if (isCorrect) {
            setCorrectAnswersCount(correctAnswersCount + 1);
        }
        if (currentQuestionIndex < quizzes.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
            AsyncStorage.removeItem(QuizState);
        }
    };

    const handleContinue = () => {
        onContinue();
        setQuizCompleted(true);
        setCurrentQuestionIndex(0);
        setCorrectAnswersCount(0);
        if (quizCompleted) {
            updateUserXp({ userId, correctAnswersCount });
        }
    };
    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.modalView}>
                {quizzes.length > 0 && currentQuestionIndex < quizzes.length && !quizCompleted ? (
                    <>
                        <Text style={styles.questionText}>
                            {quizzes[currentQuestionIndex].question}
                        </Text>
                        {quizzes[currentQuestionIndex].answers.map((answer, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleAnswer(quizzes[currentQuestionIndex].correct_answer.toString() === answer.toString())}
                                style={styles.quizAnswer}
                            >
                                <Text style={styles.answerText}>{answer}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                ) : quizCompleted ? (
                    <>
                        <Text>You have completed the quiz!</Text>
                        <Text>Correct answers: {correctAnswersCount} out of {quizzes.length}</Text>
                        <Button title="Continue" onPress={handleContinue} />
                    </>
                ) : (
                    <Text>Loading quizzes or no quiz available...</Text>
                )}
            </View>
        </Animated.View>
    );

};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,    // Добавлено для начала блока от верха экрана
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: '100%', // Or whatever height you want
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    questionText: {
        marginBottom: 15,
        textAlign: "center",
        color: BLACK,
    },
    quizAnswer: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%',
        padding: 10,
        marginVertical: 5,
    },
    answerText: {
        textAlign: 'center',
        color: BLACK,
    }
});

export default QuizOverlay;
