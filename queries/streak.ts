import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {StreakApi, StreakResponse, StreakUpdateResponse} from "../api/streak.api";
import {AxiosError} from "axios";


export const useGetCurrentStreak = (userId: number | null): UseQueryResult<any, AxiosError> => {
    return useQuery<any, AxiosError>(
        ['get_current_streak', userId],
        () => StreakApi.getCurrentStreak(userId!),
        {
            enabled: !!userId,
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Error fetching current streak:', error);
            },
            onSuccess: (data) => {
                console.log('Current streak fetched successfully:', data);
            },
        },
    );
};

export const useUpdateStreak = (userId: number | null): UseMutationResult<StreakUpdateResponse, AxiosError, number> => {
    const queryClient = useQueryClient();

    return useMutation<StreakUpdateResponse, AxiosError, number>(
        (userId: number) => StreakApi.updateStreak(userId),
        {
            onSuccess: (data) => {
                console.log('Streak updated successfully:', data);
                // Здесь можно инвалидировать или обновлять данные кэша, если это необходимо
                queryClient.invalidateQueries(['get_current_streak']);
            },
            onError: (error) => {
                console.error('Error updating streak:', error);
            },
        },
    );
};