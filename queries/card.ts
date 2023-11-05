import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Card, CardApi } from '../api/card.api';

export const useGetUnseenCards = (userId: number | null, limit = 20, isEnabled = false) => {
    return useQuery<Card[] | { test_required: boolean }, Error>(
        ['unseen_cards', userId, limit],
        () => CardApi.getUnseenCards(userId, limit),
        {
            retry: false, // Отключаем повторные попытки
            enabled: isEnabled // Хук будет активирован только если isEnabled true
        }
    );
};
