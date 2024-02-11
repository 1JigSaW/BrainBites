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

interface QuizOverlayProps {
    isVisible: boolean;
    onContinue: (correctAnswerIds: number[]) => Promise<void>;
    quizzes: Quiz[];
    onQuizChange?: (currentQuizIndex: number) => void;
}

const QuizOverlay = ({ isVisible, onContinue, quizzes, onQuizChange }: QuizOverlayProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const { userId } = useContext(MainContext);
    const [loading, setLoading] = useState(false);
    const [correctAnswerIds, setCorrectAnswerIds] = useState<number[]>([]);
    const [timer, setTimer] = useState(15);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    console.log('onQuizChange', onQuizChange);

    const { mutate: updateUserXp } = useUpdateUserXp()

    const animatableRef = useRef<Animatable.View & View>(null);


    useEffect(() => {
        // Запускаем таймер только если викторина видна, не завершена, и индекс вопроса в пределах количества вопросов
        if (isVisible && !quizCompleted && currentQuestionIndex < quizzes.length) {
            // Сбрасываем таймер до 15 секунд при каждом новом вопросе
            setTimer(15); // Переместили сюда для избежания зависимости от timer

            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0); // Уменьшаем таймер, если больше 0, иначе оставляем 0
            }, 1000);

            // Очистка интервала при размонтировании компонента, смене вопроса, или когда таймер достигнет 0
            return () => clearInterval(interval);
        }
        // Убрали timer из списка зависимостей, чтобы избежать постоянного перезапуска таймера
    }, [isVisible, quizCompleted, currentQuestionIndex, quizzes.length]); // Оставляем основные зависимости


    // Обработка истечения времени таймера
    useEffect(() => {
        if (timer === 0) {
            // Автоматически переходим к следующему вопросу или завершаем квиз, если это был последний вопрос
            Alert.alert(
                "Время вышло!",
                "К сожалению, время на ответ истекло.",
                [
                    { text: "OK", onPress: () => handleAnswer(false) }
                ],
                { cancelable: false } // Предотвращаем закрытие алерта кликом вне его области
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

    const handleAnswer = (isCorrect: boolean) => {
        const currentQuiz = quizzes[currentQuestionIndex];

        if (isCorrect) {
            setCorrectAnswersCount(correctAnswersCount + 1);
            console.log('currentQuiz.card', currentQuiz.card_id);
            setCorrectAnswerIds([...correctAnswerIds, currentQuiz.card_id]); // Добавление id в массив
        }

        if (currentQuestionIndex < quizzes.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }

        if (onQuizChange) {
            console.log(111111111111111111111)
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
            animation={isVisible ? 'slideInUp' : 'slideOutDown'} // Use appropriate animation names
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
                    {quizzes.length > 0 && currentQuestionIndex < quizzes.length && !quizCompleted ? (
                        <>
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <CircularTimer seconds={timer} />
                            </View>
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
    }
});

export default QuizOverlay;
