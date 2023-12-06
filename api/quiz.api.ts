import { API } from "./API";

export interface Quiz {
    id: number;
    card_id: number;
    question: string;
    correct_answer: string;
    answers: string[];
}

export class QuizApi {
    static async getAvailableQuizzes(userId: number | null): Promise<Quiz[]> {
        try {
            // Запрос к эндпоинту, который должен соответствовать ожидаемому пути в Django (например, api/users/{userId}/quizzes/)
            const response = await API.get(`api/quizzes/${userId}/`);
            console.log('response.data', response.data);
            if (response.status === 200) {
                // В случае успеха возвращаем полученные данные
                return response.data;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching available quizzes:', error);
            throw error;
        }
    }

    // static async getQuizzesByCardIds(cardIds: number[]): Promise<Quiz[]> {
    //     try {
    //         const response = await API.get(`api/quizzes-by-cards/`, {
    //             params: { card_ids: cardIds.join(',') } // Преобразование массива ID в строку
    //         });
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         throw new Error(`Error: ${response.statusText}`);
    //     } catch (error) {
    //         console.error('Error fetching quizzes by card IDs:', error);
    //         throw error;
    //     }
    // }

    static async getQuizzesByCardIds(cardIds: number[]): Promise<Quiz[]> {
        try {
            const response = await API.post(`/api/get-quizzes-by-card-ids/`, { card_ids: cardIds });
            if (response.status === 200) {
                return response.data.quizzes;
            }
            throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching quizzes by card IDs:', error);
            throw error;
        }
    }
}
