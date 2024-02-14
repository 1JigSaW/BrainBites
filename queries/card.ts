import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Card, CardApi } from '../api/card.api';

interface MarkCardsAsTestPassedResult {
    message: string;
}

interface UpdateReadCardsCountData {
    message: string;
}

interface SaveCardResult {
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
    options?: UseMutationOptions<MarkCardsAsTestPassedResult, AxiosError, void>
) => {
    return useMutation<MarkCardsAsTestPassedResult, AxiosError, void>(
        () => CardApi.markCardsAsTestPassed(userId),
        {
            ...options, // Распространяем переданные опции, чтобы пользователь мог кастомизировать хук
            onSuccess: (data) => {
                // Здесь можно добавить дополнительную логику в случае успеха
                console.log('123',data.message);
            },
            onError: (error) => {
                // Здесь можно добавить обработку ошибок
                console.error('Error marking cards as passed:', error.message);
            }
        }
    );
};

export const useUpdateReadCardsCount = (
    options?: UseMutationOptions<UpdateReadCardsCountData, AxiosError, { userId: number; readCardsCount: number }>
) => {
    return useMutation<UpdateReadCardsCountData, AxiosError, { userId: number; readCardsCount: number }>(
        ({ userId, readCardsCount }) => CardApi.updateReadCardsCount(userId, readCardsCount),
        {
            // Spread additional options if they were passed to the hook
            ...options,
            onSuccess: (data) => {
                // This is where you can add additional logic on success
                console.log('Read cards count updated:', data.message);
            },
            onError: (error) => {
                // This is where you handle errors
                console.error('Error updating read cards count:', error.message);
            }
        }
    );
};

export const useSaveCard = (
    options?: UseMutationOptions<SaveCardResult, AxiosError, { userId: number | null; cardId: number }>
) => {
    return useMutation<SaveCardResult, AxiosError, { userId: number | null; cardId: number }>(
        ({ userId, cardId }) => CardApi.saveCardForUser(userId, cardId),
        {
            // Spread additional options if they were passed to the hook
            ...options,
            onSuccess: (data) => {
                // This is where you can add additional logic on success
                console.log('Card saved:', data.message);
            },
            onError: (error) => {
                // This is where you handle errors
                console.error('Error saving card:', error.message);
            }
        }
    );
};

export const useGetSavedCards = (userId: number | null, options?: UseQueryOptions<Card[], Error>) => {
    return useQuery<Card[], Error>(
        ['saved_cards', userId],
        () => CardApi.getSavedCards(userId),
        {
            ...options, // Allow users to pass additional options
        }
    );
};


export const useUpdateUserXp = (
    options?: UseMutationOptions<{ message: string, new_xp: number }, AxiosError, { userId: number | null, correctAnswersCount: number }>
) => {
    return useMutation<{ message: string, new_xp: number }, AxiosError, { userId: number | null, correctAnswersCount: number }>(
        ({ userId, correctAnswersCount }) => CardApi.updateUserXp(userId, correctAnswersCount),
        {
            ...options,
            onSuccess: (data) => {
                console.log('XP updated:', data.message, 'New XP:', data.new_xp);
            },
            onError: (error) => {
                console.error('Error updating user XP:', error.message);
            }
        }
    );
};


export const useGetUnseenCardsBySubtitle = (subtitleId: number, userId: number | null, limit: number, options?: UseQueryOptions<Card[], Error>) => {
    return useQuery<Card[], Error>(
        ['unseen_cards_by_subtitle', subtitleId, userId, limit],
        () => CardApi.getUnseenCardsBySubtitle(subtitleId, userId, limit),
        {
            ...options,
        }
    );
};

interface MarkCardsAsViewedAndUpdateQuizzesResult {
    message: string;
}

export const useMarkCardsAsViewedAndUpdateQuizzes = (
    options?: UseMutationOptions<MarkCardsAsViewedAndUpdateQuizzesResult, AxiosError, { userId: number | null, cardIds: number[], correctAnswerIds: number[] }>
) => {
    return useMutation<MarkCardsAsViewedAndUpdateQuizzesResult, AxiosError, { userId: number | null, cardIds: number[], correctAnswerIds: number[] }>(
        ({ userId, cardIds, correctAnswerIds }) => CardApi.markCardsAsViewedAndUpdateQuizzes(userId, cardIds, correctAnswerIds),
        {
            ...options,
            onSuccess: (data) => {
                // Дополнительная логика при успешном запросе
                console.log('Cards marked as viewed and quizzes updated:', data.message);
            },
            onError: (error) => {
                // Обработка ошибок
                console.error('Error during marking cards as viewed and updating quizzes:', error.message);
            }
        }
    );
};
