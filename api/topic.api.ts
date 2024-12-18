import {API} from "./API";
import {ReactNode} from "react";

export interface TopicResponse {
    id: number;
    title: string;
}

export interface UserTopicProgressResponse {
    topic_id: number;
    topic_name: string;
    progress: number;
    viewed_cards: number;
    total_cards: number;
    image: string;
}

export interface UserSubtitleProgressResponse {
    image: string | undefined;
    cost: ReactNode;
    subtitle_id: number;
    subtitle_name: string;
    progress: number;
    viewed_cards: number;
    total_cards: number;
    is_free: boolean;
    is_purchased: boolean;
}

export class TopicsApi {
    static async getAllTopics(): Promise<TopicResponse[]> {
        try {
            const {data} = await API.get('/api/topics/');
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updateUserTopics(user_id: number, topic_ids: number[]): Promise<void> {
        try {
            const endpoint = `/api/update_topics/${user_id}/`;
            await API.put(endpoint, { topic_ids });
        } catch (error) {
            throw error;
        }
    }

    static async getUserTopicsProgress(user_id: number | null): Promise<UserTopicProgressResponse[]> {
        try {
            const { data } = await API.get(`/api/topics-progress/${user_id}/`);
            return data.user_topics;
        } catch (error) {
            throw error;
        }
    }

    static async getUserSubtitlesProgress(user_id: number | null, topic_id: number): Promise<UserSubtitleProgressResponse[]> {
        try {
            const { data } = await API.get(`/api/subtitles-progress/${user_id}/topic/${topic_id}/`);
            return data.subtitles_progress;
        } catch (error) {
            throw error;
        }
    }

    static async purchaseSubtitle(user_id: number | null, subtitle_id: number): Promise<void> {
        try {
            await API.post('/api/purchase-subtitle/', { user_id, subtitle_id });
        } catch (error) {
            throw error;
        }
    }
}
