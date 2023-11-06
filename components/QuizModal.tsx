import React, { useState, useEffect } from 'react';
import {View, Text, Modal, StyleSheet, Button, Animated} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizState} from "../constants";

const QuizOverlay = ({ isVisible, onContinue, quizzes }) => {
    const [slideAnim] = useState(new Animated.Value(0));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

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
            await AsyncStorage.setItem('quizState', state);
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
                            <Button
                                key={index}
                                title={typeof answer.text === 'string' ? answer.text : 'Default Answer'}
                                onPress={() => handleAnswer(answer.isCorrect)}
                            />
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
        bottom: 0, // Start from the bottom of the screen
        backgroundColor: 'white',
        height: 300, // Or whatever height you want
        // Style your overlay here
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default QuizOverlay;
