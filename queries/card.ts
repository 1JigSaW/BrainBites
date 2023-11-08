import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Card, CardApi } from '../api/card.api';

interface MarkCardsAsTestPassedResult {
    message: string;
}

export const useGetUnseenCards = (userId: number | null, limit = 20, isEnabled = false) => {
    return useQuery<Card[], Error>(
        ['unseen_cards', userId, limit],
        () => CardApi.getUnseenCards(userId, limit),
        {
            retry: false, // Отключаем повторные попытки
            enabled: isEnabled // Хук будет активирован только если isEnabled true
        }
    );
};

export const useMarkCardsAsTestPassed = (
    userId: number | null,
    options?: UseMutationOptions<MarkCardsAsTestPassedResult, axios.AxiosError, void>
) => {
    return useMutation<MarkCardsAsTestPassedResult, AxiosError, void>(
        () => CardApi.markCardsAsTestPassed(userId),
        {
            ...options, // Распространяем переданные опции, чтобы пользователь мог кастомизировать хук
            onSuccess: (data) => {
                // Здесь можно добавить дополнительную логику в случае успеха
                console.log(data.message);
            },
            onError: (error) => {
                // Здесь можно добавить обработку ошибок
                console.error('Error marking cards as passed:', error.message);
            }
        }
    );
};
