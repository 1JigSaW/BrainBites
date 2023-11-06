import { useContext, useEffect, useState } from "react";
import MainContext from "../navigation/MainContext";
import { StackScreenProps } from "@react-navigation/stack";
import { CardsStackParamList } from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import CardComponent from "../components/CardComponent";
import { useGetUnseenCards } from "../queries/card";
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {QuizVisible, QuizzesData, RemainingCards, SwipedCardIds} from "../constants";
import {useGetAvailableQuizzes} from "../queries/quiz";
import QuizModal from "../components/QuizModal";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({ navigation }: Props) => {
    const { userId } = useContext(MainContext);
    const pageSize = 5;
    const [cards, setCards] = useState( []);
    const [fetchEnabled, setFetchEnabled] = useState(false);
    const [fetchEnabledQuiz, setFetchEnabledQuiz] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [isQuizVisible, setIsQuizVisible] = useState(false);

    const {
        data: cardsData,
        isError: isCardsError,
        refetch: refetchCards
    } = useGetUnseenCards(userId, pageSize, cards.length === 0 && !isQuizVisible);


    const {
        data: quizzesData,
        isError: isQuizzesError,
        refetch: refetchQuizzes
    } = useGetAvailableQuizzes(userId, isQuizVisible);

    const handleSwiped = async (cardIndex) => {
        const swipedCardId = cards[cardIndex].id;
        try {
            const swipedCardIds = await getSwipedCardIds();
            swipedCardIds.push(swipedCardId);
            await AsyncStorage.setItem(SwipedCardIds, JSON.stringify(swipedCardIds));

            const updatedCards = cards.filter(card => card.id !== swipedCardId);
            setCards(updatedCards);
            await AsyncStorage.setItem(RemainingCards, JSON.stringify(updatedCards));
        } catch (error) {
            console.log('Error saving swiped card:', error);
        }
    };

    const handleTest = async () => {
        console.log('All cards have been swiped, resetting...');
        try {
            setCards([]);
            setIsQuizVisible(true);
            await AsyncStorage.setItem(QuizVisible, 'true');
            await clearSwipedCardIds();
        } catch (error) {
            console.error('Error resetting cards:', error);
        }
    };

    useEffect(() => {
        if (isQuizVisible) {
            refetchQuizzes();
        }
    }, [isQuizVisible]);

// Изменён handleContinueFromQuiz для загрузки новых карточек
    const handleContinueFromQuiz = () => {
        setIsQuizVisible(false);
        refetchCards(); // Загружаем новые карточки после закрытия викторины
    };

    // Load quiz visibility and data
    useEffect(() => {
        loadQuizVisibility();
    }, []);

    // Load cards and manage state accordingly
    useEffect(() => {
        if (!isCardsError && cardsData && cards.length === 0) {
            setCards(cardsData);
            AsyncStorage.setItem(RemainingCards, JSON.stringify(cardsData));
        }
    }, [isCardsError, cardsData]);

    // Manage quizzes state and storage
    useEffect(() => {
        if (!isQuizzesError && quizzesData && isQuizVisible) {
            setQuizzes(quizzesData);
            AsyncStorage.setItem(QuizzesData, JSON.stringify(quizzesData));
        }
    }, [isQuizzesError, quizzesData, isQuizVisible]);

    // Helper functions
    async function getSwipedCardIds() {
        const swipedCardIdsJson = await AsyncStorage.getItem(SwipedCardIds);
        return swipedCardIdsJson ? JSON.parse(swipedCardIdsJson) : [];
    }

    async function clearSwipedCardIds() {
        await AsyncStorage.removeItem(SwipedCardIds);
        await AsyncStorage.removeItem(RemainingCards);
    }

    async function loadQuizVisibility() {
        try {
            const isQuizVisible = await getIsQuizVisible();
            if (isQuizVisible) {
                const storedQuizzes = await getStoredQuizzes();
                setQuizzes(storedQuizzes);
            }
            setIsQuizVisible(isQuizVisible);
        } catch (error) {
            console.log('Error loading quiz visibility and data:', error);
        }
    }

    async function getIsQuizVisible() {
        const isQuizVisibleJson = await AsyncStorage.getItem(QuizVisible);
        return isQuizVisibleJson ? JSON.parse(isQuizVisibleJson) : false;
    }

    async function getStoredQuizzes() {
        const quizzesDataJson = await AsyncStorage.getItem(QuizzesData);
        return quizzesDataJson ? JSON.parse(quizzesDataJson) : [];
    }

    return (
        <View style={styles.container}>

            {cards?.length > 0 ? (
                <Swiper
                    cards={cards}
                    renderCard={(card) => <CardComponent card={card} />}
                    onSwiped={(cardIndex) => handleSwiped(cardIndex)}
                    onSwipedAll={handleTest}
                    backgroundColor="#f0f0f0"
                    stackSize={pageSize}
                    stackScale={10}
                    stackSeparation={15}
                />
            ) : (
                <Text>No cards left</Text>
            )}

            {quizzes && quizzes.length > 0 && (
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
