import { API } from "./API";

export interface Card {
    id: number;
    title: string;
    content: string;
    source: string;
    subtitle: string;
    topic: string;
}

// Обновите этот класс для соответствия новому API
export class CardApi {
    static async getUnseenCards(userId: number | null, limit: number = 20): Promise<Card[] | { test_required: boolean }> {
        try {
            // Параметр 'page' убран, так как он не используется в API
            const response = await API.get(`api/cards/${userId}/`, {
                params: { limit }
            });
            if (response.status === 200) {
                // Обработка случая, когда нужно показать тест
                if (response.data.test_required) {
                    return { test_required: true };
                }
                // В противном случае возвращаем массив карточек
                return response.data;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching unseen cards:', error);
            throw error;
        }
    }
}
