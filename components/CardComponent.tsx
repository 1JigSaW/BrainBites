import React, {useContext, useState} from "react";
import {BACKGROUND, BLACK, BLUE, MAIN_SECOND, RED, SECONDARY_SECOND} from "../colors";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SaveIcon from "./icons/SaveIcon";
import SaveEmptyIcon from "./icons/SaveEmptyIcon";
import {useSaveCard} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../fonts";


const { height } = Dimensions.get('window');



const baseScreenHeight = 667;


const calculateFontSize = (size: number) => {
    const ratio = size / baseScreenHeight;
    const newSize = Math.round(ratio * height);
    return newSize > size ? size : newSize;
};

const CardComponent = ({ card, myCards, handleRemoveCard, swipedCard, cards }: any) => {
    const { userId } = useContext(MainContext);
    const [savedCards, setSavedCards] = useState(new Set());
    const { mutate: toggleSaveCard } = useSaveCard();

    const localIconSelected = savedCards.has(card.id);
    const localIconColor = localIconSelected ? BLUE : BACKGROUND;

    const handleSavePress = () => {
        if (myCards) {
            toggleSaveCard({ userId, cardId: card.id });
            handleRemoveCard(card.id);
        }
        if (!userId) {
            console.error('No user ID provided');
            return;
        }
        if (!card || !card.id) {
            console.error('No card or card ID provided');
            return;
        }

        setSavedCards(prevSavedCards => {
            const newSavedCards = new Set(prevSavedCards);
            if (newSavedCards.has(card.id)) {
                newSavedCards.delete(card.id);
                toggleSaveCard({ userId, cardId: card.id });
            } else {
                newSavedCards.add(card.id);

                toggleSaveCard({ userId, cardId: card.id });
            }
            return newSavedCards;
        });
    };

    if (!card) {
        console.error('CardComponent was given undefined data');
        return <Text>Error: Card data is not available.</Text>;
    }
    console.log(card.image)

    return (
        <View style={[styles.card, myCards && {height: '90%'}]}>
            <View style={styles.counterContainer}>
                <Text style={styles.counter}>{`${swipedCard + 1}/${cards?.length}`}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{card.title}</Text>
            </View>
            <Image source={{ uri: card.image }} style={styles.image} />
            <Text style={styles.text}>{card.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '95%',
        backgroundColor: MAIN_SECOND,
        justifyContent: 'flex-start',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginTop: -50,
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        marginTop: 20,
    },
    title: {
        maxWidth: '90%',
        fontSize: 24,
        marginLeft: 10,
        fontFamily: Quicksand_Bold,
        color: BLACK,
    },
    saveIcon: {
        marginRight: 10,
    },
    text: {
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: Quicksand_Regular,
        fontSize: calculateFontSize(16),
        color: BLACK,
    },
    source: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        color: BLACK,
        fontFamily: Nunito_Regular,
        fontSize: 16,
    },
    tag: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        color: BLACK,
        fontFamily: Nunito_Semibold,
        fontSize: 20,
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        borderRadius: 20,
    },
    tagBlock: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
    },
    image: {
        width: '95%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 0,
    },
    counter: {
        fontFamily: Quicksand_Regular,
        color: BLACK,
        fontSize: 18
    },
    counterContainer: {
        position: 'absolute',
        shadowColor: BACKGROUND,
        shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
        backgroundColor: BACKGROUND,
        padding: 5,
        borderBottomEndRadius: 20
    },
});

export default CardComponent
