import {API} from "./API";

export interface TopicResponse {
    id: number;
    title: string;
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
}
