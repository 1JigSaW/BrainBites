import {API} from "./API";

export interface UsernameCheckResponse {
    isUnique: boolean;
}
export interface CreateUserResponse {
    id: number;
    username: string;
    topics: string[];
}
export interface UserStatsResponse {
    xp: number;
    saved_cards_count: number;
    topics_count: number;
    earned_badges_count: number;
    earned_badges: Badge[];
    username: string;
}

export interface Badge {
    name: string;
    description: string;
}


export class UserApi {
    // Existing method
    static async checkUsernameUnique(username: string): Promise<UsernameCheckResponse> {
        try {
            const { data } = await API.get(`/api/check_unique/${username}/`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // New method for creating a user
    static async createUser(username: string, topicIds: number[]): Promise<CreateUserResponse> {
        try {
            const { data } = await API.post('/api/create-user/', {
                username: username,
                topic_ids: topicIds
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserStats(userId: number): Promise<UserStatsResponse> {
        try {
            const { data } = await API.get(`/api/user-stats/${userId}/`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
