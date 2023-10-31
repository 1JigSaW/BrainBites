import { API } from "./API";

export interface Card {
    id: number,
    title: string,
    content: string,
    source: string,
    subtitle: string,
    topic: string,
}

export class CardApi {
    static async getRandomCards(userId: number): Promise<Card[]> {
        // Теперь параметры запроса не нужны
        try {
            const response = await API.get(`api/cards/${userId}/`); // Используйте правильный URL в соответствии с вашим API
            if (response.status === 200) {
                return response.data;
            }
            throw new Error(response.statusText);
        } catch (error) {
            console.error('Error fetching random cards:', error);
            throw error;
        }
    }
}
