import {StackScreenProps} from "@react-navigation/stack";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import {useGetUserSubtitlesProgress, usePurchaseSubtitle} from "../queries/topic";
import {
    ActivityIndicator,
    Alert, Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {BACKGROUND, BLACK, BLUE, CORRECT_ANSWER, MAIN_SECOND, RED, WHITE} from "../colors";
import {useIsFocused} from "@react-navigation/native";
import LockIcon from "../components/icons/LockIcon";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import { UserSubtitleProgressResponse } from "../api/topic.api";
import {useGetLives} from "../queries/user";
import {HomeStackParamList} from "../navigation/HomeStack";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<HomeStackParamList, 'SubTopicScreen'>;

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
        }
    }, [livesData, userId]);

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
        if (lives !== null && lives <= 0) {
            Alert.alert(
                "Out of Lives",
                "Unfortunately, you've run out of lives. Wait for them to replenish to continue.",
                [{ text: "OK", style: "cancel" }]
            );
            return;
        }
        if (subtitle.progress === 1) {
            Toast.show({
                type: 'info',
                text1: 'You have already completed this subtopic',
                text2: 'Please purchase another one to continue.'
            });
            return;
        }


        if (subtitle.is_purchased || subtitle.is_free) {
            navigation.navigate('CardsSubtopicScreen', {
                subtopic_id: subtitle.subtitle_id,
                topic_id: topic_id,
                topic_name: topic_name,
            });
        } else {
            Alert.alert(
                "Purchase Subtopic",
                `Do you really want to purchase this subtopic for ${subtitle.cost} XP?`,
                [
                    {
                        text: "Cancel",
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

    console.log('subtitlesProgress', subtitlesProgress)
    const purchaseSubtitle = (subtitleId: number) => {
        purchase({ user_id: userId, subtitle_id: subtitleId });
    };

    if (error) return <Text>Error loading topics</Text>;

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
                            <View style={[styles.progressOverlay, { width: `${subtitle.progress*1.15 * 100}%` }]} />
                            <View style={[styles.infoContainer]}>
                                {!(subtitle.is_purchased || subtitle.is_free) && <LockIcon size={2} color={BLACK} style={{opacity: 0.5}}/>}

                                <View style={[styles.mainContainer, (subtitle.is_purchased || subtitle.is_free) && {width: '100%', paddingVertical: 3}]}>
                                    {/*<Image source={{ uri: subtitle.image }} height={30} width={30} style={[!(subtitle.is_purchased || subtitle.is_free) && {opacity: 0.2}]}/>*/}
                                    <Text style={[styles.mainText, !(subtitle.is_purchased || subtitle.is_free) && {opacity: 0.2}]}>{subtitle.subtitle_name}</Text>
                                </View>
                                {
                                    subtitle.is_purchased ||
                                    subtitle.is_free ? (
                                    <View>
                                        <Text style={{opacity: 1}}></Text>
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={{opacity: 1, fontFamily: Quicksand_Regular}}>{subtitle.cost} XP</Text>
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
        backgroundColor: MAIN_SECOND,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    scrollView: {
        flex: 1,
        backgroundColor: BACKGROUND,
        overflow: 'hidden',
    },
    roundedContainer: {
        backgroundColor: WHITE,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    progressOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: CORRECT_ANSWER,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },
    mainContainer: {
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        width: '70%',
        flexDirection: "row",
        alignItems: "center",
    },
    mainText: {
        color: BLACK,
        fontFamily: Quicksand_Bold,
        fontSize: 18,
        fontStyle: 'normal',
        paddingHorizontal: 10,
    },
    subText: {
        color: BLACK,
        fontFamily: Quicksand_Bold,
        fontSize: 18,
        fontStyle: 'normal',
    },
});

export default SubTopicScreen;
