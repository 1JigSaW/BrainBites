import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {BadgeProgress, UserBadgeProgressApi} from "../api/badge.api";

export const useGetUserBadgeProgress = (userId: number | null, isEnabled = false, topThree = false) => {
    return useQuery<BadgeProgress[], AxiosError>(
        ['user_badge_progress', userId, topThree],
        () => UserBadgeProgressApi.getUserBadgeProgress(userId, topThree),
        {
            retry: false, // Отключаем повторные попытки
            enabled: isEnabled // Хук будет активирован только если isEnabled true
        }
    );
};


export const useCheckUserAchievements = (userId: any, options = {}) => {
    return useQuery(
        ['check_user_achievements', userId],
        () => UserBadgeProgressApi.checkUserAchievements(userId),
        {
            retry: false, // Отключение повторных попыток
            enabled: !!userId, // Запуск запроса только если userId предоставлен
            ...options
        }
    );
};
