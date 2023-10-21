import React, {useContext, useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet, Text, View,
} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {CardsStackParamList} from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CardsScreen = () => {
    const cards = [
        { text: 'Card 1' },
        { text: 'Card 2' },
        { text: 'Card 3' },
        { text: 'Card 1' },
        { text: 'Card 2' },
        { text: 'Card 3' },
        { text: 'Card 1' },
        { text: 'Card 2' },
        { text: 'Card 3' },
        { text: 'Card 2' },
        { text: 'Card 3' },
        { text: 'Card 1' },
        { text: 'Card 2' },
        { text: 'Card 3' },
    ];

    return (
        <View style={styles.containerBlock}>
            <Swiper
                cards={cards}
                renderCard={(card) => (
                    <View style={styles.card}>
                        <Text>{card.text}</Text>
                    </View>
                )}
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
    );
};

const styles = StyleSheet.create({
    containerBlock: {
        flex: 1,
        backgroundColor: BLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%', // Увеличили отступы по бокам
        height: '100%', // Увеличили отступ сверху и снизу
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginTop: -40,
        borderWidth: 1,
    },
});


export default CardsScreen;
