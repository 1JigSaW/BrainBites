import { API } from "./API";

export interface StreakResponse {
    current_streak: number;
    longest_streak: number;
    message?: string;
}

export interface StreakUpdateResponse extends StreakResponse {
    message: string;
}

export class StreakApi {
    static async getCurrentStreak(userId: number): Promise<StreakResponse> {
        try {
            const { data } = await API.get(`/api/current-streak/${userId}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updateStreak(userId: number): Promise<StreakUpdateResponse> {
        try {
            const { data } = await API.post('/api/update-streak/', { user_id: userId });
            return data;
        } catch (error) {
            throw error;
        }
    }

}
