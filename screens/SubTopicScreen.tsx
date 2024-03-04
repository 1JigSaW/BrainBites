import {StackScreenProps} from "@react-navigation/stack";
import {CardsStackParamList} from "../navigation/CardsStack";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import {useGetUserSubtitlesProgress, useGetUserTopicsProgress, usePurchaseSubtitle} from "../queries/topic";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {BACKGROUND, BLACK, BLUE, PROGRESS_BACKGROUND} from "../colors";
import {useIsFocused} from "@react-navigation/native";
import LockIcon from "../components/icons/LockIcon";
import {Nunito_Bold, Nunito_Regular} from "../fonts";
import { UserSubtitleProgressResponse } from "../api/topic.api";
import {useGetLives} from "../queries/user";

type Props = StackScreenProps<CardsStackParamList, 'SubTopicScreen'>;

const SubTopicScreen = ({navigation, route}: Props) => {
    const {userId} = useContext(MainContext);
    const {topic_id, topic_name} = route.params;
    const [lives, setLives] = useState<number | null>(null);
    const isFocused = useIsFocused();
    const {mutate: purchase, isLoading: isPurchasing} = usePurchaseSubtitle();
    const { data: livesData, refetch: refetchLives } = useGetLives(userId);

     useEffect(() => {
        if (livesData && livesData.lives_remaining != null) {
            setLives(livesData.lives_remaining);
            console.log('lives',livesData.lives_remaining )
        }
    }, [livesData, userId]);

    // Хук для получения прогресса
    const {data: subtitlesProgress, isLoading, error, refetch} = useGetUserSubtitlesProgress(userId, topic_id);

    useEffect(() => {
        if (isFocused) {
            refetch();
            refetchLives();
        }
    }, [userId, topic_id, refetch, isFocused, livesData]);

    useLayoutEffect(() => {
        if (topic_name) {
            navigation.setOptions({title: topic_name});
        }
    }, [topic_name, navigation]);

    const handleSubtitlePress = (subtitle: UserSubtitleProgressResponse) => {
        console.log('lives11111111111', lives && (lives <= 0))
        if (lives !== null && lives <= 0) {
            Alert.alert(
                "Жизни закончились",
                "К сожалению, у вас не осталось жизней. Дождитесь пополнения, чтобы продолжить.",
                [{ text: "OK", style: "cancel" }]
            );
            return;
        }

        if (subtitle.is_purchased || subtitle.is_free) {
            navigation.navigate('CardsSubtopicScreen', {
                subtopic_id: subtitle.subtitle_id,
            });
        } else {
            Alert.alert(
                "Покупка подтопика",
                `Вы действительно хотите купить этот подтопик за ${subtitle.cost} XP?`,
                [
                    {
                        text: "Отмена",
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => purchaseSubtitle(subtitle.subtitle_id)
                    }
                ]
            );
        }
    };

    const purchaseSubtitle = (subtitleId: number) => {
        purchase({ user_id: userId, subtitle_id: subtitleId });
    };

    if (error) return <Text>Error loading topics</Text>;
    console.log('subtitlesProgress', subtitlesProgress)
    return (
        <SafeAreaView style={styles.scrollView}>
            <ScrollView style={styles.safeContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={BLUE} />
                ) : (
                    subtitlesProgress?.map((subtitle) => (
                        <TouchableOpacity
                            key={subtitle.subtitle_id}
                            style={styles.roundedContainer}
                            onPress={() => handleSubtitlePress(subtitle)}
                        >
                            <View style={[styles.progressOverlay, { width: `${subtitle.progress*1.2 * 100}%` }]} />
                            <View style={[styles.infoContainer]}>
                                {!(subtitle.is_purchased || subtitle.is_free) && <LockIcon size={2} color={BLACK} style={{opacity: 0.5}}/>}

                                <View style={styles.mainContainer}>
                                    <Text style={[styles.mainText, !(subtitle.is_purchased || subtitle.is_free) && {opacity: 0.2}]}>{subtitle.subtitle_name}</Text>
                                </View>
                                {
                                    subtitle.is_purchased ||
                                    subtitle.is_free ? (
                                    <ArrowRightIcon size={40} color={BLACK} />
                                ) : (
                                    <View>
                                        <Text style={{opacity: 1}}>{subtitle.cost} XP</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 40,
    },
    scrollView: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    roundedContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        position: 'relative',
        overflow: 'hidden',  // Ensure the overlay doesn't spill out of the container
    },
    progressOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: PROGRESS_BACKGROUND,  // Choose a color that indicates progress
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,  // Ensure text and icons appear above the progress overlay
    },
    mainContainer: {
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        width: '80%',
    },
    mainText: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 20,
        fontStyle: 'normal',
        paddingHorizontal: 10,
    },

    subText: {
        color: '#000',
        fontFamily: Nunito_Regular,
        fontSize: 16,
        fontStyle: 'normal',
    },
});

export default SubTopicScreen;
