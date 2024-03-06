import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {StreakApi, StreakResponse} from "../api/streak.api";
import {AxiosError} from "axios";


export const useGetCurrentStreak = (userId: number | null): UseQueryResult<StreakResponse, AxiosError> => {
    return useQuery<StreakResponse, AxiosError>(
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
