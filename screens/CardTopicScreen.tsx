import {StackScreenProps} from "@react-navigation/stack";
import React, {useContext, useEffect} from "react";
import MainContext from "../navigation/MainContext";
import {useGetUserTopicsProgress} from "../queries/topic";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import {BACKGROUND, BLACK, BLUE, PROGRESS_BACKGROUND} from "../colors";
import {CardsStackParamList} from "../navigation/CardsStack";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {useIsFocused} from "@react-navigation/native";
import {Nunito_Bold} from "../fonts";

type Props = StackScreenProps<CardsStackParamList, 'CardTopicScreen'>;

const CardTopicScreen = ({ navigation, route }: Props) => {
    const { userId } = useContext(MainContext);
    const { data: topicsProgress, isLoading, error, refetch } = useGetUserTopicsProgress(userId);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [userId, refetch, isFocused]);

    if (error) return <Text>Error loading topics</Text>;

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={BLUE} />
                ) : (
                    topicsProgress?.map((topic) => (
                        <TouchableOpacity
                            key={topic.topic_id}
                            style={styles.roundedContainer}
                            onPress={() => navigation.navigate('SubTopicScreen', {
                                topic_id: topic.topic_id,
                                topic_name: topic.topic_name,
                            })}
                        >
                            <View style={[styles.progressOverlay, { width: `${topic.progress * 100}%` }]} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.mainText}>{topic.topic_name}</Text>
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
    },
    scrollView: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    roundedContainer: {
        backgroundColor: BACKGROUND,
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
        overflow: 'hidden',
    },
    progressOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: PROGRESS_BACKGROUND,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },

    mainText: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 20,
        fontStyle: 'normal',
        backgroundColor: BACKGROUND,
        paddingHorizontal: 10,
        borderRadius: 20,
    },

    subText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default CardTopicScreen;
