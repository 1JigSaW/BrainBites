import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK} from "../colors";
import DeleteIcon from "../components/icons/DeleteIcon";
import CardComponent from "../components/CardComponent";
import Swiper from 'react-native-deck-swiper';
import {useGetSavedCards} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {Card} from "../api/card.api";
import {useIsFocused} from "@react-navigation/native";

type Props = StackScreenProps<HomeStackParamList, 'MyCardsScreen'>;

const MyCardsScreen = ({ navigation }: Props) => {
    const { userId } = useContext(MainContext);
    const { data: cardsGet, isLoading, isError } = useGetSavedCards(userId);
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef<Swiper<Card>>(null);
    const [cards, setCards] = useState<Card[] | undefined>([]);
    const isFocused = useIsFocused();

    const handleRemoveCard = (cardId: number | null) => {
        // Фильтрация списка cards для удаления карточки с указанным ID
        const updatedCards = cards?.filter(card => card.id !== cardId);
        // Обновление списка карточек
        setCards(updatedCards); // Предполагаем, что у вас есть состояние cards, которое можно обновить
    };

    const handleSwiped = (index: number) => {
        setCurrentIndex(index + 1); // Increment the current index
    };

    const handleSwipedAll = () => {
        // Handle the event when all cards have been swiped
    };

    const handleSwipeBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // Decrement the current index
        }
    };


    useEffect(() => {
        if (isFocused) {
            setCards(cardsGet);
        }
    }, [isFocused]);

    if (isLoading) {
        // Add your loading indicator
        return <Text>Loading...</Text>;
    }

    if (isError || !cards) {
        // Handle error state
        return <Text>Error fetching cards.</Text>;
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <TouchableOpacity onPress={handleSwipeBack}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Swiper
                cards={cards}
                renderCard={(card) => <CardComponent card={card} myCards={1} handleRemoveCard={handleRemoveCard} />}
                onSwiped={handleSwiped}
                onSwipedAll={handleSwipedAll}
                backgroundColor="#f0f0f0"
                stackSize={cards.length}
                stackScale={10}
                stackSeparation={15}
                infinite // Set to true if you want an infinite loop
                ref={swiperRef}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeContainer: {
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardBlock: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default MyCardsScreen;
