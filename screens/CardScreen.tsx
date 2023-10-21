import React, {useContext, useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet, Text, View,
} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND} from "../colors";
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
        // ... добавьте столько карточек, сколько вам нужно
    ];

    return (
        <View style={styles.container}>
            <Swiper
                cards={cards}
                renderCard={(card) => (
                    <View style={styles.card}>
                        <Text>{card.text}</Text>
                    </View>
                )}
                onSwiped={(cardIndex) => { console.log(cardIndex); }}
                onSwipedAll={() => { console.log('All cards have been swiped!'); }}
                stackSize={3}
                stackScale={10} // Это свойство создаст эффект масштабирования для задних карточек
                stackSeparation={15}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: screenWidth - 40,
        height: screenHeight - 150,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});


export default CardsScreen;
