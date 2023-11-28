import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BACKGROUND, BLUE} from "../colors";
import CardComponent from "../components/CardComponent";
import Swiper from "react-native-deck-swiper";
import {CardsStackParamList} from "../navigation/CardsStack";

type Props = StackScreenProps<CardsStackParamList, 'CardsSubtopicScreen'>;

const CardsSubtopicScreen = ({ navigation }: Props) => {
    const [cards, setCards] = useState([]); // предположим, что карточки загружаются из API
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Здесь должна быть логика для получения карточек из API
        // Пример:
        // fetchCards().then(data => {
        //     setCards(data);
        //     setLoading(false);
        // });
        setLoading(false); // Удалить, когда реализуете загрузку данных
    }, []);

    const handleSwiped = (index: number) => {
        console.log(`Card at ${index} was swiped`);
    };

    const handleTest = () => {
        // Переход к викторине
        console.log('All cards swiped');
        navigation.navigate('QuizScreen'); // Убедитесь, что у вас есть QuizScreen в вашем StackNavigator
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={BLUE} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            {cards.length > 0 ? (
                <Swiper
                    cards={cards}
                    renderCard={(card) => <CardComponent card={card} />}
                    onSwiped={handleSwiped}
                    onSwipedAll={handleTest}
                    backgroundColor="#f0f0f0"
                    stackSize={3} // Пример количества карточек в стеке
                    stackScale={10}
                    stackSeparation={15}
                />
            ) : (
                <Text>No cards available</Text>
            )}
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
});

export default CardsSubtopicScreen;
