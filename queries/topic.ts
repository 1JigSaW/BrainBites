import { useQuery } from '@tanstack/react-query';
import { TopicsApi, TopicResponse } from "../api/topic.api";
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
