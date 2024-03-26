import {StackScreenProps} from "@react-navigation/stack";
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
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
import React, {useContext, useEffect} from "react";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import LottieView from "lottie-react-native";
import {useGetCurrentStreak, useUpdateStreak} from "../queries/streak";
import MainContext from "../navigation/MainContext";
import {useMarkCardsAsTestPassed, useMarkCardsAsViewedAndUpdateQuizzes, useUpdateUserXp} from "../queries/card";
import {useCheckUserAchievements} from "../queries/badge";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<HomeStackParamList, 'QuizCompletedScreen'>;

const { width, height } = Dimensions.get('window');
const QuizCompletedScreen = ({ navigation, route }: Props) => {
    const { userId } = useContext(MainContext);
    const {subtopic_id, correct_answers, quiz_length, topic_id, topic_name, correctAnswerIds, swipedCardIds} = route.params
    const { mutate: updateUserXp } = useUpdateUserXp()
    const checkAchievements = useCheckUserAchievements(userId);
    const markAsPassedMutation = useMarkCardsAsTestPassed(userId);
    const markCardsAndViewQuizzes = useMarkCardsAsViewedAndUpdateQuizzes();
    const { mutate: updateStreak } = useUpdateStreak(userId);

    const handleCheckAchievements = async () => {
        try {
            const badges = await checkAchievements.refetch();
            if (badges.data?.length > 0) {
                Toast.show({
                    type: 'success',
                    text1: 'You get a new badge',
                });
            }
        } catch (error) {
            console.error('Error checking achievements:', error);
        }
    };

   useEffect(() => {
       if (userId) {
           updateStreak(userId);
       }
        async function fetchDataAndCheckAchievements() {
            await markCardsAndViewQuizzes.mutateAsync({ userId, cardIds: swipedCardIds, correctAnswerIds });
            handleCheckAchievements();
        }

        fetchDataAndCheckAchievements();
}, []);


    const {
        data: streakData,
        isLoading: isLoadingStreak,
        isError: isErrorStreak,
        refetch: refetchStreak,
    } = useGetCurrentStreak(userId);

   const handleContinue = () => {
    const today = new Date().toISOString().slice(0, 10);
    const lastStreakDate = streakData?.last_streak_date;

    if (streakData?.current_streak > 0 && lastStreakDate !== today) {
        Toast.show({
            type: 'success',
            text1: "Keep Going!",
            text2: `You're on a ${streakData.current_streak}-day streak!`
        });
    } else if (!lastStreakDate || lastStreakDate !== today) {
        Toast.show({
            type: 'error',
            text1: "Oops!",
            text2: "You've missed your streak. Start a new one today!"
        });
    }
    updateUserXp({ userId: userId, correctAnswersCount: correct_answers });
    navigation.navigate('SubTopicScreen', {topic_id: topic_id, topic_name: topic_name});
};


    const scorePercentage = (correct_answers / quiz_length) * 100;

    let animationSource;
    if (scorePercentage >= 50) {
        animationSource = require('../animations/quiz_good.json');
    } else {
        animationSource = require('../animations/quiz_bad.json');
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.lottieContainer}>
                        <LottieView
                            source={animationSource}
                            autoPlay
                            loop={false}
                            style={{flex: 1}}
                        />
                    </View>
                    <Text style={styles.text}>Good job!</Text>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>{10 * correct_answers}</Text>
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
        borderRadius: 0,
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