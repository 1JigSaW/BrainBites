import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BACKGROUND, BLUE} from "../colors";
import CardComponent from "../components/CardComponent";
import Swiper from "react-native-deck-swiper";
import {CardsStackParamList} from "../navigation/CardsStack";
import {useGetUnseenCardsBySubtitle} from "../queries/card";
import MainContext from "../navigation/MainContext";

type Props = StackScreenProps<CardsStackParamList, 'CardsSubtopicScreen'>;

const CardsSubtopicScreen = ({ navigation, route }: Props) => {
    const {subtopic_id} = route.params;
    const { userId, everyDayCards } = useContext(MainContext);
    const [isLoading, setLoading] = useState(true);
    const { data: cards, error, isLoading: isQueryLoading } = useGetUnseenCardsBySubtitle(subtopic_id, userId, everyDayCards);

    useEffect(() => {
        if (!isQueryLoading) {
            setLoading(false);
        }
    }, [isQueryLoading]);

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
            {isQueryLoading ? (
                <ActivityIndicator size="large" color={BLUE} />
            ) : (cards && cards.length > 0 ? (
                <Swiper
                    cards={cards}
                    renderCard={(card) => <CardComponent card={card} />}
                    onSwiped={handleSwiped}
                    onSwipedAll={handleTest}
                    backgroundColor="#f0f0f0"
                    stackSize={everyDayCards} // Пример количества карточек в стеке
                    stackScale={5}
                    stackSeparation={30}
                />
            ) : (
                <Text>No cards available</Text>
            ))}
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
