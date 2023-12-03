import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, Modal, StyleSheet, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizState} from "../constants";
import {Quiz} from "../api/quiz.api";
import {useUpdateUserXp} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {BLACK} from "../colors";
import * as Animatable from 'react-native-animatable';

interface QuizOverlayProps {
    isVisible: boolean;
    onContinue: () => void;
    quizzes: Quiz[];
    onQuizChange: (currentQuizIndex: number) => void;
}

const QuizOverlay = ({ isVisible, onContinue, quizzes, onQuizChange }: QuizOverlayProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const { userId } = useContext(MainContext);
    const { mutate: updateUserXp } = useUpdateUserXp()

    const animatableRef = useRef<Animatable.View & View>(null);


    useEffect(() => {
        if (animatableRef.current && typeof animatableRef.current.bounceInRight === 'function') {
            animatableRef.current.bounceInRight(500);
        }
    }, [currentQuestionIndex]);


    useEffect(() => {
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
    }, [isVisible]);

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
        onQuizChange(currentQuestionIndex + 1);
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
        <Animatable.View
            animation={isVisible ? 'slideInUp' : 'slideOutDown'} // Use appropriate animation names
            duration={500}
            style={styles.overlay}
        >
            <Animatable.View
                ref={animatableRef}
                style={{ width: '100%' }}
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
            </Animatable.View>
        </Animatable.View>
    );

};

const styles = StyleSheet.create({
    overlay: {

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
