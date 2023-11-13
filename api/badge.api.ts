import { API } from "./API";

export interface BadgeProgress {
    description: string;
    name: string;
    badge: string;
    progress: any;
    progress_number: number;
    criteria: Criteria;
}

interface Criteria {
    [key: string]: number | { count: number; topic_id: number } | unknown;
}

export class UserBadgeProgressApi {
    static async getUserBadgeProgress(userId: number | null): Promise<BadgeProgress[]> {
        try {
            const response = await API.get(`api/user-badge-progress/`, {
                params: { user_id: userId }
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
}
