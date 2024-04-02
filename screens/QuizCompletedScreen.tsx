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

    const messagesAbove50 = [
        "Brilliant! Your thirst for knowledge is astounding. Keep up the good work!",
        "Bravo! You've proven that no obstacle is too great for a mind craving knowledge.",
        "Outstanding results! Remember, every victory brings you closer to the pinnacle of mastery.",
        "Exceptional result! You're clearly a leader in the world of knowledge. Keep it up!",
        "Excellent! You're a true champion of learning. Let's set new records together!",
        "You shine like a star in the sky of knowledge. Congratulations on a brilliant victory!",
    ];
    const messagesEqual50 = [
        "Good job, but you can do even better! Next time you will surely surpass yourself.",
        "Not bad, but remember, there's always room for growth. Don't settle for what you've achieved!",
        "You're on the right track, and I believe your next results will be even better. Forward to new knowledge!",
        "Good try, but you're capable of more. The peak awaits you next time!",
        "Great job for not giving up and striving for knowledge. May each quiz make you stronger!",
        "You're halfway to success. We believe in you and await even greater achievements!",
    ];
    const messagesBelow50 = [
        "Don't be upset by failure – every mistake makes us smarter. Analyze and continue to learn!",
        "Today wasn't your day, but it's not the end. Learn from your mistakes and remember, success lies ahead.",
        "Remember, great achievements start with small steps. Don't give up, new trials and victories lie ahead!",
        "Every step, even backward, brings you closer to your goal. Learn, make mistakes, grow, and win!",
        "Great discoveries start with failures. Don't give up, success awaits ahead!",
        "Remember, even the smartest people faced difficulties. Your determination is the key to victory!",
    ];

    let selectedMessages;
    let score = swipedCardIds.length > 0 ? (correctAnswerIds.length / swipedCardIds.length) * 100 : 0;

    if (score > 70) {
        selectedMessages = messagesAbove50;
    } else if (score < 70 && score > 30) {
        selectedMessages = messagesEqual50;
    } else {
        selectedMessages = messagesBelow50;
    }


    const randomIndex = Math.floor(Math.random() * selectedMessages.length);
    const completionMessage = selectedMessages[randomIndex];


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
    console.log('lastStreakDate', lastStreakDate, 'today', today);

    if ((streakData?.current_streak > 0) && (lastStreakDate !== today)) {
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
        animationSource = require('../animations/bad5.json');
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
                    <Text style={styles.text}>{completionMessage}</Text>
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