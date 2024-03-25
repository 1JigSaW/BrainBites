import {API} from "./API";

export interface UsernameCheckResponse {
    isUnique: boolean;
}
export interface CreateUserResponse {
    id: number;
    username: string;
    email: string;
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
    lives: number;
}

export interface Badge {
    name: string;
    description: string;
}

export interface Topic {
    id: number;
    title: string;
}

export interface LivesResponse {
    lives_remaining: number;
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
    static async createUser(username: string, count_cards: number, avatarUrl: string, email: string, password: string): Promise<CreateUserResponse> {
        try {
            const { data } = await API.post('/api/register/', {
                username: username,
                cards_count: count_cards,
                avatar_url: avatarUrl,
                email: email,
                password: password,
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

    static async loseLife(userId: number): Promise<{message: string, lives_remaining: number} | {error: string}> {
        try {
            const { data } = await API.post('/api/lose-life/', { user_id: userId });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getLives(userId: number | null): Promise<LivesResponse> {
        try {
            const { data } = await API.get(`/api/get-lives/?user_id=${userId}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email: string, password: string): Promise<{token: string} | {error: string}> {
        try {
            const { data } = await API.post('/api/login/', {
                email: email,
                password: password,
            });
            return data;
        } catch (error: any) {
            throw error;
        }
    }

    static async googleSignIn(idToken: string): Promise<{token: string} | {error: string}> {
    try {
        const { data } = await API.post('/api/auth/google/', {
            id_token: idToken,
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}





}
