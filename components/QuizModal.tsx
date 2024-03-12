import React, {useState, useEffect, useContext, useRef} from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizState} from "../constants";
import {Quiz} from "../api/quiz.api";
import {useUpdateUserXp} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {
    BACKGROUND,
    BLACK, BLOCK_BUTTON,
    BLUE,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    MAIN_SECOND,
    RED_SECOND,
    SECONDARY_SECOND,
    WHITE
} from "../colors";
import * as Animatable from 'react-native-animatable';
import {Nunito_Regular, Nunito_Semibold, Quicksand_Regular} from "../fonts";
import CircularTimer from "./functions/CircularTimer";
import {useGetLives, useLoseLife} from "../queries/user";
import HeartIcon from "./icons/HeartIcon";

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
    const [timer, setTimer] = useState(100000000000);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState<number | null>(null);
    const [timerIsActive, setTimerIsActive] = useState(true);

    const { mutate: updateUserXp } = useUpdateUserXp()
    const { data: livesData, refetch: refetchLives } = useGetLives(userId);
    const { mutate: loseLife } = useLoseLife();
    const animatableRef = useRef<Animatable.View & View>(null);

    console.log('selectedAnswer', selectedAnswer)

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        if (timerIsActive && isVisible && !quizCompleted && currentQuestionIndex < quizzes.length) {
            setTimer(15); // Перезапуск таймера для нового вопроса

            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
        }

        return () => clearInterval(intervalId); // Очистка интервала при деактивации компонента или остановке таймера
    }, [timerIsActive, isVisible, quizCompleted, currentQuestionIndex, quizzes.length]);



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
                    { text: "OK", onPress: () => handleContinueQuiz() }
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
        if (isVisible) {
            setCurrentQuestionIndex(0);
            setCorrectAnswersCount(0);
            setQuizCompleted(false);
        }
    }, [isVisible]);

     const handleAnswer = (selectedAnswerIndex: number | null) => {
         setTimerIsActive(false);
         setSelectedAnswer(selectedAnswerIndex);
         console.log('setSelectedAnswer(selectedAnswerIndex);', selectedAnswer)
         let isCorrect = false;
         if (selectedAnswerIndex !== null) {
             isCorrect = quizzes[currentQuestionIndex].correct_answer === quizzes[currentQuestionIndex].answers[selectedAnswerIndex];
         }
         console.log('CORRECT', isCorrect)
         setIsAnswerCorrect(isCorrect);

         if (!isCorrect && userId) {
            setLives(prevLives => {
                const newLives = (prevLives != null && prevLives > 0) ? prevLives - 1 : 0;

                if (newLives === 0) {
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
        setTimerIsActive(true);
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
            style={[styles.overlay, {flex: 1, width: '100%'}]}
        >
            <Animatable.View
                ref={animatableRef}
                style={{ width: '100%', flex: 1 }}
            >
            {loading ? (
                <ActivityIndicator size="large" color={BLUE} />
            ) : (

                <View style={styles.modalView}>
                    <View style={styles.timerWrapper}>
                        <CircularTimer seconds={timer} isActive={timerIsActive}/>
                    </View>
                    <ScrollView style={{flex: 1, width: '100%'}}>
                        <View style={styles.counterQuiz}>
                            <Text style={styles.quizTextCounter}>{`${currentQuestionIndex + 1}/${quizzes?.length}`}</Text>
                        </View>
                        <View style={styles.lives}>
                            <Text style={styles.livesText}>{lives}</Text>
                            <HeartIcon size={100} color={RED_SECOND} style={{marginRight: 10, marginTop: 3}} />
                        </View>
                        <View style={{paddingHorizontal: 15, marginTop: 70}}>
                        {quizzes.length > 0 && currentQuestionIndex < quizzes.length && !quizCompleted ? (
                            <>
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
                            </>
                        ) : quizCompleted ? (
                            <Animatable.View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{fontSize: 25, textAlign: 'center', color: BLACK}}>You have completed the quiz!</Text>
                                <Text style={{ fontSize: 20, textAlign: 'center', color: BLACK, marginTop: 10 }}>Correct answers: {correctAnswersCount} out of {quizzes.length}</Text>
                                <TouchableOpacity style={styles.button} onPress={handleContinueQuiz} >
                                    <Text style={styles.buttonText}>Continue</Text>
                                </TouchableOpacity>
                            </Animatable.View>

                        ) : (
                            <Text>Loading quizzes or no quiz available...</Text>
                        )}
                        </View>

                    </ScrollView>
                        <TouchableOpacity style={[styles.button, !selectedAnswer && {backgroundColor: BLOCK_BUTTON}]} onPress={handleContinueQuiz} disabled={!selectedAnswer}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                </View>
            )}
            </Animatable.View>
        </Animatable.View>
    );

};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        borderRadius: 20,
        alignItems: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 100,
    },
    questionText: {
        marginBottom: 15,
        textAlign: "center",
        color: BLACK,
        fontFamily: Nunito_Semibold,
        fontSize: 20,
    },
    quizAnswer: {
        backgroundColor: BACKGROUND,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginVertical: 5,
        elevation: 5,
    },
    answerText: {
        textAlign: 'center',
        color: BLACK,
        fontFamily: Quicksand_Regular,
        fontSize: 18
    },
    button: {
        margin: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        width: '90%'
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: CORRECT_ANSWER,
    },
    incorrectAnswer: {
        backgroundColor: INCORRECT_ANSWER,
    },
    timerWrapper: {
        position: 'absolute',
        top: -50,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 55,
        width: 105,
        height: 105,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterQuiz: {
        position: 'absolute',
        shadowColor: BACKGROUND,
        backgroundColor: BACKGROUND,
        padding: 5,
        borderBottomEndRadius: 20,
    },
    quizTextCounter: {
        fontFamily: Quicksand_Regular,
        color: BLACK,
        fontSize: 18
    },
    lives: {
        position: 'absolute',
        flexDirection: "row",
        alignItems: "center",
        right: 0,
        elevation: 0,
        padding: 5,
        borderBottomEndRadius: 20,
        marginTop: 5
    },
    livesText: {
        fontSize: 24,
        fontFamily: Quicksand_Regular,
        color: BLACK,
        marginRight: 5,
    },
});

export default QuizOverlay;
