import {StackScreenProps} from "@react-navigation/stack";
import React, {useContext} from "react";
import MainContext from "../navigation/MainContext";
import {useGetUserTopicsProgress} from "../queries/topic";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {BACKGROUND, BLACK, PROGRESS_BACKGROUND} from "../colors";
import {CardsStackParamList} from "../navigation/CardsStack";
import ArrowRightIcon from "../components/icons/ArrowRight";

type Props = StackScreenProps<CardsStackParamList, 'CardTopicScreen'>;

const CardTopicScreen = ({ navigation, route }: Props) => {
    const { userId } = useContext(MainContext);
    const { data: topicsProgress, isLoading, error } = useGetUserTopicsProgress(userId);

    if (error) return <Text>Error loading topics</Text>;
    if (isLoading) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeContainer}>
                {topicsProgress?.map((topic) => (
                    <View key={topic.topic_id} style={styles.roundedContainer}>
                        <View style={[styles.progressOverlay, { width: `${topic.progress * 100}%` }]} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.mainText}>{topic.topic_name}</Text>
                            <ArrowRightIcon size={40} color={BLACK} />
                        </View>
                    </View>
                ))}
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

export default CardTopicScreen;
