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
}
