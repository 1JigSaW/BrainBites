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

    static async markCardsAsTestPassed(userId: number | null): Promise<{ message: string }> {
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

    static async updateReadCardsCount(userId: number, readCardsCount: number): Promise<{ message: string }> {
        try {
            const response = await API.put(`api/update-read-cards-count/${userId}/`, {
                read_cards: readCardsCount
            });

            if (response.status === 200) {
                console.log('response.data', response.data);
                return response.data;
            }

            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error updating read cards count:', error);
            throw error;
        }
    }

    static async saveCardForUser(userId: number, cardId: number): Promise<{ message: string }> {
        try {
            // Send a PUT request to the SaveCard endpoint. Make sure to replace 'api/save-card/' with the actual path to your endpoint.
            const response = await API.put(`api/save_card/${userId}/`, {
                card_id: cardId
            });

            if (response.status === 200) {
                // If the request is successful, return the response message.
                console.log('response.data', response.data);
                return response.data;
            }

            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error saving card:', error);
            throw error;
        }
    }

}
