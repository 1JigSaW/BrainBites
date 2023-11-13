import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {BadgeProgress, UserBadgeProgressApi} from "../api/badge.api";

export const useGetUserBadgeProgress = (userId: number | null, isEnabled = false) => {
    return useQuery<BadgeProgress[], AxiosError>(
        ['user_badge_progress', userId],
        () => UserBadgeProgressApi.getUserBadgeProgress(userId),
        {
            retry: false, // Отключаем повторные попытки
            enabled: isEnabled // Хук будет активирован только если isEnabled true
        }
    );
};
