import React, {useContext, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import {BACKGROUND, BLACK, BLUE, GREEN} from '../../colors';
import { useGetAllTopics } from '../../queries/topic';
import {useMutation} from "@tanstack/react-query";
import {UserApi} from "../../api/user.api";
import {useCreateUser} from "../../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {user} from "../../constants";
import MainContext from "../../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold} from "../../fonts";

type Props = StackScreenProps<OnboardingStackParamList, 'TopicSelectionScreen'>;

const TopicSelectionScreen = ({ navigation, route }: Props) => {
    const { completeOnboarding } = useContext(MainContext);
    const { username, count_cards } = route.params;
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const { data: topics, isLoading, isError } = useGetAllTopics();
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    const createUserMutation = useCreateUser();

    const toggleTopic = (topicTitle: string) => {
        setSelectedTopics(prevSelectedTopics =>
            prevSelectedTopics.includes(topicTitle)
                ? prevSelectedTopics.filter(t => t !== topicTitle)
                : [...prevSelectedTopics, topicTitle]
        );
    };

    const handleContinue = async () => {
        if (!topics) {
            console.error('Topics data is not available.');
            return;
        }

        setIsCreatingUser(true); // Включить индикатор загрузки

        const topicIds = topics
            .filter(topic => selectedTopics.includes(topic.title))
            .map(topic => topic.id);

        // Генерация URL аватара
        const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg`;

        createUserMutation.mutate(
            { username, topicIds, count_cards, avatarUrl },
            {
                onSuccess: async (data) => {
                    try {
                        await AsyncStorage.setItem(user, JSON.stringify(data));
                        await completeOnboarding(data.id);
                    } catch (error) {
                        console.error('Ошибка при сохранении данных пользователя:', error);
                    }
                    setIsCreatingUser(false); // Выключить индикатор загрузки
                },
                onError: (error) => {
                    console.error('Ошибка при создании пользователя:', error);
                    setIsCreatingUser(false); // Выключить индикатор загрузки в случае ошибки
                },
            }
        );
    };

    if (isLoading) return (
        <SafeAreaView style={styles.safeContainer}>
            <ActivityIndicator size="large" color={BLUE} />
        </SafeAreaView>
    );
    if (isError) return <Text>Error fetching topics.</Text>;

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: BACKGROUND }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <SafeAreaView style={styles.safeContainer}>
                <Text style={styles.instructions}>Choose your topics:</Text>
                <View style={styles.topicsContainer}>
                    {topics.map((topic) => (
                        <TouchableOpacity
                            key={topic.id}
                            style={[
                                styles.topic,
                                selectedTopics.includes(topic.title) && styles.selectedTopic
                            ]}
                            onPress={() => toggleTopic(topic.title)}
                        >
                            <Text style={[
                                styles.topicTitle,
                                selectedTopics.includes(topic.title) && styles.selectedTopicTitle
                            ]}>
                                {topic.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    disabled={selectedTopics.length === 0 || isCreatingUser}
                    style={[styles.button, (selectedTopics.length === 0 || isCreatingUser) ? styles.disabledButton : styles.activeButton]}
                    onPress={handleContinue}
                >
                    {isCreatingUser ? (
                        <ActivityIndicator size="large" color={BACKGROUND} />
                    ) : (
                        <Text style={styles.buttonText}>Continue</Text>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        width: '100%', // Added to ensure the SafeAreaView takes the full width
        maxWidth: 600, // You can adjust this for tablet or large screen sizes
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        padding: 10, // Added padding for spacing
        marginHorizontal: 10,
    },
    instructions: {
        marginBottom: 20,
        fontFamily: Nunito_Bold,
        fontSize: 32,
        color: BLACK,
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Added to center the topic buttons
    },
    topic: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        margin: 4,
        alignItems: 'center',
        borderColor: BLACK,
    },
    topicTitle: {
        fontFamily: Nunito_Regular,
        color: BLACK,
        fontSize: 20,
    },
    selectedTopic: {
        backgroundColor: GREEN,
        borderColor: GREEN,
    },
    selectedTopicTitle: {
        color: BACKGROUND, // Text color for selected topics
    },
    buttonText: {
        color: 'white',
        fontFamily: Nunito_Semibold,
        fontSize: 20,
    },
    button: {
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        width: '90%', // Set a fixed width for the buttons
        marginBottom: 10,
    },
    activeButton: {
        backgroundColor: BLUE,
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        marginTop: 20,
    },
});

export default TopicSelectionScreen;

