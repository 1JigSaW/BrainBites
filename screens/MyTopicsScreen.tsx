import React, {useContext, useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {useGetAllTopics, useUpdateUserTopics} from "../queries/topic";
import MainContext from "../navigation/MainContext";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<HomeStackParamList, 'MyTopicsScreen'>;

const MyTopicsScreen = ({navigation, route}: Props) => {
    const { topics: initialTopics } = route.params;
    const { userId } = useContext(MainContext);
    const [activeTopics, setActiveTopics] = useState<number[]>(initialTopics.map(t => t.id));
    const { data: topicsAll, isLoading, isError } = useGetAllTopics();
    const { mutate: updateUserTopics, isSuccess, isError: isUpdateError } = useUpdateUserTopics();

    useEffect(() => {
        // Initialize active topics when the component is first rendered
        setActiveTopics(initialTopics.map(t => t.id));
    }, [initialTopics]);

    const toggleTopic = (topicId: number) => {
        setActiveTopics(prev => (
            prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
        ));
    };

    const saveTopics = () => {
        // Guard clause to ensure we have a valid user ID
        if (userId === null) {
            console.error('Cannot save topics without a user ID.');
            // Handle the null case, perhaps show an error message to the user
            return;
        }

        updateUserTopics({ user_id: userId, topic_ids: activeTopics });
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Topics have been updated successfully.'
        });
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error loading topics</Text>;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.buttonContainer}>
                    {topicsAll.map((topic) => (
                        <TouchableOpacity
                            key={topic.id}
                            style={[
                                styles.topicButton,
                                activeTopics.includes(topic.id) && styles.selectedTopicButton,
                            ]}
                            onPress={() => toggleTopic(topic.id)}
                        >
                            <Text style={[
                                styles.topicButtonText,
                                activeTopics.includes(topic.id) && styles.selectedTopicButtonText,
                            ]}>
                                {topic.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={saveTopics}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    wordButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: BACKGROUND,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
    },
    selectedWordButton: {
        backgroundColor: BLUE,
    },
    wordButtonText: {
        color: BLACK,
    },
    selectedWordButtonText: {
        color: BACKGROUND,
    },
    topicButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        margin: 4,
        alignItems: 'center',
        borderColor: BLACK,
    },
    topicButtonText: {
        fontFamily: 'Abel',
        color: BLACK, // Default color
    },
    selectedTopicButton: {
        backgroundColor: BLUE,
        borderColor: BLUE,
    },
    selectedTopicButtonText: {
        color: BACKGROUND,
    },
    button: {
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: BLUE,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: BACKGROUND,
        textAlign: 'center'
    },
    activeButton: {
        backgroundColor: BLUE,
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
});

export default MyTopicsScreen;
