import { useContext, useEffect, useState } from "react";
import MainContext from "../navigation/MainContext";
import { StackScreenProps } from "@react-navigation/stack";
import { CardsStackParamList } from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import CardComponent from "../components/CardComponent";
import { useGetUnseenCards } from "../queries/card";
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RemainingCards, SwipedCardIds} from "../constants";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CARDS_KEY = '@CardsScreen/cards';

const CardsScreen = ({ navigation }) => {
    const { userId } = useContext(MainContext);
    const pageSize = 5;
    const [cards, setCards] = useState( []);
    const [fetchEnabled, setFetchEnabled] = useState(false);

    const {
        data: cardsData,
        isError,
        error,
        refetch
    } = useGetUnseenCards(userId, pageSize, fetchEnabled);

    // При свайпе карточки сохраняем её ID
    const handleSwiped = async (cardIndex: number) => {
        const swipedCardId = cards[cardIndex].id;
        // Обновляем список свайпнутых ID в локальном хранилище
        try {
            const swipedCardIdsJson = await AsyncStorage.getItem(SwipedCardIds);
            const swipedCardIds = swipedCardIdsJson ? JSON.parse(swipedCardIdsJson) : [];
            swipedCardIds.push(swipedCardId);
            await AsyncStorage.setItem(SwipedCardIds, JSON.stringify(swipedCardIds));

            // Также обновляем оставшиеся карточки в локальном хранилище
            const updatedRemainingCards = cards.filter(card => card.id !== swipedCardId);
            await AsyncStorage.setItem(RemainingCards, JSON.stringify(updatedRemainingCards));
        } catch (error) {
            // Обработка ошибок записи в AsyncStorage
            console.log('Error saving swiped card:', error);
        }
    };

    const handleTest = async () => {
        console.log('All cards have been swiped, resetting...');

        try {
            // Удаляем сохраненные ID свайпнутых и оставшихся карточек из AsyncStorage
            await AsyncStorage.removeItem('swipedCardIds');
            await AsyncStorage.removeItem('remainingCards');

            // Обновляем состояние, чтобы убедиться, что карточек нет
            setCards([]);

            // Включаем флаг для повторной загрузки карточек при следующем открытии приложения
            setFetchEnabled(true);
        } catch (error) {
            console.error('Error resetting cards:', error);
        }
    };


    useEffect(() => {
        const loadCards = async () => {
            try {
                // Пытаемся загрузить список свайпнутых ID из локального хранилища
                const swipedCardIdsJson = await AsyncStorage.getItem(SwipedCardIds);
                const swipedCardIds = swipedCardIdsJson ? JSON.parse(swipedCardIdsJson) : [];

                // Пытаемся загрузить карточки, которые остались, из локального хранилища
                const remainingCardsJson = await AsyncStorage.getItem(RemainingCards);
                const remainingCards = remainingCardsJson ? JSON.parse(remainingCardsJson) : [];

                if (remainingCards.length > 0) {
                    console.log(RemainingCards, remainingCards)
                    const filteredCards = remainingCards.filter((card: { id: any; }) => !swipedCardIds.includes(card.id));
                    setCards(filteredCards);
                    console.log(cards)
                } else {
                    // Если в локальном хранилище нет карточек, делаем запрос к API
                    setFetchEnabled(true);
                }
            } catch (error) {
                // Обработка ошибок чтения из AsyncStorage
                console.log('Error loading cards:', error);
            }
        };

        loadCards();
    }, [userId, fetchEnabled]);

    useEffect(() => {
        if (fetchEnabled && !isError && cardsData && cards.length === 0) {
            setCards(cardsData);
            // Сохраняем подгруженные карточки в локальное хранилище
            AsyncStorage.setItem(RemainingCards, JSON.stringify(cardsData));
            setFetchEnabled(false);
        }
    }, [fetchEnabled, isError, cardsData, cards]);

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
