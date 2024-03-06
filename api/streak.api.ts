import {API} from "./API";

export interface StreakResponse {
    current_streak: number;
}

export class StreakApi {
    static async getCurrentStreak(userId: number): Promise<StreakResponse> {
        try {
            const { data } = await API.get(`/api/current-streak/?user_id=${userId}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}