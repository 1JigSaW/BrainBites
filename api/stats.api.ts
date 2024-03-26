import { API } from "./API";

export interface DailyReadCard {
    date: string;
    cards_read: number;
}

export interface CorrectStreak {
    streak_count: number;
    max_streak: number;
    last_quiz_fully_correct: boolean;
}

export interface UserQuizStatistic {
    total_attempts: number;
    correct_attempts: number;
    incorrect_attempts: number;
}

export interface UserStatsResponse {
    daily_read_cards: DailyReadCard[];
    correct_streak: CorrectStreak[];
    user_quiz_statistics: UserQuizStatistic[];
}

// Class for interacting with the API endpoint
export class UserStatsFullApi {
    static async getUserStats(user_id: number | null): Promise<UserStatsResponse> {
        try {
            const { data } = await API.get(`/api/user-stats-full/${user_id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
