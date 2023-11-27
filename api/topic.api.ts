import {API} from "./API";

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
}

export interface UserSubtitleProgressResponse {
    subtitle_id: number;
    subtitle_name: string;
    progress: number;
    viewed_cards: number;
    total_cards: number;
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

    static async getUserSubtitlesProgress(user_id: number, topic_id: number): Promise<UserSubtitleProgressResponse[]> {
        try {
            const { data } = await API.get(`/api/subtitles-progress/${user_id}/topic/${topic_id}/`);
            return data.subtitles_progress;
        } catch (error) {
            throw error;
        }
    }
}
