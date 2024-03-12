import {StackScreenProps} from "@react-navigation/stack";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HomeStackParamList} from "../navigation/HomeStack";
import {BACKGROUND, BLACK, BLUE, SECONDARY_SECOND, WHITE} from "../colors";
import React from "react";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";

type Props = StackScreenProps<HomeStackParamList, 'QuizCompletedScreen'>;

const { width, height } = Dimensions.get('window');
const QuizCompletedScreen = ({ navigation, route }: Props) => {
    const {subtopic_id} = route.params

    const handleContinue = () => {
        navigation.navigate('CardsSubtopicScreen', {subtopic_id: subtopic_id})
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                </ScrollView>
                <TouchableOpacity onPress={handleContinue} style={styles.nextButton}>
                    <Text style={styles.textButton}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: width - 40,
        height: height / 2 - 20,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        color: BLACK,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: BLACK,
    },
    nextButton: {
        margin: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    textButton: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default QuizCompletedScreen;