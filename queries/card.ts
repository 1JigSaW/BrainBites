import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Card, CardApi } from "../api/card.api"; // Импорт Card оттуда же, где и CardApi

export const useGetRandomCards = (
    userId: number | null, // Теперь используем userId
    options?: UseQueryOptions<Card[], axios.AxiosError>
): UseQueryResult<Card[], axios.AxiosError> => {
    return useQuery<Card[], AxiosError>(
        ['random_cards', userId], // Ключ кэша теперь включает userId
        () => CardApi.getRandomCards(userId), // Изменено на вызов API с userId
        {
            ...options,
            onError: (error) => {
                // Обработка ошибок
                console.error('Error fetching random cards:', error);
            },
            onSuccess: (data) => {
                // Успех
                console.log('Random cards fetched successfully:', data);
            },
            // Можно добавить параметры по умолчанию, если они уместны для вашего случая
        }
    );
};

