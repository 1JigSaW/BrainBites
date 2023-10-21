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

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CardsScreen = () => {
    const [isIconSelected, setIconSelected] = useState(false);

    const handleIconPress = () => {
        setIconSelected(prevState => !prevState);
    };

    const iconColor = isIconSelected ? 'blue' : BLACK;
    const iconBorderColor = isIconSelected ? 'white' : 'black';

    const cards = [
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
        { title: 'Название 2', text: 'Card 2', source: 'Источник 2', tag: 'Категория 2' },
        { title: 'Название 1', text: 'мывмывмывымвмвы', source: 'Источник 1', tag: 'Категория 1' },
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
        <View style={styles.containerBlock}>
            <Swiper
                cards={cards}
                renderCard={(card) => (
                    <View style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{card.title}</Text>
                            <TouchableOpacity
                                style={[styles.saveIcon, {borderColor: iconBorderColor}]}
                                onPress={handleIconPress}
                            >
                                <SaveIcon size={20} color={iconColor} />
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://via.placeholder.com/150'}}
                        />
                        <Text style={styles.text}>{card.text}</Text>
                        <Text style={styles.source}>{card.source}</Text>
                        <Text style={styles.tag}>{card.tag}</Text>
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
        marginBottom: 10,  // изменено с margin на marginBottom
        width: '100%',
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '700',
        color: BLACK,
    },
    saveIcon: {
        marginRight: 10,  // добавлено
        borderWidth: 1,
        borderRadius: 4,
    },
    image: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginLeft: 10,  // добавлено
        marginBottom: 10,  // добавлено
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
        bottom: 30,
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
    }
});


export default CardsScreen;
