import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {OnboardingStackParamList} from "../../navigation/OnboardingNavigator";
import {BACKGROUND} from "../../colors";
import {useState} from "react";
import {useGetAllTopics} from "../../queries/topic";

type Props = StackScreenProps<OnboardingStackParamList, 'TopicSelectionScreen'>;

const TopicSelectionScreen = ({ navigation }: Props) => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const { data: topics, isLoading, isError } = useGetAllTopics();

    const toggleTopic = (topic: string) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error fetching topics.</Text>;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <Text style={styles.instructions}>Choose your topics:</Text>
                <View style={styles.topicsContainer}>
                    {topics.map((topic, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.topic, selectedTopics.includes(topic) && styles.selectedTopic]}
                            onPress={() => toggleTopic(topic.title)}>
                            <Text>{topic.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                    disabled={selectedTopics.length === 0}
                    onPress={() => {
                        // Отправьте selectedTopics на сервер и выполните навигацию
                    }}
                >
                    <Text>Continue</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        paddingVertical: 5,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 20,
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    topic: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 15,
        margin: 4,
        alignItems: 'center',
    },
    selectedTopic: {
        backgroundColor: '#ddd',
    },
});

export default TopicSelectionScreen;
