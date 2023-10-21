import React, {useContext, useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";

type Props = StackScreenProps<HomeStackParamList, 'MyTopicsScreen'>;

const words = ['Apple', 'Banana', 'Cherry', 'Date', 'Applsdfe', 'Banasdfna', 'Chersdfry', 'Dasdfte'];

const MyTopicsScreen = ({navigation}: Props) => {
    const [activeWords, setActiveWords] = useState<string[]>([]);

    const toggleWord = (word: string) => {
        if (activeWords.includes(word)) {
            setActiveWords(prev => prev.filter(w => w !== word));
        } else {
            setActiveWords(prev => [...prev, word]);
        }
    };

    const words = ['One', 'Two', 'Three', 'Four', 'Five']; // Пример слов. Вы можете расширить этот список.

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.buttonContainer}>
                    {words.map((word, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.wordButton,
                                activeWords.includes(word) && styles.selectedWordButton,
                            ]}
                            onPress={() => toggleWord(word)}
                        >
                            <Text style={[
                                styles.wordButtonText,
                                activeWords.includes(word) && styles.selectedWordButtonText,
                            ]}>
                                {word}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    wordButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
    },
    selectedWordButton: {
        backgroundColor: BLUE,
    },
    wordButtonText: {
        color: BLACK,
    },
    selectedWordButtonText: {
        color: BACKGROUND,
    },
});

export default MyTopicsScreen;
