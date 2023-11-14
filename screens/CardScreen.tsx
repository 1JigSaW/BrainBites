import {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import { StackScreenProps } from "@react-navigation/stack";
import { CardsStackParamList } from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import CardComponent from "../components/CardComponent";
import {useGetUnseenCards, useMarkCardsAsTestPassed} from "../queries/card";
import {ActivityIndicator, Alert, AppState, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useGetAvailableQuizzes} from "../queries/quiz";
import QuizModal from "../components/QuizModal";
import {CARDS_COUNT, CARDS_INDEX_KEY, CARDS_KEY, QUIZ_KEY} from "../constants";
import {Quiz} from "../api/quiz.api";
import {Card} from "../api/card.api";
import {useCheckUserAchievements} from "../queries/badge";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({ navigation }: Props) => {
    const { userId, setCardCount, cardCount } = useContext(MainContext);
    const pageSize = 5;
    const [cards, setCards] = useState<Card[] | undefined>([]);
    const [fetchEnabled, setFetchEnabled] = useState(false);
    const [fetchEnabledQuiz, setFetchEnabledQuiz] = useState(false);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isQuizVisible, setIsQuizVisible] = useState(false);
    const [swipeKey, setSwipeKey] = useState(0);
    const [earnedBadges, setEarnedBadges] = useState([]);

    const checkAchievements = useCheckUserAchievements(userId);

    const markAsPassedMutation = useMarkCardsAsTestPassed(userId);

    const {
        data: cardsData,
        isError: isCardsError,
        refetch: refetchCards
    } = useGetUnseenCards(userId, pageSize, fetchEnabled);

    const {
        data: quizzesData,
        isError: isQuizzesError,
        refetch: refetchQuizzes
    } = useGetAvailableQuizzes(userId, fetchEnabledQuiz);

    useEffect(() => {
        const loadSavedState = async () => {
            try {
                const savedCards = await AsyncStorage.getItem(CARDS_KEY);
                const savedIndex = await AsyncStorage.getItem(CARDS_INDEX_KEY);
                const savedTestState = await AsyncStorage.getItem(QUIZ_KEY);
                const isTestActive = savedTestState ? JSON.parse(savedTestState) : false;

                if (isTestActive) {
                    // Если состояние теста активно, показываем тест.
                    setIsQuizVisible(true);
                    setFetchEnabledQuiz(true);
                } else if (savedCards && savedIndex) {
                    const parsedCards = JSON.parse(savedCards);
                    const index = parseInt(savedIndex, 10);
                    // Если в сохраненных карточках есть еще не просмотренные,
                    // устанавливаем их в состояние.
                    if (index < parsedCards.length) {
                        setCards(parsedCards.slice(index));
                    } else {
                        // Если все карточки были просмотрены, переходим к тесту.
                        handleTest();
                    }
                } else {
                    // Если сохраненного состояния нет, загружаем новые карточки.
                    setFetchEnabled(true);
                }
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось восстановить сохраненные данные');
            }
        };

        loadSavedState();
    }, []);

    const handleCheckAchievements = async () => {
        try {
            const badges = await checkAchievements.refetch();
            setEarnedBadges(badges.data);
            if (badges.data?.length > 0) {
                Toast.show({
                    type: 'success',
                    text1: 'You get a new badge',
                });
            }
        } catch (error) {
            console.error('Error checking achievements:', error);
        }
    };


    // Функция для обработки свайпа карточки
    const handleSwiped = (cardIndex: number) => {
        // Save the new card index to local storage
        saveProgress(cardIndex + 1);

        // Update the card count state and AsyncStorage simultaneously
        setCardCount(prevCardCount => {
            const newCardCount = prevCardCount + 1;
            AsyncStorage.setItem(CARDS_COUNT, String(newCardCount)).catch((error) => {
                console.error('AsyncStorage error:', error);
            });
            return newCardCount;
        });
    };


    // Функция для вызова, когда все карточки просмотрены
    const handleTest = async () => {
        setIsQuizVisible(true); // Показываем викторину
        setFetchEnabledQuiz(true);
        await saveTestState(true);

        // Сохраняем прогресс, что все карточки были просмотрены.
        await saveProgress(0);

    };

    const saveTestState = async (isTestActive: boolean) => {
        try {
            await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(isTestActive));
        } catch (error) {
            Alert.alert('Ошибка', 'Не удалось сохранить состояние теста');
        }
    };


    // Функция для обработки продолжения после викторины
    const handleContinueFromQuiz = () => {
        setIsQuizVisible(false); // Скрыть викторину
        saveTestState(false); // Обнуляем состояние теста
        markAsPassedMutation.mutate(undefined, {
            onSuccess: async () => {
                // Может быть, здесь не нужно вызывать refetchCards, так как изменение fetchEnabled вызовет запрос
                console.log('All cards have been marked as passed.');
                setFetchEnabled(true);
                if (cardsData) {
                    await refetchCards();
                    setCards(cardsData);
                    setSwipeKey(swipeKey + 1);
                }
            },
            onError: (error) => {
                setFetchEnabled(false); // Выключить флаг, если произошла ошибка
                Alert.alert('Ошибка', 'Не удалось отметить карточки как пройденные');
                console.error('Error marking cards as passed:', error);
            }
        });

    };

    const saveProgress = async (index: number) => {
        try {
            await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
            await AsyncStorage.setItem(CARDS_INDEX_KEY, index.toString());
        } catch (error) {
            Alert.alert('Ошибка', 'Не удалось сохранить прогресс');
        }
    };

    // В случае ошибок загрузки карточек или викторины, выводим сообщение
    useEffect(() => {
        if (isCardsError) {
            Alert.alert('Ошибка', 'Не удалось загрузить карточки');
        }

        if (isQuizzesError && isQuizVisible) {
            Alert.alert('Ошибка', 'Не удалось загрузить вопросы для викторины');
        }
    }, [isCardsError, isQuizzesError, isQuizVisible]);

    useEffect(() => {
        setCards(cardsData);
        setFetchEnabled(false);
    }, [fetchEnabled, cardsData]);

    useEffect(() => {
        if (fetchEnabledQuiz && quizzesData) {
            setQuizzes(quizzesData);
            setFetchEnabledQuiz(false);
            handleCheckAchievements();
        }
    }, [fetchEnabledQuiz, quizzesData]);


    return (
        <View style={styles.container}>
            {cards && cards?.length > 0 ? (
                <Swiper
                    key={swipeKey} // Обновление ключа при каждом изменении количества карточек
                    cards={cards}
                    renderCard={(card) => <CardComponent card={card} />}
                    onSwiped={handleSwiped}
                    onSwipedAll={handleTest}
                    backgroundColor="#f0f0f0"
                    stackSize={pageSize}
                    stackScale={10}
                    stackSeparation={15}
                />

            ) : (
                <Text>No cards left</Text>
            )}

            {isQuizVisible && quizzes.length > 0 && (
                <QuizModal
                    isVisible={isQuizVisible}
                    onContinue={handleContinueFromQuiz}
                    quizzes={quizzes}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CardsScreen;
