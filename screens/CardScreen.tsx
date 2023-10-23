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

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({navigation}: Props) => {
    const [showTestScreen, setShowTestScreen] = useState(true);


    useEffect(() => {
        const randomTime = Math.random() * (3000 - 500) + 50000; // где maxTime и minTime - это ваш диапазон времени в миллисекундах
        const timer = setTimeout(() => {
            setShowTestScreen(true);
        }, randomTime);

        return () => clearTimeout(timer); // очистка таймера при размонтировании компонента
    }, []);

    const cards = [
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 5' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },{ title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },

    ];

    return (
        <>
            {!showTestScreen ? (
                <View style={styles.containerBlock}>
                    <Swiper
                        cards={cards}
                        renderCard={(card) => <CardComponent card={card} />}
                        backgroundColor={BLUE}
                        cardVerticalMargin={50}
                        cardHorizontalMargin={10}
                        onSwiped={(cardIndex) => { console.log(cardIndex); }}
                        onSwipedAll={() => { console.log('All cards have been swiped!'); }}
                        stackSize={5}
                        // stackSeparation={-5}
                        stackScale={0}
                    />
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
