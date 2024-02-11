import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import CardComponent from "../components/CardComponent";
import Swiper from "react-native-deck-swiper";
import {CardsStackParamList} from "../navigation/CardsStack";
import {useGetUnseenCardsBySubtitle, useMarkCardsAsViewedAndUpdateQuizzes} from "../queries/card";
import MainContext from "../navigation/MainContext";
import {useGetQuizzesByCardIds} from "../queries/quiz";
import QuizModal from "../components/QuizModal";
import {useIsFocused} from "@react-navigation/native";
import {useCheckUserAchievements} from "../queries/badge";
import Toast from "react-native-toast-message";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import {Nunito_Semibold} from "../fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CARDS_COUNT, CARDS_INDEX_KEY, CARDS_KEY} from "../constants";

type Props = StackScreenProps<CardsStackParamList, 'CardsSubtopicScreen'>;

const CardsSubtopicScreen = ({ navigation, route }: Props) => {
    const {subtopic_id} = route.params;
    const swiperRef = useRef<Swiper<any>>(null);
    const isFocused = useIsFocused();
    const { userId, everyDayCards,setCardCount } = useContext(MainContext);
    const [isLoading, setLoading] = useState(true);
    const { data: cards, error, isLoading: isQueryLoading } = useGetUnseenCardsBySubtitle(subtopic_id, userId, everyDayCards);
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [swipedCardIds, setSwipedCardIds] = useState<number[]>([]);
    const [swipedCardCount, setSwipedCardCount] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [earnedBadges, setEarnedBadges] = useState([]);
    const { data: quizzes, error: quizError, isLoading: isQuizLoading } = useGetQuizzesByCardIds(swipedCardIds);
    const [timer, setTimer] = useState(15);

    const [currentQuizNumber, setCurrentQuizNumber] = useState(0);
    const markCardsAndViewQuizzes = useMarkCardsAsViewedAndUpdateQuizzes();
    const checkAchievements = useCheckUserAchievements(userId);



    const handleQuizChange = (quizNumber: number) => {
        setCurrentQuizNumber(quizNumber);
    };

    useEffect(() => {
        if (cards && swipedCardCount >= cards.length) {
            handleTest();
        }
    }, [swipedCardCount, cards]);

    const handleTest = async () => {
        console.log('All cards swiped');
        if (quizzes && quizzes.length > 0) {
            setQuizVisible(true); // Show the quiz
        } else {
            console.log('No quizzes available for swiped cards');
        }
    };


    useEffect(() => {
        if (!isQueryLoading) {
            setLoading(false);
        }
    }, [isQueryLoading]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontFamily: Nunito_Semibold,
                fontSize: 28,
            },
            title: isQuizVisible ? `Quiz: ${currentQuizNumber + 1} / ${cards?.length}`  :
                (isQueryLoading ? 'Loading...' : `Card ${swipedCardCount  + 1} / ${cards?.length}`),
            headerLeft: () => (
                <TouchableOpacity onPress={handleExitPress} style={{ marginLeft: 20, marginTop: 5 }}>
                    <ArrowBackIcon color={BLACK} size={25} />
                </TouchableOpacity>
            )
        });
    }, [isQuizVisible, currentQuizNumber, swipedCardCount, cards?.length, navigation]);

    const handleSwiped = (index: number) => {
        if (cards && index < cards.length && cards[index].id != null) {
            const swipedCardId = cards[index].id;

            if (typeof swipedCardId === 'number') {
                setSwipedCardIds(prevIds => [...prevIds, swipedCardId]);
            }
        }
        setSwipedCardCount(swipedCardCount + 1);
    };


    const handleExitPress = () => {
        Alert.alert(
            "Attention",
            "Your progress will be reset. Are you sure you want to exit?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => navigation.goBack() }
            ]
        );
    };


    const handleContinueFromQuiz = async  (correctAnswerIds: number[]) => {
        setQuizVisible(false); // Hide the quiz
        if (swipedCardIds.length > 0 && userId) {
            try {
                const result = await markCardsAndViewQuizzes.mutateAsync({ userId, cardIds: swipedCardIds, correctAnswerIds });
            } catch (error) {
                console.error('Error in marking cards and updating quizzes:', error);
            }
        }
        setCardCount(swipedCardCount);
        AsyncStorage.setItem(CARDS_COUNT, String(swipedCardCount)).catch((error) => {
                console.error('AsyncStorage error:', error);
            });
        await handleCheckAchievements();
        navigation.goBack(); // Navigate the user back to the previous screen
    };


    const handleCheckAchievements = async () => {
        try {
            const badges = await checkAchievements.refetch();
            setEarnedBadges(badges.data);
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


    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={BLUE} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreen}>
            {/*<View>*/}
            {/*    <TouchableOpacity style={styles.exitButton} onPress={handleExitPress} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20  }}>*/}
            {/*        <Text style={{fontSize: 20, color: BLACK}}>✕</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Text style={styles.counterText}>{isQuizVisible ? `Quiz: ${currentQuizNumber}` : `Card ${swipedCardCount}`} / {cards?.length}</Text>*/}
            {/*</View>*/}
            {isQueryLoading ? (
                <ActivityIndicator size="large" color={BLUE} />
            ) : (cards && cards.length > 0 ? (
                <View style={{backgroundColor: BACKGROUND}}>
                    <Swiper
                        ref={swiperRef}
                        cards={cards}
                        renderCard={(card) => <CardComponent card={card} />}
                        onSwiped={handleSwiped}
                        onSwipedAll={handleTest}
                        backgroundColor="#f0f0f0"
                        stackSize={everyDayCards}
                        stackScale={5}
                        stackSeparation={30}
                    />
                </View>
            ) : (
                <View style={{
                    flex: 1, // Take up all available space
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center', // Center horizontally
                    width: '100%', // Ensure it takes the full width
                    paddingHorizontal: 10,
                }}>
                    <Text style={{color: BLACK, fontSize: 20}}>You completed all the cards in this topic</Text>
                    <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}} >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            ))}
            {isQuizVisible && quizzes && quizzes.length > 0 && (
                <View style={styles.quizModalWrapper}>
                    <QuizModal
                        isVisible={isQuizVisible}
                        quizzes={quizzes}
                        onContinue={handleContinueFromQuiz}
                        onQuizChange={handleQuizChange}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 18,
        color: '#ff0000', // Пример цвета для таймера
        textAlign: 'center',
        margin: 10,
    },
    safeContainer: {
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        height: 50,
    },
    exitButton: {
        position: 'absolute',
        top: 10,
        zIndex: 10,
        color: BLACK,
    },
    counterText: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
        zIndex: 100000,
        color: BLACK,
        fontSize: 20,
    },
    fullScreen: {
        flex: 1,
        backgroundColor: BACKGROUND,
        width: '100%',
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    quizModalWrapper: {
        flex: 1, // Take up all available space
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        width: '100%', // Ensure it takes the full width
    },
    buttonText: {
        color: BACKGROUND,
        fontSize: 20,
    },
    button: {
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: BLUE,
        marginTop: 20,
    },
});

export default CardsSubtopicScreen;
