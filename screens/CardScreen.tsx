import {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import { StackScreenProps } from "@react-navigation/stack";
import { CardsStackParamList } from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import CardComponent from "../components/CardComponent";
import { useGetUnseenCards } from "../queries/card";
import {ActivityIndicator, Alert, AppState, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CARDSNOVIEWED, QuizVisible, QuizzesData, RemainingCards, SwipedCardIds} from "../constants";
import {useGetAvailableQuizzes} from "../queries/quiz";
import QuizModal from "../components/QuizModal";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CARDS_KEY = '@currentCards1';
const CARDS_INDEX_KEY = '@currentCardIndex1';

const CardsScreen = ({ navigation }) => {
    const { userId } = useContext(MainContext);
    const pageSize = 5;
    const [cards, setCards] = useState([]);
    const [fetchEnabled, setFetchEnabled] = useState(false);
    const [fetchEnabledQuiz, setFetchEnabledQuiz] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [isQuizVisible, setIsQuizVisible] = useState(false);

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
                // Получаем сохраненные карточки и индекс
                const savedCards = await AsyncStorage.getItem(CARDS_KEY);
                const savedIndex = await AsyncStorage.getItem(CARDS_INDEX_KEY);
                if (savedCards && savedIndex) {
                    console.log(1)
                    setCards(JSON.parse(savedCards).slice(parseInt(savedIndex)));
                } else {
                    console.log(2)
                    // Если сохраненного состояния нет, то загружаем карточки
                    setFetchEnabled(true);
                    setCards(cardsData);
                    setFetchEnabled(false);
                }
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось восстановить сохраненные данные');
            }
        };

        loadSavedState();
    }, []);

    // Функция для обработки свайпа карточки
    const handleSwiped = (cardIndex: number) => {
        saveProgress(cardIndex + 1);
    };


    // Функция для вызова, когда все карточки просмотрены
    const handleTest = async () => {
        setIsQuizVisible(true); // Показываем викторину
        setFetchEnabledQuiz(true); // Включаем флаг для загрузки вопросов квиза

        // Сохраняем прогресс
        await saveProgress(0);
    };

    // Функция для обработки продолжения после викторины
    const handleContinueFromQuiz = () => {
        setIsQuizVisible(false);
        setFetchEnabled(true); // Включаем флаг для загрузки новых карточек
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

    return (
        <View style={styles.container}>
            {cards?.length > 0 ? (
                <Swiper
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
