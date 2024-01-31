import React, {useContext, useState} from "react";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SaveIcon from "./icons/SaveIcon";
import SaveEmptyIcon from "./icons/SaveEmptyIcon";
import {useSaveCard} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold} from "../fonts";


const { height } = Dimensions.get('window');

// Define a base screen height. This value should represent the height of the screen
// for which the design was originally made.
const baseScreenHeight = 667; // Example: iPhone 8 screen height in points

// Calculate the font size based on the screen height relative to the base screen height
const calculateFontSize = (size: number) => {
    const ratio = size / baseScreenHeight; // Get the ratio of the font size to the base screen height
    const newSize = Math.round(ratio * height);
    return newSize > size ? size : newSize; // Optional: Prevent the font size from scaling up too much
};

const CardComponent = ({ card, myCards, handleRemoveCard }: any) => {
    const { userId } = useContext(MainContext);
    const [savedCards, setSavedCards] = useState(new Set()); // Use a Set to track saved card IDs
    const { mutate: toggleSaveCard } = useSaveCard();

    const localIconSelected = savedCards.has(card.id); // Determine if the card is selected based on its ID
    const localIconColor = localIconSelected ? BLUE : BACKGROUND; // Assuming BLUE and BACKGROUND are color constants

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
                // Call the mutation function when a card is being saved (not unsaved)
                toggleSaveCard({ userId, cardId: card.id });
            }
            return newSavedCards;
        });
    };

    if (!card) {
        console.error('CardComponent was given undefined data');
        return <Text>Error: Card data is not available.</Text>;
    }

    console.log('Card ID:', card.id, 'Saved:', localIconSelected);

    return (
        <View style={[styles.card, myCards && {height: '90%'}]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{card.title}</Text>
                <TouchableOpacity
                    style={styles.saveIcon}
                    onPress={handleSavePress} // Use the handleSavePress function here
                >
                    {!localIconSelected ? (
                        <SaveIcon size={20} color={localIconColor} />
                    ) : (
                        <SaveEmptyIcon size={20} color={localIconColor} />
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{card.content}</Text>
            <Text style={styles.source}>{card.source}</Text>
            <Text style={styles.tag}>{card.topic}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '90%',
        backgroundColor: BACKGROUND,
        justifyContent: 'flex-start',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginTop: -50,
        borderWidth: 1,
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    title: {
        maxWidth: '90%',
        fontSize: 28,
        marginLeft: 10,
        fontFamily: Nunito_Bold,
        color: BLACK,
    },
    saveIcon: {
        marginRight: 10,
    },
    image: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    text: {
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: Nunito_Semibold,
        fontSize: calculateFontSize(17),
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
    }
});

export default CardComponent
