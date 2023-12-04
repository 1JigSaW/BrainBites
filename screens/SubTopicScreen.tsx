import {StackScreenProps} from "@react-navigation/stack";
import {CardsStackParamList} from "../navigation/CardsStack";
import React, {useContext, useEffect, useLayoutEffect} from "react";
import MainContext from "../navigation/MainContext";
import {useGetUserSubtitlesProgress, useGetUserTopicsProgress} from "../queries/topic";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {BACKGROUND, BLACK, BLUE, PROGRESS_BACKGROUND} from "../colors";
import {useIsFocused} from "@react-navigation/native";

type Props = StackScreenProps<CardsStackParamList, 'SubTopicScreen'>;

const SubTopicScreen = ({ navigation, route }: Props) => {
    const { userId } = useContext(MainContext);
    const { topic_id, topic_name } = route.params;
    const isFocused = useIsFocused();

    // Хук для получения прогресса
    const { data: subtitlesProgress, isLoading, error, refetch } = useGetUserSubtitlesProgress(userId, topic_id);

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [userId, topic_id, refetch, isFocused]);

    useLayoutEffect(() => {
        if (topic_name) {
            navigation.setOptions({ title: topic_name });
        }
    }, [topic_name, navigation]);

    if (error) return <Text>Error loading topics</Text>;

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={BLUE} />
                ) : (
                    subtitlesProgress?.map((subtitle) => (
                        <TouchableOpacity
                            key={subtitle.subtitle_id}
                            style={styles.roundedContainer}
                            onPress={() => navigation.navigate('CardsSubtopicScreen', {
                                subtopic_id: subtitle.subtitle_id,
                            })}
                        >
                            <View style={[styles.progressOverlay, { width: `${subtitle.progress * 100}%` }]} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.mainText}>{subtitle.subtitle_name}</Text>
                                <ArrowRightIcon size={40} color={BLACK} />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
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

    mainText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '900',
    },

    subText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default SubTopicScreen;
