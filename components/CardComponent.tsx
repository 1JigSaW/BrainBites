import React, {useState} from "react";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SaveIcon from "./icons/SaveIcon";
import SaveEmptyIcon from "./icons/SaveIcon";


const CardComponent = ({ card, handlePress }: any) => {
    const [localIconSelected, setLocalIconSelected] = useState(false);
    const localIconColor = localIconSelected ? BLUE : BACKGROUND;
    const localIconBorderColor = localIconSelected ? BACKGROUND : BACKGROUND;

    if (!card) {
        console.error('CardComponent was given undefined data');
        return <Text>Error: Card data is not available.</Text>;
    }

    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{card.title}</Text>
                <TouchableOpacity
                    style={styles.saveIcon}
                    onPress={() => setLocalIconSelected(prev => !prev)}
                >
                    {!localIconSelected ? (
                        <SaveIcon size={20} color={BLUE} />
                    ) : (
                        <SaveEmptyIcon size={20} color={BLACK} />
                    )}
                </TouchableOpacity>
            </View>
            <Image
                style={styles.image}
                source={{uri: 'https://via.placeholder.com/150'}}
            />
            <Text style={styles.text}>{card.content}</Text>
            <Text style={styles.source}>{card.source}</Text>
            <Text style={styles.tag}>{card.topic}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: BACKGROUND,
        justifyContent: 'flex-start',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginTop: -40,
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
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '700',
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
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Abel',
        fontSize: 15,
        fontWeight: '400',
        color: BLACK,
    },
    source: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        color: BLACK,
        fontFamily: 'Abel',
        fontSize: 15,
        fontWeight: '400',
    },
    tag: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        color: BLACK,
        fontFamily: 'Abel',
        fontSize: 15,
        fontWeight: '400',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
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
