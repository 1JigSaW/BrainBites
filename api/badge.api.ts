import { API } from "./API";

export interface BadgeProgress {
    image: string | undefined;
    description: string;
    name: string;
    badge: string;
    progress: any;
    progress_number: number;
    criteria: Criteria;
}

export interface Criteria {
    [key: string]: number | { count: number; topic_id: number } | unknown;
}

export class UserBadgeProgressApi {
    static async getUserBadgeProgress(userId: number | null, topThree: boolean = false): Promise<BadgeProgress[]> {
        try {
            const response = await API.get(`api/user-badge-progress/`, {
                params: { user_id: userId, top_three: topThree }
            });
            console.log('response.data', response.data);
            if (response.status === 200) {
                return response.data.badge_progress;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching user badge progress:', error);
            throw error;
        }
    }


    static async checkUserAchievements(userId: any) {
        try {
            const response = await API.get(`api/check-achievements/`, {
                params: { user_id: userId }
            });
            console.log('Achievements Response:', response.data);
            if (response.status === 200) {
                return response.data.earned_badges;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching user achievements:', error);
            throw error;
        }
    }
}
