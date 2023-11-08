import { API } from "./API";

export interface Card {
    id: number | null;
    title: string;
    content: string;
    source: string;
    subtitle: string;
    topic: string;
}

export class CardApi {
    static async getUnseenCards(userId: number | null, limit: number = 20): Promise<Card[]> {
        try {
            // Запрос к эндпоинту, который должен соответствовать ожидаемому пути в Django (например, api/users/{userId}/cards/)
            // Убедитесь, что у вас правильно настроен URL и что вы используете шаблоны пути, как в вашем Django View.
            const response = await API.get(`api/cards/${userId}`, {
                params: { limit }
            });
            console.log('response.data', response.data);
            return response.data;
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching unseen cards:', error);
            throw error;
        }
    }

    static async markCardsAsTestPassed(userId: number): Promise<{ message: string }> {
        try {
            // Отправляем POST запрос на маркировку карт
            const response = await API.post(`api/mark-cards-passed/${userId}/`);
            if (response.status === 200) {
                // В случае успеха возвращаем сообщение из ответа
                console.log('response.data', response.data);
                return response.data;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error marking cards as test passed:', error);
            throw error;
        }
    }
}
