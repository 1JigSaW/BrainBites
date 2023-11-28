import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Quiz, QuizApi } from '../api/quiz.api';

export const useGetAvailableQuizzes = (userId: number | null, isEnabled = false) => {
    return useQuery<Quiz[], AxiosError>(
        ['available_quizzes', userId],
        () => QuizApi.getAvailableQuizzes(userId),
        {
            retry: false, // Отключаем повторные попытки
            enabled: isEnabled // Хук будет активирован только если isEnabled true
        }
    );
};

export const useGetQuizzesByCardIds = (cardIds: number[], isEnabled = true) => {
    return useQuery<Quiz[], AxiosError>(
        ['quizzes_by_card_ids', cardIds],
        () => QuizApi.getQuizzesByCardIds(cardIds),
        {
            retry: false,
            enabled: isEnabled && cardIds.length > 0 // Активировать запрос, если есть ID карточек
        }
    );
};
