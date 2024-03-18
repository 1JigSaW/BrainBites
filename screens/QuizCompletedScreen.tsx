import {StackScreenProps} from "@react-navigation/stack";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HomeStackParamList} from "../navigation/HomeStack";
import {
    BACKGROUND,
    BLACK,
    BLUE,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    MAIN_SECOND,
    PINK,
    SECONDARY_SECOND,
    WHITE
} from "../colors";
import React from "react";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import LottieView from "lottie-react-native";

type Props = StackScreenProps<HomeStackParamList, 'QuizCompletedScreen'>;

const { width, height } = Dimensions.get('window');
const QuizCompletedScreen = ({ navigation, route }: Props) => {
    const {subtopic_id, correct_answers, quiz_length, topic_id, topic_name} = route.params

    const handleContinue = () => {
        navigation.navigate('SubTopicScreen', {topic_id: topic_id, topic_name: topic_name})
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.lottieContainer}>
                        <LottieView
                            source={require('../animations/quiz_complete.json')}
                            autoPlay
                            loop
                            style={{flex: 1}}
                        />
                    </View>
                    <Text style={styles.text}>Good job!</Text>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>100</Text>
                        <Text style={styles.scoreTextWord}>score</Text>
                    </View>
                    <View style={styles.answers}>
                        <View style={styles.correctContainer}>
                            <Text style={styles.correctText}>{correct_answers}</Text>
                            <Text style={styles.correctTextWord}>correct</Text>
                        </View>
                        <View style={styles.incorrectContainer}>
                            <Text style={styles.incorrectText}>{quiz_length - correct_answers}</Text>
                            <Text style={styles.incorrectTextWord}>incorrect</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={handleContinue} style={styles.nextButton}>
                    <Text style={styles.textButton}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        color: BLACK,
    },
    text: {
        fontSize: 24,
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
        width: '90%'
    },
    textButton: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        height: '10%',
    },
    lottieContainer: {
        width: 200,
        height: 200,
    },
    scoreText: {
        fontSize: 48,
        fontFamily: Quicksand_Bold,
        color: BLACK,
        textAlign: 'center',
    },
    scoreTextWord: {
        fontSize: 24,
        fontFamily: Quicksand_Regular,
        color: BLACK,
        textAlign: 'center',
        marginTop: -15
    },
    correctText: {
        fontSize: 48,
        fontFamily: Quicksand_Bold,
        color: BLACK,
        textAlign: 'center',
    },
    incorrectText: {
        fontSize: 48,
        fontFamily: Quicksand_Bold,
        color: BLACK,
        textAlign: 'center',
    },
    scoreContainer: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: PINK,
        paddingHorizontal: 20,
        borderRadius: 20,
        paddingBottom: 5,
    },
    answers: {
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row',
    },
    correctContainer: {
        backgroundColor: CORRECT_ANSWER,
        width: '40%',
        marginHorizontal: 10,
        borderRadius: 20,
        paddingBottom: 5,
    },
    incorrectTextWord: {
        fontSize: 24,
        fontFamily: Quicksand_Regular,
        color: BLACK,
        textAlign: "center",
        marginTop: -15
    },
    correctTextWord: {
        fontSize: 24,
        fontFamily: Quicksand_Regular,
        color: BLACK,
        textAlign: "center",
        marginTop: -15,
    },
    incorrectContainer: {
        backgroundColor: INCORRECT_ANSWER,
        width: '40%',
        marginHorizontal: 10,
        borderRadius: 20,
        paddingBottom: 5,
    }
});

export default QuizCompletedScreen;