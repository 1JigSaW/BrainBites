import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TopicsApi, TopicResponse, UserTopicProgressResponse, UserSubtitleProgressResponse} from "../api/topic.api";
import { AxiosError } from "axios";

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
            onError: (error) => {
                console.error(error);
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

