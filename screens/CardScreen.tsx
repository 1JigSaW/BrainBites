import React, {useContext, useEffect, useState} from 'react';
import {
    Dimensions, Image,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {CardsStackParamList} from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import SaveIcon from "../components/icons/SaveIcon";
import CardComponent from "../components/CardComponent";
import QuizScreen from "./QuizScreen";
import {useGetRandomCards} from "../queries/card";
import {Card} from "../api/card.api";
import MainContext from "../navigation/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({navigation}: Props) => {
    const [topicIds, setTopicIds] = useState<number[]>([/* исходные id тем */]);
    const [viewedCards, setViewedCards] = useState<Card[]>([]);
    const [showTestScreen, setShowTestScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useContext(MainContext);

    // Получение сохранённых просмотренных карточек при инициализации
    useEffect(() => {
        const loadViewedCards = async () => {
            const savedCards = await AsyncStorage.getItem(`viewedCards_${userId}`);
            if (savedCards) {
                setViewedCards(JSON.parse(savedCards));
            }
            setIsLoading(false);
        };

        loadViewedCards();
    }, [userId]);

    // Сохранение просмотренных карточек при изменении состояния
    useEffect(() => {
        const saveViewedCards = async () => {
            await AsyncStorage.setItem(`viewedCards_${userId}`, JSON.stringify(viewedCards));
        };

        saveViewedCards();
    }, [userId, viewedCards]);

    const { data: cards, refetch } = useGetRandomCards(userId, {
        onSuccess: (newCards) => {
            console.log('New cards:', newCards);
        },
        onError: (error) => {
            console.error('Error fetching cards:', error);
        },
        enabled: !isLoading && viewedCards.length === 3, // Подгружаем новые карточки только когда осталось ровно 3
    });

    const onCardSwiped = (cardIndex: number) => {
        if (cards && cards?.length > cardIndex) { // Проверяем, что индекс в пределах массива
            const viewedCard = cards[cardIndex];

            // Добавляем просмотренную карточку в массив
            setViewedCards(prevViewedCards => [
                ...prevViewedCards,
                viewedCard
            ]);

            setTopicIds(prevTopicIds => prevTopicIds.filter(id => id !== viewedCard.id));
        }
    };

    useEffect(() => {
        if (viewedCards.length <= 3) {
            refetch();
        }
    }, [viewedCards, refetch]);


    // useEffect(() => {
    //     const randomTime = Math.random() * (3000 - 500) + 50000; // где maxTime и minTime - это ваш диапазон времени в миллисекундах
    //     const timer = setTimeout(() => {
    //         setShowTestScreen(true);
    //     }, randomTime);
    //
    //     return () => clearTimeout(timer); // очистка таймера при размонтировании компонента
    // }, []);

    return (
        <>
            {!showTestScreen ? (
                <View style={styles.containerBlock}>
                    {cards && (
                        <Swiper
                            cards={cards}
                            renderCard={(card) => <CardComponent card={card} />}
                            onSwiped={onCardSwiped}
                            backgroundColor={BLUE}
                            cardVerticalMargin={50}
                            cardHorizontalMargin={10}
                            onSwipedAll={() => { console.log('All cards have been swiped!'); }}
                            stackSize={5}
                            // stackSeparation={-5}
                            stackScale={0}
                        />
                    )}
                </View>
            ) : (
                <QuizScreen setShowTestScreen={setShowTestScreen} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    containerBlock: {
        flex: 1,
        backgroundColor: BLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default CardsScreen;
