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

export interface AddXPResponse {
    success: string;
    current_xp: number;
}

export interface DeleteUserResponse {
    success: string;
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

    static async googleSignIn(idToken: string): Promise<{user: {email: string, id: number}} | {error: string}> {
        try {
            const { data } = await API.post('/api/google-signin/', {
                id_token: idToken,
            });
            return data;
        } catch (error: any) {
            throw error;
        }
    }

    static async purchaseLives(userId: number, cost: number): Promise<{success: string, current_xp: number, current_lives: number} | {error: string}> {
        try {
            const { data } = await API.post(`/api/purchase-lives/`, {
                user_id: userId,
                cost: cost
            });
            return data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return { error: error.response.data.error };
            }
            throw error;
        }
    }

    static async addXP(userId: number, xpAmount: number): Promise<AddXPResponse | {error: string}> {
        try {
            const { data } = await API.post(`/api/add-xp/`, {
                user_id: userId,
                xp_amount: xpAmount
            });
            return data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return { error: error.response.data.error };
            }
            throw error;
        }
    }

    static async loseLifeCache(userId: number): Promise<any> {
        try {
            const url = `/api/report_life_loss/${userId}/`;
            const { data } = await API.post(url);
            return data;
        } catch (error) {
            throw error;
        }
    }


    static async getLivesCache(userId: number): Promise<any> {
        try {
            const { data } = await API.get(`/api/check_restore_lives/${userId}/`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId: number): Promise<DeleteUserResponse | { error: string }> {
        try {
            const { data } = await API.post(`/api/delete_account/`, { user_id: userId });
            return data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return { error: error.response.data.error };
            }
            throw error;
        }
    }

    static async appleSignIn(identityToken: string, authorizationCode: string, user: string): Promise<{user: {email: string, id: number}} | {error: string}> {
        try {
            const { data } = await API.post('/api/apple-signin/', {
                identityToken: identityToken,
                authorizationCode: authorizationCode,
                user: user,
            });
            return data;
        } catch (error: any) {
            throw error;
        }
    }


}
