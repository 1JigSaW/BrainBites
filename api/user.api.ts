import {API} from "./API";

export interface UsernameCheckResponse {
    isUnique: boolean;
}
export interface CreateUserResponse {
    id: number;
    username: string;
    topics: string[];
    count_cards: number;
}
export interface UserStatsResponse {
    read_cards: number;
    id:  null | undefined;
    xp: number;
    saved_cards_count: number;
    topics_count: number;
    earned_badges_count: number;
    earned_badges: Badge[];
    username: string;
    read_cards_count: number;
    topics: Topic[];
    user_rank: number;
    badges_count: number;
    avatar_url: string;
}

export interface Badge {
    name: string;
    description: string;
}

export interface Topic {
    id: number;
    title: string;
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
    static async createUser(username: string, topicIds: number[], count_cards: number, avatarUrl: string): Promise<CreateUserResponse> {
        try {
            console.log('topicIds', topicIds)
            const { data } = await API.post('/api/create-user/', {
                username: username,
                topic_ids: topicIds,
                cards_count: count_cards,
                avatar_url: avatarUrl,
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserStats(userId: number | null): Promise<UserStatsResponse> {
        try {
            const { data } = await API.get(`/api/user-stats/${userId}/`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getUsers(sortBy: string = '', returnAll: boolean = false, userId: number | null = null): Promise<UserStatsResponse[]> {
        try {
            const params = new URLSearchParams();
            if (sortBy) params.append('sort_by', sortBy);
            if (returnAll) params.append('return_all', 'True');
            if (userId !== null) params.append('user_id', userId.toString());

            const { data } = await API.get(`/api/users_filter/?${params.toString()}`);
            console.log('data', data);
            return data;
        } catch (error) {
            throw error;
        }
    }

}
