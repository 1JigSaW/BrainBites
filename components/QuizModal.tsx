import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, Modal, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizState} from "../constants";
import {Quiz} from "../api/quiz.api";
import {useUpdateUserXp} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import * as Animatable from 'react-native-animatable';
import {Nunito_Regular, Nunito_Semibold} from "../fonts";
import CircularTimer from "./functions/CircularTimer";
import {useGetLives, useLoseLife} from "../queries/user";

interface QuizOverlayProps {
    isVisible: boolean;
    onContinue: (correctAnswerIds: number[]) => Promise<void>;
    quizzes: Quiz[];
    onQuizChange?: (currentQuizIndex: number) => void;
    navigation: any;
}

const QuizOverlay = ({ isVisible, onContinue, quizzes, onQuizChange, navigation }: QuizOverlayProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const { userId } = useContext(MainContext);
    const [loading, setLoading] = useState(false);
    const [correctAnswerIds, setCorrectAnswerIds] = useState<number[]>([]);
    const [timer, setTimer] = useState(15);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState<number | null>(null);
    const [timerIsActive, setTimerIsActive] = useState(true);

    console.log('onQuizChange', onQuizChange);

    const { mutate: updateUserXp } = useUpdateUserXp()
    const { data: livesData, refetch: refetchLives } = useGetLives(userId);
    const { mutate: loseLife } = useLoseLife();
    console.log('livesData', livesData)
    const animatableRef = useRef<Animatable.View & View>(null);


    useEffect(() => {

        console.log('selectedAnswer', selectedAnswer)
    // Запускаем таймер только если викторина видима, не завершена, текущий вопрос существует, и ответ еще не выбран
        if (isVisible && !quizCompleted && currentQuestionIndex < quizzes.length && !selectedAnswer) {
            setTimer(15); // Устанавливаем таймер на начальное значение

            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    // Если время не истекло, уменьшаем таймер. Иначе останавливаем.
                    if (prevTimer > 0) return prevTimer - 1;
                    // Действия при истечении времени, если нужно
                    return 0;
                });
            }, 1000);

            // Очистка интервала при размонтировании компонента или изменении зависимостей
            return () => clearInterval(interval);
        }
    }, [isVisible, quizCompleted, currentQuestionIndex, quizzes.length, selectedAnswer]); // Добавляем answerSelected в зависимости

    useEffect(() => {
        if (livesData && livesData.lives_remaining != null) {
            setLives(livesData.lives_remaining);
        }
    }, [livesData, userId]);


    useEffect(() => {
        if (timer === 0) {
            Alert.alert(
                "Время вышло!",
                "К сожалению, время на ответ истекло.",
                [
                    { text: "OK", onPress: () => handleAnswer(null) }
                ],
                { cancelable: false }
            );
        }
    }, [timer]);

    useEffect(() => {
        if (animatableRef.current && typeof animatableRef.current.bounceInRight === 'function') {
            animatableRef.current.bounceInRight(500);
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        // Сброс состояния при появлении теста
        if (isVisible) {
            setCurrentQuestionIndex(0);
            setCorrectAnswersCount(0);
            setQuizCompleted(false);
        }
    }, [isVisible]);

     const handleAnswer = (selectedAnswerIndex: number | null) => {
         setTimerIsActive(false);
         setSelectedAnswer(selectedAnswerIndex);
        let isCorrect = false; // По умолчанию ответ считаем неправильным
        if (selectedAnswerIndex !== null) {
            // Если индекс ответа не null, проверяем, правильный ли ответ
            isCorrect = quizzes[currentQuestionIndex].correct_answer === quizzes[currentQuestionIndex].answers[selectedAnswerIndex];
        }
        setIsAnswerCorrect(isCorrect);

        if (!isCorrect && userId) {
            // Если ответ неправильный или время вышло, отнимаем жизнь
            setLives(prevLives => {
                const newLives = (prevLives != null && prevLives > 0) ? prevLives - 1 : 0;

                if (newLives === 0) {
                    // Если жизней больше нет, показываем предупреждение
                    Alert.alert(
                        "Жизни закончились",
                        "К сожалению, все ваши жизни истрачены. Дождитесь пополнения.",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.goBack();
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }

                return newLives;
            });

            loseLife(userId, {
                onSuccess: () => {
                    refetchLives();
                },
                onError: (error) => {
                    console.error("Ошибка при уменьшении жизней:", error);
                }
            });
        } else if (selectedAnswerIndex !== null) {
            // Если ответ правильный, увеличиваем количество правильных ответов
            setCorrectAnswersCount(correctAnswersCount + 1);
            setCorrectAnswerIds([...correctAnswerIds, quizzes[currentQuestionIndex].card_id]);
        }
    };



    const handleContinueQuiz = () => {
        if (currentQuestionIndex < quizzes.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
         if (onQuizChange) {
            onQuizChange(currentQuestionIndex + 1);
        }
    };


    const handleContinue = () => {
        setLoading(true);
        setCurrentQuestionIndex(0);
        setCorrectAnswersCount(0);
        if (quizCompleted) {
            updateUserXp({ userId, correctAnswersCount });
        }
        onContinue(correctAnswerIds);
        setLoading(false);
    };
    return (
        <Animatable.View
            animation={isVisible ? 'slideInUp' : 'slideOutDown'}
            duration={500}
            style={styles.overlay}
        >
            <Animatable.View
                ref={animatableRef}
                style={{ width: '100%' }}
            >
            {loading ? (
                <ActivityIndicator size="large" color={BLUE} />
            ) : (

                <View style={styles.modalView}>
                    <Text>Жизни: {livesData?.lives_remaining ?? "Загрузка..."}</Text>
                    {quizzes.length > 0 && currentQuestionIndex < quizzes.length && !quizCompleted ? (
                        <>
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <CircularTimer seconds={timer} isActive={timerIsActive}/>
                            </View>
                            <Text style={styles.questionText}>
                                {quizzes[currentQuestionIndex].question}
                            </Text>
                            {quizzes[currentQuestionIndex].answers.map((answer, index) => (
                                <Animatable.View
                                    key={index}
                                    animation="fadeIn"
                                    duration={500}>
                                    <TouchableOpacity
                                        onPress={() => selectedAnswer === null && handleAnswer(index)}
                                        style={[
                                            styles.quizAnswer,
                                            selectedAnswer === index ? (isAnswerCorrect ? styles.correctAnswer : styles.incorrectAnswer) : {}
                                        ]}
                                    >
                                        <Text style={styles.answerText}>{answer}</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            ))}
                            {selectedAnswer !== null && (
                                <Animatable.View animation="fadeIn" duration={500}>
                                    <TouchableOpacity style={styles.button} onPress={handleContinueQuiz}>
                                        <Text style={styles.buttonText}>Continue</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            )}
                        </>
                    ) : quizCompleted ? (
                        <Animatable.View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize: 25, textAlign: 'center', color: BLACK}}>You have completed the quiz!</Text>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: BLACK, marginTop: 10 }}>Correct answers: {correctAnswersCount} out of {quizzes.length}</Text>
                            <TouchableOpacity style={styles.button} onPress={handleContinue} >
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                    ) : (
                        <Text>Loading quizzes or no quiz available...</Text>
                    )}
                </View>
            )}
            </Animatable.View>
        </Animatable.View>
    );

};

const styles = StyleSheet.create({
    overlay: {

    },
    modalView: {
        margin: 20,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        padding: 35,
        paddingBottom: 10,
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
        fontFamily: Nunito_Semibold,
        fontSize: 20,
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
        fontFamily: Nunito_Regular,
        fontSize: 16
    },
    button: {
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: BLUE,
        marginTop: 20,
    },
    buttonText: {
        color: BACKGROUND,
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    correctAnswer: {
        borderColor: 'green',
        borderWidth: 2,
    },
    incorrectAnswer: {
        borderColor: 'red',
        borderWidth: 2,
    },
});

export default QuizOverlay;
