import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TopicsApi, TopicResponse, UserTopicProgressResponse, UserSubtitleProgressResponse} from "../api/topic.api";
import { AxiosError } from "axios";
import {Alert} from "react-native";

export const TOPICS_QUERY_KEY = ['topics'];

export const useGetAllTopics = () => {
    return useQuery<TopicResponse[], AxiosError>(
        TOPICS_QUERY_KEY,
        TopicsApi.getAllTopics,
        {
            onError: error => {
                console.error(error);
            }
        }
    );
};


export const useUpdateUserTopics = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { user_id: number; topic_ids: number[] }>(
        ({ user_id, topic_ids }) => TopicsApi.updateUserTopics(user_id, topic_ids),
        {
            onError: (error) => {
                // Handle the error here if needed
                console.error(error);
            },
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(TOPICS_QUERY_KEY);
            },
        }
    );
};


export const useGetUserTopicsProgress = (user_id: null | number) => {
    return useQuery<UserTopicProgressResponse[], AxiosError>(
        ['user_topics_progress', user_id],
        () => TopicsApi.getUserTopicsProgress(user_id),
        {
            enabled: !!user_id, // Query is only enabled if user_id is truthy
            onError: (error) => {
                console.error('Error fetching user topics progress:', error.message);
            },
            onSuccess: (data) => {
                console.log('Fetched user topics progress successfully:', data);
            }
        }
    );
};


export const useGetUserSubtitlesProgress = (user_id: number | null, topic_id: number) => {
    return useQuery<UserSubtitleProgressResponse[], AxiosError>(
        ['user_subtitles_progress', user_id, topic_id],
        () => TopicsApi.getUserSubtitlesProgress(user_id, topic_id),
        {
            onError: (error) => {
                console.error(error);
            }
        }
    );
};

interface ErrorResponse {
    error: string;
}

export const usePurchaseSubtitle = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { user_id: number | null; subtitle_id: number }>(
        ({ user_id, subtitle_id }) => TopicsApi.purchaseSubtitle(user_id, subtitle_id),
        {
            onError: (error) => {
                const response = error.response?.data as ErrorResponse;
                if (error.response?.status === 400 && response?.error === 'Insufficient XP.') {
                    Alert.alert("Purchase Failed", "Insufficient XP to purchase the subtitle.");
                } else {
                    console.error('Error purchasing subtitle:', error);
                    Alert.alert("Purchase Failed", "There was an error purchasing the subtitle.");
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['user_subtitles_progress']);
                Alert.alert("Purchase Successful", "The subtitle has been successfully purchased.");
            },
        }
    );
};

