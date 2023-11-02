import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Card, CardApi } from '../api/card.api';

// Updated the hook name and removed the offset parameter as it is no longer used
export const useGetUnseenCards = (userId: number | null, limit = 20) => {
    // This hook should now get unseen cards instead of random cards
    return useQuery<Card[] | { test_required: boolean }, AxiosError>(
        ['unseen_cards', userId, limit], // Updated the query key to reflect the new functionality
        () => CardApi.getUnseenCards(userId, limit),
        {
            // You can add options here for caching, refetching, etc.
        }
    );
};
